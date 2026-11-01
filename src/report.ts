import type { Finding, ScanResult, Severity } from "./types.js";
import { RULES } from "./rules.js";
import { CONFIG_RULES, type ConfiguredServer } from "./config.js";

const useColor = () => process.stdout.isTTY && !process.env.NO_COLOR;
const c = (code: string) => (s: string) => (useColor() ? `\x1b[${code}m${s}\x1b[0m` : s);
const bold = c("1"), dim = c("2"), red = c("31"), green = c("32"), yellow = c("33"), blue = c("34"), magenta = c("35");

const SEV_COLOR: Record<Severity, (s: string) => string> = { critical: magenta, high: red, medium: yellow, low: blue, info: dim };
const SEV_ICON: Record<Severity, string> = { critical: "🛑", high: "🔴", medium: "🟠", low: "🔵", info: "⚪" };
const GRADE_COLOR: Record<string, string> = { A: "brightgreen", B: "green", C: "yellow", D: "orange", F: "red" };

export const ruleTitle = (id: string) =>
  RULES.find((r) => r.id === id)?.title ?? CONFIG_RULES.find((r) => r.id === id)?.title ?? (id === "MCP010" ? "Changed since baseline (rug pull)" : id);

function countBySeverity(findings: Finding[]) {
  const m: Record<Severity, number> = { critical: 0, high: 0, medium: 0, low: 0, info: 0 };
  for (const f of findings) m[f.severity]++;
  return m;
}

/* ---------------- text ---------------- */

export function toText(r: ScanResult, opts: { verbose?: boolean } = {}): string {
  const s = r.snapshot;
  const lines: string[] = [];
  const gradeColor = r.grade === "A" || r.grade === "B" ? green : r.grade === "C" ? yellow : red;
  lines.push(bold(`mcp-probe ${r.tool.version}`) + dim(`  ·  ${s.target}`));
  lines.push(
    `${s.serverInfo ? `${bold(s.serverInfo.name)} ${s.serverInfo.version}` : "unknown server"}  ·  protocol ${s.protocolVersion ?? "?"}  ·  ${s.transport}` +
      `  ·  ${r.stats.tools} tools, ${r.stats.prompts} prompts, ${r.stats.resources} resources  ·  ≈${r.stats.estimatedTokens.toLocaleString("en")} tokens`,
  );
  lines.push("");
  lines.push(`  Score ${gradeColor(bold(`${r.score}/100  (${r.grade})`))}    ` +
    Object.entries(r.categories).map(([k, v]) => `${k} ${v.score}`).join(dim("  ·  ")));
  lines.push("");
  const shown = opts.verbose ? r.findings : r.findings.filter((f) => f.severity !== "info");
  if (shown.length === 0) lines.push(green("  ✓ No issues found."));
  for (const f of shown) {
    lines.push(`  ${SEV_COLOR[f.severity](f.severity.toUpperCase().padEnd(8))} ${dim(f.ruleId)}  ${f.message}`);
    if (f.location) lines.push(dim(`           at ${f.location}`));
    if (f.evidence) lines.push(dim(`           “${f.evidence}”`));
    if (f.fix && opts.verbose) lines.push(dim(`           fix: ${f.fix}`));
  }
  const info = r.findings.filter((f) => f.severity === "info").length;
  if (!opts.verbose && info) lines.push(dim(`\n  + ${info} informational note(s), show with --verbose`));
  return lines.join("\n");
}

/* ---------------- markdown ---------------- */

const mdEscape = (s: string) => s.replace(/\|/g, "\\|").replace(/\n/g, " ").replace(/</g, "&lt;");

export function badgeUrl(r: ScanResult): string {
  const msg = encodeURIComponent(`${r.grade} · ${r.score}`).replace(/-/g, "--");
  return `https://img.shields.io/badge/mcp--probe-${msg}-${GRADE_COLOR[r.grade]}`;
}

