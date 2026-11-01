# mcp-guard report: Sentry MCP

![mcp-guard](https://img.shields.io/badge/mcp--guard-B%20%C2%B7%2088-green)

| | |
|---|---|
| Target | `npx -y @sentry/mcp-server@0.42.0 --access-token=dummy` |
| Server | Sentry MCP 0.42.0 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 9 tools · 0 prompts · 0 resources |
| Context cost | ≈5,890 tokens per request |
| Score | **88/100 (B)** |
| Scanned | 2026-11-01T11:26:53.893Z with mcp-guard 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 98 | 90 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 0 medium · 🔵 6 low · ⚪ 2 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🔵 low | MCP101 | Tool "update_issue" alone costs ≈1,294 tokens. | `tool:update_issue` | Trim the description and nested schema; move long docs into a resource. |
| 🔵 low | MCP201 | Tool "find_projects": 1 parameter(s) without description (regionUrl). | `tool:find_projects › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "update_issue": 1 parameter(s) without description (regionUrl). | `tool:update_issue › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "search_events": 2 parameter(s) without description (projectSlug, regionUrl). | `tool:search_events › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "analyze_issue_with_seer": 1 parameter(s) without description (regionUrl). | `tool:analyze_issue_with_seer › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "search_issues": 1 parameter(s) without description (regionUrl). | `tool:search_issues › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| ⚪ info | MCP005 | Tool "get_sentry_resource" accepts arbitrary URLs (open world) — a potential exfiltration channel. | `tool:get_sentry_resource` |  |
| ⚪ info | MCP005 | Tool "execute_sentry_tool" can likely execute commands or code. | `tool:execute_sentry_tool` | Keep it behind user confirmation; consider an allow-list of commands or a sandbox. |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `update_issue` | 1,294 | destructive, open-world |
| `search_events` | 1,182 | read-only, open-world |
| `search_issues` | 870 | read-only, open-world |
| `analyze_issue_with_seer` | 673 | open-world |
| `get_sentry_resource` | 660 | read-only, open-world |
| `search_sentry_tools` | 428 | read-only |
| `find_projects` | 328 | read-only, open-world |
| `execute_sentry_tool` | 286 | destructive, open-world |
| `find_organizations` | 169 | read-only, open-world |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
