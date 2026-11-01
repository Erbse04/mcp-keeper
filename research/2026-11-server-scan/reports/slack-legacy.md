# mcp-probe report: Slack MCP Server

![mcp-probe](https://img.shields.io/badge/mcp--probe-A%20%C2%B7%2098-brightgreen)

| | |
|---|---|
| Target | `npx -y @modelcontextprotocol/server-slack@2025.4.25` |
| Server | Slack MCP Server 1.0.0 |
| Protocol | 2024-11-05 (stdio) |
| Exposes | 8 tools · 0 prompts · 0 resources |
| Context cost | ≈782 tokens per request |
| Score | **98/100 (A)** |
| Scanned | 2026-11-01T11:13:32.213Z with mcp-probe 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 100 | 100 | 98 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 0 medium · 🔵 1 low · ⚪ 5 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🔵 low | MCP302 | Server negotiated protocol 2024-11-05; latest supported by this checker is 2025-11-25. |  | Update your MCP SDK. |
| ⚪ info | MCP004 | Tool "slack_list_channels" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:slack_list_channels › annotations` |  |
| ⚪ info | MCP004 | Tool "slack_get_channel_history" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:slack_get_channel_history › annotations` |  |
| ⚪ info | MCP004 | Tool "slack_get_thread_replies" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:slack_get_thread_replies › annotations` |  |
| ⚪ info | MCP004 | Tool "slack_get_users" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:slack_get_users › annotations` |  |
| ⚪ info | MCP004 | Tool "slack_get_user_profile" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:slack_get_user_profile › annotations` |  |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `slack_reply_to_thread` | 142 | – |
| `slack_get_thread_replies` | 125 | – |
| `slack_add_reaction` | 111 | – |
| `slack_list_channels` | 92 | – |
| `slack_get_users` | 92 | – |
| `slack_get_channel_history` | 83 | – |
| `slack_post_message` | 78 | – |
| `slack_get_user_profile` | 59 | – |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
