import { readFileSync, readdirSync, existsSync } from "node:fs";
const servers = JSON.parse(readFileSync("servers.json"));
const rows = [];
for (const s of servers) {
  if (!existsSync(`reports/${s.id}.json`)) { rows.push({ id: s.id, failed: true }); continue; }
  const r = JSON.parse(readFileSync(`reports/${s.id}.json`));
  const c = { critical: 0, high: 0, medium: 0, low: 0, info: 0 };
  for (const f of r.findings) c[f.severity]++;
  rows.push({ id: s.id, vendor: s.vendor, pkg: s.pkg ?? s.py, name: r.snapshot.serverInfo?.name, ver: r.snapshot.serverInfo?.version, proto: r.snapshot.protocolVersion, tools: r.stats.tools, prompts: r.stats.prompts, res: r.stats.resources, tokens: r.stats.estimatedTokens, maxTool: r.stats.perTool[0], score: r.score, grade: r.grade, cat: r.categories, c, ann: r.snapshot.tools.filter(t => t.annotations && Object.keys(t.annotations).length).length });
}
console.log("id                    tools tok    score gr  crit high med low  ann/tools proto");
for (const r of rows.sort((a,b)=>(a.failed?1:0)-(b.failed?1:0)|| (b.score??0)-(a.score??0))) {
  if (r.failed) { console.log(r.id, "FAILED"); continue; }
  console.log(`${r.id.padEnd(22)}${String(r.tools).padStart(4)} ${String(r.tokens).padStart(6)} ${String(r.score).padStart(5)} ${r.grade}  ${String(r.c.critical).padStart(4)} ${String(r.c.high).padStart(4)} ${String(r.c.medium).padStart(3)} ${String(r.c.low).padStart(3)}  ${r.ann}/${r.tools}  ${r.proto}`);
}
import { writeFileSync } from "node:fs"; writeFileSync("summary.json", JSON.stringify(rows, null, 2));
