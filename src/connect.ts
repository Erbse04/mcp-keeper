import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport, getDefaultEnvironment } from "@modelcontextprotocol/sdk/client/stdio.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import type { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import { ToolSchema, PromptSchema, ResourceSchema, ResourceTemplateSchema, type JSONRPCMessage } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import type { ServerSnapshot } from "./types.js";
import { VERSION } from "./version.js";

export type Target =
  | { kind: "stdio"; command: string; args: string[]; env?: Record<string, string>; cwd?: string }
  | { kind: "http"; url: string; headers?: Record<string, string>; transport?: "auto" | "streamable-http" | "sse" };

export interface ConnectOptions {
  timeoutMs?: number;
  /** Called with server stderr lines (stdio only). */
  onStderr?: (line: string) => void;
}

/** Wraps a transport to observe the negotiated protocol version. */
class ObservingTransport implements Transport {
  protocolVersion?: string;
  onclose?: () => void;
  onerror?: (error: Error) => void;
  onmessage?: (message: JSONRPCMessage) => void;
  constructor(private inner: Transport) {
    inner.onclose = () => this.onclose?.();
    inner.onerror = (e) => this.onerror?.(e);
    inner.onmessage = (m) => {
      const r = (m as { result?: { protocolVersion?: unknown } }).result;
      if (r && typeof r.protocolVersion === "string") this.protocolVersion = r.protocolVersion;
      this.onmessage?.(m);
    };
  }
  get sessionId() {
    return this.inner.sessionId;
  }
  start() {
    return this.inner.start();
  }
  send(m: JSONRPCMessage, o?: Parameters<Transport["send"]>[1]) {
    return this.inner.send(m, o);
  }
  close() {
    return this.inner.close();
  }
  setProtocolVersion(v: string) {
    this.inner.setProtocolVersion?.(v);
  }
}

export function describeTarget(t: Target): string {
  return t.kind === "stdio" ? [t.command, ...t.args].join(" ") : t.url;
}

function withTimeout<T>(p: Promise<T>, ms: number, what: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`${what} timed out after ${ms} ms`)), ms);
    p.then(
      (v) => {
        clearTimeout(timer);
        resolve(v);
      },
      (e) => {
        clearTimeout(timer);
        reject(e);
      },
    );
  });
}

async function openClient(target: Target, opts: ConnectOptions, mode?: "streamable-http" | "sse") {
  const timeoutMs = opts.timeoutMs ?? 30_000;
  let inner: Transport;
  let transport: ServerSnapshot["transport"];
  const stderrLines: string[] = [];
  if (target.kind === "stdio") {
    const t = new StdioClientTransport({
      command: target.command,
      args: target.args,
      env: { ...getDefaultEnvironment(), ...(target.env ?? {}) },
      cwd: target.cwd,
      stderr: "pipe",
    });
    t.stderr?.on("data", (chunk: Buffer) => {
      for (const line of chunk.toString("utf8").split(/\r?\n/)) {
        if (!line) continue;
        stderrLines.push(line);
        if (stderrLines.length > 200) stderrLines.shift();
        opts.onStderr?.(line);
      }
    });
    inner = t;
    transport = "stdio";
  } else if (mode === "sse") {
    inner = new SSEClientTransport(new URL(target.url), { requestInit: { headers: target.headers } });
    transport = "sse";
  } else {
    inner = new StreamableHTTPClientTransport(new URL(target.url), { requestInit: { headers: target.headers } });
    transport = "streamable-http";
  }
  const observing = new ObservingTransport(inner);
  const client = new Client({ name: "mcp-keeper", version: VERSION }, { capabilities: {} });
  const t0 = Date.now();
  try {
    await withTimeout(client.connect(observing, { timeout: timeoutMs }), timeoutMs, "connect");
  } catch (e) {
    await client.close().catch(() => {});
    const tail = stderrLines.slice(-15).join("\n");
    const err = new Error(`${(e as Error).message}${tail ? `\n--- server stderr (last lines) ---\n${tail}` : ""}`);
    throw err;
  }
  return { client, observing, transport, connectMs: Date.now() - t0 };
}

/**
 * We request lists with a permissive schema so that one malformed entry does not hide
 * the whole server, and validate each entry ourselves to report it as a finding.
 */
