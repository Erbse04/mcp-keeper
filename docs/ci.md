# CI and GitHub Action

Run `mcp-keeper` on every push to catch poisoned descriptions, broken schemas and silent tool changes before your users do.

## GitHub Action

```yaml
- uses: Erbse04/mcp-keeper@v0
  with:
    command: node build/index.js
    fail-on: high
    min-score: 80
```

The action runs `npx mcp-keeper scan`, appends the Markdown report to the job summary, sets the outputs below and fails the step when a threshold is exceeded.

### Inputs

| Input | Default | Description |
|---|---|---|
| `command` | — | Command that starts a stdio server, e.g. `node build/index.js`. Split on whitespace; quoting is not supported — wrap complex commands in a script. |
| `url` | — | URL of a remote server (instead of `command`). |
| `headers` | — | HTTP headers for remote servers, one `Name: value` per line. Use secrets, e.g. `Authorization: Bearer ${{ secrets.MCP_TOKEN }}`. |
| `fail-on` | `high` | Fail on a finding of this severity or worse: `critical`, `high`, `medium`, `low`, `info`, `none`. Note that the CLI default is `none`. |
| `min-score` | `0` | Fail if the score is below this value. |
| `baseline` | — | Path to a committed baseline for [rug-pull detection](baselines.md). |
| `sarif` | — | Path to write a SARIF file to. |
| `version` | `latest` | mcp-keeper version to run. Pin it (e.g. `0.1.0`) for reproducible builds. |

Either `command` or `url` is required.

### Outputs

| Output | Description |
|---|---|
| `score` | Score 0–100 |
| `grade` | Grade A–F |

### Complete workflow with code scanning

```yaml
# .github/workflows/mcp-keeper.yml
name: mcp-keeper
on: [push, pull_request]
permissions:
  contents: read
  security-events: write   # only needed for the SARIF upload
jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22 }
      - run: npm ci && npm run build
      - id: keeper
        uses: Erbse04/mcp-keeper@v0
        with:
          command: node build/index.js
          fail-on: high
          min-score: 80
          baseline: mcp-baseline.json   # optional, see docs/baselines.md
          sarif: mcp-keeper.sarif
      - uses: github/codeql-action/upload-sarif@v3
        if: always()
        with:
          sarif_file: mcp-keeper.sarif
      - run: echo "mcp-keeper grade ${{ steps.keeper.outputs.grade }} (${{ steps.keeper.outputs.score }}/100)"
        if: always()
```

The same file is in [`examples/github-workflow.yml`](../examples/github-workflow.yml). Findings then appear under **Security → Code scanning**; SARIF results point to the file given with `--sarif-artifact` (default `mcp.json`).

## Other CI systems

Any runner with Node.js 18+ works.

```yaml
# .gitlab-ci.yml
mcp-keeper:
  image: node:22
  script:
    - npm ci && npm run build
    - npx mcp-keeper@0.1.0 scan --fail-on high --min-score 80 --report-md mcp-keeper.md -- node build/index.js
  artifacts:
    when: always
    paths: [mcp-keeper.md]
```

Exit codes: `0` passed, `1` threshold failed, `2` could not connect. See [cli.md](cli.md#exit-codes).

## Score badge

Either take the static badge URL from the Markdown report:

```bash
mcp-keeper scan -f md -- node build/index.js | grep -m1 'img.shields.io'
```

or write an endpoint badge with `--badge badge.json`, commit it (or publish it from CI) and reference it:

```markdown
![mcp-keeper](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/<owner>/<repo>/main/badge.json)
```

## Tips

- **Scan the build you ship.** Point `command` at the same entry point your users start.
- **Servers that need credentials** to list their tools: use a dedicated test key from repository secrets, passed through `env` on the step, and run the CLI with `-e NAME="$NAME"` instead of the action if you need to forward it.
- **Noisy informational rules** can be skipped with `--disable` when calling the CLI directly.
