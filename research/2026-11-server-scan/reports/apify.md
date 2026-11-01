# mcp-guard report: apify-mcp-server

![mcp-guard](https://img.shields.io/badge/mcp--guard-A%20%C2%B7%2098-brightgreen)

| | |
|---|---|
| Target | `npx -y @apify/actors-mcp-server@0.20.0` |
| Server | apify-mcp-server 0.20.0 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 12 tools · 0 prompts · 5 resources |
| Context cost | ≈6,691 tokens per request |
| Score | **98/100 (A)** |
| Scanned | 2026-11-01T11:26:53.769Z with mcp-guard 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 98 | 100 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 0 medium · 🔵 1 low · ⚪ 0 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🔵 low | MCP101 | Tool "search-actors" alone costs ≈1,372 tokens. | `tool:search-actors` | Trim the description and nested schema; move long docs into a resource. |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `search-actors` | 1,372 | read-only, idempotent |
| `call-actor` | 877 | destructive, open-world |
| `fetch-actor-details` | 713 | read-only, idempotent |
| `search-apify-docs` | 607 | read-only, idempotent |
| `get-dataset-items` | 503 | read-only, idempotent |
| `get-actor-run` | 306 | read-only, idempotent |
| `report-problem` | 303 | – |
| `call-actor-mcp-tool` | 302 | destructive, open-world |
| `get-key-value-store-record` | 227 | read-only, idempotent |
| `fetch-actor-mcp-tool-list` | 215 | – |
| `fetch-apify-docs` | 197 | read-only, idempotent |
| `abort-actor-run` | 192 | destructive, idempotent |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
