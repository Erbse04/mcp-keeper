# mcp-probe report: tavily-mcp

![mcp-probe](https://img.shields.io/badge/mcp--probe-A%20%C2%B7%20100-brightgreen)

| | |
|---|---|
| Target | `npx -y tavily-mcp@0.2.22` |
| Server | tavily-mcp 0.2.22 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 5 tools · 0 prompts · 0 resources |
| Context cost | ≈1,924 tokens per request |
| Score | **100/100 (A)** |
| Scanned | 2026-11-01T11:13:32.214Z with mcp-probe 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 100 | 100 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 0 medium · 🔵 0 low · ⚪ 7 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| ⚪ info | MCP004 | Tool "tavily_search" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:tavily_search › annotations` |  |
| ⚪ info | MCP004 | Tool "tavily_extract" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:tavily_extract › annotations` |  |
| ⚪ info | MCP004 | Tool "tavily_crawl" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:tavily_crawl › annotations` |  |
| ⚪ info | MCP004 | Tool "tavily_map" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:tavily_map › annotations` |  |
| ⚪ info | MCP004 | Tool "tavily_research" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:tavily_research › annotations` |  |
| ⚪ info | MCP005 | Tool "tavily_crawl" accepts arbitrary URLs (open world) — a potential exfiltration channel. | `tool:tavily_crawl` |  |
| ⚪ info | MCP005 | Tool "tavily_map" accepts arbitrary URLs (open world) — a potential exfiltration channel. | `tool:tavily_map` |  |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `tavily_search` | 723 | – |
| `tavily_crawl` | 484 | – |
| `tavily_map` | 319 | – |
| `tavily_extract` | 209 | – |
| `tavily_research` | 189 | – |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
