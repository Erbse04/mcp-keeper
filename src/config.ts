import { readFileSync, existsSync } from "node:fs";
import { homedir, platform } from "node:os";
import { join, resolve } from "node:path";
import type { Finding, Severity } from "./types.js";
import { findSecret, looksLikePlaceholder, redact, SECRET_KEY_NAME_RE } from "./secrets.js";
import type { Target } from "./connect.js";

export interface ConfiguredServer {
  name: string;
  client: string;
  file: string;
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  url?: string;
  headers?: Record<string, string>;
  disabled?: boolean;
}

export interface ConfigFile {
  client: string;
  path: string;
}

/** Known config file locations of popular MCP clients. */
export function knownConfigFiles(cwd = process.cwd()): ConfigFile[] {
  const h = homedir();
  const os = platform();
  const appData = process.env.APPDATA ?? join(h, "AppData", "Roaming");
  const appSupport = os === "darwin" ? join(h, "Library", "Application Support") : os === "win32" ? appData : join(h, ".config");
  return [
    { client: "Claude Desktop", path: join(appSupport, "Claude", "claude_desktop_config.json") },
    { client: "Claude Code (user)", path: join(h, ".claude.json") },
    { client: "Claude Code (project)", path: join(cwd, ".mcp.json") },
    { client: "Cursor (user)", path: join(h, ".cursor", "mcp.json") },
    { client: "Cursor (project)", path: join(cwd, ".cursor", "mcp.json") },
    { client: "VS Code (user)", path: join(appSupport, "Code", "User", "mcp.json") },
    { client: "VS Code (user settings)", path: join(appSupport, "Code", "User", "settings.json") },
    { client: "VS Code (project)", path: join(cwd, ".vscode", "mcp.json") },
    { client: "Windsurf", path: join(h, ".codeium", "windsurf", "mcp_config.json") },
    { client: "Gemini CLI", path: join(h, ".gemini", "settings.json") },
    { client: "Zed", path: join(h, ".config", "zed", "settings.json") },
    { client: "LM Studio", path: join(h, ".lmstudio", "mcp.json") },
  ];
}

/** Minimal JSONC support: strips comments and trailing commas, keeping strings intact. */
export function parseJsonc(text: string): unknown {
  let out = "";
  let i = 0;
  let inStr = false;
  while (i < text.length) {
    const c = text[i];
    if (inStr) {
      out += c;
      if (c === "\\") {
        out += text[i + 1] ?? "";
        i += 2;
        continue;
      }
      if (c === '"') inStr = false;
      i++;
    } else if (c === '"') {
      inStr = true;
      out += c;
      i++;
    } else if (c === "/" && text[i + 1] === "/") {
      while (i < text.length && text[i] !== "\n") i++;
    } else if (c === "/" && text[i + 1] === "*") {
      i += 2;
      while (i < text.length && !(text[i] === "*" && text[i + 1] === "/")) i++;
      i += 2;
    } else {
      out += c;
      i++;
    }
  }
  return JSON.parse(out.replace(/,(\s*[}\]])/g, "$1"));
}

function toServer(name: string, raw: unknown, client: string, file: string): ConfiguredServer | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const r = raw as Record<string, unknown>;
  const strRecord = (v: unknown) =>
    v && typeof v === "object" ? Object.fromEntries(Object.entries(v as Record<string, unknown>).map(([k, x]) => [k, String(x)])) : undefined;
  const cmd = r.command;
  return {
    name,
    client,
    file,
    command: typeof cmd === "string" ? cmd : typeof cmd === "object" && cmd && "path" in cmd ? String((cmd as { path: unknown }).path) : undefined,
    args: Array.isArray(r.args) ? r.args.map(String) : typeof cmd === "object" && cmd && Array.isArray((cmd as { args?: unknown[] }).args) ? (cmd as { args: unknown[] }).args.map(String) : undefined,
    env: strRecord(r.env ?? (typeof cmd === "object" && cmd ? (cmd as { env?: unknown }).env : undefined)),
    url: typeof r.url === "string" ? r.url : typeof r.serverUrl === "string" ? r.serverUrl : typeof r.httpUrl === "string" ? r.httpUrl : undefined,
    headers: strRecord(r.headers),
    disabled: r.disabled === true || r.enabled === false,
  };
}

