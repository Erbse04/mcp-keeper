# mcp-probe report: github-mcp-server

![mcp-probe](https://img.shields.io/badge/mcp--probe-B%20%C2%B7%2088-green)

| | |
|---|---|
| Target | `npx -y @modelcontextprotocol/server-github@2025.4.8` |
| Server | github-mcp-server 0.6.2 |
| Protocol | 2024-11-05 (stdio) |
| Exposes | 26 tools · 0 prompts · 0 resources |
| Context cost | ≈3,972 tokens per request |
| Score | **88/100 (B)** |
| Scanned | 2026-11-01T11:13:32.143Z with mcp-probe 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 100 | 90 | 98 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 0 medium · 🔵 11 low · ⚪ 14 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🔵 low | MCP201 | Tool "create_issue": 7 parameter(s) without description (owner, repo, title, body, assignees, milestone, …). | `tool:create_issue › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "list_commits": 4 parameter(s) without description (owner, repo, sha, perPage). | `tool:list_commits › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "list_issues": 8 parameter(s) without description (owner, repo, direction, labels, per_page, since, …). | `tool:list_issues › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "update_issue": 9 parameter(s) without description (owner, repo, issue_number, title, body, assignees, …). | `tool:update_issue › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "add_issue_comment": 4 parameter(s) without description (owner, repo, issue_number, body). | `tool:add_issue_comment › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "search_code": 3 parameter(s) without description (q, order, per_page). | `tool:search_code › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "search_issues": 4 parameter(s) without description (q, order, per_page, sort). | `tool:search_issues › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "search_users": 4 parameter(s) without description (q, order, per_page, sort). | `tool:search_users › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "get_issue": 3 parameter(s) without description (owner, repo, issue_number). | `tool:get_issue › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "merge_pull_request" has a very short description ("Merge a pull request"). | `tool:merge_pull_request` | Add when to use it and what it returns. |
| 🔵 low | MCP302 | Server negotiated protocol 2024-11-05; latest supported by this checker is 2025-11-25. |  | Update your MCP SDK. |
| ⚪ info | MCP004 | Tool "search_repositories" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:search_repositories › annotations` |  |
| ⚪ info | MCP004 | Tool "get_file_contents" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get_file_contents › annotations` |  |
| ⚪ info | MCP004 | Tool "list_commits" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:list_commits › annotations` |  |
| ⚪ info | MCP004 | Tool "list_issues" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:list_issues › annotations` |  |
| ⚪ info | MCP004 | Tool "search_code" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:search_code › annotations` |  |
| ⚪ info | MCP004 | Tool "search_issues" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:search_issues › annotations` |  |
| ⚪ info | MCP004 | Tool "search_users" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:search_users › annotations` |  |
| ⚪ info | MCP004 | Tool "get_issue" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get_issue › annotations` |  |
| ⚪ info | MCP004 | Tool "get_pull_request" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get_pull_request › annotations` |  |
| ⚪ info | MCP004 | Tool "list_pull_requests" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:list_pull_requests › annotations` |  |
| ⚪ info | MCP004 | Tool "get_pull_request_files" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get_pull_request_files › annotations` |  |
| ⚪ info | MCP004 | Tool "get_pull_request_status" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get_pull_request_status › annotations` |  |
| ⚪ info | MCP004 | Tool "get_pull_request_comments" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get_pull_request_comments › annotations` |  |
| ⚪ info | MCP004 | Tool "get_pull_request_reviews" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get_pull_request_reviews › annotations` |  |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `create_pull_request_review` | 409 | – |
| `list_pull_requests` | 255 | – |
| `create_pull_request` | 236 | – |
| `create_or_update_file` | 208 | – |
| `push_files` | 198 | – |
| `merge_pull_request` | 186 | – |
| `list_issues` | 153 | – |
| `search_issues` | 153 | – |
| `update_pull_request_branch` | 153 | – |
| `create_branch` | 148 | – |
| `update_issue` | 146 | – |
| `get_file_contents` | 140 | – |
| `create_repository` | 132 | – |
| `fork_repository` | 132 | – |
| `get_pull_request_status` | 124 | – |
| `search_repositories` | 122 | – |
| `create_issue` | 122 | – |
| `get_pull_request_files` | 120 | – |
| `get_pull_request_comments` | 119 | – |
| `get_pull_request_reviews` | 117 | – |
| `get_pull_request` | 116 | – |
| `search_users` | 111 | – |
| `search_code` | 98 | – |
| `list_commits` | 95 | – |
| `add_issue_comment` | 92 | – |
| `get_issue` | 87 | – |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
