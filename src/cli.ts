#!/usr/bin/env node
import { Command, Option } from "commander";
import { writeFileSync, readFileSync } from "node:fs";
import { collectSnapshot, type Target } from "./connect.js";
import { analyze } from "./score.js";
import { compareBaseline, loadBaseline, saveBaseline } from "./baseline.js";
import { toText, toMarkdown, toJson, toSarif, toBadge, configToText, configToMarkdown } from "./report.js";
import { RULES } from "./rules.js";
import { CONFIG_RULES, checkConfiguredServer, discoverServers, readConfigFile, serverToTarget, type ConfiguredServer } from "./config.js";
import { SEVERITY_ORDER, type Finding, type ScanResult, type ServerSnapshot, type Severity } from "./types.js";
import { VERSION } from "./version.js";

const collect = (v: string, prev: string[]) => [...prev, v];

function parseKeyValues(list: string[], sep: string, what: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const item of list) {
    const i = item.indexOf(sep);
    if (i <= 0) throw new Error(`Invalid ${what} "${item}", expected NAME${sep}VALUE`);
    out[item.slice(0, i).trim()] = item.slice(i + 1).trim();
  }
  return out;
}

function failsThreshold(findings: Finding[], failOn?: string) {
  if (!failOn || failOn === "none") return false;
  const limit = SEVERITY_ORDER.indexOf(failOn as Severity);
  return findings.some((f) => SEVERITY_ORDER.indexOf(f.severity) <= limit);
}

function emit(output: string | undefined, content: string) {
  if (output) writeFileSync(output, content);
  else process.stdout.write(content.endsWith("\n") ? content : content + "\n");
}

function render(r: ScanResult, format: string, verbose: boolean, sarifArtifact: string) {
  switch (format) {
    case "md":
    case "markdown":
      return toMarkdown(r);
    case "json":
      return toJson(r);
    case "sarif":
      return toSarif(r.findings, sarifArtifact);
    default:
      return toText(r, { verbose });
  }
}

const program = new Command();
program
  .name("mcp-probe")
  .description("Security, token-cost and quality checks for MCP servers and client configs.")
  .version(VERSION);

program
  .command("scan")
  .description("Connect to an MCP server and check what it exposes to the model.")
  .argument("[command...]", "command that starts a stdio server, e.g. -- npx -y @modelcontextprotocol/server-memory")
  .option("-u, --url <url>", "connect to a remote server (Streamable HTTP, falls back to SSE)")
  .option("-H, --header <header>", "HTTP header 'Name: value' (repeatable)", collect, [])
  .option("-e, --env <var>", "environment variable NAME=value for stdio servers (repeatable)", collect, [])
  .option("--cwd <dir>", "working directory for stdio servers")
  .option("--inherit-env", "pass the full current environment to stdio servers (default: only a minimal safe set, like MCP clients do)")
  .option("--snapshot <file>", "analyze a previously saved snapshot JSON instead of connecting")
  .option("--save-snapshot <file>", "write the raw snapshot (tools, prompts, …) to a file")
  .addOption(new Option("-f, --format <format>", "output format").choices(["text", "md", "markdown", "json", "sarif"]).default("text"))
  .option("-o, --output <file>", "write the report to a file instead of stdout")
  .option("--badge <file>", "also write a shields.io endpoint badge JSON")
  .option("--report-md <file>", "also write a Markdown report")
  .option("--report-json <file>", "also write a JSON report")
  .option("--report-sarif <file>", "also write a SARIF report")
  .option("--baseline <file>", "compare against a pinned baseline and flag changed tools (rug-pull detection)")
  .option("--update-baseline", "write/overwrite the baseline file with the current state")
  .addOption(new Option("--fail-on <severity>", "exit with code 1 if a finding of this severity or worse exists").choices([...SEVERITY_ORDER, "none"]).default("none"))
  .option("--min-score <n>", "exit with code 1 if the score is below n", (v) => parseInt(v, 10))
  .option("--disable <ids>", "comma-separated rule ids to skip", (v) => v.split(",").map((s) => s.trim()))
  .option("--timeout <ms>", "connection and request timeout", (v) => parseInt(v, 10), 30_000)
  .option("--sarif-artifact <path>", "file the SARIF results should point to", "mcp.json")
  .option("--show-stderr", "stream the server's stderr")
  .option("-v, --verbose", "include informational findings and fixes in text output")
  .action(async (command: string[], o) => {
    let snapshot: ServerSnapshot;
    try {
      if (o.snapshot) {
        snapshot = JSON.parse(readFileSync(o.snapshot, "utf8")) as ServerSnapshot;
      } else {
        let target: Target;
        if (o.url) target = { kind: "http", url: o.url, headers: parseKeyValues(o.header, ":", "header") };
        else if (command.length) target = { kind: "stdio", command: command[0], args: command.slice(1), env: { ...(o.inheritEnv ? (process.env as Record<string, string>) : {}), ...parseKeyValues(o.env, "=", "env") }, cwd: o.cwd };
        else {
          program.commands.find((c) => c.name() === "scan")!.help({ error: true });
        }
        snapshot = await collectSnapshot(target!, {
          timeoutMs: o.timeout,
          onStderr: o.showStderr ? (l) => process.stderr.write(`[server] ${l}\n`) : undefined,
        });
      }
    } catch (e) {
      process.stderr.write(`mcp-probe: could not connect: ${(e as Error).message}\n`);
      process.exit(2);
    }
    if (o.saveSnapshot) writeFileSync(o.saveSnapshot, JSON.stringify(snapshot, null, 2) + "\n");
    const extra: Finding[] = [];
    if (o.baseline && !o.updateBaseline) {
      const b = loadBaseline(o.baseline);
      if (b) extra.push(...compareBaseline(b, snapshot));
      else process.stderr.write(`mcp-probe: baseline ${o.baseline} not found — run with --update-baseline to create it.\n`);
    }
    if (o.baseline && o.updateBaseline) {
      saveBaseline(o.baseline, snapshot);
      process.stderr.write(`mcp-probe: baseline written to ${o.baseline}\n`);
    }
    const result = analyze(snapshot, { disable: o.disable, extraFindings: extra });
    emit(o.output, render(result, o.format, !!o.verbose, o.sarifArtifact));
    if (o.badge) writeFileSync(o.badge, toBadge(result));
    if (o.reportMd) writeFileSync(o.reportMd, toMarkdown(result));
    if (o.reportJson) writeFileSync(o.reportJson, toJson(result));
    if (o.reportSarif) writeFileSync(o.reportSarif, toSarif(result.findings, o.sarifArtifact));
    const failed = failsThreshold(result.findings, o.failOn) || (Number.isFinite(o.minScore) && result.score < o.minScore);
    process.exit(failed ? 1 : 0);
  });

