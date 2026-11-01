# mcp-guard report: exa-search-server

![mcp-guard](https://img.shields.io/badge/mcp--guard-A%20%C2%B7%20100-brightgreen)

| | |
|---|---|
| Target | `npx -y exa-mcp-server@3.4.2` |
| Server | exa-search-server 3.4.2 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 2 tools · 1 prompts · 1 resources |
| Context cost | ≈464 tokens per request |
| Score | **100/100 (A)** |
| Scanned | 2026-11-01T11:26:53.813Z with mcp-guard 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 100 | 100 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 0 medium · 🔵 0 low · ⚪ 0 info

No findings. 🎉

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `web_search_exa` | 290 | read-only, idempotent, open-world |
| `web_fetch_exa` | 174 | read-only, idempotent, open-world |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
