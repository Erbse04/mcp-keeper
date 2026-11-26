# Baselines (rug-pull detection)

A *rug pull* is a server that looks harmless when you review it and later changes what it tells the model — a new sentence in a tool description, an extra parameter, a dropped `destructiveHint`. Clients usually do not show such changes. A baseline pins the state you reviewed so `mcp-keeper` can report every difference.

## Workflow

1. **Review** the server once, e.g. with `mcp-keeper scan -v -f md -o review.md -- …`.
2. **Pin** the reviewed state:

   ```bash
   mcp-keeper scan --baseline mcp-baseline.json --update-baseline -- npx -y some-server@1.4.0
   ```

3. **Commit** `mcp-baseline.json` to your repository.
4. **Compare** on every run, locally or in CI:

   ```bash
   mcp-keeper scan --baseline mcp-baseline.json --fail-on high -- npx -y some-server@1.4.0
   ```

5. After an intentional upgrade, review the change and run step 2 again.

## What is compared

The baseline stores a hash (SHA-256, shortened to 128 bits) per tool — over description, title, input and output schema and annotations — per prompt (description and arguments) and of the server instructions. It stores no text, so it is small and safe to commit.

| Change | Severity |
|---|---|
| Tool, prompt or server instructions changed (instructions added or removed included) | high |
| New tool | low |
| Tool removed | info |

New or removed prompts are not reported.

Changes are reported as rule **MCP010** and count towards the security score. Pin the package version as well (see [CFG002](config-audit.md#checks)): a baseline tells you *that* something changed, a pinned version makes sure nothing changes without you upgrading.

## File format

```json
{
  "version": 1,
  "server": "memory-server@1.0.0",
  "createdAt": "2026-11-26T12:41:28.081Z",
  "tools": {
    "create_entities": "fbdfe8b75d268a60fd9fd07dde8ce6a0",
    "read_graph": "69f359fa79fccc0e8a32b8cc822c9cb5"
  },
  "prompts": {}
}
```

`instructions` holds a hash too and is omitted when the server sends none. Hashes are computed over a canonical JSON form (sorted keys), so the key order a server uses does not matter.
