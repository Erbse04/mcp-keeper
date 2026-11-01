# mcp-keeper report: LaunchDarkly

![mcp-keeper](https://img.shields.io/badge/mcp--keeper-B%20%C2%B7%2082-green)

| | |
|---|---|
| Target | `npx -y @launchdarkly/mcp-server@0.7.2 start --api-key dummy` |
| Server | LaunchDarkly 0.7.2 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 30 tools · 0 prompts · 0 resources |
| Context cost | ≈7,853 tokens per request |
| Score | **82/100 (B)** |
| Scanned | 2026-11-01T11:33:45.744Z with mcp-keeper 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 82 | 100 | 100 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 3 medium · 🔵 0 low · ⚪ 15 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🟠 medium | MCP004 | Tool "delete-feature-flag" looks destructive but has no destructiveHint/readOnlyHint annotation. | `tool:delete-feature-flag › annotations` | Add annotations: { destructiveHint: true, readOnlyHint: false }. |
| 🟠 medium | MCP004 | Tool "delete-ai-config" looks destructive but has no destructiveHint/readOnlyHint annotation. | `tool:delete-ai-config › annotations` | Add annotations: { destructiveHint: true, readOnlyHint: false }. |
| 🟠 medium | MCP004 | Tool "delete-ai-config-variation" looks destructive but has no destructiveHint/readOnlyHint annotation. | `tool:delete-ai-config-variation › annotations` | Add annotations: { destructiveHint: true, readOnlyHint: false }. |
| ⚪ info | MCP004 | Tool "get-audit-log-entries" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get-audit-log-entries › annotations` |  |
| ⚪ info | MCP004 | Tool "get-code-references" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get-code-references › annotations` |  |
| ⚪ info | MCP004 | Tool "get-flag-status-across-environments" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get-flag-status-across-environments › annotations` |  |
| ⚪ info | MCP004 | Tool "list-feature-flags" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:list-feature-flags › annotations` |  |
| ⚪ info | MCP004 | Tool "get-feature-flag" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get-feature-flag › annotations` |  |
| ⚪ info | MCP004 | Tool "list-metrics" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:list-metrics › annotations` |  |
| ⚪ info | MCP004 | Tool "get-metric" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get-metric › annotations` |  |
| ⚪ info | MCP004 | Tool "get-environments" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get-environments › annotations` |  |
| ⚪ info | MCP004 | Tool "list-experiments" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:list-experiments › annotations` |  |
| ⚪ info | MCP004 | Tool "get-experiment" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get-experiment › annotations` |  |
| ⚪ info | MCP004 | Tool "list-experiments-any-environment" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:list-experiments-any-environment › annotations` |  |
| ⚪ info | MCP004 | Tool "get-ai-config-targeting" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get-ai-config-targeting › annotations` |  |
| ⚪ info | MCP004 | Tool "list-ai-configs" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:list-ai-configs › annotations` |  |
| ⚪ info | MCP004 | Tool "get-ai-config" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get-ai-config › annotations` |  |
| ⚪ info | MCP004 | Tool "get-ai-config-variation" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get-ai-config-variation › annotations` |  |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `create-metric` | 767 | – |
| `create-experiment` | 726 | – |
| `create-ai-config` | 645 | – |
| `create-feature-flag` | 564 | – |
| `update-ai-config-variation` | 543 | – |
| `create-ai-config-variation` | 526 | – |
| `create-experiment-iteration` | 489 | – |
| `update-feature-flag` | 246 | – |
| `get-audit-log-entries` | 210 | – |
| `list-feature-flags` | 206 | – |
| `update-experiment` | 203 | – |
| `update-ai-config` | 199 | – |
| `update-ai-config-targeting` | 176 | – |
| `get-environments` | 165 | – |
| `list-ai-configs` | 164 | – |
| `get-feature-flag` | 161 | – |
| `get-flag-status-across-environments` | 156 | – |
| `get-code-references` | 153 | – |
| `list-experiments` | 153 | – |
| `list-experiments-any-environment` | 151 | – |
| `update-metric` | 150 | – |
| `delete-feature-flag` | 136 | – |
| `get-experiment` | 136 | – |
| `list-metrics` | 134 | – |
| `get-ai-config-targeting` | 121 | – |
| `delete-ai-config` | 117 | – |
| `get-ai-config-variation` | 116 | – |
| `get-metric` | 114 | – |
| `delete-ai-config-variation` | 114 | – |
| `get-ai-config` | 112 | – |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
