# mcp-probe report: pinecone-mcp

![mcp-probe](https://img.shields.io/badge/mcp--probe-A%20%C2%B7%2090-brightgreen)

| | |
|---|---|
| Target | `npx -y @pinecone-database/mcp@0.4.0` |
| Server | pinecone-mcp 0.4.0 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 12 tools · 0 prompts · 0 resources |
| Context cost | ≈8,936 tokens per request |
| Score | **90/100 (A)** |
| Scanned | 2026-11-01T11:13:32.203Z with mcp-probe 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 92 | 98 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 1 medium · 🔵 2 low · ⚪ 0 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🟠 medium | MCP101 | Tool definitions cost ≈8,936 tokens per request (budget 8,000). |  | Shorten descriptions and schemas, or split into optional toolsets. |
| 🔵 low | MCP101 | Tool "search-records" alone costs ≈1,202 tokens. | `tool:search-records` | Trim the description and nested schema; move long docs into a resource. |
| 🔵 low | MCP202 | Tool "rerank-documents": parameter(s) without a type: documents. | `tool:rerank-documents › inputSchema.properties` |  |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `search-records` | 1,202 | read-only |
| `cascading-search` | 1,160 | read-only |
| `create-document-index` | 1,031 | idempotent |
| `search-document-index` | 1,011 | read-only |
| `create-index-for-model` | 931 | idempotent |
| `rerank-documents` | 776 | read-only |
| `upsert-documents` | 631 | destructive, idempotent |
| `upsert-records` | 598 | destructive, idempotent |
| `describe-index` | 420 | read-only |
| `describe-index-stats` | 420 | read-only |
| `list-indexes` | 362 | read-only |
| `search-docs` | 101 | read-only |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
