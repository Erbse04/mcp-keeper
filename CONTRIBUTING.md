# Contributing to mcp-keeper

Thanks for helping make MCP servers safer. The most valuable contributions are real-world examples: a poisoning pattern `mcp-keeper` misses, or a false positive on a legitimate server.

## Reporting false positives and missed patterns

Use the [issue templates](https://github.com/Erbse04/mcp-keeper/issues/new/choose). Please include:

- the `mcp-keeper` version (`mcp-keeper --version`),
- the rule ID and the finding as printed,
- the description or schema text that triggered it (or should have) — **redact secrets and private data**,
- if possible, the server package and version, or a snapshot from `--save-snapshot` with private data removed.

If the missed pattern is being actively exploited, please report it privately instead — see [SECURITY.md](SECURITY.md).

## Development setup

Requires Node.js 18 or newer.

```bash
git clone https://github.com/Erbse04/mcp-keeper.git
cd mcp-keeper
npm install
npm test                                   # unit and end-to-end tests (vitest)
npm run build                              # compile to dist/
npm run dev -- scan -- node test/fixtures/server.mjs test/fixtures/evil.json   # run the CLI from source
```

## Project layout

| Path | Contents |
|---|---|
| `src/cli.ts` | Command-line interface (commander) |
| `src/connect.ts` | Connecting to stdio / Streamable HTTP / SSE servers and collecting a snapshot |
| `src/rules.ts` | Server rules MCP001–MCP302 |
| `src/config.ts` | Config discovery, parsing and rules CFG001–CFG005 |
| `src/baseline.ts` | Baselines and MCP010 |
| `src/score.ts` | Running rules and scoring |
| `src/report.ts` | Text, Markdown, JSON, SARIF and badge output |
| `src/secrets.ts`, `src/text.ts` | Secret patterns, text extraction, invisible-character handling |
| `test/fixtures/` | A tiny configurable MCP server plus a clean (`good.json`) and a poisoned (`evil.json`) definition |
| `docs/` | User documentation |
| `research/` | Reproducible scans of public servers |

## Changing or adding rules

- Every new pattern needs a test in `test/rules.test.ts` that shows it **fires** on the bad text and **does not fire** on a similar legitimate text. False positives erode trust faster than missed patterns.
- Choose the severity by impact: *critical* only for text that clearly tries to override the model or hide actions from the user.
- Keep messages short, specific and actionable, and give a `fix` where one exists.
- Update [`docs/rules.md`](docs/rules.md) and add a line to the **Unreleased** section of [`CHANGELOG.md`](CHANGELOG.md).
- New rules can lower existing scores — mention that in the pull request.

## Pull requests

1. Fork, create a branch, keep the change focused.
2. `npm run build && npm test` must pass. CI runs on Linux, macOS and Windows with Node 18 – 24.
3. Describe what changed and why; link the issue if there is one.

By contributing you agree that your contribution is licensed under the [MIT License](LICENSE).
