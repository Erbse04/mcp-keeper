# mcp-keeper veröffentlichen (Notiz für Tim, nicht Teil des npm-Pakets)

Namen:
- GitHub: `Erbse04/mcp-keeper`
- npm: `mcp-keeper` (am 01.11.2026 frei – möglichst bald veröffentlichen, damit er dir gehört)
- Befehl nach der Installation: `mcp-keeper`

## 1. GitHub
```bash
cd mcp-keeper
gh auth login                      # falls noch nicht angemeldet
gh repo create Erbse04/mcp-keeper --public --source . --push \
  --description "Security, token-cost and quality checks for MCP servers and client configs"
```

## 2. npm
Ein kostenloses Konto auf npmjs.com genügt (Zwei-Faktor-Anmeldung einschalten).

```bash
npm login
npm publish            # baut und testet vorher automatisch
```
Danach funktioniert für alle: `npx mcp-keeper scan -- …`

## 3. GitHub Action freischalten
```bash
git tag v0.1.0 && git tag v0 && git push --tags
```
Dann im Repo unter „Releases“ ein Release für v0.1.0 erstellen und optional „Publish this Action to the GitHub Marketplace“ anhaken. Nutzer schreiben dann `uses: Erbse04/mcp-keeper@v0`.

## 4. Auf tim-erben.de/software.html
Den fertigen Abschnitt aus `software-ergaenzung.html` einbauen (Platzhalter für E-Mail und Artikel-Link ersetzen).

## Vor dem ersten Release prüfen
- [ ] `npm view mcp-keeper` liefert noch 404 (Name frei)
- [ ] CI auf GitHub grün (Linux, macOS, Windows)
- [ ] `npx mcp-keeper --version` zeigt 0.1.0
