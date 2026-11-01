# mcp-guard report: mcp-servers/everything

![mcp-guard](https://img.shields.io/badge/mcp--guard-A%20%C2%B7%2098-brightgreen)

| | |
|---|---|
| Target | `npx -y @modelcontextprotocol/server-everything@2.1.0` |
| Server | mcp-servers/everything 2.1.0 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 16 tools · 4 prompts · 9 resources |
| Context cost | ≈2,727 tokens per request |
| Score | **98/100 (A)** |
| Scanned | 2026-11-01T11:26:53.812Z with mcp-guard 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 100 | 98 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 0 medium · 🔵 1 low · ⚪ 0 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🔵 low | MCP201 | Tool "get-resource-reference": 1 parameter(s) without description (resourceType). | `tool:get-resource-reference › inputSchema.properties` | Describe format, units and allowed values for each parameter. |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `gzip-file-as-resource` | 274 | idempotent, open-world |
| `get-header-params` | 178 | read-only, idempotent |
| `trigger-resource-update` | 142 | read-only |
| `trigger-log-messages` | 135 | read-only, idempotent |
| `trigger-list-changed` | 130 | read-only |
| `get-annotated-message` | 126 | read-only, idempotent |
| `get-env` | 112 | read-only, idempotent |
| `trigger-long-running-operation` | 102 | read-only, idempotent |
| `toggle-subscriber-updates` | 97 | – |
| `get-resource-reference` | 95 | read-only, idempotent |
| `toggle-simulated-logging` | 92 | – |
| `get-structured-content` | 91 | read-only, idempotent |
| `get-resource-links` | 87 | read-only, idempotent |
| `get-sum` | 74 | read-only, idempotent |
| `echo` | 62 | read-only, idempotent |
| `get-tiny-image` | 45 | read-only, idempotent |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
