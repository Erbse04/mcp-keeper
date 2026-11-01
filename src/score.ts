import type { Category, CategoryScore, Finding, ScanResult, ServerSnapshot, Severity } from "./types.js";
import { RULES } from "./rules.js";
import { estimateTokens, toolContextPayload } from "./text.js";
import { VERSION } from "./version.js";

export const SEVERITY_WEIGHT: Record<Severity, number> = { critical: 40, high: 15, medium: 6, low: 2, info: 0 };
/** One noisy rule should not sink a server on its own (critical findings are exempt). */
const PER_RULE_CAP = 30;

const CATEGORY_OF: Record<string, Category> = Object.fromEntries(RULES.map((r) => [r.id, r.category]));
CATEGORY_OF["MCP010"] = "security";

export function categoryOf(ruleId: string): Category {
  return CATEGORY_OF[ruleId] ?? "compliance";
}

function deduction(findings: Finding[]): number {
  const byRule = new Map<string, { normal: number; critical: number }>();
  for (const f of findings) {
    const e = byRule.get(f.ruleId) ?? { normal: 0, critical: 0 };
    if (f.severity === "critical") e.critical += SEVERITY_WEIGHT.critical;
    else e.normal += SEVERITY_WEIGHT[f.severity];
    byRule.set(f.ruleId, e);
  }
  let total = 0;
  for (const e of byRule.values()) total += e.critical + Math.min(e.normal, PER_RULE_CAP);
  return total;
}

export function gradeFor(score: number): ScanResult["grade"] {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 65) return "C";
  if (score >= 50) return "D";
  return "F";
}

export function scoreFindings(findings: Finding[]) {
  let score = Math.max(0, 100 - deduction(findings));
  // Any critical finding means the server should not be trusted as-is.
  if (findings.some((f) => f.severity === "critical")) score = Math.min(score, 40);
  const categories = {} as Record<Category, CategoryScore>;
  for (const c of ["security", "efficiency", "quality", "compliance"] as Category[]) {
    const fs = findings.filter((f) => categoryOf(f.ruleId) === c);
    categories[c] = { score: Math.max(0, 100 - deduction(fs)), findings: fs.filter((f) => f.severity !== "info").length };
  }
  return { score, grade: gradeFor(score), categories };
}

export interface AnalyzeOptions {
  disable?: string[];
  extraFindings?: Finding[];
}

export function analyze(snapshot: ServerSnapshot, opts: AnalyzeOptions = {}): ScanResult {
  const disabled = new Set((opts.disable ?? []).map((d) => d.toUpperCase()));
  const findings: Finding[] = [];
  for (const rule of RULES) {
    if (disabled.has(rule.id)) continue;
    try {
      findings.push(...rule.check({ snapshot }));
    } catch (e) {
      findings.push({ ruleId: rule.id, severity: "info", message: `Rule could not run on this server's data: ${(e as Error).message}` });
    }
  }
  for (const f of opts.extraFindings ?? []) if (!disabled.has(f.ruleId)) findings.push(f);
  const order: Severity[] = ["critical", "high", "medium", "low", "info"];
  findings.sort((a, b) => order.indexOf(a.severity) - order.indexOf(b.severity) || a.ruleId.localeCompare(b.ruleId));
  const perTool = snapshot.tools.map((t) => ({ name: t.name, tokens: estimateTokens(toolContextPayload(t)) }));
  const { score, grade, categories } = scoreFindings(findings);
  return {
    tool: { name: "mcp-probe", version: VERSION },
    scannedAt: new Date().toISOString(),
    snapshot,
    findings,
    score,
    grade,
    categories,
    stats: {
      tools: snapshot.tools.length,
      prompts: snapshot.prompts.length,
      resources: snapshot.resources.length + snapshot.resourceTemplates.length,
      estimatedTokens: perTool.reduce((a, b) => a + b.tokens, 0) + (snapshot.instructions ? estimateTokens(snapshot.instructions) : 0),
      perTool: perTool.sort((a, b) => b.tokens - a.tokens),
    },
  };
}
