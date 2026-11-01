# mcp-guard report: shopify-dev-mcp

![mcp-guard](https://img.shields.io/badge/mcp--guard-A%20%C2%B7%2096-brightgreen)

| | |
|---|---|
| Target | `npx -y @shopify/dev-mcp@1.18.0` |
| Server | shopify-dev-mcp 1.18.0 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 5 tools · 1 prompts · 0 resources |
| Context cost | ≈6,596 tokens per request |
| Score | **96/100 (A)** |
| Scanned | 2026-11-01T11:26:53.896Z with mcp-guard 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 98 | 98 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 0 medium · 🔵 2 low · ⚪ 5 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🔵 low | MCP101 | Tool "learn_shopify_api" alone costs ≈3,825 tokens. | `tool:learn_shopify_api` | Trim the description and nested schema; move long docs into a resource. |
| 🔵 low | MCP201 | Tool "learn_shopify_api" has a 13558-character description. | `tool:learn_shopify_api` | Keep descriptions focused; move reference material into a resource. |
| ⚪ info | MCP004 | Tool "feedback" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:feedback › annotations` |  |
| ⚪ info | MCP004 | Tool "learn_shopify_api" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:learn_shopify_api › annotations` |  |
| ⚪ info | MCP004 | Tool "search_docs_chunks" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:search_docs_chunks › annotations` |  |
| ⚪ info | MCP004 | Tool "validate" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:validate › annotations` |  |
| ⚪ info | MCP004 | Tool "validate_theme" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:validate_theme › annotations` |  |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `learn_shopify_api` | 3,825 | – |
| `validate` | 1,000 | – |
| `feedback` | 870 | – |
| `validate_theme` | 536 | – |
| `search_docs_chunks` | 365 | – |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
