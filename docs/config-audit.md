# Config audit

`mcp-keeper config` checks the MCP configuration of your AI clients — the files that decide which servers start, with which arguments, secrets and permissions. It reads files only; nothing is started unless you add `--deep`.

```bash
mcp-keeper config                                # all known locations that exist
mcp-keeper config ./.mcp.json ./.vscode/mcp.json # specific files
mcp-keeper config --deep                         # plus a full scan of every enabled server
mcp-keeper config -f sarif -o config.sarif       # for code scanning
```

## Discovered files

`~` is your home directory. *App data* is `~/Library/Application Support` on macOS, `%APPDATA%` on Windows and `~/.config` on Linux. Project files are looked up in the current directory.

| Client | File |
|---|---|
| Claude Desktop | *App data*`/Claude/claude_desktop_config.json` |
| Claude Code (user) | `~/.claude.json` — including per-project servers |
| Claude Code (project) | `./.mcp.json` |
| Cursor (user) | `~/.cursor/mcp.json` |
| Cursor (project) | `./.cursor/mcp.json` |
| VS Code (user) | *App data*`/Code/User/mcp.json` and `…/settings.json` |
| VS Code (project) | `./.vscode/mcp.json` |
| Windsurf | `~/.codeium/windsurf/mcp_config.json` |
| Gemini CLI | `~/.gemini/settings.json` |
| Zed | `~/.config/zed/settings.json` |
| LM Studio | `~/.lmstudio/mcp.json` |

Files you pass explicitly can use any of these shapes: `mcpServers` (Claude, Cursor, Windsurf, Gemini, LM Studio), `servers` (VS Code `mcp.json`), `mcp.servers` (VS Code `settings.json`), `context_servers` (Zed) and `projects.*.mcpServers` (Claude Code). JSON with comments and trailing commas is accepted. Entries marked `"disabled": true` or `"enabled": false` are checked but skipped by `--deep`.

## Checks

| Rule | Severity | Triggered by |
|---|---|---|
| CFG001 | high | A value in `env`, `headers`, `args` or the URL matches a known token format, or an `env`/header key looks like a secret (`*_API_KEY`, `*TOKEN*`, `*PASSWORD*`, `Authorization` …) and the value is not a placeholder or reference such as `${env:VAR}`. Secrets in `args` are also visible to other local processes. |
| CFG002 | medium | `npx`, `bunx`, `pnpx`, `pnpm dlx`, `yarn dlx`, `uvx` or `pipx run` without an exact version (`pkg@1.2.3`, `pkg==1.2.3`). Every start may run new, unreviewed code. |
| CFG003 | high | `http://` to anything other than `localhost`, `127.x.x.x`, `[::1]` or `0.0.0.0`. |
| CFG004 | high / medium | `docker run` / `podman run` with `--privileged` (high), host networking (medium), or mounting `/`, the home directory or `/var/run/docker.sock` (high). |
| CFG005 | high | A filesystem server given `/`, `~`, the home directory or a whole drive. |

All secret values are redacted in every output format.

## Fixing findings

- **Secrets:** use the client’s secret or input mechanism (e.g. VS Code `inputs`, `${env:VAR}` references) or an OS keychain instead of literal values, then rotate any key that was ever committed.
- **Unpinned packages:** write the exact version you reviewed, e.g. `"args": ["-y", "@modelcontextprotocol/server-memory@2.0.1"]`, and combine it with a [baseline](baselines.md).
- **Containers and filesystem access:** mount or grant only the project directory the server actually needs.
