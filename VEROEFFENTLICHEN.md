# mcp-guard veröffentlichen (Notiz für Tim, nicht Teil des npm-Pakets)

Namen:
- GitHub: `Erbse04/mcp-guard`
- npm: `@erbse04/mcp-guard`. Der Name `mcp-guard` ohne Präfix gehört auf npm einem anderen Projekt.
- Befehl nach der Installation: `mcp-guard`

## 1. GitHub
```bash
cd mcp-guard
gh auth login                      # falls noch nicht angemeldet
gh repo create Erbse04/mcp-guard --public --source . --push \
  --description "Security, token-cost and quality checks for MCP servers and client configs"
```

## 2. npm
Der Scope `@erbse04` funktioniert nur, wenn dein npm-Benutzername `erbse04` ist (oder du eine npm-Organisation `erbse04` anlegst: npmjs.com → Add Organization, kostenlos für öffentliche Pakete). Hast du einen anderen npm-Namen, ersetze `@erbse04` überall durch deinen (Suchen und Ersetzen im ganzen Repo).

```bash
npm login
npm publish            # baut und testet vorher automatisch; publishConfig.access=public ist gesetzt
```
Danach funktioniert für alle: `npx @erbse04/mcp-guard scan -- …`

## 3. GitHub Action freischalten
```bash
git tag v0.1.0 && git tag v0 && git push --tags
```
Dann im Repo unter „Releases“ ein Release für v0.1.0 erstellen und optional „Publish this Action to the GitHub Marketplace“ anhaken. Nutzer schreiben dann `uses: Erbse04/mcp-guard@v0`.

## 4. Auf tim-erben.de/software.html
Den fertigen Abschnitt aus `software-ergaenzung.html` einbauen (Platzhalter für E-Mail und Artikel-Link ersetzen).

## Vor dem ersten Release prüfen
- [ ] npm-Scope passt zu deinem npm-Konto
- [ ] CI auf GitHub grün (Linux, macOS, Windows)
- [ ] `npx @erbse04/mcp-guard --version` zeigt 0.1.0
