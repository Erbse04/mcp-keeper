import type {
  Tool,
  Prompt,
  Resource,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/types.js";

export type Severity = "critical" | "high" | "medium" | "low" | "info";
export const SEVERITY_ORDER: Severity[] = ["critical", "high", "medium", "low", "info"];

export type Category = "security" | "efficiency" | "quality" | "compliance";

export interface ServerSnapshot {
  /** Human readable description of what was scanned (command line or URL). */
  target: string;
  transport: "stdio" | "streamable-http" | "sse" | "static";
  serverInfo?: { name: string; version: string; title?: string };
  protocolVersion?: string;
  capabilities?: Record<string, unknown>;
  instructions?: string;
  tools: Tool[];
  prompts: Prompt[];
  resources: Resource[];
  resourceTemplates: ResourceTemplate[];
  timings: { connectMs?: number; listMs?: number };
  /** Non-fatal problems while collecting (e.g. a list call failed). */
  errors: { stage: string; message: string }[];
  /** Entries that do not validate against the official MCP schema. */
  schemaErrors?: { kind: string; name: string; message: string }[];
}

export interface Finding {
  ruleId: string;
  severity: Severity;
  message: string;
  /** Where the problem is, e.g. `tool:read_file > inputSchema.properties.path.description` */
  location?: string;
  /** Short excerpt of the offending text. */
  evidence?: string;
  /** Suggested fix. */
  fix?: string;
  /** The server is unusable in standard clients because of this (caps the score at 59). */
  blocking?: boolean;
}

export interface RuleContext {
  snapshot: ServerSnapshot;
}

export interface Rule {
  id: string;
  title: string;
  category: Category;
  description: string;
  check(ctx: RuleContext): Finding[];
}

export interface CategoryScore {
  score: number;
  findings: number;
}

export interface ScanResult {
  tool: { name: "mcp-keeper"; version: string };
  scannedAt: string;
  snapshot: ServerSnapshot;
  findings: Finding[];
  score: number;
  grade: "A" | "B" | "C" | "D" | "F";
  categories: Record<Category, CategoryScore>;
  stats: {
    tools: number;
    prompts: number;
    resources: number;
    estimatedTokens: number;
    perTool: { name: string; tokens: number }[];
  };
}
