# mcp-guard report: Browserbase MCP Server

![mcp-guard](https://img.shields.io/badge/mcp--guard-A%20%C2%B7%20100-brightgreen)

| | |
|---|---|
| Target | `npx -y @browserbasehq/mcp-server-browserbase@2.4.3` |
| Server | Browserbase MCP Server 2.3.0 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 9 tools · 0 prompts · 0 resources |
| Context cost | ≈1,248 tokens per request |
| Score | **100/100 (A)** |
| Scanned | 2026-11-01T11:26:53.787Z with mcp-guard 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 100 | 100 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 0 medium · 🔵 0 low · ⚪ 7 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| ⚪ info | MCP004 | Tool "browserbase_stagehand_act" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:browserbase_stagehand_act › annotations` |  |
| ⚪ info | MCP004 | Tool "browserbase_stagehand_extract" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:browserbase_stagehand_extract › annotations` |  |
| ⚪ info | MCP004 | Tool "browserbase_stagehand_observe" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:browserbase_stagehand_observe › annotations` |  |
| ⚪ info | MCP004 | Tool "browserbase_screenshot" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:browserbase_screenshot › annotations` |  |
| ⚪ info | MCP004 | Tool "browserbase_stagehand_get_url" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:browserbase_stagehand_get_url › annotations` |  |
| ⚪ info | MCP004 | Tool "browserbase_stagehand_agent" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:browserbase_stagehand_agent › annotations` |  |
| ⚪ info | MCP005 | Tool "browserbase_stagehand_navigate" accepts arbitrary URLs (open world) — a potential exfiltration channel. | `tool:browserbase_stagehand_navigate` |  |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `browserbase_stagehand_observe` | 298 | – |
| `browserbase_stagehand_act` | 209 | – |
| `browserbase_stagehand_agent` | 180 | – |
| `browserbase_stagehand_extract` | 164 | – |
| `browserbase_stagehand_navigate` | 110 | – |
| `browserbase_session_create` | 96 | – |
| `browserbase_screenshot` | 80 | – |
| `browserbase_session_close` | 56 | – |
| `browserbase_stagehand_get_url` | 55 | – |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
