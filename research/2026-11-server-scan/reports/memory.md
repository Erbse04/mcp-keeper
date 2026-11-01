# mcp-keeper report: memory-server

![mcp-keeper](https://img.shields.io/badge/mcp--keeper-A%20%C2%B7%20100-brightgreen)

| | |
|---|---|
| Target | `npx -y @modelcontextprotocol/server-memory@2.0.1` |
| Server | memory-server 2.0.1 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 9 tools · 0 prompts · 1 resources |
| Context cost | ≈1,119 tokens per request |
| Score | **100/100 (A)** |
| Scanned | 2026-11-01T11:33:45.767Z with mcp-keeper 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 100 | 100 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 0 medium · 🔵 0 low · ⚪ 0 info

No findings. 🎉

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `create_entities` | 214 | – |
| `create_relations` | 160 | – |
| `delete_relations` | 158 | destructive, idempotent |
| `add_observations` | 140 | – |
| `delete_observations` | 140 | destructive, idempotent |
| `delete_entities` | 91 | destructive, idempotent |
| `search_nodes` | 90 | read-only, idempotent |
| `open_nodes` | 82 | read-only, idempotent |
| `read_graph` | 44 | read-only, idempotent |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
