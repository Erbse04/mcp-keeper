import { LATEST_PROTOCOL_VERSION } from "@modelcontextprotocol/sdk/types.js";
import type { Finding, Rule, Severity } from "./types.js";
import {
  textFields,
  excerpt,
  estimateTokens,
  toolContextPayload,
  INVISIBLE_RE,
  TAG_CHARS_RE,
  decodeTagChars,
} from "./text.js";
import { findSecret, redact } from "./secrets.js";

const loc = (owner: string, path: string) => `${owner} › ${path}`;

/* ------------------------------------------------------------------ */
/* Security                                                            */
/* ------------------------------------------------------------------ */

interface InjectionPattern {
  re: RegExp;
  severity: Severity;
  why: string;
}

const INJECTION_PATTERNS: InjectionPattern[] = [
  {
    re: /\b(?:ignore|disregard|forget|override)\b[^.\n]{0,30}\b(?:previous|prior|above|earlier|all|other|system)\b[^.\n]{0,20}\b(?:instructions?|prompts?|messages?|rules|guidelines)\b/i,
    severity: "critical",
    why: "tries to override the model's instructions",
  },
  {
    re: /\b(?:do not|don't|never|without)\b[^.\n]{0,25}\b(?:tell|inform|mention|reveal|notify|show|alert|tell)(?:ing)?\b[^.\n]{0,20}\b(?:the )?user\b/i,
    severity: "critical",
    why: "asks the model to hide something from the user",
  },
  {
    re: /<\s*\/?\s*(?:important|system|instructions?|secret|hidden|admin)\s*>/i,
    severity: "high",
    why: "contains pseudo-markup commonly used for tool-poisoning instructions",
  },
  {
    re: /(?:~|\$HOME|%USERPROFILE%)?[/\\]?\.(?:ssh|aws|gnupg|kube|docker)[/\\]|\bid_(?:rsa|ed25519|ecdsa)\b|\.aws[/\\]credentials|\.netrc\b|\.npmrc\b|\.pypirc\b|claude_desktop_config\.json|\bmcp\.json\b|\/etc\/(?:passwd|shadow)\b|\.git-credentials\b/i,
    severity: "high",
    why: "references credential or configuration files",
  },
  {
    re: /\b(?:send|forward|bcc|cc|copy|upload|post|exfiltrate)\b[^.\n]{0,40}\b(?:all|every|any|each)\b[^.\n]{0,40}\bto\b[^.\n]{0,20}(?:[\w.+-]+@[\w-]+\.[\w.]+|https?:\/\/)/i,
    severity: "high",
    why: "instructs to send data to a fixed recipient",
  },
  {
    re: /\b(?:always|also|secretly|silently|quietly)\b[^.\n]{0,20}\b(?:bcc|cc|forward|send|copy|upload|post|report)\b[^.\n]{0,40}(?:[\w.+-]+@[\w-]+\.[\w.]+|https?:\/\/)/i,
    severity: "high",
    why: "instructs to silently copy data to a fixed recipient",
  },
  {
    re: /\b(?:when|whenever|if)\b[^.\n]{0,30}\b(?:the )?(?:user|you|assistant)\b[^.\n]{0,20}\b(?:calls?|uses?|invokes?|runs?)\b[^.\n]{0,30}\b(?:other|another|any|the [`'"]?[\w.-]+[`'"]?) tool\b/i,
    severity: "medium",
    why: "tries to change how *other* tools are used (tool shadowing)",
  },
  {
    re: /\b(?:instead of|rather than)\b[^.\n]{0,15}\b(?:using|calling)\b[^.\n]{0,30}\btool\b/i,
    severity: "medium",
    why: "tries to redirect the model away from other tools",
  },
  {
    re: /\b(?:conversation|chat) history\b|\bsystem prompt\b|\bprevious messages\b|\bentire (?:conversation|context)\b/i,
    severity: "medium",
    why: "references the model's conversation or system prompt",
  },
  {
    re: /\b(?:you are now|from now on|new instructions?|act as (?:an?|the)|pretend (?:to be|you are))\b/i,
    severity: "medium",
    why: "uses role-play or instruction-switching phrasing",
  },
  {
    re: /\b(?:this is (?:very |extremely )?important|very important|critical(?:ly important)?)\b[^.\n]{0,20}[!:]/i,
    severity: "low",
    why: "uses urgency phrasing often used to push the model",
  },
];

const promptInjection: Rule = {
  id: "MCP001",
  title: "Prompt-injection patterns in model-visible text",
  category: "security",
  description:
    "Tool, prompt and resource descriptions, parameter descriptions and server instructions are read by the model as trusted text. Phrases that override instructions, hide actions from the user or reference credential files are classic tool-poisoning patterns.",
  check({ snapshot }) {
    const out: Finding[] = [];
    for (const f of textFields(snapshot)) {
      if (f.path === "name") continue;
      for (const p of INJECTION_PATTERNS) {
        const m = p.re.exec(f.text);
        if (!m) continue;
        out.push({
          ruleId: this.id,
          severity: p.severity,
          message: `Model-visible text ${p.why}.`,
          location: loc(f.owner, f.path),
          evidence: excerpt(f.text, m.index, m[0].length),
          fix: "Describe what the tool does, not what the model should do with other tools, the user or other data. Remove imperative instructions aimed at the model.",
        });
      }
    }
    return out;
  },
};

const hiddenUnicode: Rule = {
  id: "MCP002",
  title: "Invisible or deceptive characters",
  category: "security",
  description:
    "Zero-width characters, bidi overrides and Unicode tag characters are invisible in most UIs but readable by models. Tag characters can carry a complete hidden prompt (\"ASCII smuggling\"). Large whitespace runs can push text out of view in approval dialogs.",
  check({ snapshot }) {
    const out: Finding[] = [];
    for (const f of textFields(snapshot)) {
      const tags = f.text.match(TAG_CHARS_RE);
      if (tags && tags.length > 0) {
        const decoded = decodeTagChars(f.text);
        out.push({
          ruleId: this.id,
          severity: "critical",
          message: `Contains ${tags.length} Unicode tag characters (hidden text${decoded ? `: "${decoded.slice(0, 120)}"` : ""}).`,
          location: loc(f.owner, f.path),
          fix: "Remove all characters in the range U+E0000–U+E007F.",
        });
        continue;
      }
      INVISIBLE_RE.lastIndex = 0;
      const inv = f.text.match(INVISIBLE_RE);
      if (inv && inv.length > 0) {
        const bidi = inv.some((c) => /[‪-‮⁦-⁩]/.test(c));
        out.push({
          ruleId: this.id,
          severity: bidi ? "high" : "medium",
          message: `Contains ${inv.length} invisible character(s)${bidi ? " including bidi overrides" : ""}.`,
          location: loc(f.owner, f.path),
          evidence: excerpt(f.text, f.text.search(INVISIBLE_RE), 1),
          fix: "Strip zero-width, bidi and control characters from model-visible text.",
        });
      }
      const ws = /[ \t]{60,}|\n{8,}/.exec(f.text);
      if (ws) {
        out.push({
          ruleId: this.id,
          severity: "medium",
          message: `Contains a run of ${ws[0].length} whitespace characters that can hide text from human reviewers.`,
          location: loc(f.owner, f.path),
          evidence: excerpt(f.text, ws.index + ws[0].length, 0),
        });
      }
    }
    return out;
  },
};

const leakedSecrets: Rule = {
  id: "MCP003",
  title: "Secrets in model-visible text",
  category: "security",
  description: "API keys, tokens or private keys inside descriptions, schemas or instructions are sent to every model provider and logged in transcripts.",
  check({ snapshot }) {
    const out: Finding[] = [];
    for (const f of textFields(snapshot)) {
      const s = findSecret(f.text);
      if (s) {
        out.push({
          ruleId: this.id,
          severity: "high",
          message: `Looks like a ${s.name}: ${redact(s.match)}.`,
          location: loc(f.owner, f.path),
          fix: "Remove the secret and rotate it — assume it has been exposed.",
        });
      }
    }
    return out;
  },
};

/** Split a tool name like `deleteFile`, `delete_file`, `repo.delete-file` into lowercase words. */
export function nameWords(name: string): string[] {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((w) => w.toLowerCase());
}

const DESTRUCTIVE_WORDS = new Set(["delete", "remove", "drop", "destroy", "truncate", "purge", "wipe", "kill", "terminate", "overwrite", "reset", "revoke", "uninstall", "erase", "rm", "unlink", "del"]);
const EXEC_WORDS = new Set(["exec", "execute", "shell", "bash", "sh", "cmd", "command", "terminal", "eval", "spawn", "subprocess", "powershell"]);
const WRITE_WORDS = new Set(["write", "create", "update", "edit", "modify", "move", "rename", "set", "put", "patch", "insert", "upsert", "send", "post", "publish", "push", "commit", "upload", "deploy", "run", "add", "merge", "close", "cancel", "archive", "fork", "invite", "assign", "save", "apply", "install", "start", "stop", "restart", "reply", "comment", "approve", "transfer", "pay", "book", "order", "submit", "trigger", "click", "type", "fill", "navigate", "press", "drag", "upgrade", "import", "store", "replace", "append", "mark"]);
const has = (name: string, set: Set<string>) => nameWords(name).some((w) => set.has(w));
const isDestructive = (n: string) => has(n, DESTRUCTIVE_WORDS);
const isExec = (n: string) => has(n, EXEC_WORDS) || /run_?code|run_?script|execute_?code/i.test(n);
const isWrite = (n: string) => has(n, WRITE_WORDS);

const annotations: Rule = {
  id: "MCP004",
  title: "Missing or misleading tool safety annotations",
  category: "security",
  description:
    "Annotations (readOnlyHint, destructiveHint, idempotentHint, openWorldHint) let clients decide when to ask the user for confirmation. Tools that change or delete data should say so; read-only tools should be marked read-only so clients can skip confirmation.",
  check({ snapshot }) {
    const out: Finding[] = [];
    for (const t of snapshot.tools) {
      const a = t.annotations ?? {};
      const destructive = isDestructive(t.name);
      const writes = destructive || isWrite(t.name) || isExec(t.name);
      if (a.readOnlyHint === true && destructive) {
        out.push({
          ruleId: this.id,
          severity: "high",
          message: `Tool "${t.name}" is marked readOnlyHint=true but its name suggests it deletes or changes data.`,
          location: loc(`tool:${t.name}`, "annotations.readOnlyHint"),
          fix: "Set readOnlyHint=false and destructiveHint=true, or rename the tool if it really is read-only.",
        });
      } else if (destructive && a.destructiveHint === undefined && a.readOnlyHint === undefined) {
        out.push({
          ruleId: this.id,
          severity: "medium",
          message: `Tool "${t.name}" looks destructive but has no destructiveHint/readOnlyHint annotation.`,
          location: loc(`tool:${t.name}`, "annotations"),
          fix: "Add annotations: { destructiveHint: true, readOnlyHint: false }.",
        });
      } else if (isExec(t.name) && a.destructiveHint === undefined && a.readOnlyHint === undefined) {
        out.push({
          ruleId: this.id,
          severity: "medium",
          message: `Tool "${t.name}" can execute commands but declares no safety annotations.`,
          location: loc(`tool:${t.name}`, "annotations"),
          fix: "Add annotations: { readOnlyHint: false, destructiveHint: true, openWorldHint: true }.",
        });
      } else if (!writes && a.readOnlyHint === undefined) {
        out.push({
          ruleId: this.id,
          severity: "info",
          message: `Tool "${t.name}" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation.`,
          location: loc(`tool:${t.name}`, "annotations"),
        });
      }
    }
    return out;
  },
};

const powerfulTools: Rule = {
  id: "MCP005",
  title: "High-power capabilities",
  category: "security",
  description:
    "Inventory of tools that can execute code, run shell commands or reach arbitrary URLs. Not a defect by itself — but these are the tools an injected prompt would try to use, so they deserve explicit user approval.",
  check({ snapshot }) {
    const out: Finding[] = [];
    for (const t of snapshot.tools) {
      const props = Object.keys((t.inputSchema as { properties?: Record<string, unknown> } | undefined)?.properties ?? {});
      const hasCodeParam = props.some((p) => /^(command|cmd|code|script|shell|expression)$/i.test(p));
      if (isExec(t.name) || hasCodeParam) {
        out.push({
          ruleId: this.id,
          severity: "info",
          message: `Tool "${t.name}" can likely execute commands or code.`,
          location: `tool:${t.name}`,
          fix: "Keep it behind user confirmation; consider an allow-list of commands or a sandbox.",
        });
      } else if (props.some((p) => /^(url|uri|endpoint|href)$/i.test(p)) && t.annotations?.openWorldHint !== false) {
        out.push({
          ruleId: this.id,
          severity: "info",
          message: `Tool "${t.name}" accepts arbitrary URLs (open world) — a potential exfiltration channel.`,
          location: `tool:${t.name}`,
        });
      }
    }
    return out;
  },
};

/* ------------------------------------------------------------------ */
/* Efficiency                                                          */
/* ------------------------------------------------------------------ */

export const TOKEN_BUDGET = { totalMedium: 8_000, totalHigh: 20_000, perTool: 1_200, maxTools: 40 };

const tokenBudget: Rule = {
  id: "MCP101",
  title: "Context (token) cost of tool definitions",
  category: "efficiency",
  description:
    "Every tool definition is sent to the model on every turn. Large tool lists cost money, add latency and measurably reduce tool-selection accuracy.",
  check({ snapshot }) {
    const out: Finding[] = [];
    const per = snapshot.tools.map((t) => ({ name: t.name, tokens: estimateTokens(toolContextPayload(t)) }));
    const total = per.reduce((a, b) => a + b.tokens, 0) + (snapshot.instructions ? estimateTokens(snapshot.instructions) : 0);
    if (total > TOKEN_BUDGET.totalHigh) {
      out.push({
        ruleId: this.id,
        severity: "high",
        message: `Tool definitions cost ≈${total.toLocaleString("en")} tokens per request (budget ${TOKEN_BUDGET.totalMedium.toLocaleString("en")}).`,
        fix: "Merge related tools, shorten descriptions, drop rarely used tools or offer them via a separate server/toolset.",
      });
    } else if (total > TOKEN_BUDGET.totalMedium) {
      out.push({
        ruleId: this.id,
        severity: "medium",
        message: `Tool definitions cost ≈${total.toLocaleString("en")} tokens per request (budget ${TOKEN_BUDGET.totalMedium.toLocaleString("en")}).`,
        fix: "Shorten descriptions and schemas, or split into optional toolsets.",
      });
    }
    if (snapshot.tools.length > TOKEN_BUDGET.maxTools) {
      out.push({
        ruleId: this.id,
        severity: "medium",
        message: `${snapshot.tools.length} tools exposed. Models choose tools less reliably beyond ~${TOKEN_BUDGET.maxTools}.`,
        fix: "Design fewer, intent-level tools (e.g. one `search` with filters instead of ten `list_*`).",
      });
    }
    for (const p of per) {
      if (p.tokens > TOKEN_BUDGET.perTool) {
        out.push({
          ruleId: this.id,
          severity: "low",
          message: `Tool "${p.name}" alone costs ≈${p.tokens.toLocaleString("en")} tokens.`,
          location: `tool:${p.name}`,
          fix: "Trim the description and nested schema; move long docs into a resource.",
        });
      }
    }
    return out;
  },
};

/* ------------------------------------------------------------------ */
/* Quality                                                             */
/* ------------------------------------------------------------------ */

const descriptions: Rule = {
  id: "MCP201",
  title: "Tool and parameter descriptions",
  category: "quality",
  description:
    "Models pick tools and fill in arguments from descriptions alone. Missing or one-word descriptions lead to wrong tool choices and invalid arguments.",
  check({ snapshot }) {
    const out: Finding[] = [];
    for (const t of snapshot.tools) {
      const d = (t.description ?? "").trim();
      if (!d) {
        out.push({ ruleId: this.id, severity: "medium", message: `Tool "${t.name}" has no description.`, location: `tool:${t.name}`, fix: "Say what it does, when to use it and what it returns." });
      } else if (d.length < 25) {
        out.push({ ruleId: this.id, severity: "low", message: `Tool "${t.name}" has a very short description ("${d}").`, location: `tool:${t.name}`, fix: "Add when to use it and what it returns." });
      } else if (d.length > 3000) {
        out.push({ ruleId: this.id, severity: "low", message: `Tool "${t.name}" has a ${d.length}-character description.`, location: `tool:${t.name}`, fix: "Keep descriptions focused; move reference material into a resource." });
      }
      const props = (t.inputSchema as { properties?: Record<string, { description?: string }> } | undefined)?.properties ?? {};
      const missing = Object.entries(props).filter(([, v]) => !v || typeof v !== "object" || !v.description?.trim()).map(([k]) => k);
      const selfExplanatory = new Set(["id", "path", "url", "query", "name", "limit", "offset", "page", "cursor"]);
      const relevant = missing.filter((m) => !selfExplanatory.has(m.toLowerCase()));
      if (relevant.length > 0) {
        out.push({
          ruleId: this.id,
          severity: "low",
          message: `Tool "${t.name}": ${relevant.length} parameter(s) without description (${relevant.slice(0, 6).join(", ")}${relevant.length > 6 ? ", …" : ""}).`,
          location: loc(`tool:${t.name}`, "inputSchema.properties"),
          fix: "Describe format, units and allowed values for each parameter.",
        });
      }
    }
    return out;
  },
};

const schemaValidity: Rule = {
  id: "MCP202",
  title: "Input schema structure",
  category: "quality",
  description: "Tool input schemas must be JSON Schema objects. Broken schemas make some clients drop the tool or make the model guess argument shapes.",
  check({ snapshot }) {
    const out: Finding[] = [];
    for (const t of snapshot.tools) {
      const s = t.inputSchema as { type?: unknown; properties?: Record<string, unknown>; required?: unknown };
      const where = loc(`tool:${t.name}`, "inputSchema");
      if (!s || s.type !== "object") {
        out.push({ ruleId: this.id, severity: "high", message: `Tool "${t.name}": inputSchema.type must be "object".`, location: where });
        continue;
      }
      const props = s.properties ?? {};
      if (s.required !== undefined) {
        if (!Array.isArray(s.required)) {
          out.push({ ruleId: this.id, severity: "medium", message: `Tool "${t.name}": "required" must be an array.`, location: where });
        } else {
          const ghost = s.required.filter((r) => typeof r !== "string" || !(r in props));
          if (ghost.length) {
            out.push({ ruleId: this.id, severity: "medium", message: `Tool "${t.name}": required field(s) not defined in properties: ${ghost.join(", ")}.`, location: where });
          }
        }
      }
      const untyped = Object.entries(props)
        .filter(([, v]) => {
          if (!v || typeof v !== "object") return true;
          const o = v as Record<string, unknown>;
          return !("type" in o || "anyOf" in o || "oneOf" in o || "allOf" in o || "$ref" in o || "enum" in o || "const" in o);
        })
        .map(([k]) => k);
      if (untyped.length) {
        out.push({ ruleId: this.id, severity: "low", message: `Tool "${t.name}": parameter(s) without a type: ${untyped.join(", ")}.`, location: loc(`tool:${t.name}`, "inputSchema.properties") });
      }
    }
    return out;
  },
};

/* ------------------------------------------------------------------ */
/* Compliance                                                          */
/* ------------------------------------------------------------------ */

const TOOL_NAME_RE = /^[A-Za-z0-9_.-]{1,128}$/;

const naming: Rule = {
  id: "MCP301",
  title: "Tool names",
  category: "compliance",
  description:
    "Tool names should be unique, 1–128 characters, and use only A–Z, a–z, 0–9, underscore, hyphen and dot. Other characters are rejected or mangled by some clients and model APIs.",
  check({ snapshot }) {
    const out: Finding[] = [];
    const seen = new Map<string, number>();
    for (const t of snapshot.tools) seen.set(t.name, (seen.get(t.name) ?? 0) + 1);
    for (const [name, n] of seen) {
      if (n > 1) out.push({ ruleId: this.id, severity: "high", message: `Tool name "${name}" is used ${n} times.`, location: `tool:${name}` });
      if (!TOOL_NAME_RE.test(name)) {
        out.push({ ruleId: this.id, severity: "medium", message: `Tool name "${name}" contains characters outside [A-Za-z0-9_.-] or is too long.`, location: `tool:${name}`, fix: "Use snake_case or kebab-case ASCII names." });
      } else if (name.length > 64) {
        out.push({ ruleId: this.id, severity: "low", message: `Tool name "${name}" is longer than 64 characters; some model APIs truncate or reject it once a server prefix is added.`, location: `tool:${name}` });
      }
    }
    return out;
  },
};

const protocol: Rule = {
  id: "MCP302",
  title: "Protocol and server metadata",
  category: "compliance",
  description: "Checks the negotiated protocol version, server identification and whether listing succeeded.",
  check({ snapshot }) {
    const out: Finding[] = [];
    if (snapshot.transport === "static") return out;
    if (snapshot.protocolVersion && snapshot.protocolVersion < LATEST_PROTOCOL_VERSION) {
      out.push({
        ruleId: this.id,
        severity: "low",
        message: `Server negotiated protocol ${snapshot.protocolVersion}; latest supported by this checker is ${LATEST_PROTOCOL_VERSION}.`,
        fix: "Update your MCP SDK.",
      });
    }
    if (!snapshot.serverInfo?.version || snapshot.serverInfo.version === "0.0.0") {
      out.push({ ruleId: this.id, severity: "low", message: "Server does not report a meaningful version in serverInfo.", fix: "Report your package version so users can pin and audit it." });
    }
    for (const e of snapshot.schemaErrors ?? []) {
      out.push({
        ruleId: this.id,
        severity: "high",
        message: `${e.kind.replace(/s$/, "")} "${e.name}" does not match the MCP schema (${e.message}). The official TypeScript SDK client rejects the whole list because of it.`,
        location: `${e.kind.replace(/s$/, "")}:${e.name}`,
      });
    }
    for (const e of snapshot.errors) {
      out.push({ ruleId: this.id, severity: "medium", message: `${e.stage} failed: ${e.message}` });
    }
    if (snapshot.tools.length + snapshot.prompts.length + snapshot.resources.length + snapshot.resourceTemplates.length === 0 && snapshot.errors.length === 0) {
      out.push({ ruleId: this.id, severity: "info", message: "Server exposes no tools, prompts or resources (it may need configuration or credentials)." });
    }
    return out;
  },
};

export const RULES: Rule[] = [
  promptInjection,
  hiddenUnicode,
  leakedSecrets,
  annotations,
  powerfulTools,
  tokenBudget,
  descriptions,
  schemaValidity,
  naming,
  protocol,
];
