import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js'

export interface MCPToolSummary {
  name: string
  description?: string
  inputSchema: Record<string, unknown>
}

function getMcpConfig() {
  const endpoint = process.env.DRP_MCP_SERVER_URL
  if (!endpoint) throw new Error('DRP_MCP_SERVER_URL is not configured')
  const allowedTools = (process.env.DRP_MCP_ALLOWED_TOOLS ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
  return { endpoint, allowedTools, token: process.env.DRP_MCP_BEARER_TOKEN }
}

export async function withRemoteMcp<T>(
  action: (client: Client, allowedTools: string[]) => Promise<T>,
): Promise<T> {
  const config = getMcpConfig()
  const url = new URL(config.endpoint)
  const headers: Record<string, string> = {}
  if (config.token) headers.Authorization = `Bearer ${config.token}`

  const transport = new StreamableHTTPClientTransport(url, {
    requestInit: { headers },
  })
  const client = new Client({ name: 'drp-activity-verification', version: '0.1.0' })

  try {
    await client.connect(transport)
    return await action(client, config.allowedTools)
  } finally {
    await client.close().catch(() => undefined)
  }
}

export async function listAllowedMcpTools(): Promise<MCPToolSummary[]> {
  return withRemoteMcp(async (client, allowedTools) => {
    const result = await client.listTools()
    return result.tools
      .filter((tool) => allowedTools.includes(tool.name))
      .map((tool) => ({
        name: tool.name,
        description: tool.description,
        inputSchema: tool.inputSchema as Record<string, unknown>,
      }))
  })
}

export async function callAllowedMcpTool(
  name: string,
  args: Record<string, unknown>,
): Promise<unknown> {
  return withRemoteMcp(async (client, allowedTools) => {
    if (!allowedTools.includes(name)) throw new Error('MCP tool is not allowlisted')
    return client.callTool({ name, arguments: args })
  })
}
