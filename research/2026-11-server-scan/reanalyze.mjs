// Re-run the rules on saved snapshots (no network) and refresh reports.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { analyze, toMarkdown, toJson } from "../../dist/index.js";
for (const f of readdirSync("snapshots")) {
  const s = JSON.parse(readFileSync(`snapshots/${f}`));
  const r = analyze(s);
  writeFileSync(`reports/${f}`, toJson(r));
  writeFileSync(`reports/${f.replace(".json", ".md")}`, toMarkdown(r));
}
