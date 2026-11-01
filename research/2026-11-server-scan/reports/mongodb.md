# mcp-keeper report: MongoDB MCP Server

![mcp-keeper](https://img.shields.io/badge/mcp--keeper-B%20%C2%B7%2086-green)

| | |
|---|---|
| Target | `npx -y mongodb-mcp-server@3.2.2` |
| Server | MongoDB MCP Server 3.2.2 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 27 tools · 0 prompts · 3 resources |
| Context cost | ≈15,046 tokens per request |
| Score | **86/100 (B)** |
| Scanned | 2026-11-01T11:33:45.773Z with mcp-keeper 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 86 | 100 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 1 medium · 🔵 4 low · ⚪ 0 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🟠 medium | MCP101 | Tool definitions cost ≈15,046 tokens per request (budget 8,000). |  | Shorten descriptions and schemas, or split into optional toolsets. |
| 🔵 low | MCP101 | Tool "aggregate" alone costs ≈2,464 tokens. | `tool:aggregate` | Trim the description and nested schema; move long docs into a resource. |
| 🔵 low | MCP101 | Tool "create-index" alone costs ≈2,284 tokens. | `tool:create-index` | Trim the description and nested schema; move long docs into a resource. |
| 🔵 low | MCP101 | Tool "explain" alone costs ≈2,996 tokens. | `tool:explain` | Trim the description and nested schema; move long docs into a resource. |
| 🔵 low | MCP101 | Tool "export" alone costs ≈3,037 tokens. | `tool:export` | Trim the description and nested schema; move long docs into a resource. |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `export` | 3,037 | read-only, open-world |
| `explain` | 2,996 | read-only, open-world |
| `aggregate` | 2,464 | read-only, open-world |
| `create-index` | 2,284 | open-world |
| `find` | 461 | read-only, open-world |
| `search-knowledge` | 332 | read-only, open-world |
| `update-many` | 292 | destructive, open-world |
| `aggregate-db` | 273 | read-only, open-world |
| `insert-many` | 234 | open-world |
| `drop-index` | 214 | destructive, open-world |
| `collection-schema` | 213 | read-only, open-world |
| `count` | 208 | read-only, open-world |
| `connect` | 195 | read-only, open-world |
| `delete-many` | 192 | destructive, open-world |
| `mongodb-logs` | 192 | read-only, open-world |
| `rename-collection` | 185 | destructive, open-world |
| `drop-collection` | 155 | destructive, open-world |
| `create-collection` | 150 | open-world |
| `collection-indexes` | 134 | read-only, open-world |
| `collection-storage-size` | 134 | read-only, open-world |
| `drop-database` | 121 | destructive, open-world |
| `db-stats` | 120 | read-only, open-world |
| `list-collections` | 115 | read-only, open-world |
| `list-databases` | 98 | read-only, open-world |
| `list-knowledge-sources` | 90 | read-only, open-world |
| `disconnect` | 84 | read-only, open-world |
| `list-connections` | 73 | read-only, open-world |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
