# mcp-keeper report: currents

![mcp-keeper](https://img.shields.io/badge/mcp--keeper-B%20%C2%B7%2088-green)

| | |
|---|---|
| Target | `npx -y @currents/mcp@2.7.0` |
| Server | currents 2.7.0 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 43 tools · 3 prompts · 4 resources |
| Context cost | ≈16,724 tokens per request |
| Score | **88/100 (B)** |
| Scanned | 2026-11-01T11:33:45.699Z with mcp-keeper 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 88 | 100 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 2 medium · 🔵 0 low · ⚪ 2 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🟠 medium | MCP101 | Tool definitions cost ≈16,724 tokens per request (budget 8,000). |  | Shorten descriptions and schemas, or split into optional toolsets. |
| 🟠 medium | MCP101 | 43 tools exposed. Models choose tools less reliably beyond ~40. |  | Design fewer, intent-level tools (e.g. one `search` with filters instead of ten `list_*`). |
| ⚪ info | MCP005 | Tool "currents-create-webhook" accepts arbitrary URLs (open world) — a potential exfiltration channel. | `tool:currents-create-webhook` |  |
| ⚪ info | MCP005 | Tool "currents-update-webhook" accepts arbitrary URLs (open world) — a potential exfiltration channel. | `tool:currents-update-webhook` |  |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `currents-create-session` | 1,135 | – |
| `currents-list-pull-requests` | 1,038 | read-only, idempotent |
| `currents-add-attachments` | 957 | – |
| `currents-get-tests-performance` | 835 | read-only, idempotent |
| `currents-get-runs` | 751 | read-only, idempotent |
| `currents-get-errors-explorer` | 719 | read-only, idempotent |
| `currents-get-context` | 673 | read-only, idempotent |
| `currents-get-spec-files-performance` | 614 | read-only, idempotent |
| `currents-create-share-link` | 578 | open-world |
| `currents-get-test-results` | 570 | read-only, idempotent |
| `currents-create-action` | 562 | – |
| `currents-create-evidence-links` | 539 | open-world |
| `currents-update-action` | 534 | destructive |
| `currents-get-test-evidence` | 499 | read-only, idempotent |
| `currents-list-affected-tests` | 426 | read-only, idempotent |
| `currents-link-jira-issue` | 390 | open-world |
| `currents-get-affected-test-executions` | 363 | read-only, idempotent |
| `currents-create-jira-issue` | 350 | open-world |
| `currents-create-webhook` | 341 | open-world |
| `currents-get-project-insights` | 337 | read-only, idempotent |
| `currents-update-webhook` | 327 | destructive, open-world |
| `currents-get-action-executions` | 322 | read-only, idempotent |
| `currents-list-project-terms` | 317 | read-only, idempotent |
| `currents-get-projects` | 260 | read-only, idempotent |
| `currents-find-run` | 257 | read-only, idempotent |
| `currents-list-jira-issue-types` | 216 | read-only, idempotent, open-world |
| `currents-get-tests-signatures` | 216 | read-only, idempotent |
| `currents-list-jira-projects` | 201 | read-only, idempotent, open-world |
| `currents-list-actions` | 195 | read-only, idempotent |
| `currents-cancel-run-github-ci` | 194 | destructive, idempotent |
| `currents-get-run-details` | 176 | read-only, idempotent |
| `currents-reset-run` | 159 | destructive |
| `currents-list-webhooks` | 136 | read-only, idempotent |
| `currents-get-spec-instance` | 135 | read-only, idempotent |
| `currents-get-webhook` | 113 | read-only, idempotent |
| `currents-get-action` | 105 | read-only, idempotent |
| `currents-delete-action` | 105 | destructive, idempotent |
| `currents-get-project` | 104 | read-only, idempotent |
| `currents-enable-action` | 102 | idempotent |
| `currents-disable-action` | 102 | idempotent |
| `currents-delete-webhook` | 100 | destructive, idempotent |
| `currents-cancel-run` | 84 | destructive, idempotent |
| `currents-delete-run` | 83 | destructive, idempotent |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