program
  .command("config")
  .description("Audit MCP client config files (Claude, Cursor, VS Code, Windsurf, …) for plaintext secrets, unpinned packages and risky settings.")
  .argument("[files...]", "config files to check (default: auto-discover known client configs)")
  .addOption(new Option("-f, --format <format>", "output format").choices(["text", "md", "markdown", "json", "sarif"]).default("text"))
  .option("-o, --output <file>", "write the report to a file")
  .option("--deep", "also connect to every configured server and scan it (starts the servers!)")
  .option("--timeout <ms>", "per-server timeout for --deep", (v) => parseInt(v, 10), 30_000)
  .addOption(new Option("--fail-on <severity>", "exit 1 if a finding of this severity or worse exists").choices([...SEVERITY_ORDER, "none"]).default("none"))
  .action(async (files: string[], o) => {
    let servers: ConfiguredServer[] = [];
    let scanned: string[] = [];
    if (files.length) {
      for (const f of files) {
        try {
          servers.push(...readConfigFile(f));
          scanned.push(f);
        } catch (e) {
          process.stderr.write(`mcp-probe: cannot read ${f}: ${(e as Error).message}\n`);
        }
      }
    } else {
      const d = discoverServers();
      servers = d.servers;
      scanned = d.files.map((f) => f.path);
      for (const e of d.errors) process.stderr.write(`mcp-probe: cannot read ${e.file}: ${e.message}\n`);
    }
    const findings = new Map<ConfiguredServer, Finding[]>();
    const deep: { server: string; result?: ScanResult; error?: string }[] = [];
    for (const s of servers) {
      findings.set(s, checkConfiguredServer(s));
      if (o.deep && !s.disabled) {
        const target = serverToTarget(s);
        if (!target) continue;
        try {
          const snap = await collectSnapshot(target, { timeoutMs: o.timeout });
          deep.push({ server: s.name, result: analyze(snap) });
        } catch (e) {
          deep.push({ server: s.name, error: (e as Error).message.split("\n")[0] });
        }
      }
    }
    const all = [...findings.values()].flat();
    let out: string;
    if (o.format === "json") out = toJson({ files: scanned, servers: servers.map((s) => ({ ...s, env: s.env ? Object.keys(s.env) : undefined, headers: s.headers ? Object.keys(s.headers) : undefined, findings: findings.get(s) })), deep });
    else if (o.format === "sarif") out = toSarif(all, scanned[0] ?? "mcp.json");
    else if (o.format === "md" || o.format === "markdown") {
      out = configToMarkdown(servers, findings, scanned);
      for (const d of deep) out += `\n---\n\n${d.result ? toMarkdown(d.result) : `## ${d.server}\n\nCould not connect: ${d.error}\n`}`;
    } else {
      out = configToText(servers, findings, scanned);
      for (const d of deep) out += `\n\n${d.result ? toText(d.result) : `${d.server}: could not connect: ${d.error}`}`;
    }
    emit(o.output, out);
    const deepFindings = deep.flatMap((d) => d.result?.findings ?? []);
    process.exit(failsThreshold([...all, ...deepFindings], o.failOn) ? 1 : 0);
  });

program
  .command("rules")
  .description("List all checks.")
  .action(() => {
    for (const r of RULES) console.log(`${r.id}  [${r.category}]  ${r.title}\n        ${r.description}\n`);
    console.log(`MCP010  [security]  Changed since baseline (rug pull)\n        With --baseline, any change to a tool's description, schema or annotations since the pinned state is flagged.\n`);
    for (const r of CONFIG_RULES) console.log(`${r.id}  [${r.category}]  ${r.title}`);
  });

program.parseAsync().catch((e) => {
  process.stderr.write(`mcp-probe: ${(e as Error).message}\n`);
  process.exit(2);
});
