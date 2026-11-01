# mcp-probe report: mcp-time

![mcp-probe](https://img.shields.io/badge/mcp--probe-A%20%C2%B7%20100-brightgreen)

| | |
|---|---|
| Target | `uvx mcp-server-time` |
| Server | mcp-time 2026.10.28 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 2 tools · 0 prompts · 0 resources |
| Context cost | ≈286 tokens per request |
| Score | **100/100 (A)** |
| Scanned | 2026-11-01T11:13:32.215Z with mcp-probe 0.1.0 |

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
| `convert_time` | 189 | read-only, idempotent |
| `get_current_time` | 97 | read-only, idempotent |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
