// Runs mcp-probe against every server in servers.json with limited concurrency.
import { readFileSync, writeFileSync } from "node:fs";
import { spawn } from "node:child_process";
const servers = JSON.parse(readFileSync(new URL("./servers.json", import.meta.url)));
const only = process.argv.slice(2);
const PROXY_ENV = ["HTTPS_PROXY","https_proxy","NO_PROXY","no_proxy","NODE_EXTRA_CA_CERTS","SSL_CERT_FILE","REQUESTS_CA_BUNDLE","UV_NATIVE_TLS","PIP_CERT","npm_config_https_proxy","npm_config_noproxy","NPM_CONFIG_USERCONFIG","PIP_CONFIG_FILE"];
const CLI = "../../dist/cli.js";
function scan(s) {
  return new Promise((resolve) => {
    const cmd = s.py ? ["uvx", s.py, ...(s.args ?? [])] : ["npx", "-y", s.pkg, ...(s.args ?? [])];
    const envArgs = [];
    for (const k of PROXY_ENV) if (process.env[k]) envArgs.push("-e", `${k}=${process.env[k]}`);
    for (const [k, v] of Object.entries(s.env ?? {})) envArgs.push("-e", `${k}=${v}`);
    const args = [CLI, "scan", ...envArgs, "--timeout", "180000", "--save-snapshot", `snapshots/${s.id}.json`, "--report-json", `reports/${s.id}.json`, "--report-md", `reports/${s.id}.md`, "-v", "--", ...cmd];
    const t0 = Date.now();
    const p = spawn(process.execPath, args, { cwd: new URL(".", import.meta.url).pathname });
    let out = "";
    p.stdout.on("data", (d) => (out += d)); p.stderr.on("data", (d) => (out += d));
    p.on("close", (code) => { writeFileSync(`logs/${s.id}.log`, out); console.log(`${s.id.padEnd(22)} exit=${code} ${((Date.now()-t0)/1000).toFixed(0)}s`); resolve(); });
  });
}
const queue = servers.filter((s) => !only.length || only.includes(s.id));
const N = 6;
await Promise.all(Array.from({ length: N }, async () => { while (queue.length) await scan(queue.shift()); }));
