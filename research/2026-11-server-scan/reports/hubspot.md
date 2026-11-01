# mcp-keeper report: hubspot-mcp-server

![mcp-keeper](https://img.shields.io/badge/mcp--keeper-A%20%C2%B7%2092-brightgreen)

| | |
|---|---|
| Target | `npx -y @hubspot/mcp-server@0.4.0` |
| Server | hubspot-mcp-server 0.4.0 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 21 tools · 0 prompts · 0 resources |
| Context cost | ≈9,354 tokens per request |
| Score | **92/100 (A)** |
| Scanned | 2026-11-01T11:33:45.737Z with mcp-keeper 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 94 | 100 | 98 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 1 medium · 🔵 1 low · ⚪ 0 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🟠 medium | MCP101 | Tool definitions cost ≈9,354 tokens per request (budget 8,000). |  | Shorten descriptions and schemas, or split into optional toolsets. |
| 🔵 low | MCP302 | Server declares the capability but resources/list is not implemented (MCP error -32601: Method not found). |  | Only declare capabilities you implement. |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `hubspot-search-objects` | 1,044 | read-only, open-world |
| `hubspot-create-property` | 976 | open-world |
| `hubspot-update-property` | 742 | open-world |
| `hubspot-batch-create-associations` | 673 | idempotent, open-world |
| `hubspot-batch-create-objects` | 593 | open-world |
| `hubspot-create-engagement` | 568 | open-world |
| `hubspot-list-associations` | 531 | read-only, open-world |
| `hubspot-update-engagement` | 529 | idempotent, open-world |
| `hubspot-list-objects` | 521 | read-only, open-world |
| `hubspot-batch-update-objects` | 503 | open-world |
| `hubspot-get-link` | 386 | read-only, idempotent |
| `hubspot-get-association-definitions` | 347 | read-only, idempotent, open-world |
| `hubspot-batch-read-objects` | 341 | read-only, idempotent, open-world |
| `hubspot-list-properties` | 324 | read-only, idempotent, open-world |
| `hubspot-get-property` | 239 | read-only, idempotent, open-world |
| `hubspot-get-user-details` | 228 | read-only, idempotent, open-world |
| `hubspot-list-workflows` | 228 | read-only, idempotent, open-world |
| `hubspot-get-workflow` | 179 | read-only, idempotent, open-world |
| `hubspot-get-schemas` | 157 | read-only, idempotent, open-world |
| `hubspot-generate-feedback-link` | 149 | read-only, idempotent |
| `hubspot-get-engagement` | 96 | read-only, idempotent, open-world |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
