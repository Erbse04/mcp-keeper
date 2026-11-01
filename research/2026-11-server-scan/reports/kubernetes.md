# mcp-probe report: kubernetes

![mcp-probe](https://img.shields.io/badge/mcp--probe-A%20%C2%B7%2098-brightgreen)

| | |
|---|---|
| Target | `npx -y mcp-server-kubernetes@4.2.1` |
| Server | kubernetes 4.2.1 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 23 tools · 1 prompts · 5 resources |
| Context cost | ≈5,763 tokens per request |
| Score | **98/100 (A)** |
| Scanned | 2026-11-01T11:13:32.153Z with mcp-probe 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 100 | 98 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 0 medium · 🔵 1 low · ⚪ 7 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🔵 low | MCP201 | Tool "port_forward": 5 parameter(s) without description (resourceType, resourceName, localPort, targetPort, namespace). | `tool:port_forward › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| ⚪ info | MCP004 | Tool "cleanup" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:cleanup › annotations` |  |
| ⚪ info | MCP004 | Tool "kubectl_scale" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:kubectl_scale › annotations` |  |
| ⚪ info | MCP004 | Tool "kubectl_rollout" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:kubectl_rollout › annotations` |  |
| ⚪ info | MCP004 | Tool "node_management" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:node_management › annotations` |  |
| ⚪ info | MCP004 | Tool "port_forward" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:port_forward › annotations` |  |
| ⚪ info | MCP004 | Tool "kubectl_generic" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:kubectl_generic › annotations` |  |
| ⚪ info | MCP005 | Tool "exec_in_pod" can likely execute commands or code. | `tool:exec_in_pod` | Keep it behind user confirmation; consider an allow-list of commands or a sandbox. |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `kubectl_create` | 972 | – |
| `node_management` | 374 | destructive |
| `kubectl_delete` | 370 | destructive |
| `kubectl_logs` | 346 | read-only |
| `kubectl_patch` | 340 | destructive |
| `install_helm_chart` | 330 | destructive |
| `kubectl_get` | 314 | read-only |
| `kubectl_rollout` | 310 | destructive |
| `exec_in_pod` | 301 | destructive |
| `kubectl_generic` | 296 | destructive |
| `kubectl_apply` | 256 | destructive |
| `upgrade_helm_chart` | 254 | destructive |
| `kubectl_context` | 203 | idempotent |
| `explain_resource` | 188 | read-only |
| `kubectl_describe` | 183 | read-only |
| `list_api_resources` | 165 | read-only |
| `kubectl_scale` | 162 | destructive |
| `uninstall_helm_chart` | 114 | destructive |
| `port_forward` | 92 | – |
| `kubectl_reconnect` | 80 | – |
| `ping` | 43 | read-only |
| `stop_port_forward` | 41 | – |
| `cleanup` | 29 | destructive |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
