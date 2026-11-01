# mcp-probe report: n8n-documentation-mcp

![mcp-probe](https://img.shields.io/badge/mcp--probe-A%20%C2%B7%2098-brightgreen)

| | |
|---|---|
| Target | `npx -y n8n-mcp@2.99.2` |
| Server | n8n-documentation-mcp 2.99.2 |
| Protocol | 2025-03-26 (stdio) |
| Exposes | 7 tools · 0 prompts · 5 resources |
| Context cost | ≈2,628 tokens per request |
| Score | **98/100 (A)** |
| Scanned | 2026-11-01T11:13:32.190Z with mcp-probe 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 100 | 100 | 98 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 0 medium · 🔵 1 low · ⚪ 0 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🔵 low | MCP302 | Server negotiated protocol 2025-03-26; latest supported by this checker is 2025-11-25. |  | Update your MCP SDK. |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `search_templates` | 664 | read-only, idempotent |
| `get_node` | 513 | read-only, idempotent |
| `search_nodes` | 301 | read-only, idempotent |
| `validate_node` | 282 | read-only, idempotent |
| `validate_workflow` | 263 | read-only, idempotent |
| `tools_documentation` | 156 | read-only, idempotent |
| `get_template` | 133 | read-only, idempotent |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
