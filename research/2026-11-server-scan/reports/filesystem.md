# mcp-probe report: secure-filesystem-server

![mcp-probe](https://img.shields.io/badge/mcp--probe-A%20%C2%B7%2092-brightgreen)

| | |
|---|---|
| Target | `npx -y @modelcontextprotocol/server-filesystem@2.1.0 /tmp/scan-sandbox` |
| Server | secure-filesystem-server 2.1.0 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 14 tools · 0 prompts · 0 resources |
| Context cost | ≈2,024 tokens per request |
| Score | **92/100 (A)** |
| Scanned | 2026-11-01T11:13:32.130Z with mcp-probe 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 100 | 92 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 0 medium · 🔵 4 low · ⚪ 0 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🔵 low | MCP201 | Tool "write_file": 1 parameter(s) without description (content). | `tool:write_file › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "directory_tree": 1 parameter(s) without description (excludePatterns). | `tool:directory_tree › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "move_file": 2 parameter(s) without description (source, destination). | `tool:move_file › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "search_files": 2 parameter(s) without description (pattern, excludePatterns). | `tool:search_files › inputSchema.properties` | Describe format, units and allowed values for each parameter. |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `read_text_file` | 211 | read-only |
| `edit_file` | 183 | destructive |
| `search_files` | 182 | read-only |
| `read_multiple_files` | 172 | read-only |
| `list_directory_with_sizes` | 160 | read-only |
| `directory_tree` | 157 | read-only |
| `move_file` | 141 | destructive |
| `create_directory` | 126 | idempotent |
| `list_directory` | 126 | read-only |
| `get_file_info` | 126 | read-only |
| `read_file` | 117 | read-only |
| `write_file` | 114 | destructive, idempotent |
| `read_media_file` | 107 | read-only |
| `list_allowed_directories` | 102 | read-only |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
