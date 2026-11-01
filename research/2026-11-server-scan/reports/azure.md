# mcp-guard report: Azure MCP Server

![mcp-guard](https://img.shields.io/badge/mcp--guard-B%20%C2%B7%2088-green)

| | |
|---|---|
| Target | `npx -y @azure/mcp@4.0.0-beta.4 server start` |
| Server | Azure MCP Server 4.0.0-beta.4 |
| Protocol | 2025-11-25 (stdio) |
| Exposes | 73 tools · 0 prompts · 0 resources |
| Context cost | ≈18,943 tokens per request |
| Score | **88/100 (B)** |
| Scanned | 2026-11-01T11:26:53.780Z with mcp-guard 0.1.0 |

## Scores

| Security | Efficiency | Quality | Compliance |
|---|---|---|---|
| 100 | 88 | 100 | 100 |

## Findings

🛑 0 critical · 🔴 0 high · 🟠 2 medium · 🔵 0 low · ⚪ 67 info

| | Rule | Finding | Location | Fix |
|---|---|---|---|---|
| 🟠 medium | MCP101 | Tool definitions cost ≈18,943 tokens per request (budget 8,000). |  | Shorten descriptions and schemas, or split into optional toolsets. |
| 🟠 medium | MCP101 | 73 tools exposed. Models choose tools less reliably beyond ~40. |  | Design fewer, intent-level tools (e.g. one `search` with filters instead of ten `list_*`). |
| ⚪ info | MCP004 | Tool "documentation" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:documentation › annotations` |  |
| ⚪ info | MCP004 | Tool "azd" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:azd › annotations` |  |
| ⚪ info | MCP004 | Tool "foundry" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:foundry › annotations` |  |
| ⚪ info | MCP004 | Tool "arm" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:arm › annotations` |  |
| ⚪ info | MCP004 | Tool "get_azure_bestpractices" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:get_azure_bestpractices › annotations` |  |
| ⚪ info | MCP004 | Tool "adme" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:adme › annotations` |  |
| ⚪ info | MCP004 | Tool "aks" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:aks › annotations` |  |
| ⚪ info | MCP004 | Tool "appconfig" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:appconfig › annotations` |  |
| ⚪ info | MCP004 | Tool "applens" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:applens › annotations` |  |
| ⚪ info | MCP004 | Tool "appservice" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:appservice › annotations` |  |
| ⚪ info | MCP004 | Tool "role" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:role › annotations` |  |
| ⚪ info | MCP004 | Tool "azurebackup" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:azurebackup › annotations` |  |
| ⚪ info | MCP004 | Tool "datadog" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:datadog › annotations` |  |
| ⚪ info | MCP004 | Tool "managedlustre" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:managedlustre › annotations` |  |
| ⚪ info | MCP004 | Tool "azuremigrate" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:azuremigrate › annotations` |  |
| ⚪ info | MCP004 | Tool "azureterraform" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:azureterraform › annotations` |  |
| ⚪ info | MCP004 | Tool "azureterraformbestpractices" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:azureterraformbestpractices › annotations` |  |
| ⚪ info | MCP004 | Tool "deviceprovisioning" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:deviceprovisioning › annotations` |  |
| ⚪ info | MCP004 | Tool "deviceregistry" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:deviceregistry › annotations` |  |
| ⚪ info | MCP004 | Tool "eventgrid" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:eventgrid › annotations` |  |
| ⚪ info | MCP004 | Tool "acr" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:acr › annotations` |  |
| ⚪ info | MCP004 | Tool "advisor" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:advisor › annotations` |  |
| ⚪ info | MCP004 | Tool "bicepschema" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:bicepschema › annotations` |  |
| ⚪ info | MCP004 | Tool "cosmos" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:cosmos › annotations` |  |
| ⚪ info | MCP004 | Tool "cloudarchitect" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:cloudarchitect › annotations` |  |
| ⚪ info | MCP004 | Tool "communication" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:communication › annotations` |  |
| ⚪ info | MCP004 | Tool "compute" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:compute › annotations` |  |
| ⚪ info | MCP004 | Tool "confidentialledger" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:confidentialledger › annotations` |  |
| ⚪ info | MCP004 | Tool "containerapps" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:containerapps › annotations` |  |
| ⚪ info | MCP004 | Tool "eventhubs" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:eventhubs › annotations` |  |
| ⚪ info | MCP004 | Tool "fileshares" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:fileshares › annotations` |  |
| ⚪ info | MCP004 | Tool "foundryextensions" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:foundryextensions › annotations` |  |
| ⚪ info | MCP004 | Tool "functionapp" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:functionapp › annotations` |  |
| ⚪ info | MCP004 | Tool "functions" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:functions › annotations` |  |
| ⚪ info | MCP004 | Tool "grafana" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:grafana › annotations` |  |
| ⚪ info | MCP004 | Tool "insights" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:insights › annotations` |  |
| ⚪ info | MCP004 | Tool "iothub" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:iothub › annotations` |  |
| ⚪ info | MCP004 | Tool "iotoperations" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:iotoperations › annotations` |  |
| ⚪ info | MCP004 | Tool "keyvault" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:keyvault › annotations` |  |
| ⚪ info | MCP004 | Tool "kusto" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:kusto › annotations` |  |
| ⚪ info | MCP004 | Tool "loadtesting" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:loadtesting › annotations` |  |
| ⚪ info | MCP004 | Tool "marketplace" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:marketplace › annotations` |  |
| ⚪ info | MCP004 | Tool "quota" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:quota › annotations` |  |
| ⚪ info | MCP004 | Tool "monitor" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:monitor › annotations` |  |
| ⚪ info | MCP004 | Tool "applicationinsights" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:applicationinsights › annotations` |  |
| ⚪ info | MCP004 | Tool "mysql" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:mysql › annotations` |  |
| ⚪ info | MCP004 | Tool "netappfiles" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:netappfiles › annotations` |  |
| ⚪ info | MCP004 | Tool "optimization" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:optimization › annotations` |  |
| ⚪ info | MCP004 | Tool "policy" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:policy › annotations` |  |
| ⚪ info | MCP004 | Tool "postgres" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:postgres › annotations` |  |
| ⚪ info | MCP004 | Tool "pricing" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:pricing › annotations` |  |
| ⚪ info | MCP004 | Tool "redis" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:redis › annotations` |  |
| ⚪ info | MCP004 | Tool "resiliency" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:resiliency › annotations` |  |
| ⚪ info | MCP004 | Tool "resiliencyagent" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:resiliencyagent › annotations` |  |
| ⚪ info | MCP004 | Tool "resourcehealth" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:resourcehealth › annotations` |  |
| ⚪ info | MCP004 | Tool "search" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:search › annotations` |  |
| ⚪ info | MCP004 | Tool "speech" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:speech › annotations` |  |
| ⚪ info | MCP004 | Tool "servicebus" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:servicebus › annotations` |  |
| ⚪ info | MCP004 | Tool "servicefabric" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:servicefabric › annotations` |  |
| ⚪ info | MCP004 | Tool "signalr" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:signalr › annotations` |  |
| ⚪ info | MCP004 | Tool "sreagent" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:sreagent › annotations` |  |
| ⚪ info | MCP004 | Tool "sql" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:sql › annotations` |  |
| ⚪ info | MCP004 | Tool "storage" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:storage › annotations` |  |
| ⚪ info | MCP004 | Tool "storagesync" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:storagesync › annotations` |  |
| ⚪ info | MCP004 | Tool "virtualdesktop" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:virtualdesktop › annotations` |  |
| ⚪ info | MCP004 | Tool "wellarchitectedframework" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:wellarchitectedframework › annotations` |  |
| ⚪ info | MCP004 | Tool "workbooks" has no readOnlyHint. If it only reads, mark it so clients can run it without confirmation. | `tool:workbooks › annotations` |  |

## Tools by context cost

| Tool | ≈ Tokens | Annotations |
|---|---:|---|
| `resiliencyagent` | 518 | – |
| `get_azure_bestpractices` | 503 | – |
| `compute` | 424 | – |
| `advisor` | 349 | – |
| `storage` | 343 | – |
| `monitor` | 341 | – |
| `azuremigrate` | 340 | – |
| `documentation` | 326 | – |
| `aks` | 305 | – |
| `azd` | 297 | – |
| `servicebus` | 287 | – |
| `azureterraform` | 281 | – |
| `foundryextensions` | 275 | – |
| `iotoperations` | 273 | – |
| `applens` | 270 | – |
| `azurebackup` | 269 | – |
| `search` | 269 | – |
| `foundry` | 268 | – |
| `speech` | 268 | – |
| `deploy` | 263 | – |
| `sreagent` | 255 | – |
| `pricing` | 251 | – |
| `managedlustre` | 250 | – |
| `deviceregistry` | 249 | – |
| `wellarchitectedframework` | 249 | – |
| `arm` | 248 | – |
| `redis` | 248 | – |
| `appconfig` | 246 | – |
| `loadtesting` | 246 | – |
| `bicepschema` | 245 | – |
| `optimization` | 245 | – |
| `servicefabric` | 243 | – |
| `storagesync` | 242 | – |
| `workbooks` | 242 | – |
| `insights` | 241 | – |
| `kusto` | 240 | – |
| `role` | 239 | – |
| `postgres` | 239 | – |
| `sql` | 239 | – |
| `datadog` | 238 | – |
| `grafana` | 238 | – |
| `functions` | 237 | – |
| `mysql` | 236 | – |
| `confidentialledger` | 235 | – |
| `applicationinsights` | 234 | – |
| `azureterraformbestpractices` | 232 | – |
| `adme` | 231 | – |
| `resourcehealth` | 227 | – |
| `containerapps` | 225 | – |
| `acr` | 224 | – |
| `virtualdesktop` | 224 | – |
| `policy` | 221 | – |
| `cosmos` | 219 | – |
| `eventhubs` | 217 | – |
| `resiliency` | 217 | – |
| `group_resource_list` | 216 | read-only, idempotent |
| `cloudarchitect` | 212 | – |
| `signalr` | 212 | – |
| `appservice` | 211 | – |
| `quota` | 209 | – |
| `communication` | 208 | – |
| `eventgrid` | 207 | – |
| `marketplace` | 205 | – |
| `functionapp` | 203 | – |
| `subscription_list` | 201 | read-only, idempotent |
| `keyvault` | 200 | – |
| `netappfiles` | 199 | – |
| `fileshares` | 196 | – |
| `deviceprovisioning` | 193 | – |
| `iothub` | 193 | – |
| `extension_cli_generate` | 185 | read-only, idempotent |
| `extension_cli_install` | 167 | read-only, idempotent |
| `group_list` | 162 | read-only, idempotent |

<sub>Token counts are estimates (~4 characters per token). Pattern-based checks can produce false positives and cannot prove a server is safe.</sub>
