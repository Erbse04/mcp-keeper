# mcp-guard (Deutsch)

**Sicherheits-, Kosten- und Qualitätsprüfung für MCP-Server, mit einem Befehl.**

`mcp-guard` verbindet sich mit einem MCP-Server (Model Context Protocol) und prüft alles, was das Sprachmodell zu sehen bekommt: Tools, Parameterbeschreibungen, Prompts, Ressourcen und Server-Anweisungen. Gefunden werden unter anderem:

- versteckte Anweisungen in Tool-Beschreibungen (Tool Poisoning, Prompt Injection)
- unsichtbare Zeichen und per Unicode-Tags versteckter Text (wird im Klartext angezeigt)
- API-Keys und Tokens in Beschreibungen
- fehlende oder irreführende Sicherheitsangaben (z. B. ein `delete_*`-Tool, das sich als „nur lesend“ ausgibt)
- hohe Tokenkosten durch zu viele oder zu lange Tool-Definitionen
- kaputte Schemas, ungültige oder doppelte Tool-Namen
- nachträgliche, stille Änderungen an Tools (Baseline-Vergleich, „Rug Pull“)

Zusätzlich prüft `mcp-guard config` die MCP-Konfigurationsdateien von Claude Desktop, Claude Code, Cursor, VS Code, Windsurf, Gemini CLI, Zed und LM Studio auf Klartext-Secrets, nicht festgelegte Paketversionen, unverschlüsselte Verbindungen und riskante Docker-Optionen.

```bash
npx @erbse04/mcp-guard scan -- npx -y @modelcontextprotocol/server-memory
npx @erbse04/mcp-guard scan --url https://mcp.example.com/mcp -H "Authorization: Bearer $TOKEN"
npx @erbse04/mcp-guard config
```

Es gibt kein Konto und keine Telemetrie. Ausgaben sind als Text, Markdown, JSON, SARIF (GitHub Code Scanning) und als Badge möglich.

**Wichtig:** Musterbasierte Prüfungen können Fehlalarme erzeugen und beweisen keine Sicherheit. Ein sauberer Bericht heißt „keine bekannten Warnsignale“, nicht „geprüft und sicher“. `scan` startet den angegebenen Server, also bitte nur Code prüfen, den man auch ausführen würde.

Alle Details stehen in der englischen [README](README.md).

Lizenz: MIT © [Tim Erben](https://www.tim-erben.de)