const permissiveList = (key: string) => z.object({ [key]: z.array(z.any()).optional(), nextCursor: z.string().optional() }).passthrough();

const ITEM_SCHEMAS: Record<string, z.ZodTypeAny> = {
  tools: ToolSchema as unknown as z.ZodTypeAny,
  prompts: PromptSchema as unknown as z.ZodTypeAny,
  resources: ResourceSchema as unknown as z.ZodTypeAny,
  resourceTemplates: ResourceTemplateSchema as unknown as z.ZodTypeAny,
};

async function listAll<T>(fn: (cursor?: string) => Promise<{ nextCursor?: string } & Record<string, unknown>>, key: string): Promise<T[]> {
  const items: T[] = [];
  let cursor: string | undefined;
  for (let page = 0; page < 100; page++) {
    const res = await fn(cursor);
    items.push(...((res[key] as T[]) ?? []));
    cursor = res.nextCursor;
    if (!cursor) break;
  }
  return items;
}

/** Connect to an MCP server and collect everything the model would see. */
export async function collectSnapshot(target: Target, opts: ConnectOptions = {}): Promise<ServerSnapshot> {
  const timeoutMs = opts.timeoutMs ?? 30_000;
  let opened: Awaited<ReturnType<typeof openClient>>;
  if (target.kind === "http" && (target.transport ?? "auto") === "auto") {
    try {
      opened = await openClient(target, opts, "streamable-http");
    } catch (e) {
      try {
        opened = await openClient(target, opts, "sse");
      } catch {
        throw e;
      }
    }
  } else {
    opened = await openClient(target, opts, target.kind === "http" ? (target.transport as "sse" | "streamable-http") : undefined);
  }
  const { client, observing, transport, connectMs } = opened;
  const caps = (client.getServerCapabilities() ?? {}) as Record<string, unknown>;
  const snapshot: ServerSnapshot = {
    target: describeTarget(target),
    transport,
    serverInfo: client.getServerVersion() as ServerSnapshot["serverInfo"],
    protocolVersion: observing.protocolVersion,
    capabilities: caps,
    instructions: client.getInstructions(),
    tools: [],
    prompts: [],
    resources: [],
    resourceTemplates: [],
    timings: { connectMs },
    errors: [],
    schemaErrors: [],
  };
  const t1 = Date.now();
  const reqOpts = { timeout: timeoutMs };
  const raw = (method: string, key: string, cursor?: string) =>
    client.request({ method, params: cursor ? { cursor } : {} } as never, permissiveList(key) as never, reqOpts) as Promise<{ nextCursor?: string } & Record<string, unknown>>;
  const attempt = async (stage: string, fn: () => Promise<void>) => {
    try {
      await fn();
    } catch (e) {
      snapshot.errors.push({ stage, message: (e as Error).message.split("\n")[0] });
    }
  };
  try {
    if (caps.tools) await attempt("tools/list", async () => {
      snapshot.tools = await listAll((cursor) => raw("tools/list", "tools", cursor), "tools");
    });
    if (caps.prompts) await attempt("prompts/list", async () => {
      snapshot.prompts = await listAll((cursor) => raw("prompts/list", "prompts", cursor), "prompts");
    });
    if (caps.resources) {
      await attempt("resources/list", async () => {
        snapshot.resources = await listAll((cursor) => raw("resources/list", "resources", cursor), "resources");
      });
      await attempt("resources/templates/list", async () => {
        snapshot.resourceTemplates = await listAll((cursor) => raw("resources/templates/list", "resourceTemplates", cursor), "resourceTemplates");
      });
    }
    // Validate each entry against the official schema.
    for (const key of ["tools", "prompts", "resources", "resourceTemplates"] as const) {
      const items = snapshot[key] as unknown[];
      items.forEach((item, i) => {
        const r = ITEM_SCHEMAS[key].safeParse(item);
        if (!r.success) {
          const name = (item as { name?: string; uri?: string; uriTemplate?: string })?.name ?? `#${i}`;
          const issue = r.error.issues[0];
          snapshot.schemaErrors!.push({ kind: key, name: String(name), message: `${issue.path.join(".") || "(root)"}: ${issue.message}` });
        }
      });
    }
  } finally {
    snapshot.timings.listMs = Date.now() - t1;
    await client.close().catch(() => {});
  }
  return snapshot;
}
