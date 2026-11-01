# mcp-guard report: Mapbox MCP server

![mcp-guard](https://img.shields.io/badge/mcp--guard-A%20%C2%B7%2090-brightgreen)

| | |
|---|---|
| Target | `npx -y @mapbox/mcp-server@0.16.0` |
| Server | Mapbox MCP server 0.16.0 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 29 tools · 4 prompts · 8 resources |
| Context cost | ≈15,699 tokens per request |
| Score | **90/100 (A)** |
| Scanned | 2026-11-01T11:26:53.859Z with mcp-guard 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 90 | 100 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 1 medium · 🔵 2 low · ⚪ 0 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🟠 medium | MCP101 | Tool definitions cost ≈15,699 tokens per request (budget 8,000). |  | Shorten descriptions and schemas, or split into optional toolsets. |
| 🔵 low | MCP101 | Tool "render_map_tool" alone costs ≈2,115 tokens. | `tool:render_map_tool` | Trim the description and nested schema; move long docs into a resource. |
| 🔵 low | MCP101 | Tool "static_map_image_tool" alone costs ≈1,585 tokens. | `tool:static_map_image_tool` | Trim the description and nested schema; move long docs into a resource. |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `render_map_tool` | 2,115 | read-only, idempotent |
| `static_map_image_tool` | 1,585 | read-only, idempotent, open-world |
| `directions_tool` | 1,166 | read-only, idempotent, open-world |
| `search_and_geocode_tool` | 814 | read-only, idempotent, open-world |
| `isochrone_tool` | 750 | read-only, idempotent, open-world |
| `map_matching_tool` | 733 | read-only, idempotent, open-world |
| `matrix_tool` | 725 | read-only, idempotent, open-world |
| `optimization_tool` | 691 | read-only, idempotent, open-world |
| `place_details_tool` | 627 | read-only, idempotent, open-world |
| `category_search_tool` | 612 | read-only, idempotent, open-world |
| `reverse_geocode_tool` | 557 | read-only, idempotent, open-world |
| `ground_location_tool` | 505 | read-only, idempotent, open-world |
| `union_tool` | 461 | read-only, idempotent |
| `difference_tool` | 398 | read-only, idempotent |
| `intersect_tool` | 380 | read-only, idempotent |
| `distance_tool` | 314 | read-only, idempotent |
| `destination_tool` | 291 | read-only, idempotent |
| `simplify_tool` | 281 | read-only, idempotent |
| `buffer_tool` | 276 | read-only, idempotent |
| `nearest_point_tool` | 269 | read-only, idempotent |
| `bbox_tool` | 265 | read-only, idempotent |
| `points_within_polygon_tool` | 264 | read-only, idempotent |
| `nearest_point_on_line_tool` | 263 | read-only, idempotent |
| `area_tool` | 260 | read-only, idempotent |
| `centroid_tool` | 226 | read-only, idempotent |
| `bearing_tool` | 202 | read-only, idempotent |
| `midpoint_tool` | 200 | read-only, idempotent |
| `length_tool` | 195 | read-only, idempotent |
| `convex_tool` | 172 | read-only, idempotent |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