/** Extract MCP server entries from any supported config shape. */
export function extractServers(json: unknown, client: string, file: string): ConfiguredServer[] {
  const out: ConfiguredServer[] = [];
  const collect = (obj: unknown, prefix = "") => {
    if (!obj || typeof obj !== "object") return;
    for (const [name, raw] of Object.entries(obj as Record<string, unknown>)) {
      const s = toServer(prefix + name, raw, client, file);
      if (s && (s.command || s.url)) out.push(s);
    }
  };
  if (!json || typeof json !== "object") return out;
  const j = json as Record<string, unknown>;
  collect(j.mcpServers);
  collect(j.servers); // VS Code mcp.json
  collect(j.context_servers); // Zed
  if (j.mcp && typeof j.mcp === "object") collect((j.mcp as Record<string, unknown>).servers); // VS Code settings.json
  if (j["mcp.servers"]) collect(j["mcp.servers"]);
  if (j.projects && typeof j.projects === "object") {
    // Claude Code ~/.claude.json keeps per-project servers.
    for (const [proj, cfg] of Object.entries(j.projects as Record<string, unknown>)) {
      if (cfg && typeof cfg === "object") collect((cfg as Record<string, unknown>).mcpServers, `${proj}::`);
    }
  }
  return out;
}

export function readConfigFile(path: string, client = "custom"): ConfiguredServer[] {
  const text = readFileSync(path, "utf8");
  return extractServers(parseJsonc(text), client, resolve(path));
}

export function discoverServers(cwd?: string): { files: ConfigFile[]; servers: ConfiguredServer[]; errors: { file: string; message: string }[] } {
  const files = knownConfigFiles(cwd).filter((f) => existsSync(f.path));
  const servers: ConfiguredServer[] = [];
  const errors: { file: string; message: string }[] = [];
  for (const f of files) {
    try {
      servers.push(...readConfigFile(f.path, f.client));
    } catch (e) {
      errors.push({ file: f.path, message: (e as Error).message });
    }
  }
  return { files, servers, errors };
}

export function serverToTarget(s: ConfiguredServer): Target | undefined {
  if (s.command) return { kind: "stdio", command: s.command, args: s.args ?? [], env: s.env };
  if (s.url) return { kind: "http", url: s.url, headers: s.headers };
  return undefined;
}

/* ------------------------------------------------------------------ */
/* Config rules                                                        */
/* ------------------------------------------------------------------ */

const RUNNERS: Record<string, "npm" | "py"> = { npx: "npm", bunx: "npm", pnpx: "npm", uvx: "py", pipx: "py" };

function packageArg(command: string, args: string[]): { runner: "npm" | "py"; pkg: string } | undefined {
  const base = command.split(/[\\/]/).pop()!.replace(/\.(cmd|exe)$/i, "");
  let rest = args;
  let runner = RUNNERS[base];
  if (!runner && (base === "pnpm" || base === "yarn") && args[0] === "dlx") {
    runner = "npm";
    rest = args.slice(1);
  }
  if (!runner && base === "pipx" && args[0] === "run") rest = args.slice(1);
  if (!runner) return undefined;
  if (base === "pipx" && rest[0] === "run") rest = rest.slice(1);
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    if (a === "--package" || a === "-p" || a === "--from") return { runner, pkg: rest[i + 1] ?? "" };
    if (a.startsWith("--package=") || a.startsWith("--from=")) return { runner, pkg: a.split("=").slice(1).join("=") };
    if (a.startsWith("-")) continue;
    return { runner, pkg: a };
  }
  return undefined;
}

export function isPinned(runner: "npm" | "py", pkg: string): boolean {
  if (runner === "npm") {
    const at = pkg.lastIndexOf("@");
    if (at <= 0) return false; // no version (or only a scope)
    const v = pkg.slice(at + 1);
    return /^\d+\.\d+\.\d+/.test(v);
  }
  return /==\s*\d|@\d/.test(pkg);
}

const LOCAL_HOST_RE = /^(localhost|127\.\d+\.\d+\.\d+|\[::1\]|0\.0\.0\.0)$/i;

