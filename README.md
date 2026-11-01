# mcp-keeper

**Security, token-cost and quality checks for MCP servers — in one command.**

`mcp-keeper` connects to any [Model Context Protocol](https://modelcontextprotocol.io) server, reads everything it exposes to the model (tools, parameter schemas, prompts, resources, server instructions) and checks it for:

- 🛑 **Tool poisoning & prompt injection** – instructions hidden in descriptions, “don’t tell the user”, references to `~/.ssh`, tool shadowing, silent BCCs
- 👻 **Invisible text** – Unicode tag characters (“ASCII smuggling”, decoded for you), zero-width and bidi characters, whitespace padding
- 🔑 **Leaked secrets** – API keys and tokens inside model-visible text
- ⚠️ **Missing or misleading safety annotations** – a `delete_*` tool marked read-only, exec tools without hints
- 💸 **Context cost** – estimated tokens per request, per tool, and too many tools
- 🧩 **Quality & spec compliance** – missing descriptions, broken input schemas, invalid or duplicate tool names, entries the official SDK rejects
- 🪤 **Rug pulls** – pin a baseline and get alerted when a server silently changes its tools

It also audits the MCP **config files** of Claude Desktop, Claude Code, Cursor, VS Code, Windsurf, Gemini CLI, Zed and LM Studio for plaintext secrets, unpinned `npx`/`uvx` packages, `http://` endpoints and risky Docker flags.

```text
$ npx mcp-keeper scan -- npx -y @modelcontextprotocol/server-memory

mcp-keeper 0.1.0  ·  npx -y @modelcontextprotocol/server-memory
memory-server 1.0.0  ·  protocol 2025-11-25  ·  stdio  ·  9 tools, 0 prompts, 1 resources  ·  ≈1,108 tokens

  Score 92/100  (A)    security 100  ·  efficiency 100  ·  quality 92  ·  compliance 100

  LOW      MCP201  Tool "create_entities": 1 parameter(s) without description (entities).
           at tool:create_entities › inputSchema.properties
  …
```

No account, no telemetry, nothing leaves your machine except the connection to the server you point it at.

## Install

```bash
npx mcp-keeper --help          # run without installing
npm i -g mcp-keeper            # or install globally (Node.js ≥ 18)
```

## Usage

### Scan a local (stdio) server

Everything after `--` is the command that starts the server:

```bash
mcp-keeper scan -- npx -y @modelcontextprotocol/server-filesystem ~/Documents
mcp-keeper scan -e API_KEY=xyz -- uvx my-mcp-server
mcp-keeper scan -- node ./build/index.js
```

Like MCP clients, `mcp-keeper` passes only a minimal environment (PATH, HOME, …) to the server. Use `-e NAME=value` for what the server needs, or `--inherit-env` to pass your full environment (e.g. behind a corporate proxy) — only for servers you trust, since that includes every secret in your shell.

### Scan a remote server

```bash
mcp-keeper scan --url https://mcp.example.com/mcp
mcp-keeper scan --url https://mcp.example.com/mcp -H "Authorization: Bearer $TOKEN"
```

Streamable HTTP is tried first, then legacy SSE.

### Audit your client configs

```bash
mcp-keeper config                       # auto-discovers Claude, Cursor, VS Code, Windsurf, … configs
mcp-keeper config ./.cursor/mcp.json    # specific files (JSON with comments is fine)
mcp-keeper config --deep                # additionally start and scan every configured server
```

### Output formats

```bash
mcp-keeper scan -f md -o report.md -- …      # Markdown report incl. badge and per-tool token table
mcp-keeper scan -f json -- …                 # full machine-readable result
mcp-keeper scan -f sarif -o mcp.sarif -- …   # GitHub code scanning
mcp-keeper scan --badge badge.json -- …      # shields.io endpoint badge
mcp-keeper scan --save-snapshot s.json -- …  # raw snapshot of everything the server exposed
mcp-keeper scan --snapshot s.json            # re-analyze a snapshot offline
```

### Rug-pull protection (baselines)

```bash
mcp-keeper scan --baseline mcp-baseline.json --update-baseline -- npx -y some-server@1.4.0   # after you reviewed it
mcp-keeper scan --baseline mcp-baseline.json -- npx -y some-server@1.4.0                     # later / in CI
```

Any change to a tool’s description, schema or annotations, or to the server instructions, is reported as **high**.

### Use in CI

Exit codes: `0` passed · `1` threshold failed · `2` could not connect.

```bash
mcp-keeper scan --fail-on high --min-score 80 -- node build/index.js
```

GitHub Action:

```yaml
- uses: Erbse04/mcp-keeper@v0
  with:
    command: node build/index.js
    fail-on: high
    min-score: 80
```

The action prints a Markdown report into the job summary and can upload SARIF to code scanning (see [`action.yml`](action.yml)).

## Badge

Show your score in your README:

```bash
mcp-keeper scan -f md -- node build/index.js | grep -m1 'img.shields.io'
```

or commit `badge.json` from `--badge` and use `https://img.shields.io/endpoint?url=<raw-url-of-badge.json>`.

## Scoring

Each finding deducts points by severity — critical 40, high 15, medium 6, low 2, info 0. Per rule, low findings count for at most 10 points and all non-critical findings for at most 30, so many small style issues cannot outweigh one real problem. Any critical finding caps the score at 40 (F); tools that the official SDK rejects (which breaks the whole server in many clients) cap it at 59 (D).
Grades: **A** ≥ 90 · **B** ≥ 80 · **C** ≥ 65 · **D** ≥ 50 · **F** below.
There are separate scores for *security*, *efficiency*, *quality* and *compliance*.

## Rules

| ID | Category | Check |
|---|---|---|
| MCP001 | security | Prompt-injection / tool-poisoning patterns in any model-visible text |
| MCP002 | security | Invisible characters, Unicode tag smuggling, bidi overrides, whitespace padding |
| MCP003 | security | Secrets in model-visible text |
| MCP004 | security | Missing or misleading `readOnlyHint` / `destructiveHint` annotations |
| MCP005 | security | Inventory of high-power tools (code execution, arbitrary URLs) — informational |
| MCP010 | security | Changed since baseline (rug pull) |
| MCP101 | efficiency | Token cost of tool definitions, number of tools |
| MCP201 | quality | Missing/short/overlong tool and parameter descriptions |
| MCP202 | quality | Input schema structure |
| MCP301 | compliance | Tool name characters, length, duplicates |
| MCP302 | compliance | Protocol version, server metadata, entries that fail official schema validation |
| CFG001 | config | Plaintext secrets in env, headers, args, URLs |
| CFG002 | config | Unpinned `npx` / `uvx` / `pnpm dlx` packages |
| CFG003 | config | `http://` to remote hosts |
| CFG004 | config | `--privileged`, host network, mounting `/`, `$HOME` or the Docker socket |
| CFG005 | config | Filesystem servers with access to `/` or the whole home directory |

Details: [`docs/rules.md`](docs/rules.md) · `mcp-keeper rules` · disable with `--disable MCP005,MCP201`.

## Limits — please read

- Pattern-based checks can have false positives and **cannot prove a server is safe**. A clean report means “no known red flags”, not “audited”.
- `mcp-keeper` only looks at what a server *declares*. It does not call tools and cannot see what the server code does at runtime.
- Token counts are estimates (~4 characters per token); real tokenizers differ by model.
- `scan` and `config --deep` **start** the servers you point them at. Only scan code you are willing to run, ideally in a container or VM.

## Library use

```ts
import { collectSnapshot, analyze, toMarkdown } from "mcp-keeper";

const snapshot = await collectSnapshot({ kind: "stdio", command: "node", args: ["build/index.js"] });
const result = analyze(snapshot);
console.log(result.score, result.grade, result.findings);
```

## Contributing

Found a false positive or a poisoning pattern we miss? Please open an issue with the (redacted) description text. New rules need a test in `test/`.

```bash
npm install && npm test
```

## License

MIT © [Tim Erben](https://www.tim-erben.de)
