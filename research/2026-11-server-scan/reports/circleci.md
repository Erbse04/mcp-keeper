# mcp-probe report: mcp-server-circleci

![mcp-probe](https://img.shields.io/badge/mcp--probe-C%20%C2%B7%2076-yellow)

| | |
|---|---|
| Target | `npx -y @circleci/mcp-server-circleci@0.20.0` |
| Server | mcp-server-circleci 1.0.0 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 13 tools · 0 prompts · 0 resources |
| Context cost | ≈12,758 tokens per request |
| Score | **76/100 (C)** |
| Scanned | 2026-11-01T11:13:32.107Z with mcp-probe 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 84 | 92 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 1 medium · 🔵 9 low · ⚪ 14 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🟠 medium | MCP101 | Tool definitions cost ≈12,758 tokens per request (budget 8,000). |  | Shorten descriptions and schemas, or split into optional toolsets. |
| 🔵 low | MCP101 | Tool "get_build_failure_logs" alone costs ≈1,264 tokens. | `tool:get_build_failure_logs` | Trim the description and nested schema; move long docs into a resource. |
| 🔵 low | MCP101 | Tool "get_job_test_results" alone costs ≈1,363 tokens. | `tool:get_job_test_results` | Trim the description and nested schema; move long docs into a resource. |
| 🔵 low | MCP101 | Tool "run_pipeline" alone costs ≈1,205 tokens. | `tool:run_pipeline` | Trim the description and nested schema; move long docs into a resource. |
| 🔵 low | MCP101 | Tool "run_rollback_pipeline" alone costs ≈1,576 tokens. | `tool:run_rollback_pipeline` | Trim the description and nested schema; move long docs into a resource. |
| 🔵 low | MCP101 | Tool "list_component_versions" alone costs ≈1,418 tokens. | `tool:list_component_versions` | Trim the description and nested schema; move long docs into a resource. |
| 🔵 low | MCP201 | Tool "get_job_test_results" has a 3384-character description. | `tool:get_job_test_results` | Keep descriptions focused; move reference material into a resource. |
| 🔵 low | MCP201 | Tool "list_followed_projects": 1 parameter(s) without description (params). | `tool:list_followed_projects › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "run_rollback_pipeline" has a 5110-character description. | `tool:run_rollback_pipeline` | Keep descriptions focused; move reference material into a resource. |
| 🔵 low | MCP201 | Tool "list_component_versions" has a 4602-character description. | `tool:list_component_versions` | Keep descriptions focused; move reference material into a resource. |
| ⚪ info | MCP001 | Model-visible text uses urgency phrasing (common in poisoning, but also in legitimate docs).<br><sub>“…ilures by retrieving failure logs. CRITICAL REQUIREMENTS: 1. Large Log Handling: - If …”</sub> | `tool:get_build_failure_logs › description` | Describe what the tool does, not what the model should do with other tools, the user or other data. Remove imperative instructions aimed at the model. |
| ⚪ info | MCP001 | Model-visible text uses urgency phrasing (common in poisoning, but also in legitimate docs).<br><sub>“…on the specific issues identified. CRITICAL REQUIREMENTS: 1. Truncation Handling (HIGHEST PRI…”</sub> | `tool:find_flaky_tests › description` | Describe what the tool does, not what the model should do with other tools, the user or other data. Remove imperative instructions aimed at the model. |
| ⚪ info | MCP001 | Model-visible text uses urgency phrasing (common in poisoning, but also in legitimate docs).<br><sub>“…t test metadata for a specific job CRITICAL REQUIREMENTS: 1. Truncation Handling (HIGHEST PRI…”</sub> | `tool:get_job_test_results › description` | Describe what the tool does, not what the model should do with other tools, the user or other data. Remove imperative instructions aimed at the model. |
| ⚪ info | MCP004 | Tool "get_build_failure_logs" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get_build_failure_logs › annotations` |  |
| ⚪ info | MCP004 | Tool "find_flaky_tests" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:find_flaky_tests › annotations` |  |
| ⚪ info | MCP004 | Tool "get_latest_pipeline_status" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get_latest_pipeline_status › annotations` |  |
| ⚪ info | MCP004 | Tool "get_job_test_results" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get_job_test_results › annotations` |  |
| ⚪ info | MCP004 | Tool "config_helper" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:config_helper › annotations` |  |
| ⚪ info | MCP004 | Tool "list_followed_projects" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:list_followed_projects › annotations` |  |
| ⚪ info | MCP004 | Tool "rerun_workflow" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:rerun_workflow › annotations` |  |
| ⚪ info | MCP004 | Tool "download_usage_api_data" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:download_usage_api_data › annotations` |  |
| ⚪ info | MCP004 | Tool "find_underused_resource_classes" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:find_underused_resource_classes › annotations` |  |
| ⚪ info | MCP004 | Tool "list_component_versions" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:list_component_versions › annotations` |  |
| ⚪ info | MCP004 | Tool "list_artifacts" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:list_artifacts › annotations` |  |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `run_rollback_pipeline` | 1,576 | destructive |
| `list_component_versions` | 1,418 | – |
| `get_job_test_results` | 1,363 | – |
| `get_build_failure_logs` | 1,264 | – |
| `run_pipeline` | 1,205 | destructive |
| `get_latest_pipeline_status` | 1,105 | – |
| `download_usage_api_data` | 1,027 | destructive |
| `find_flaky_tests` | 956 | destructive |
| `list_artifacts` | 918 | – |
| `rerun_workflow` | 551 | destructive |
| `find_underused_resource_classes` | 533 | – |
| `list_followed_projects` | 474 | – |
| `config_helper` | 368 | – |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
