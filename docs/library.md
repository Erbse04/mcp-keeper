# Library API

`mcp-keeper` is an ES module with TypeScript types. Everything the CLI does is available as functions.

```bash
npm i mcp-keeper
```

## Scan a server

```ts
import { writeFile } from "node:fs/promises";
import { collectSnapshot, analyze, toMarkdown } from "mcp-keeper";

const snapshot = await collectSnapshot(
  { kind: "stdio", command: "node", args: ["build/index.js"], env: { API_KEY: "test" } },
  { timeoutMs: 30_000, onStderr: (line) => console.error(line) },
);

const result = analyze(snapshot, { disable: ["MCP005"] });
console.log(result.score, result.grade);
for (const f of result.findings) console.log(f.severity, f.ruleId, f.message);

await writeFile("report.md", toMarkdown(result));
```

Remote servers: `{ kind: "http", url, headers?, transport?: "auto" | "streamable-http" | "sse" }`.

Note that `env` for stdio targets is merged into a minimal environment — the MCP SDK’s default plus the proxy and CA variables from `proxyEnvironment()` — not into `process.env`.

## Main exports

| Export | Purpose |
|---|---|
| `collectSnapshot(target, options?)` | Connect, list tools/prompts/resources/templates, return a `ServerSnapshot`. Throws if the server cannot be reached. |
| `proxyEnvironment(env?)`, `PROXY_ENV_VARS` | The proxy and CA variables forwarded to stdio servers. |
| `analyze(snapshot, { disable?, extraFindings? })` | Run all rules and score them. Returns a `ScanResult`. |
| `RULES` | The server rules (`id`, `title`, `category`, `description`, `check()`). |
| `scoreFindings(findings)`, `gradeFor(score)`, `SEVERITY_WEIGHT` | The [scoring](scoring.md) logic on its own. |
| `createBaseline`, `compareBaseline`, `loadBaseline`, `saveBaseline` | [Baselines](baselines.md). `compareBaseline()` returns MCP010 findings to pass as `extraFindings`. |
| `discoverServers`, `knownConfigFiles`, `readConfigFile`, `extractServers`, `checkConfiguredServer`, `serverToTarget`, `CONFIG_RULES` | The [config audit](config-audit.md). |
| `toText`, `toMarkdown`, `toJson`, `toSarif`, `toBadge`, `badgeUrl` | Report formats. |
| `findSecret`, `SECRET_PATTERNS` | The secret detector used by MCP003 and CFG001. |
| `VERSION` | Package version. |

Types such as `ServerSnapshot`, `ScanResult`, `Finding`, `Severity`, `Target` and `Baseline` are exported too.

## Baseline in code

```ts
import { collectSnapshot, analyze, loadBaseline, compareBaseline } from "mcp-keeper";

const snapshot = await collectSnapshot({ kind: "http", url: "https://mcp.example.com/mcp" });
const baseline = loadBaseline("mcp-baseline.json");
const result = analyze(snapshot, { extraFindings: baseline ? compareBaseline(baseline, snapshot) : [] });
```

## Stability

Until 1.0, the public API may change in minor versions; changes are listed in the [changelog](../CHANGELOG.md). The JSON report has the shape of `ScanResult`.
