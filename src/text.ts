import type { ServerSnapshot } from "./types.js";

export interface TextField {
  /** e.g. `tool:read_file` */
  owner: string;
  /** e.g. `description` or `inputSchema.properties.path.description` */
  path: string;
  text: string;
}

const SCHEMA_TEXT_KEYS = new Set(["description", "title"]);

function walkSchema(node: unknown, path: string, out: { path: string; text: string }[], depth = 0) {
  if (depth > 20 || node === null || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach((v, i) => {
      if (typeof v === "string") out.push({ path: `${path}[${i}]`, text: v });
      else walkSchema(v, `${path}[${i}]`, out, depth + 1);
    });
    return;
  }
  for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
    const p = path ? `${path}.${k}` : k;
    if (typeof v === "string") {
      if (SCHEMA_TEXT_KEYS.has(k) || k === "default" || k === "const" || k === "examples") {
        out.push({ path: p, text: v });
      }
    } else if (k === "enum" && Array.isArray(v)) {
      v.forEach((e, i) => typeof e === "string" && out.push({ path: `${p}[${i}]`, text: e }));
    } else {
      walkSchema(v, p, out, depth + 1);
    }
  }
}

/** Every piece of text the server sends that ends up in a model's context. */
export function* textFields(s: ServerSnapshot): Generator<TextField> {
  if (s.instructions) yield { owner: "server", path: "instructions", text: s.instructions };
  for (const t of s.tools) {
    const owner = `tool:${t.name}`;
    yield { owner, path: "name", text: String(t.name) };
    if (t.title) yield { owner, path: "title", text: t.title };
    if (typeof t.description === "string" && t.description) yield { owner, path: "description", text: t.description };
    if (t.annotations?.title) yield { owner, path: "annotations.title", text: t.annotations.title };
    const fields: { path: string; text: string }[] = [];
    walkSchema(t.inputSchema, "inputSchema", fields);
    if (t.outputSchema) walkSchema(t.outputSchema, "outputSchema", fields);
    for (const f of fields) yield { owner, ...f };
  }
  for (const p of s.prompts) {
    const owner = `prompt:${p.name}`;
    if (p.description) yield { owner, path: "description", text: p.description };
    for (const a of p.arguments ?? []) {
      if (a.description) yield { owner, path: `arguments.${a.name}.description`, text: a.description };
    }
  }
  for (const r of s.resources) {
    const owner = `resource:${r.uri}`;
    yield { owner, path: "name", text: r.name };
    if (r.description) yield { owner, path: "description", text: r.description };
  }
  for (const r of s.resourceTemplates) {
    const owner = `resourceTemplate:${r.uriTemplate}`;
    yield { owner, path: "name", text: r.name };
    if (r.description) yield { owner, path: "description", text: r.description };
  }
}

/**
 * Rough token estimate. Real tokenizers differ by model; ~4 characters per token
 * is the common rule of thumb for English text and JSON, and it is good enough to
 * compare servers with each other.
 */
export function estimateTokens(value: unknown): number {
  const s = typeof value === "string" ? value : JSON.stringify(value);
  return Math.ceil(s.length / 4);
}

/** What a client typically puts into the model context for one tool. */
export function toolContextPayload(t: ServerSnapshot["tools"][number]) {
  return { name: t.name, description: t.description ?? "", input_schema: t.inputSchema };
}

export function excerpt(text: string, index: number, length: number, radius = 40): string {
  const start = Math.max(0, index - radius);
  const end = Math.min(text.length, index + length + radius);
  let s = text.slice(start, end).replace(/\s+/g, " ");
  s = visualizeInvisible(s);
  return (start > 0 ? "…" : "") + s + (end < text.length ? "…" : "");
}

export function visualizeInvisible(s: string): string {
  return s.replace(INVISIBLE_RE, (c) => `<U+${c.codePointAt(0)!.toString(16).toUpperCase().padStart(4, "0")}>`);
}

// Zero-width, bidi controls, word joiners, BOM, Unicode tag characters, other C0/C1 controls (except \t \n \r).
// eslint-disable-next-line no-control-regex
export const INVISIBLE_RE = /[​-‏‪-‮⁠-⁤⁦-⁩﻿\u{E0000}-\u{E007F}\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/gu;
export const TAG_CHARS_RE = /[\u{E0000}-\u{E007F}]/gu;

/** Decode Unicode tag characters (ASCII smuggling) into readable text. */
export function decodeTagChars(s: string): string {
  let out = "";
  for (const ch of s) {
    const cp = ch.codePointAt(0)!;
    if (cp >= 0xe0020 && cp <= 0xe007e) out += String.fromCharCode(cp - 0xe0000);
  }
  return out;
}
