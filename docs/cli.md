# CLI reference

```text
mcp-keeper <command> [options]

Commands:
  scan [options] [command...]   Connect to an MCP server and check what it exposes to the model
  config [options] [files...]   Audit MCP client config files
  rules                         List all checks
```

`mcp-keeper --version` prints the version, `mcp-keeper <command> --help` the options of a command.

## `mcp-keeper scan`

Connects to one server, lists its tools, prompts, resources and resource templates, and analyzes them. Exactly one source is required: a command after `--`, `--url`, or `--snapshot`.

```bash
mcp-keeper scan [options] -- <command> [args...]   # stdio server
mcp-keeper scan [options] --url <url>              # remote server
mcp-keeper scan [options] --snapshot <file>        # saved snapshot, offline
```

### Connection

| Option | Description |
|---|---|
| `-- <command…>` | Command that starts a stdio server. Everything after `--` is passed through unchanged. |
| `-u, --url <url>` | Remote server. Streamable HTTP is tried first, then legacy SSE. |
| `-H, --header <header>` | HTTP header `Name: value` for remote servers. Repeatable. |
| `-e, --env <NAME=value>` | Environment variable for stdio servers. Repeatable. |
| `--inherit-env` | Pass your full environment to the stdio server — only for servers you trust. By default only a minimal set is passed, like MCP clients do: the MCP SDK’s default (`PATH`, `HOME`, `USER`, `SHELL`, `TERM`, …) plus proxy and CA variables (`HTTP_PROXY`, `HTTPS_PROXY`, `NO_PROXY`, `ALL_PROXY` in both cases, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`, `REQUESTS_CA_BUNDLE`). Proxy URLs that contain a user name or password are not forwarded; pass them with `-e` if the server needs them. |
| `--cwd <dir>` | Working directory for the stdio server. |
| `--timeout <ms>` | Connection and request timeout. Default `30000`. |
| `--show-stderr` | Stream the server’s stderr, prefixed with `[server]`. Useful when a server fails to start. |

### Output

| Option | Description |
|---|---|
| `-f, --format <format>` | `text` (default), `md` / `markdown`, `json`, `sarif`. |
| `-o, --output <file>` | Write the report to a file instead of stdout. |
| `-v, --verbose` | Include informational findings and suggested fixes in text output. |
| `--report-md <file>` | Additionally write a Markdown report. |
| `--report-json <file>` | Additionally write a JSON report. |
| `--report-sarif <file>` | Additionally write a SARIF 2.1.0 report. |
| `--sarif-artifact <path>` | File that SARIF results point to (code scanning needs a path in the repository). Default `mcp.json`. |
| `--badge <file>` | Write a [shields.io endpoint badge](https://shields.io/badges/endpoint-badge) JSON. |
| `--save-snapshot <file>` | Write the raw snapshot — everything the server exposed — as JSON. |
| `--snapshot <file>` | Analyze a saved snapshot instead of connecting. Nothing is started. |

The extra `--report-*` options let you show a text report in the console and keep Markdown, JSON and SARIF files from the same run.

### Baselines

| Option | Description |
|---|---|
| `--baseline <file>` | Compare against a pinned baseline and report changes as MCP010. If the file does not exist, a hint is printed and the scan continues. |
| `--update-baseline` | Write (or overwrite) the baseline file with the current state instead of comparing. |

See [baselines.md](baselines.md).

### Thresholds and rules

| Option | Description |
|---|---|
| `--fail-on <severity>` | Exit `1` if there is a finding of this severity or worse: `critical`, `high`, `medium`, `low`, `info`, `none`. Default `none`. |
| `--min-score <n>` | Exit `1` if the overall score is below `n`. |
| `--disable <ids>` | Comma-separated rule IDs to skip, e.g. `MCP005,MCP201`. |

## `mcp-keeper config`

Reads MCP client config files and checks every configured server entry. Without arguments, all [known config locations](config-audit.md#discovered-files) that exist are read.

```bash
mcp-keeper config [options] [files...]
```

| Option | Description |
|---|---|
| `-f, --format <format>` | `text` (default), `md` / `markdown`, `json`, `sarif`. |
| `-o, --output <file>` | Write the report to a file. |
| `--deep` | Also start or connect to every enabled server and run the full `scan` analysis on it. **This starts the servers.** |
| `--timeout <ms>` | Per-server timeout for `--deep`. Default `30000`. |
| `--fail-on <severity>` | Exit `1` if a config finding — or, with `--deep`, a server finding — of this severity or worse exists. Default `none`. |

The JSON output lists env and header **names** only, never their values.

## `mcp-keeper rules`

Prints every rule ID with category, title and description. The full explanations are in [rules.md](rules.md).

## Exit codes

| Code | Meaning |
|---|---|
| `0` | Finished, thresholds passed (or none set) |
| `1` | `--fail-on` or `--min-score` threshold failed |
| `2` | Could not start or connect to the server, or could not read the snapshot |

If the server does not answer in time, the error lists what to try — for `npx`/`uvx` servers usually a longer `--timeout`, because the first start downloads the package.

Invalid or missing arguments print the help and exit with `1`, so in CI check the job log if a run fails unexpectedly.

## Examples

```bash
# A server that needs an API key
mcp-keeper scan -e GITHUB_TOKEN="$GITHUB_TOKEN" -- npx -y some-github-mcp-server@1.2.3

# Python server via uvx
mcp-keeper scan -- uvx mcp-server-fetch

# Docker
mcp-keeper scan -- docker run -i --rm mcp/time

# Remote server with a token, Markdown report
mcp-keeper scan --url https://mcp.example.com/mcp -H "Authorization: Bearer $TOKEN" -f md -o report.md

# Console output plus all report files in one run
mcp-keeper scan --report-md r.md --report-json r.json --report-sarif r.sarif --badge badge.json -- node build/index.js

# Debug a server that does not start or times out (the error message lists hints)
mcp-keeper scan --show-stderr --timeout 60000 -- node build/index.js
```