export function toMarkdown(r: ScanResult): string {
  const s = r.snapshot;
  const counts = countBySeverity(r.findings);
  const out: string[] = [];
  out.push(`# mcp-probe report: ${s.serverInfo?.name ?? s.target}`);
  out.push("");
  out.push(`![mcp-probe](${badgeUrl(r)})`);
  out.push("");
  out.push(`| | |\n|---|---|`);
  out.push(`| Target | \`${mdEscape(s.target)}\` |`);
  out.push(`| Server | ${s.serverInfo ? `${mdEscape(s.serverInfo.name)} ${mdEscape(s.serverInfo.version)}` : "–"} |`);
  out.push(`| Protocol | ${s.protocolVersion ?? "–"} (${s.transport}) |`);
  out.push(`| Exposes | ${r.stats.tools} tools · ${r.stats.prompts} prompts · ${r.stats.resources} resources |`);
  out.push(`| Context cost | ≈${r.stats.estimatedTokens.toLocaleString("en")} tokens per request |`);
  out.push(`| Score | **${r.score}/100 (${r.grade})** |`);
  out.push(`| Scanned | ${r.scannedAt} with mcp-probe ${r.tool.version} |`);
  out.push("");
  out.push(`## Scores`);
  out.push("");
  out.push(`| Security | Efficiency | Quality | Compliance |\n|---|---|---|---|`);
  out.push(`| ${r.categories.security.score} | ${r.categories.efficiency.score} | ${r.categories.quality.score} | ${r.categories.compliance.score} |`);
  out.push("");
  out.push(`## Findings`);
  out.push("");
  out.push(`${SEV_ICON.critical} ${counts.critical} critical · ${SEV_ICON.high} ${counts.high} high · ${SEV_ICON.medium} ${counts.medium} medium · ${SEV_ICON.low} ${counts.low} low · ${SEV_ICON.info} ${counts.info} info`);
  out.push("");
  if (r.findings.length === 0) out.push("No findings. 🎉");
  else {
    out.push(`| | Rule | Finding | Location | Fix |\n|---|---|---|---|---|`);
    for (const f of r.findings) {
      const msg = mdEscape(f.message) + (f.evidence ? `<br><sub>“${mdEscape(f.evidence)}”</sub>` : "");
      out.push(`| ${SEV_ICON[f.severity]} ${f.severity} | ${f.ruleId} | ${msg} | ${f.location ? `\`${mdEscape(f.location)}\`` : ""} | ${mdEscape(f.fix ?? "")} |`);
    }
  }
  if (r.stats.perTool.length) {
    out.push("");
    out.push(`## Tools by context cost`);
    out.push("");
    out.push(`| Tool | ≈ Tokens | Annotations |\n|---|---:|---|`);
    for (const p of r.stats.perTool) {
      const t = s.tools.find((x) => x.name === p.name);
      const a = t?.annotations;
      const ann = a ? [a.readOnlyHint && "read-only", a.destructiveHint && "destructive", a.idempotentHint && "idempotent", a.openWorldHint && "open-world"].filter(Boolean).join(", ") || "–" : "–";
      out.push(`| \`${mdEscape(p.name)}\` | ${p.tokens.toLocaleString("en")} | ${ann} |`);
    }
  }
  out.push("");
  out.push(`<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>`);
  return out.join("\n") + "\n";
}

/* ---------------- json / badge ---------------- */

export const toJson = (r: unknown) => JSON.stringify(r, null, 2) + "\n";

/** shields.io endpoint badge: https://shields.io/badges/endpoint-badge */
export function toBadge(r: ScanResult) {
  return JSON.stringify({ schemaVersion: 1, label: "mcp-probe", message: `${r.grade} · ${r.score}`, color: GRADE_COLOR[r.grade] }, null, 2) + "\n";
}

/* ---------------- SARIF (GitHub code scanning) ---------------- */

const SARIF_LEVEL: Record<Severity, "error" | "warning" | "note"> = { critical: "error", high: "error", medium: "warning", low: "note", info: "note" };

export function toSarif(findings: Finding[], artifactUri = "mcp.json"): string {
  const ruleIds = [...new Set(findings.map((f) => f.ruleId))];
  const sarif = {
    $schema: "https://json.schemastore.org/sarif-2.1.0.json",
    version: "2.1.0",
    runs: [
      {
        tool: {
          driver: {
            name: "mcp-probe",
            informationUri: "https://github.com/tim-erben/mcp-probe",
            rules: ruleIds.map((id) => ({
              id,
              name: id,
              shortDescription: { text: ruleTitle(id) },
              fullDescription: { text: RULES.find((r) => r.id === id)?.description ?? ruleTitle(id) },
              helpUri: `https://github.com/tim-erben/mcp-probe/blob/main/docs/rules.md#${id.toLowerCase()}`,
            })),
          },
        },
        results: findings.map((f) => ({
          ruleId: f.ruleId,
          level: SARIF_LEVEL[f.severity],
          message: { text: [f.message, f.location && `Location: ${f.location}`, f.fix && `Fix: ${f.fix}`].filter(Boolean).join("\n") },
          locations: [
            {
              physicalLocation: { artifactLocation: { uri: artifactUri }, region: { startLine: 1 } },
              logicalLocations: f.location ? [{ fullyQualifiedName: f.location }] : undefined,
            },
          ],
          properties: { severity: f.severity },
        })),
      },
    ],
  };
  return JSON.stringify(sarif, null, 2) + "\n";
}

/* ---------------- config report ---------------- */

export function configToText(servers: ConfiguredServer[], findings: Map<ConfiguredServer, Finding[]>, files: string[]): string {
  const lines: string[] = [bold("mcp-probe config audit")];
  lines.push(dim(`Scanned ${files.length} file(s): ${files.join(", ") || "none found"}`));
  lines.push("");
  if (servers.length === 0) lines.push("  No MCP servers configured.");
  for (const s of servers) {
    const fs = findings.get(s) ?? [];
    const how = s.command ? [s.command, ...(s.args ?? [])].join(" ") : s.url;
    lines.push(`${fs.length ? red("✗") : green("✓")} ${bold(s.name)} ${dim(`(${s.client})`)}${s.disabled ? dim(" [disabled]") : ""}`);
    lines.push(dim(`    ${how}`));
    for (const f of fs) {
      lines.push(`    ${SEV_COLOR[f.severity](f.severity.toUpperCase().padEnd(8))} ${dim(f.ruleId)}  ${f.message}`);
      if (f.fix) lines.push(dim(`             fix: ${f.fix}`));
    }
  }
  return lines.join("\n");
}

export function configToMarkdown(servers: ConfiguredServer[], findings: Map<ConfiguredServer, Finding[]>, files: string[]): string {
  const out = [`# mcp-probe config audit`, "", `Files: ${files.map((f) => `\`${f}\``).join(", ") || "none"}`, ""];
  out.push(`| Server | Client | Finding | Fix |\n|---|---|---|---|`);
  for (const s of servers) {
    const fs = findings.get(s) ?? [];
    if (fs.length === 0) out.push(`| ${mdEscape(s.name)} | ${s.client} | ✅ no issues | |`);
    for (const f of fs) out.push(`| ${mdEscape(s.name)} | ${s.client} | ${SEV_ICON[f.severity]} ${f.ruleId}: ${mdEscape(f.message)} | ${mdEscape(f.fix ?? "")} |`);
  }
  return out.join("\n") + "\n";
}
