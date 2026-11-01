# mcp-guard report: firecrawl-fastmcp

![mcp-guard](https://img.shields.io/badge/mcp--guard-C%20%C2%B7%2078-yellow)

| | |
|---|---|
| Target | `npx -y firecrawl-mcp@3.36.0` |
| Server | firecrawl-fastmcp 3.36.0 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 28 tools · 0 prompts · 0 resources |
| Context cost | ≈15,789 tokens per request |
| Score | **78/100 (C)** |
| Scanned | 2026-11-01T11:26:53.824Z with mcp-guard 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 88 | 90 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 1 medium · 🔵 20 low · ⚪ 5 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🟠 medium | MCP101 | Tool definitions cost ≈15,789 tokens per request (budget 8,000). |  | Shorten descriptions and schemas, or split into optional toolsets. |
| 🔵 low | MCP101 | Tool "firecrawl_scrape" alone costs ≈1,753 tokens. | `tool:firecrawl_scrape` | Trim the description and nested schema; move long docs into a resource. |
| 🔵 low | MCP101 | Tool "firecrawl_search" alone costs ≈2,232 tokens. | `tool:firecrawl_search` | Trim the description and nested schema; move long docs into a resource. |
| 🔵 low | MCP101 | Tool "firecrawl_agent" alone costs ≈1,526 tokens. | `tool:firecrawl_agent` | Trim the description and nested schema; move long docs into a resource. |
| 🔵 low | MCP201 | Tool "firecrawl_scrape": 15 parameter(s) without description (formats, parsers, onlyMainContent, redactPII, includeTags, excludeTags, …). | `tool:firecrawl_scrape › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "firecrawl_map": 4 parameter(s) without description (search, sitemap, includeSubdomains, ignoreQueryParameters). | `tool:firecrawl_map › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "firecrawl_search": 4 parameter(s) without description (tbs, filter, location, enterprise). | `tool:firecrawl_search › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "firecrawl_find_tools": 1 parameter(s) without description (urls). | `tool:firecrawl_find_tools › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "firecrawl_search_feedback": 3 parameter(s) without description (searchId, rating, querySuggestions). | `tool:firecrawl_search_feedback › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "firecrawl_feedback": 11 parameter(s) without description (endpoint, jobId, rationale, objective, rating, issues, …). | `tool:firecrawl_feedback › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "firecrawl_crawl": 14 parameter(s) without description (prompt, excludePaths, includePaths, maxDiscoveryDepth, sitemap, allowExternalLinks, …). | `tool:firecrawl_crawl › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "firecrawl_agent": 3 parameter(s) without description (prompt, urls, schema). | `tool:firecrawl_agent › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "firecrawl_interact": 5 parameter(s) without description (scrapeId, prompt, code, language, timeout). | `tool:firecrawl_interact › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "firecrawl_interact_stop": 1 parameter(s) without description (scrapeId). | `tool:firecrawl_interact_stop › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "firecrawl_parse": 11 parameter(s) without description (formats, parsers, onlyMainContent, redactPII, includeTags, excludeTags, …). | `tool:firecrawl_parse › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "firecrawl_monitor_create": 13 parameter(s) without description (body, pages, queries, searchWindow, maxResults, includeDomains, …). | `tool:firecrawl_monitor_create › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "firecrawl_monitor_update": 1 parameter(s) without description (body). | `tool:firecrawl_monitor_update › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "firecrawl_monitor_checks": 1 parameter(s) without description (status). | `tool:firecrawl_monitor_checks › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "firecrawl_monitor_check": 3 parameter(s) without description (checkId, skip, pageStatus). | `tool:firecrawl_monitor_check › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "firecrawl_research_related_papers": 4 parameter(s) without description (seed_ids, intent, mode, k). | `tool:firecrawl_research_related_papers › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "firecrawl_research_read_paper": 1 parameter(s) without description (question). | `tool:firecrawl_research_read_paper › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| ⚪ info | MCP005 | Tool "firecrawl_scrape" accepts arbitrary URLs (open world) — a potential exfiltration channel. | `tool:firecrawl_scrape` |  |
| ⚪ info | MCP005 | Tool "firecrawl_map" accepts arbitrary URLs (open world) — a potential exfiltration channel. | `tool:firecrawl_map` |  |
| ⚪ info | MCP005 | Tool "firecrawl_feedback" accepts arbitrary URLs (open world) — a potential exfiltration channel. | `tool:firecrawl_feedback` |  |
| ⚪ info | MCP005 | Tool "firecrawl_crawl" accepts arbitrary URLs (open world) — a potential exfiltration channel. | `tool:firecrawl_crawl` |  |
| ⚪ info | MCP005 | Tool "firecrawl_interact" can likely execute commands or code. | `tool:firecrawl_interact` | Keep it behind user confirmation; consider an allow-list of commands or a sandbox. |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `firecrawl_search` | 2,232 | read-only, open-world |
| `firecrawl_scrape` | 1,753 | open-world |
| `firecrawl_agent` | 1,526 | open-world |
| `firecrawl_feedback` | 1,016 | open-world |
| `firecrawl_crawl` | 950 | open-world |
| `firecrawl_interact` | 837 | open-world |
| `firecrawl_find_tools` | 825 | read-only, idempotent |
| `firecrawl_search_feedback` | 752 | open-world |
| `firecrawl_gov_search` | 684 | read-only, open-world |
| `firecrawl_parse` | 670 | read-only |
| `firecrawl_credit_usage` | 610 | read-only |
| `firecrawl_monitor_create` | 374 | open-world |
| `firecrawl_research_search_papers` | 368 | read-only, open-world |
| `firecrawl_map` | 258 | read-only, open-world |
| `firecrawl_monitor_check` | 235 | read-only |
| `firecrawl_research_related_papers` | 228 | read-only, open-world |
| `firecrawl_developer_search` | 228 | read-only, open-world |
| `firecrawl_research_read_paper` | 202 | read-only, open-world |
| `firecrawl_agent_status` | 189 | read-only |
| `firecrawl_monitor_checks` | 158 | read-only |
| `firecrawl_research_inspect_paper` | 147 | read-only, open-world |
| `firecrawl_monitor_update` | 138 | destructive, idempotent, open-world |
| `firecrawl_monitor_list` | 116 | read-only |
| `firecrawl_check_crawl_status` | 98 | read-only |
| `firecrawl_monitor_run` | 96 | open-world |
| `firecrawl_interact_stop` | 89 | destructive, idempotent |
| `firecrawl_monitor_delete` | 88 | destructive, idempotent, open-world |
| `firecrawl_monitor_get` | 85 | read-only |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
