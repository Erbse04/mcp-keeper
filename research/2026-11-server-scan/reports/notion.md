# mcp-guard report: Notion API

![mcp-guard](https://img.shields.io/badge/mcp--guard-B%20%C2%B7%2082-green)

| | |
|---|---|
| Target | `npx -y @notionhq/notion-mcp-server@2.6.1` |
| Server | Notion API 1.0.0 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 24 tools · 0 prompts · 0 resources |
| Context cost | ≈18,676 tokens per request |
| Score | **82/100 (B)** |
| Scanned | 2026-11-01T11:26:53.877Z with mcp-guard 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 92 | 90 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 1 medium · 🔵 13 low · ⚪ 1 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🟠 medium | MCP101 | Tool definitions cost ≈18,676 tokens per request (budget 8,000). |  | Shorten descriptions and schemas, or split into optional toolsets. |
| 🔵 low | MCP101 | Tool "API-update-page-markdown" alone costs ≈1,449 tokens. | `tool:API-update-page-markdown` | Trim the description and nested schema; move long docs into a resource. |
| 🔵 low | MCP201 | Tool "API-get-user": 1 parameter(s) without description (user_id). | `tool:API-get-user › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "API-post-search": 2 parameter(s) without description (sort, filter). | `tool:API-post-search › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "API-update-a-block": 1 parameter(s) without description (type). | `tool:API-update-a-block › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "API-patch-page": 4 parameter(s) without description (properties, archived, icon, cover). | `tool:API-patch-page › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "API-post-page": 2 parameter(s) without description (parent, properties). | `tool:API-post-page › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "API-create-a-comment": 2 parameter(s) without description (parent, rich_text). | `tool:API-create-a-comment › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "API-query-data-source": 6 parameter(s) without description (filter, sorts, start_cursor, page_size, archived, in_trash). | `tool:API-query-data-source › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "API-update-a-data-source": 3 parameter(s) without description (title, description, properties). | `tool:API-update-a-data-source › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "API-create-a-data-source": 3 parameter(s) without description (parent, properties, title). | `tool:API-create-a-data-source › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "API-list-data-source-templates": 2 parameter(s) without description (start_cursor, page_size). | `tool:API-list-data-source-templates › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "API-move-page": 1 parameter(s) without description (parent). | `tool:API-move-page › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "API-update-page-markdown": 4 parameter(s) without description (replace_content, update_content, insert_content, replace_content_range). | `tool:API-update-page-markdown › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| ⚪ info | MCP004 | Tool "API-query-data-source" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:API-query-data-source › annotations` |  |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `API-update-page-markdown` | 1,449 | destructive |
| `API-post-search` | 1,187 | destructive |
| `API-patch-page` | 959 | destructive |
| `API-post-page` | 877 | destructive |
| `API-query-data-source` | 813 | destructive |
| `API-create-a-comment` | 776 | destructive |
| `API-update-a-block` | 762 | destructive |
| `API-retrieve-page-markdown` | 760 | read-only |
| `API-update-a-data-source` | 758 | destructive |
| `API-patch-block-children` | 754 | destructive |
| `API-retrieve-a-page-property` | 751 | read-only |
| `API-get-block-children` | 741 | read-only |
| `API-retrieve-a-comment` | 737 | read-only |
| `API-retrieve-a-page` | 725 | read-only |
| `API-create-a-data-source` | 721 | destructive |
| `API-get-users` | 708 | read-only |
| `API-list-data-source-templates` | 676 | read-only |
| `API-move-page` | 668 | destructive |
| `API-retrieve-a-data-source` | 653 | read-only |
| `API-retrieve-a-database` | 650 | read-only |
| `API-retrieve-a-block` | 646 | read-only |
| `API-delete-a-block` | 645 | destructive |
| `API-get-user` | 634 | read-only |
| `API-get-self` | 626 | read-only |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
