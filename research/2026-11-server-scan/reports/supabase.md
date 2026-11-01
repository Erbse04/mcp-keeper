# mcp-probe report: supabase

![mcp-probe](https://img.shields.io/badge/mcp--probe-A%20%C2%B7%2098-brightgreen)

| | |
|---|---|
| Target | `npx -y @supabase/mcp-server-supabase@0.15.0 --access-token=dummy` |
| Server | supabase 0.15.0 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 0 tools · 0 prompts · 0 resources |
| Context cost | ≈329 tokens per request |
| Score | **98/100 (A)** |
| Scanned | 2026-11-01T11:13:32.213Z with mcp-probe 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 100 | 100 | 98 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 0 medium · 🔵 1 low · ⚪ 0 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🔵 low | MCP302 | tools/list failed: MCP error -32603: fetch failed (the server may need credentials or a reachable backend to list this). |  |  |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
