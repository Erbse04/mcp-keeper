# mcp-keeper (Deutsch)

[![npm](https://img.shields.io/npm/v/mcp-keeper?color=cb3837&logo=npm)](https://www.npmjs.com/package/mcp-keeper)
[![CI](https://github.com/Erbse04/mcp-keeper/actions/workflows/ci.yml/badge.svg)](https://github.com/Erbse04/mcp-keeper/actions/workflows/ci.yml)
[![Lizenz: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Sicherheits-, Kosten- und Qualitätsprüfung für MCP-Server, mit einem Befehl.**

`mcp-keeper` verbindet sich mit einem MCP-Server (Model Context Protocol) und prüft alles, was das Sprachmodell zu sehen bekommt: Tools, Parameterbeschreibungen, Prompts, Ressourcen und Server-Anweisungen. Gefunden werden unter anderem:

- versteckte Anweisungen in Tool-Beschreibungen (Tool Poisoning, Prompt Injection)
- unsichtbare Zeichen und per Unicode-Tags versteckter Text (wird im Klartext angezeigt)
- API-Keys und Tokens in Beschreibungen
- fehlende oder irreführende Sicherheitsangaben (z. B. ein `delete_*`-Tool, das sich als „nur lesend“ ausgibt)
- hohe Tokenkosten durch zu viele oder zu lange Tool-Definitionen
- kaputte Schemas, ungültige oder doppelte Tool-Namen
- nachträgliche, stille Änderungen an Tools (Baseline-Vergleich, „Rug Pull“)

Zusätzlich prüft `mcp-keeper config` die MCP-Konfigurationsdateien von Claude Desktop, Claude Code, Cursor, VS Code, Windsurf, Gemini CLI, Zed und LM Studio auf Klartext-Secrets, nicht festgelegte Paketversionen, unverschlüsselte Verbindungen, riskante Docker-Optionen und zu weit gefasste Dateisystem-Zugriffe.

## Schnellstart

Benötigt Node.js 18 oder neuer.

```bash
# Lokalen Server prüfen – alles nach -- startet den Server
npx mcp-keeper scan -- npx -y @modelcontextprotocol/server-memory

# Entfernten Server prüfen
npx mcp-keeper scan --url https://mcp.example.com/mcp -H "Authorization: Bearer $TOKEN"

# Eigene Client-Konfigurationen prüfen
npx mcp-keeper config
```

Es gibt kein Konto und keine Telemetrie. Ausgaben sind als Text, Markdown, JSON, SARIF (GitHub Code Scanning) und als Badge möglich.

Proxy- und Zertifikats-Einstellungen (`HTTPS_PROXY`, `NODE_EXTRA_CA_CERTS`, …) werden an den Server weitergegeben, damit `npx`/`uvx` ihn auch hinter einem Firmen-Proxy herunterladen kann. Antwortet ein Server nicht rechtzeitig, nennt die Fehlermeldung konkrete Lösungen.

## In CI und als GitHub Action

```yaml
- uses: Erbse04/mcp-keeper@v0
  with:
    command: node build/index.js
    fail-on: high
    min-score: 80
```

Exit-Codes: `0` bestanden · `1` Schwellenwert überschritten · `2` keine Verbindung zum Server.

## Wichtig

Musterbasierte Prüfungen können Fehlalarme erzeugen und beweisen keine Sicherheit. Ein sauberer Bericht heißt „keine bekannten Warnsignale“, nicht „geprüft und sicher“. `scan` und `config --deep` starten die angegebenen Server, also bitte nur Code prüfen, den man auch ausführen würde – am besten in einem Container oder einer VM.

## Dokumentation (Englisch)

- [README](README.md) – Überblick und Beispiele
- [CLI-Referenz](docs/cli.md) · [Regeln](docs/rules.md) · [Config-Prüfung](docs/config-audit.md) · [Baselines](docs/baselines.md) · [CI und GitHub Action](docs/ci.md) · [Bewertung](docs/scoring.md) · [Bibliothek](docs/library.md)
- [Mitmachen](CONTRIBUTING.md) · [Sicherheitslücken melden](SECURITY.md)

Lizenz: MIT © [Tim Erben](https://www.tim-erben.de)
