# mcp-guard report: chrome_devtools

![mcp-guard](https://img.shields.io/badge/mcp--guard-A%20%C2%B7%20100-brightgreen)

| | |
|---|---|
| Target | `npx -y chrome-devtools-mcp@1.12.0` |
| Server | chrome_devtools 1.12.0 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 32 tools · 0 prompts · 0 resources |
| Context cost | ≈6,948 tokens per request |
| Score | **100/100 (A)** |
| Scanned | 2026-11-01T11:26:53.789Z with mcp-guard 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 100 | 100 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 0 medium · 🔵 0 low · ⚪ 2 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| ⚪ info | MCP005 | Tool "navigate_page" accepts arbitrary URLs (open world) — a potential exfiltration channel. | `tool:navigate_page` |  |
| ⚪ info | MCP005 | Tool "new_page" accepts arbitrary URLs (open world) — a potential exfiltration channel. | `tool:new_page` |  |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `emulate` | 606 | – |
| `evaluate_script` | 503 | – |
| `list_console_messages` | 384 | read-only |
| `get_css_styles` | 339 | read-only |
| `list_network_requests` | 314 | read-only |
| `performance_start_trace` | 308 | – |
| `navigate_page` | 292 | – |
| `take_screenshot` | 290 | – |
| `fill_form` | 281 | – |
| `get_network_request` | 261 | – |
| `new_page` | 247 | – |
| `wait_for` | 229 | read-only |
| `lighthouse_audit` | 225 | – |
| `take_snapshot` | 225 | – |
| `upload_file` | 198 | – |
| `performance_analyze_insight` | 191 | read-only |
| `press_key` | 182 | – |
| `fill` | 180 | – |
| `click` | 155 | – |
| `drag` | 148 | – |
| `performance_stop_trace` | 143 | – |
| `resize_page` | 140 | – |
| `handle_dialog` | 137 | – |
| `hover` | 131 | – |
| `take_heapsnapshot` | 130 | – |
| `type_text` | 127 | – |
| `get_console_message` | 124 | read-only |
| `screencast_start` | 115 | – |
| `select_page` | 115 | read-only |
| `close_page` | 91 | – |
| `screencast_stop` | 83 | – |
| `list_pages` | 54 | read-only |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
