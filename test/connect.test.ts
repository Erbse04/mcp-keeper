import { describe, it, expect } from "vitest";
import { proxyEnvironment, timeoutHint } from "../src/connect.js";

describe("proxyEnvironment", () => {
  it("forwards proxy and CA variables", () => {
    const env = proxyEnvironment({
      HTTPS_PROXY: "http://proxy.corp:8080",
      no_proxy: "localhost,.corp",
      NODE_EXTRA_CA_CERTS: "/etc/ssl/corp.pem",
      GITHUB_TOKEN: "ghp_secret",
      AWS_SECRET_ACCESS_KEY: "x",
    });
    expect(env).toEqual({ HTTPS_PROXY: "http://proxy.corp:8080", no_proxy: "localhost,.corp", NODE_EXTRA_CA_CERTS: "/etc/ssl/corp.pem" });
  });

  it("does not forward proxy URLs that contain credentials", () => {
    expect(proxyEnvironment({ HTTPS_PROXY: "http://alice:s3cret@proxy.corp:8080", HTTP_PROXY: "http://proxy.corp:8080" })).toEqual({ HTTP_PROXY: "http://proxy.corp:8080" });
  });

  it("skips empty values", () => {
    expect(proxyEnvironment({ HTTPS_PROXY: "" })).toEqual({});
  });
});

describe("timeoutHint", () => {
  it("explains first-start downloads for package runners", () => {
    const h = timeoutHint({ kind: "stdio", command: "npx", args: ["-y", "some-server"] }, 30_000);
    expect(h).toContain("downloading");
    expect(h).toContain("--timeout 90000");
    expect(h).toContain("--inherit-env");
  });

  it("recognizes Windows command names", () => {
    expect(timeoutHint({ kind: "stdio", command: "C:\\Program Files\\nodejs\\npx.cmd", args: [] }, 30_000)).toContain("downloading");
  });

  it("gives general advice for other commands and nothing for remote servers", () => {
    const h = timeoutHint({ kind: "stdio", command: "node", args: ["build/index.js"] }, 60_000);
    expect(h).toContain("--timeout 180000");
    expect(h).toContain("--show-stderr");
    expect(h).not.toContain("downloading");
    expect(timeoutHint({ kind: "http", url: "https://example.com/mcp" }, 30_000)).toBe("");
  });
});
