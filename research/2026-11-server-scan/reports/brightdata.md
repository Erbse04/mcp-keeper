# mcp-keeper report: Bright Data

![mcp-keeper](https://img.shields.io/badge/mcp--keeper-A%20%C2%B7%2090-brightgreen)

| | |
|---|---|
| Target | `npx -y @brightdata/mcp@4.1.1` |
| Server | Bright Data 4.1.1 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 32 tools · 2 prompts · 0 resources |
| Context cost | ≈4,933 tokens per request |
| Score | **90/100 (A)** |
| Scanned | 2026-11-01T11:33:45.679Z with mcp-keeper 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 100 | 90 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 0 medium · 🔵 6 low · ⚪ 4 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🔵 low | MCP201 | Tool "search_engine": 1 parameter(s) without description (engine). | `tool:search_engine › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "list_dataset_fields": 1 parameter(s) without description (dataset_id). | `tool:list_dataset_fields › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "search_dataset": 1 parameter(s) without description (dataset_id). | `tool:search_dataset › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "run_scraper": 1 parameter(s) without description (input). | `tool:run_scraper › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "chatgpt_ai_insights": 1 parameter(s) without description (prompt). | `tool:chatgpt_ai_insights › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "perplexity_ai_insights": 1 parameter(s) without description (prompt). | `tool:perplexity_ai_insights › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| ⚪ info | MCP005 | Tool "scrape_as_markdown" accepts arbitrary URLs (open world) — a potential exfiltration channel. | `tool:scrape_as_markdown` |  |
| ⚪ info | MCP005 | Tool "scrape_as_html" accepts arbitrary URLs (open world) — a potential exfiltration channel. | `tool:scrape_as_html` |  |
| ⚪ info | MCP005 | Tool "extract" accepts arbitrary URLs (open world) — a potential exfiltration channel. | `tool:extract` |  |
| ⚪ info | MCP005 | Tool "scraping_browser_navigate" accepts arbitrary URLs (open world) — a potential exfiltration channel. | `tool:scraping_browser_navigate` |  |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `search_dataset` | 844 | read-only |
| `run_scraper` | 278 | open-world |
| `scraping_browser_fill_form` | 246 | destructive, open-world |
| `ask_brightdata_assistant` | 214 | read-only |
| `scraping_browser_snapshot` | 193 | read-only, open-world |
| `scraping_browser_type_ref` | 185 | destructive, open-world |
| `search_engine_batch` | 180 | read-only, open-world |
| `search_engine` | 178 | read-only, open-world |
| `list_dataset_fields` | 174 | read-only |
| `scraping_browser_wait_for_ref` | 170 | read-only, open-world |
| `get_scraper_details` | 166 | read-only |
| `scraping_browser_click_ref` | 144 | destructive, open-world |
| `scraping_browser_scroll_to_ref` | 144 | read-only, open-world |
| `extract` | 136 | read-only, open-world |
| `search_scrapers` | 136 | read-only |
| `scraping_browser_get_html` | 136 | read-only, open-world |
| `scraping_browser_navigate` | 118 | read-only, open-world |
| `scraping_browser_screenshot` | 116 | read-only, open-world |
| `scraping_browser_network_requests` | 104 | read-only, open-world |
| `scrape_batch` | 101 | read-only, open-world |
| `chatgpt_ai_insights` | 99 | open-world |
| `perplexity_ai_insights` | 95 | open-world |
| `get_scraper_results` | 88 | read-only |
| `get_scraper_progress` | 86 | read-only |
| `scrape_as_markdown` | 77 | read-only, open-world |
| `scrape_as_html` | 73 | read-only, open-world |
| `refresh_scrapers` | 61 | read-only |
| `session_stats` | 57 | read-only |
| `scraping_browser_get_text` | 56 | read-only, open-world |
| `scraping_browser_scroll` | 56 | read-only, open-world |
| `scraping_browser_go_back` | 53 | read-only, open-world |
| `scraping_browser_go_forward` | 53 | read-only, open-world |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
