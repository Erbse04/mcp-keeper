# mcp-probe report: elasticsearch-mcp

![mcp-probe](https://img.shields.io/badge/mcp--probe-A%20%C2%B7%2098-brightgreen)

| | |
|---|---|
| Target | `npx -y @elastic/mcp-server-elasticsearch@0.3.1` |
| Server | elasticsearch-mcp 0.3.1 |
| Protocol | 2025-06-18 (stdio) |
| Exposes | 4 tools · 0 prompts · 0 resources |
| Context cost | ≈446 tokens per request |
| Score | **98/100 (A)** |
| Scanned | 2026-11-01T11:13:32.123Z with mcp-probe 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 100 | 100 | 98 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 0 medium · 🔵 1 low · ⚪ 4 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🔵 low | MCP302 | Server negotiated protocol 2025-06-18; latest supported by this checker is 2025-11-25. |  | Update your MCP SDK. |
| ⚪ info | MCP004 | Tool "list_indices" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:list_indices › annotations` |  |
| ⚪ info | MCP004 | Tool "get_mappings" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get_mappings › annotations` |  |
| ⚪ info | MCP004 | Tool "search" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:search › annotations` |  |
| ⚪ info | MCP004 | Tool "get_shards" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get_shards › annotations` |  |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `search` | 194 | – |
| `get_mappings` | 88 | – |
| `list_indices` | 87 | – |
| `get_shards` | 77 | – |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
