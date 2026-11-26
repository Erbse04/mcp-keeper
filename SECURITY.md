# Security policy

## Supported versions

Security fixes are released for the latest published version of `mcp-keeper`.

## Reporting a vulnerability

Please **do not open a public issue** for vulnerabilities in `mcp-keeper` itself — for example a way to make it execute code while analyzing a snapshot, leak secrets into reports, or hide malicious content from its checks on purpose.

Report it privately through [GitHub security advisories](https://github.com/Erbse04/mcp-keeper/security/advisories/new) or via the contact details on [tim-erben.de](https://www.tim-erben.de). You can expect a first response within a week. Once a fix is released, you will be credited in the advisory unless you prefer otherwise.

## Malicious MCP servers

If you found a **third-party MCP server** that poisons its tools, contact its maintainers or the registry that distributes it (e.g. npm, PyPI). A new detection pattern for `mcp-keeper` can then be reported as a normal issue — redact anything that is not public yet.

## Scope and safe use

`mcp-keeper scan` and `mcp-keeper config --deep` **start** the servers they analyze. That is by design and not a vulnerability. Only scan code you are willing to run, ideally in a container or VM. Analyzing a saved snapshot with `--snapshot` does not start anything.
