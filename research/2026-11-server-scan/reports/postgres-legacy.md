# mcp-keeper report: example-servers/postgres

![mcp-keeper](https://img.shields.io/badge/mcp--keeper-A%20%C2%B7%2094-brightgreen)

| | |
|---|---|
| Target | `npx -y @modelcontextprotocol/server-postgres@0.6.2 postgresql://localhost/none` |
| Server | example-servers/postgres 0.1.0 |
| Protocol | 2024-11-05 (stdio) |
| Exposes | 1 tools · 0 prompts · 0 resources |
| Context cost | ≈33 tokens per request |
| Score | **94/100 (A)** |
| Scanned | 2026-11-01T11:33:45.792Z with mcp-keeper 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 100 | 98 | 96 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 0 medium · 🔵 3 low · ⚪ 1 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🔵 low | MCP201 | Tool "query": 1 parameter(s) without description (sql). | `tool:query › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP302 | Server negotiated protocol 2024-11-05; latest supported by this checker is 2025-11-25. |  | Update your MCP SDK. |
| 🔵 low | MCP302 | resources/list failed: MCP error -32603: connect ECONNREFUSED 127.0.0.1:5432 (the server may need credentials or a reachable backend to list this). |  |  |
| ⚪ info | MCP004 | Tool "query" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:query › annotations` |  |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `query` | 33 | – |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
