# mcp-probe report: Playwright

![mcp-probe](https://img.shields.io/badge/mcp--probe-A%20%C2%B7%2094-brightgreen)

| | |
|---|---|
| Target | `npx -y @playwright/mcp@0.0.84` |
| Server | Playwright 1.65.0-alpha-2026-10-30 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 25 tools · 0 prompts · 0 resources |
| Context cost | ≈4,600 tokens per request |
| Score | **94/100 (A)** |
| Scanned | 2026-11-01T11:13:32.206Z with mcp-probe 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 100 | 94 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 0 medium · 🔵 3 low · ⚪ 3 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🔵 low | MCP201 | Tool "browser_close" has a very short description ("Close the page"). | `tool:browser_close` | Add when to use it and what it returns. |
| 🔵 low | MCP201 | Tool "browser_handle_dialog" has a very short description ("Handle a dialog"). | `tool:browser_handle_dialog` | Add when to use it and what it returns. |
| 🔵 low | MCP201 | Tool "browser_navigate" has a very short description ("Navigate to a URL"). | `tool:browser_navigate` | Add when to use it and what it returns. |
| ⚪ info | MCP005 | Tool "browser_navigate" accepts arbitrary URLs (open world) — a potential exfiltration channel. | `tool:browser_navigate` |  |
| ⚪ info | MCP005 | Tool "browser_run_code_unsafe" can likely execute commands or code. | `tool:browser_run_code_unsafe` | Keep it behind user confirmation; consider an allow-list of commands or a sandbox. |
| ⚪ info | MCP005 | Tool "browser_tabs" accepts arbitrary URLs (open world) — a potential exfiltration channel. | `tool:browser_tabs` |  |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `browser_take_screenshot` | 381 | read-only, open-world |
| `browser_find` | 309 | read-only, open-world |
| `browser_emulate_media` | 271 | destructive, open-world |
| `browser_fill_form` | 264 | destructive, open-world |
| `browser_network_requests` | 244 | read-only, open-world |
| `browser_drop` | 241 | destructive, open-world |
| `browser_network_request` | 219 | read-only, open-world |
| `browser_tabs` | 215 | destructive, open-world |
| `browser_click` | 214 | destructive, open-world |
| `browser_type` | 210 | destructive, open-world |
| `browser_snapshot` | 210 | read-only, open-world |
| `browser_run_code_unsafe` | 208 | destructive, open-world |
| `browser_evaluate` | 205 | destructive, open-world |
| `browser_drag` | 204 | destructive, open-world |
| `browser_console_messages` | 203 | read-only, open-world |
| `browser_select_option` | 166 | destructive, open-world |
| `browser_wait_for` | 162 | read-only, open-world |
| `browser_hover` | 121 | destructive, open-world |
| `browser_file_upload` | 99 | destructive, open-world |
| `browser_handle_dialog` | 98 | destructive, open-world |
| `browser_resize` | 94 | destructive, open-world |
| `browser_press_key` | 87 | destructive, open-world |
| `browser_navigate` | 70 | destructive, open-world |
| `browser_navigate_back` | 57 | destructive, open-world |
| `browser_close` | 48 | destructive, open-world |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
