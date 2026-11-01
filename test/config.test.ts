import { describe, it, expect } from "vitest";
import { checkConfiguredServer, extractServers, isPinned, parseJsonc, type ConfiguredServer } from "../src/config.js";
import { createBaseline, compareBaseline } from "../src/baseline.js";
import type { ServerSnapshot } from "../src/types.js";

const server = (s: Partial<ConfiguredServer>): ConfiguredServer => ({ name: "s", client: "test", file: "x.json", ...s });
const rules = (s: Partial<ConfiguredServer>) => checkConfiguredServer(server(s)).map((f) => `${f.ruleId}:${f.severity}`);

describe("parseJsonc", () => {
  it("handles comments, trailing commas and slashes inside strings", () => {
    const j = parseJsonc(`{
      // comment
      "url": "https://example.com/a//b", /* block */
      "list": [1, 2,],
    }`) as { url: string; list: number[] };
    expect(j.url).toBe("https://example.com/a//b");
    expect(j.list).toEqual([1, 2]);
  });
});

describe("extractServers", () => {
  it("reads Claude/Cursor, VS Code, Zed and Claude Code project shapes", () => {
    expect(extractServers({ mcpServers: { a: { command: "npx", args: ["x"] } } }, "c", "f")).toHaveLength(1);
    expect(extractServers({ servers: { b: { type: "http", url: "https://x" } } }, "c", "f")[0].url).toBe("https://x");
    expect(extractServers({ context_servers: { z: { command: { path: "node", args: ["s.js"] } } } }, "c", "f")[0].args).toEqual(["s.js"]);
    expect(extractServers({ projects: { "/p": { mcpServers: { q: { command: "uvx", args: ["y"] } } } } }, "c", "f")[0].name).toBe("/p::q");
  });
});

describe("isPinned", () => {
  it.each([
    ["npm", "@modelcontextprotocol/server-memory", false],
    ["npm", "@modelcontextprotocol/server-memory@latest", false],
    ["npm", "@modelcontextprotocol/server-memory@2025.4.25", true],
    ["npm", "some-server@1.2.3", true],
    ["py", "mcp-server-fetch", false],
    ["py", "mcp-server-fetch==2025.1.17", true],
  ] as const)("%s %s → %s", (runner, pkg, expected) => {
    expect(isPinned(runner, pkg)).toBe(expected);
  });
});

describe("config rules", () => {
  it("CFG001 plaintext secrets in env, headers and args", () => {
    expect(rules({ command: "node", env: { GITHUB_TOKEN: "ghp_" + "x".repeat(36) } })).toContain("CFG001:high");
    expect(rules({ command: "node", env: { MY_API_KEY: "a8f7d6e5c4b3a2918273" } })).toContain("CFG001:high");
    expect(rules({ url: "https://x.example/mcp", headers: { Authorization: "Bearer abcdefghijklmnopqrstuvwxyz123456" } })).toContain("CFG001:high");
  });
  it("CFG001 ignores references and placeholders", () => {
    expect(rules({ command: "node", env: { API_KEY: "${env:API_KEY}", TOKEN: "<your-token>", PASSWORD: "${PASSWORD}" } })).toEqual([]);
  });
  it("CFG002 unpinned npx / uvx", () => {
    expect(rules({ command: "npx", args: ["-y", "@modelcontextprotocol/server-memory"] })).toContain("CFG002:medium");
    expect(rules({ command: "npx", args: ["-y", "@modelcontextprotocol/server-memory@2025.4.25"] })).toEqual([]);
    expect(rules({ command: "uvx", args: ["mcp-server-fetch"] })).toContain("CFG002:medium");
    expect(rules({ command: "pnpm", args: ["dlx", "some-mcp"] })).toContain("CFG002:medium");
  });
  it("CFG003 plain http to remote hosts only", () => {
    expect(rules({ url: "http://mcp.example.com/sse" })).toContain("CFG003:high");
    expect(rules({ url: "http://localhost:3000/mcp" })).toEqual([]);
  });
  it("CFG004 docker flags", () => {
    expect(rules({ command: "docker", args: ["run", "--privileged", "-v", "/:/host", "img"] })).toEqual(expect.arrayContaining(["CFG004:high"]));
    expect(rules({ command: "docker", args: ["run", "-v", "/var/run/docker.sock:/var/run/docker.sock", "img"] })).toContain("CFG004:high");
  });
  it("CFG005 filesystem server on root", () => {
    expect(rules({ command: "npx", args: ["-y", "@modelcontextprotocol/server-filesystem@2025.1.1", "/"] })).toContain("CFG005:high");
  });
});

describe("baseline", () => {
  const base: ServerSnapshot = {
    target: "t",
    transport: "static",
    tools: [{ name: "a", description: "one", inputSchema: { type: "object" } }],
    prompts: [],
    resources: [],
    resourceTemplates: [],
    timings: {},
    errors: [],
  };
  it("is stable regardless of key order", () => {
    const b1 = createBaseline(base);
    const reordered = { ...base, tools: [{ inputSchema: { type: "object" as const }, description: "one", name: "a" }] };
    expect(createBaseline(reordered).tools).toEqual(b1.tools);
  });
  it("detects changed, added and removed tools", () => {
    const b = createBaseline(base);
    const changed = { ...base, tools: [{ name: "a", description: "one — now also exfiltrates", inputSchema: { type: "object" as const } }, { name: "b", inputSchema: { type: "object" as const } }] };
    const f = compareBaseline(b, changed).map((x) => `${x.severity}:${x.message}`);
    expect(f.some((x) => x.startsWith("high:") && x.includes('"a" changed'))).toBe(true);
    expect(f.some((x) => x.includes('New tool "b"'))).toBe(true);
    expect(compareBaseline(b, { ...base, tools: [] }).some((x) => x.message.includes("removed"))).toBe(true);
  });
});
