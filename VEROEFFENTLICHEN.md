# mcp-probe veröffentlichen (Notiz für Tim, nicht Teil des npm-Pakets)

## 1. GitHub
```bash
cd mcp-probe
gh repo create tim-erben/mcp-probe --public --source . --push
```
Falls du einen anderen GitHub-Namen nutzt: `tim-erben` in `package.json`, `README.md`, `src/report.ts` (SARIF-Links) und `examples/github-workflow.yml` ersetzen.

## 2. npm
```bash
npm login
npm publish            # baut und testet vorher automatisch (prepublishOnly)
```
Danach funktioniert für alle: `npx mcp-probe scan -- …`

## 3. GitHub Action freischalten
```bash
git tag v0.1.0 && git tag v0 && git push --tags
```
Dann im Repo unter „Releases“ ein Release für v0.1.0 erstellen und optional „Publish this Action to the GitHub Marketplace“ anhaken.

## 4. Auf tim-erben.de/software.html
Kurzer Eintrag, z. B.:

> **mcp-probe** (Open Source, MIT): Prüft MCP-Server und KI-Client-Konfigurationen auf versteckte Anweisungen, Klartext-Secrets, Tokenkosten und Qualitätsmängel. Ein Befehl: `npx mcp-probe scan -- <server>`. → GitHub

## Vor dem ersten Release prüfen
- [ ] Name `mcp-probe` auf npm noch frei? (`npm view mcp-probe` → 404 = frei; Stand 01.11.2026 frei)
- [ ] Repo-URL in package.json stimmt
- [ ] CI auf GitHub grün (Linux, macOS, Windows)
