# mcp-keeper report: gitlab-mcp-server

![mcp-keeper](https://img.shields.io/badge/mcp--keeper-D%20%C2%B7%2059-orange)

| | |
|---|---|
| Target | `npx -y @modelcontextprotocol/server-gitlab@2025.4.25` |
| Server | gitlab-mcp-server 0.5.1 |
| Protocol | 2024-11-05 (stdio) |
| Exposes | 9 tools · 0 prompts · 0 resources |
| Context cost | ≈359 tokens per request |
| Score | **59/100 (D)** |
| Scanned | 2026-11-01T11:33:45.731Z with mcp-keeper 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 100 | 100 | 70 |

## Findings

🛑 0 critical · 🔴 9 high · 🟠 0 medium · 🔵 1 low · ⚪ 2 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🔴 high | MCP302 | tool "create_or_update_file" does not match the MCP schema (inputSchema.type: Invalid input: expected "object"). The official TypeScript SDK client rejects the whole list because of it. | `tool:create_or_update_file` |  |
| 🔴 high | MCP302 | tool "search_repositories" does not match the MCP schema (inputSchema.type: Invalid input: expected "object"). The official TypeScript SDK client rejects the whole list because of it. | `tool:search_repositories` |  |
| 🔴 high | MCP302 | tool "create_repository" does not match the MCP schema (inputSchema.type: Invalid input: expected "object"). The official TypeScript SDK client rejects the whole list because of it. | `tool:create_repository` |  |
| 🔴 high | MCP302 | tool "get_file_contents" does not match the MCP schema (inputSchema.type: Invalid input: expected "object"). The official TypeScript SDK client rejects the whole list because of it. | `tool:get_file_contents` |  |
| 🔴 high | MCP302 | tool "push_files" does not match the MCP schema (inputSchema.type: Invalid input: expected "object"). The official TypeScript SDK client rejects the whole list because of it. | `tool:push_files` |  |
| 🔴 high | MCP302 | tool "create_issue" does not match the MCP schema (inputSchema.type: Invalid input: expected "object"). The official TypeScript SDK client rejects the whole list because of it. | `tool:create_issue` |  |
| 🔴 high | MCP302 | tool "create_merge_request" does not match the MCP schema (inputSchema.type: Invalid input: expected "object"). The official TypeScript SDK client rejects the whole list because of it. | `tool:create_merge_request` |  |
| 🔴 high | MCP302 | tool "fork_repository" does not match the MCP schema (inputSchema.type: Invalid input: expected "object"). The official TypeScript SDK client rejects the whole list because of it. | `tool:fork_repository` |  |
| 🔴 high | MCP302 | tool "create_branch" does not match the MCP schema (inputSchema.type: Invalid input: expected "object"). The official TypeScript SDK client rejects the whole list because of it. | `tool:create_branch` |  |
| 🔵 low | MCP302 | Server negotiated protocol 2024-11-05; latest supported by this checker is 2025-11-25. |  | Update your MCP SDK. |
| ⚪ info | MCP004 | Tool "search_repositories" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:search_repositories › annotations` |  |
| ⚪ info | MCP004 | Tool "get_file_contents" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get_file_contents › annotations` |  |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `get_file_contents` | 44 | – |
| `fork_repository` | 43 | – |
| `create_or_update_file` | 42 | – |
| `push_files` | 42 | – |
| `create_merge_request` | 41 | – |
| `create_branch` | 38 | – |
| `create_issue` | 37 | – |
| `search_repositories` | 36 | – |
| `create_repository` | 36 | – |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
