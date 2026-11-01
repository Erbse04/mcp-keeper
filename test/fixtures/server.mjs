// Fixture MCP server: `node server.mjs <tools.json>` serves the tools from a JSON file.
import { readFileSync } from "node:fs";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const def = JSON.parse(readFileSync(process.argv[2], "utf8"));
const server = new Server(
  { name: def.name ?? "fixture", version: def.version ?? "1.0.0" },
  { capabilities: { tools: {} }, instructions: def.instructions },
);
server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: def.tools }));
server.setRequestHandler(CallToolRequestSchema, async () => ({ content: [{ type: "text", text: "ok" }] }));
await server.connect(new StdioServerTransport());
