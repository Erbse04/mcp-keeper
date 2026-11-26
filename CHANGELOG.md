# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [semantic versioning](https://semver.org).

## Unreleased

### Changed

- Proxy and CA variables (`HTTPS_PROXY`, `NO_PROXY`, `NODE_EXTRA_CA_CERTS`, …) are now forwarded to stdio servers, so servers started with `npx`/`uvx` work behind proxies without `--inherit-env`. Proxy URLs with credentials are not forwarded.
- When a stdio server does not answer in time, the error now explains what to try (longer `--timeout` for first-time `npx`/`uvx` downloads, `--show-stderr`, proxy credentials).
- `--version` and the version in reports are now read from `package.json` and can no longer drift from the published package.

### Documentation

- New guides in `docs/`: CLI reference, config audit, baselines, CI and GitHub Action, scoring, library API.
- README reworked with a real example, exit codes and links to the guides.
- Added CONTRIBUTING, SECURITY, issue and pull-request templates.

### Project

- CI now tests Node 18, 20, 22 and 24 and smoke-tests the packed npm tarball.
- Releases are published from GitHub Actions with npm provenance; the action's major tag is moved automatically.
- Dependabot for npm and GitHub Actions.

## 0.1.0 — 2026-11-01

First public release.

- `scan` for stdio and remote (Streamable HTTP / SSE) servers
- Rules MCP001–MCP005, MCP101, MCP201–MCP202, MCP301–MCP302
- Baselines for rug-pull detection (MCP010)
- `config` audit for Claude Desktop, Claude Code, Cursor, VS Code, Windsurf, Gemini CLI, Zed, LM Studio (CFG001–CFG005)
- Text, Markdown, JSON, SARIF and shields.io badge output
- GitHub Action
