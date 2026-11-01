# MCP server scan, 1 November 2026

41 popular MCP servers scanned with mcp-keeper 0.1.0 (40 connected, 39 listed tools).

- `servers.json` — servers, exact versions and the placeholder credentials used
- `run.mjs` — runs the scan (6 in parallel); `reanalyze.mjs` — re-applies the rules to saved snapshots offline
- `snapshots/` — everything each server exposed (tools, schemas, prompts, resources)
- `reports/` — per-server JSON and Markdown reports
- `results.csv`, `summary.json` — one row per server

Not scanned: Stripe (`@stripe/mcp` proxies to a remote service that was unreachable from the test environment). Supabase needs a real access token to list its tools and was excluded from rankings.
Token counts are estimates (~4 characters per token). Pattern checks cannot prove a server is safe.
