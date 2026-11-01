import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import type { Finding, ServerSnapshot } from "./types.js";

/**
 * Baselines ("pinning") detect rug pulls: a server that was reviewed once and later
 * silently changes its tool descriptions or schemas.
 */
export interface Baseline {
  version: 1;
  server?: string;
  createdAt: string;
  tools: Record<string, string>;
  prompts: Record<string, string>;
  instructions?: string;
}

function stable(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stable).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value as object)
      .sort()
      .map((k) => `${JSON.stringify(k)}:${stable((value as Record<string, unknown>)[k])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

export const hash = (v: unknown) => createHash("sha256").update(stable(v)).digest("hex").slice(0, 32);

export function createBaseline(s: ServerSnapshot): Baseline {
  return {
    version: 1,
    server: s.serverInfo ? `${s.serverInfo.name}@${s.serverInfo.version}` : undefined,
    createdAt: new Date().toISOString(),
    tools: Object.fromEntries(
      s.tools.map((t) => [t.name, hash({ d: t.description ?? "", i: t.inputSchema, o: t.outputSchema ?? null, a: t.annotations ?? null, t: t.title ?? null })]),
    ),
    prompts: Object.fromEntries(s.prompts.map((p) => [p.name, hash({ d: p.description ?? "", a: p.arguments ?? [] })])),
    instructions: s.instructions ? hash(s.instructions) : undefined,
  };
}

export function compareBaseline(prev: Baseline, s: ServerSnapshot): Finding[] {
  const cur = createBaseline(s);
  const out: Finding[] = [];
  const ruleId = "MCP010";
  for (const [name, h] of Object.entries(cur.tools)) {
    if (!(name in prev.tools)) {
      out.push({ ruleId, severity: "low", message: `New tool "${name}" since baseline.`, location: `tool:${name}`, fix: "Review the new tool, then update the baseline." });
    } else if (prev.tools[name] !== h) {
      out.push({ ruleId, severity: "high", message: `Tool "${name}" changed since baseline (description, schema or annotations).`, location: `tool:${name}`, fix: "Review the change before trusting it again, then update the baseline." });
    }
  }
  for (const name of Object.keys(prev.tools)) {
    if (!(name in cur.tools)) out.push({ ruleId, severity: "info", message: `Tool "${name}" was removed since baseline.`, location: `tool:${name}` });
  }
  for (const [name, h] of Object.entries(cur.prompts)) {
    if (name in prev.prompts && prev.prompts[name] !== h) {
      out.push({ ruleId, severity: "high", message: `Prompt "${name}" changed since baseline.`, location: `prompt:${name}` });
    }
  }
  if ((prev.instructions ?? null) !== (cur.instructions ?? null)) {
    out.push({ ruleId, severity: "high", message: "Server instructions changed since baseline.", location: "server › instructions" });
  }
  return out;
}

export function loadBaseline(path: string): Baseline | undefined {
  if (!existsSync(path)) return undefined;
  return JSON.parse(readFileSync(path, "utf8")) as Baseline;
}

export function saveBaseline(path: string, s: ServerSnapshot) {
  writeFileSync(path, JSON.stringify(createBaseline(s), null, 2) + "\n");
}
