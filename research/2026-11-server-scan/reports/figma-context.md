# mcp-probe report: Figma MCP Server

![mcp-probe](https://img.shields.io/badge/mcp--probe-A%20%C2%B7%20100-brightgreen)

| | |
|---|---|
| Target | `npx -y figma-developer-mcp@0.13.2 --stdio --figma-api-key=dummy` |
| Server | Figma MCP Server 0.13.2 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 2 tools · 0 prompts · 0 resources |
| Context cost | ≈925 tokens per request |
| Score | **100/100 (A)** |
| Scanned | 2026-11-01T11:13:32.129Z with mcp-probe 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 100 | 100 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 0 medium · 🔵 0 low · ⚪ 1 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| ⚪ info | MCP004 | Tool "download_figma_images" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:download_figma_images › annotations` |  |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `download_figma_images` | 662 | open-world |
| `get_figma_data` | 263 | read-only |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
