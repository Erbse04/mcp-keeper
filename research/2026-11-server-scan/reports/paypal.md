# mcp-guard report: PayPal

![mcp-guard](https://img.shields.io/badge/mcp--guard-B%20%C2%B7%2084-green)

| | |
|---|---|
| Target | `npx -y @paypal/mcp@1.8.1 --tools=all` |
| Server | PayPal 1.11.0 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 28 tools · 0 prompts · 0 resources |
| Context cost | ≈10,482 tokens per request |
| Score | **84/100 (B)** |
| Scanned | 2026-11-01T11:26:53.883Z with mcp-guard 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 92 | 92 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 1 medium · 🔵 5 low · ⚪ 14 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🟠 medium | MCP101 | Tool definitions cost ≈10,482 tokens per request (budget 8,000). |  | Shorten descriptions and schemas, or split into optional toolsets. |
| 🔵 low | MCP101 | Tool "create_invoice" alone costs ≈2,672 tokens. | `tool:create_invoice` | Trim the description and nested schema; move long docs into a resource. |
| 🔵 low | MCP201 | Tool "create_order": 3 parameter(s) without description (notes, returnUrl, cancelUrl). | `tool:create_order › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "list_disputes": 2 parameter(s) without description (disputed_transaction_id, page_size). | `tool:list_disputes › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "accept_dispute_claim": 1 parameter(s) without description (dispute_id). | `tool:accept_dispute_claim › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| 🔵 low | MCP201 | Tool "list_transactions": 2 parameter(s) without description (transaction_status, page_size). | `tool:list_transactions › inputSchema.properties` | Describe format, units and allowed values for each parameter. |
| ⚪ info | MCP004 | Tool "list_invoices" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:list_invoices › annotations` |  |
| ⚪ info | MCP004 | Tool "get_invoice" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get_invoice › annotations` |  |
| ⚪ info | MCP004 | Tool "generate_invoice_qr_code" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:generate_invoice_qr_code › annotations` |  |
| ⚪ info | MCP004 | Tool "list_products" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:list_products › annotations` |  |
| ⚪ info | MCP004 | Tool "show_product_details" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:show_product_details › annotations` |  |
| ⚪ info | MCP004 | Tool "list_subscription_plans" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:list_subscription_plans › annotations` |  |
| ⚪ info | MCP004 | Tool "show_subscription_plan_details" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:show_subscription_plan_details › annotations` |  |
| ⚪ info | MCP004 | Tool "show_subscription_details" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:show_subscription_details › annotations` |  |
| ⚪ info | MCP004 | Tool "get_shipment_tracking" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get_shipment_tracking › annotations` |  |
| ⚪ info | MCP004 | Tool "list_disputes" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:list_disputes › annotations` |  |
| ⚪ info | MCP004 | Tool "get_dispute" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get_dispute › annotations` |  |
| ⚪ info | MCP004 | Tool "accept_dispute_claim" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:accept_dispute_claim › annotations` |  |
| ⚪ info | MCP004 | Tool "list_transactions" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:list_transactions › annotations` |  |
| ⚪ info | MCP004 | Tool "get_refund" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get_refund › annotations` |  |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `create_invoice` | 2,672 | – |
| `create_subscription` | 1,014 | – |
| `create_subscription_plan` | 912 | – |
| `create_order` | 725 | – |
| `list_transactions` | 508 | – |
| `create_shipment_tracking` | 475 | – |
| `create_product` | 420 | – |
| `create_refund` | 392 | – |
| `cancel_subscription` | 275 | – |
| `get_refund` | 234 | – |
| `list_subscription_plans` | 202 | – |
| `cancel_sent_invoice` | 192 | – |
| `send_invoice_reminder` | 191 | – |
| `get_shipment_tracking` | 190 | – |
| `send_invoice` | 187 | – |
| `list_disputes` | 185 | – |
| `list_invoices` | 169 | – |
| `list_products` | 163 | – |
| `generate_invoice_qr_code` | 162 | – |
| `show_subscription_details` | 162 | – |
| `accept_dispute_claim` | 162 | – |
| `get_dispute` | 149 | – |
| `update_product` | 140 | – |
| `get_order` | 134 | – |
| `show_subscription_plan_details` | 133 | – |
| `pay_order` | 122 | – |
| `show_product_details` | 108 | – |
| `get_invoice` | 104 | – |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
