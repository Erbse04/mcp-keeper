# mcp-probe report: desktop-commander

![mcp-probe](https://img.shields.io/badge/mcp--probe-C%20%C2%B7%2078-yellow)

| | |
|---|---|
| Target | `npx -y @wonderwhy-er/desktop-commander@0.3.1` |
| Server | desktop-commander 0.3.1 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 25 tools · 0 prompts · 2 resources |
| Context cost | ≈12,547 tokens per request |
| Score | **78/100 (C)** |
| Scanned | 2026-11-01T11:13:32.122Z with mcp-probe 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 90 | 88 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 1 medium · 🔵 25 low · ⚪ 1 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🟠 medium | MCP101 | Tool definitions cost ≈12,547 tokens per request (budget 8,000). |  | Shorten descriptions and schemas, or split into optional toolsets. |
| 🔵 low | MCP101 | Tool "read_file" alone costs ≈1,204 tokens. | `tool:read_file` | Trim the description and nested schema; move long docs into a resource. |
| 🔵 low | MCP101 | Tool "start_search" alone costs ≈1,736 tokens. | `tool:start_search` | Trim the description and nested schema; move long docs into a resource. |
| 🔵 low | MCP201 | Tool "get_config": 1 parameter(s) without description (origin). | `tool:get_config › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "set_config_value": 3 parameter(s) without description (key, value, origin). | `tool:set_config_value › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "read_file" has a 4234-character description. | `tool:read_file` | Keep descriptions focused; move reference material into a resource. |
| 🔵 low | MCP201 | Tool "read_file": 6 parameter(s) without description (isUrl, length, sheet, range, options, origin). | `tool:read_file › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "read_multiple_files": 1 parameter(s) without description (paths). | `tool:read_multiple_files › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "write_file": 3 parameter(s) without description (content, mode, origin). | `tool:write_file › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "write_pdf": 3 parameter(s) without description (content, outputPath, options). | `tool:write_pdf › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "list_directory": 2 parameter(s) without description (depth, origin). | `tool:list_directory › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "move_file": 2 parameter(s) without description (source, destination). | `tool:move_file › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "start_search" has a 5971-character description. | `tool:start_search` | Keep descriptions focused; move reference material into a resource. |
| 🔵 low | MCP201 | Tool "start_search": 11 parameter(s) without description (pattern, searchType, filePattern, ignoreCase, maxResults, includeHidden, …). | `tool:start_search › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "get_more_search_results": 2 parameter(s) without description (sessionId, length). | `tool:get_more_search_results › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "stop_search": 1 parameter(s) without description (sessionId). | `tool:stop_search › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "edit_block" has a 3606-character description. | `tool:edit_block` | Keep descriptions focused; move reference material into a resource. |
| 🔵 low | MCP201 | Tool "edit_block": 8 parameter(s) without description (file_path, old_string, new_string, expected_replacements, range, content, …). | `tool:edit_block › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "start_process" has a 3076-character description. | `tool:start_process` | Keep descriptions focused; move reference material into a resource. |
| 🔵 low | MCP201 | Tool "start_process": 5 parameter(s) without description (command, timeout_ms, shell, verbose_timing, origin). | `tool:start_process › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "read_process_output": 4 parameter(s) without description (pid, timeout_ms, length, verbose_timing). | `tool:read_process_output › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "interact_with_process": 5 parameter(s) without description (pid, input, timeout_ms, wait_for_prompt, verbose_timing). | `tool:interact_with_process › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "force_terminate": 1 parameter(s) without description (pid). | `tool:force_terminate › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "kill_process": 1 parameter(s) without description (pid). | `tool:kill_process › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "get_recent_tool_calls": 3 parameter(s) without description (maxResults, toolName, since). | `tool:get_recent_tool_calls › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP202 | Tool "edit_block": parameter(s) without a type: content. | `tool:edit_block › inputSchema.properties` |  |
| ⚪ info | MCP005 | Tool "start_process" can likely execute commands or code. | `tool:start_process` | Keep it behind user confirmation; consider an allow-list of commands or a sandbox. |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `start_search` | 1,736 | read-only |
| `read_file` | 1,204 | read-only, open-world |
| `edit_block` | 1,046 | destructive |
| `write_pdf` | 1,002 | destructive |
| `start_process` | 883 | destructive, open-world |
| `list_directory` | 658 | read-only |
| `read_process_output` | 641 | read-only |
| `interact_with_process` | 604 | destructive, open-world |
| `write_file` | 529 | destructive |
| `get_more_search_results` | 451 | read-only |
| `set_config_value` | 394 | destructive |
| `get_file_info` | 346 | read-only |
| `get_recent_tool_calls` | 327 | read-only |
| `read_multiple_files` | 323 | read-only |
| `get_config` | 313 | read-only |
| `move_file` | 261 | destructive |
| `give_feedback_to_desktop_commander` | 256 | open-world |
| `list_sessions` | 249 | read-only |
| `create_directory` | 244 | – |
| `stop_search` | 223 | – |
| `list_searches` | 160 | read-only |
| `get_usage_stats` | 133 | read-only |
| `list_processes` | 130 | read-only |
| `kill_process` | 127 | destructive |
| `force_terminate` | 110 | destructive |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
