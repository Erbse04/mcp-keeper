# mcp-guard report: Heroku MCP Server

![mcp-guard](https://img.shields.io/badge/mcp--guard-A%20%C2%B7%2094-brightgreen)

| | |
|---|---|
| Target | `npx -y @heroku/mcp-server@1.2.13` |
| Server | Heroku MCP Server 1.2.13 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 33 tools · 0 prompts · 1 resources |
| Context cost | ≈5,065 tokens per request |
| Score | **94/100 (A)** |
| Scanned | 2026-11-01T11:26:53.832Z with mcp-guard 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 94 | 100 | 100 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 1 medium · 🔵 0 low · ⚪ 25 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🟠 medium | MCP004 | Tool "pg_kill" looks destructive but has no destructiveHint/readOnlyHint annotation. | `tool:pg_kill › annotations` | Add annotations: { destructiveHint: true, readOnlyHint: false }. |
| ⚪ info | MCP004 | Tool "list_apps" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:list_apps › annotations` |  |
| ⚪ info | MCP004 | Tool "get_app_info" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get_app_info › annotations` |  |
| ⚪ info | MCP004 | Tool "maintenance_on" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:maintenance_on › annotations` |  |
| ⚪ info | MCP004 | Tool "maintenance_off" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:maintenance_off › annotations` |  |
| ⚪ info | MCP004 | Tool "get_app_logs" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get_app_logs › annotations` |  |
| ⚪ info | MCP004 | Tool "list_private_spaces" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:list_private_spaces › annotations` |  |
| ⚪ info | MCP004 | Tool "list_teams" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:list_teams › annotations` |  |
| ⚪ info | MCP004 | Tool "list_addons" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:list_addons › annotations` |  |
| ⚪ info | MCP004 | Tool "get_addon_info" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get_addon_info › annotations` |  |
| ⚪ info | MCP004 | Tool "list_addon_services" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:list_addon_services › annotations` |  |
| ⚪ info | MCP004 | Tool "list_addon_plans" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:list_addon_plans › annotations` |  |
| ⚪ info | MCP004 | Tool "pg_psql" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:pg_psql › annotations` |  |
| ⚪ info | MCP004 | Tool "pg_info" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:pg_info › annotations` |  |
| ⚪ info | MCP004 | Tool "pg_ps" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:pg_ps › annotations` |  |
| ⚪ info | MCP004 | Tool "pg_locks" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:pg_locks › annotations` |  |
| ⚪ info | MCP004 | Tool "pg_outliers" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:pg_outliers › annotations` |  |
| ⚪ info | MCP004 | Tool "pg_credentials" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:pg_credentials › annotations` |  |
| ⚪ info | MCP004 | Tool "pg_maintenance" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:pg_maintenance › annotations` |  |
| ⚪ info | MCP004 | Tool "pg_backups" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:pg_backups › annotations` |  |
| ⚪ info | MCP004 | Tool "ps_list" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:ps_list › annotations` |  |
| ⚪ info | MCP004 | Tool "ps_scale" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:ps_scale › annotations` |  |
| ⚪ info | MCP004 | Tool "pipelines_promote" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:pipelines_promote › annotations` |  |
| ⚪ info | MCP004 | Tool "pipelines_list" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:pipelines_list › annotations` |  |
| ⚪ info | MCP004 | Tool "pipelines_info" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:pipelines_info › annotations` |  |
| ⚪ info | MCP005 | Tool "deploy_one_off_dyno" can likely execute commands or code. | `tool:deploy_one_off_dyno` | Keep it behind user confirmation; consider an allow-list of commands or a sandbox. |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `deploy_to_heroku` | 1,140 | – |
| `deploy_one_off_dyno` | 412 | – |
| `create_addon` | 173 | – |
| `pg_psql` | 171 | – |
| `pg_outliers` | 158 | – |
| `list_apps` | 146 | – |
| `ps_restart` | 145 | – |
| `get_app_logs` | 144 | – |
| `pipelines_create` | 139 | – |
| `create_app` | 138 | – |
| `pg_upgrade` | 138 | – |
| `pg_kill` | 137 | – |
| `pg_ps` | 117 | – |
| `pg_locks` | 117 | – |
| `get_addon_info` | 115 | – |
| `list_addon_plans` | 113 | – |
| `list_addons` | 111 | – |
| `ps_scale` | 111 | – |
| `list_teams` | 106 | – |
| `ps_list` | 106 | – |
| `pg_credentials` | 101 | – |
| `pg_maintenance` | 100 | – |
| `get_app_info` | 99 | – |
| `pg_info` | 98 | – |
| `pipelines_promote` | 97 | – |
| `list_private_spaces` | 93 | – |
| `pipelines_info` | 93 | – |
| `rename_app` | 87 | – |
| `list_addon_services` | 79 | – |
| `maintenance_on` | 72 | – |
| `maintenance_off` | 71 | – |
| `pipelines_list` | 70 | – |
| `pg_backups` | 68 | – |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