export function checkConfiguredServer(s: ConfiguredServer): Finding[] {
  const out: Finding[] = [];
  const where = `${s.client} › ${s.name}`;
  const push = (ruleId: string, severity: Severity, message: string, fix?: string) => out.push({ ruleId, severity, message, location: where, fix });

  // CFG001 plaintext secrets
  for (const [k, v] of Object.entries(s.env ?? {})) {
    const pattern = findSecret(v);
    if (pattern || (SECRET_KEY_NAME_RE.test(k) && !looksLikePlaceholder(v))) {
      push("CFG001", "high", `Plaintext secret in env ${k} = ${redact(v)}${pattern ? ` (${pattern.name})` : ""}.`, "Use your OS keychain or an env-var reference (e.g. ${env:VAR}) instead of storing the value in the config file.");
    }
  }
  for (const [k, v] of Object.entries(s.headers ?? {})) {
    if (findSecret(v) || (/(authorization|api[-_]?key|token)/i.test(k) && !looksLikePlaceholder(v.replace(/^Bearer\s+/i, "")))) {
      push("CFG001", "high", `Plaintext secret in header ${k} = ${redact(v)}.`, "Use OAuth or a secret reference instead of a static token in the config file.");
    }
  }
  for (const a of s.args ?? []) {
    const p = findSecret(a);
    if (p) push("CFG001", "high", `Plaintext secret in command arguments (${p.name}): ${redact(p.match)}. Arguments are also visible to other local processes.`, "Pass secrets via environment variables from a secret store.");
  }
  if (s.url) {
    const p = findSecret(s.url);
    if (p) push("CFG001", "high", `Secret embedded in URL (${p.name}).`);
  }

  // CFG002 unpinned packages
  if (s.command) {
    const pa = packageArg(s.command, s.args ?? []);
    if (pa && pa.pkg && !isPinned(pa.runner, pa.pkg)) {
      push("CFG002", "medium", `Package "${pa.pkg}" is not pinned to a version; every start may run new, unreviewed code.`, `Pin it, e.g. "${pa.runner === "npm" ? `${pa.pkg.replace(/@latest$/, "")}@1.2.3` : `${pa.pkg}==1.2.3`}".`);
    }
  }

  // CFG003 insecure transport
  if (s.url) {
    try {
      const u = new URL(s.url);
      if (u.protocol === "http:" && !LOCAL_HOST_RE.test(u.hostname)) {
        push("CFG003", "high", `Remote server uses unencrypted http:// (${u.host}).`, "Use https://.");
      }
    } catch {
      push("CFG003", "medium", `Invalid server URL: ${s.url}`);
    }
  }

  // CFG004 risky container flags
  const argv = [s.command ?? "", ...(s.args ?? [])];
  const base = (s.command ?? "").split(/[\\/]/).pop();
  if ((base === "docker" || base === "podman") && argv.includes("run")) {
    if (argv.includes("--privileged")) push("CFG004", "high", "Container runs with --privileged.", "Remove --privileged.");
    if (argv.some((a, i) => (a === "--network" && argv[i + 1] === "host") || a === "--network=host" || a === "--net=host")) push("CFG004", "medium", "Container uses host networking.");
    const mounts = argv.flatMap((a, i) => (a === "-v" || a === "--volume" ? [argv[i + 1] ?? ""] : a.startsWith("--volume=") ? [a.slice(9)] : a.startsWith("--mount") ? [argv[i + 1] ?? a] : []));
    for (const m of mounts) {
      const src = m.includes("src=") || m.includes("source=") ? (/(?:src|source)=([^,]+)/.exec(m)?.[1] ?? "") : m.split(":")[0];
      if (/^(\/|~|\$HOME|\$\{HOME\}|\/Users\/[^/]+|\/home\/[^/]+|C:\\\\?Users\\\\?[^\\]+)\/?$/i.test(src) || src === "/var/run/docker.sock") {
        push("CFG004", "high", `Container mounts a sensitive host path: ${src}.`, "Mount only the specific project directory the server needs.");
      }
    }
  }

  // CFG005 broad filesystem access
  if ((s.args ?? []).some((a) => /server-filesystem|mcp-server-filesystem|filesystem-mcp/i.test(a))) {
    const h = homedir();
    for (const a of s.args ?? []) {
      if (a === "/" || a === "~" || a === h || a === `${h}/` || /^[A-Z]:\\?$/i.test(a)) {
        push("CFG005", "high", `Filesystem server has access to an entire root or home directory (${a}).`, "Grant access only to the folders the agent needs.");
      }
    }
  }
  return out;
}

export const CONFIG_RULES = [
  { id: "CFG001", title: "Plaintext secrets in client config", category: "security" },
  { id: "CFG002", title: "Unpinned package versions (npx/uvx …)", category: "security" },
  { id: "CFG003", title: "Unencrypted remote transport", category: "security" },
  { id: "CFG004", title: "Risky container flags and mounts", category: "security" },
  { id: "CFG005", title: "Overly broad filesystem access", category: "security" },
] as const;
