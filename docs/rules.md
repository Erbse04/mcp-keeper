# Rules

Every check, why it matters and how to fix it. Disable individual rules with `--disable ID[,ID…]`.

## Server rules (`mcp-guard scan`)

### MCP001

**Prompt-injection patterns in model-visible text** · security

Clients put tool descriptions, parameter descriptions, prompt and resource descriptions and server `instructions` into the model context as trusted text. A malicious or compromised server can use them to steer the model (“tool poisoning”). Patterns detected:

| Severity | Pattern | Example |
|---|---|---|
| critical | overriding instructions | “Ignore all previous instructions …” |
| critical | hiding actions from the user | “Do not tell the user …” |
| high | pseudo-markup | `<IMPORTANT>`, `<system>` |
| high | credential / config file references | `~/.ssh/id_rsa`, `.aws/credentials`, `mcp.json` |
| high | sending data to fixed recipients | “send all … to x@y.z”, “always bcc …” |
| medium | tool shadowing | “When the user calls the send_email tool …” |
| medium | redirecting away from other tools | “Instead of using the X tool …” |
| medium | conversation / system-prompt references | “include the conversation history” |
| medium | role switching | “You are now …”, “new instructions” |
| low | urgency phrasing | “VERY IMPORTANT:” |

**Fix:** describe what the tool does, its inputs and outputs. Never address the model about other tools, the user or unrelated data.

### MCP002

**Invisible or deceptive characters** · security

- **critical** — Unicode tag characters (U+E0000–U+E007F). They are invisible in UIs but models read them as ASCII; `mcp-guard` decodes the hidden text for you.
- **high** — bidi overrides (U+202A–U+202E, U+2066–U+2069) that make text render differently than it reads.
- **medium** — zero-width characters, control characters, and runs of 60+ spaces or 8+ newlines that push text out of view in approval dialogs.

### MCP003

**Secrets in model-visible text** · security

Detects Anthropic, OpenAI, GitHub, GitLab, AWS, Google, Slack, Stripe and Notion tokens, private keys, JWTs, bearer tokens and credentials in URLs. Output is always redacted. **Fix:** remove and rotate the secret.

### MCP004

**Missing or misleading tool safety annotations** · security

Clients use `readOnlyHint`, `destructiveHint`, `idempotentHint` and `openWorldHint` to decide when to ask the user. Tool names are split into words (`deleteAllFiles` → delete, all, files) and checked:

- **high** — destructive verb in the name but `readOnlyHint: true`
- **medium** — destructive or exec tool without any hint
- **info** — tool that looks read-only but is not marked as such

### MCP005

**High-power capabilities** · security · informational

Lists tools that likely execute commands or code (name or a `command`/`code`/`script` parameter) and tools that accept arbitrary URLs. Not a defect, but these are what an injected prompt would target.

### MCP010

**Changed since baseline** · security · only with `--baseline`

Hashes each tool (description, input/output schema, annotations, title), each prompt and the server instructions. Changes are **high**, new tools **low**, removed tools **info**.

### MCP101

**Context (token) cost** · efficiency

Tool definitions are sent with every request.

- **high** — more than ≈20,000 tokens in total
- **medium** — more than ≈8,000 tokens, or more than 40 tools
- **low** — a single tool above ≈1,200 tokens

### MCP201

**Descriptions** · quality

Missing tool description (medium), under 25 characters (low), over 3,000 characters (low), parameters without description (low; self-explanatory names like `id`, `path`, `query`, `limit` are exempt).

### MCP202

**Input schema structure** · quality

`inputSchema.type` must be `"object"` (high); `required` must be an array of defined properties (medium); parameters should have a type (low).

### MCP301

**Tool names** · compliance

Duplicate names (high); characters outside `A–Z a–z 0–9 _ - .` or longer than 128 (medium); longer than 64 (low — prefixed names may exceed model API limits).

### MCP302

**Protocol and metadata** · compliance

Entries that fail validation against the official MCP schema (high — the official TypeScript client rejects the whole list), failed list calls (medium), outdated protocol version (low), missing server version (low).

## Config rules (`mcp-guard config`)

### CFG001

**Plaintext secrets** — values in `env`, `headers`, `args` or URLs that match a token format, or whose key looks like a secret (`*_API_KEY`, `*TOKEN*`, `*PASSWORD*` …) and whose value is not a reference such as `${env:VAR}`.

### CFG002

**Unpinned packages** — `npx`, `bunx`, `pnpm dlx`, `yarn dlx`, `uvx`, `pipx run` without an exact version. Every start may run new code.

### CFG003

**Unencrypted remote transport** — `http://` to anything other than localhost.

### CFG004

**Risky container flags** — `--privileged`, host networking, mounting `/`, the home directory or the Docker socket.

### CFG005

**Overly broad filesystem access** — filesystem servers given `/`, `~` or the whole home directory.
