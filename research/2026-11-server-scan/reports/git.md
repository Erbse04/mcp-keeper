# mcp-probe report: mcp-git

![mcp-probe](https://img.shields.io/badge/mcp--probe-A%20%C2%B7%2094-brightgreen)

| | |
|---|---|
| Target | `uvx mcp-server-git --repository /tmp/scan-sandbox` |
| Server | mcp-git 2026.10.28 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 12 tools · 0 prompts · 0 resources |
| Context cost | ≈1,241 tokens per request |
| Score | **94/100 (A)** |
| Scanned | 2026-11-01T11:13:32.140Z with mcp-probe 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 100 | 94 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 0 medium · 🔵 3 low · ⚪ 0 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🔵 low | MCP201 | Tool "git_log" has a very short description ("Shows the commit logs"). | `tool:git_log` | Add when to use it and what it returns. |
| 🔵 low | MCP201 | Tool "git_checkout" has a very short description ("Switches branches"). | `tool:git_checkout` | Add when to use it and what it returns. |
| 🔵 low | MCP201 | Tool "git_branch" has a very short description ("List Git branches"). | `tool:git_branch` | Add when to use it and what it returns. |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `git_log` | 226 | read-only, idempotent |
| `git_branch` | 218 | read-only, idempotent |
| `git_create_branch` | 144 | – |
| `git_diff` | 88 | read-only, idempotent |
| `git_diff_unstaged` | 84 | read-only, idempotent |
| `git_show` | 82 | read-only, idempotent |
| `git_diff_staged` | 77 | read-only, idempotent |
| `git_add` | 77 | idempotent |
| `git_commit` | 69 | – |
| `git_checkout` | 69 | – |
| `git_status` | 54 | read-only, idempotent |
| `git_reset` | 53 | destructive, idempotent |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
