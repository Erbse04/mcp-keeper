# mcp-guard report: mcp-fetch

![mcp-guard](https://img.shields.io/badge/mcp--guard-A%20%C2%B7%20100-brightgreen)

| | |
|---|---|
| Target | `uvx mcp-server-fetch` |
| Server | mcp-fetch 2026.10.28 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 1 tools · 1 prompts · 0 resources |
| Context cost | ≈262 tokens per request |
| Score | **100/100 (A)** |
| Scanned | 2026-11-01T11:26:53.814Z with mcp-guard 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 100 | 100 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 0 medium · 🔵 0 low · ⚪ 1 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| ⚪ info | MCP005 | Tool "fetch" accepts arbitrary URLs (open world) — a potential exfiltration channel. | `tool:fetch` |  |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `fetch` | 262 | read-only, idempotent, open-world |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
