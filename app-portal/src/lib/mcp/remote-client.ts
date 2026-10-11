type JsonRpcResponse = {
  jsonrpc?: string
  id?: number | string
  result?: any
  error?: { code?: number; message?: string; data?: unknown }
}

const MCP_PROTOCOL_VERSION = '2025-03-26'

function getMcpConfig() {
  const endpoint = process.env.DRP_MCP_SERVER_URL
  if (!endpoint) throw new Error('DRP_MCP_SERVER_URL is not configured')
  const allowedTools = (process.env.DRP_MCP_ALLOWED_TOOLS ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
  return { endpoint, allowedTools, token: process.env.DRP_MCP_BEARER_TOKEN }
}

async function rpc(
  endpoint: string,
  token: string | undefined,
  method: string,
  params: Record<string, unknown> | undefined,
  sessionId?: string,
  id = 1,
): Promise<{ response: JsonRpcResponse | null; sessionId?: string }> {
  const headers: Record<string, string> = {
    Accept: 'application/json, text/event-stream',
    'Content-Type': 'application/json',
  }
  if (token) headers.Authorization = `Bearer ${token}`
  if (sessionId) headers['Mcp-Session-Id'] = sessionId

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({ jsonrpc: '2.0', ...(id === undefined ? {} : { id }), method, ...(params ? { params } : {}) }),
    cache: 'no-store',
    signal: AbortSignal.timeout(10_000),
  })
  if (!response.ok) throw new Error(`MCP request ${method} failed with HTTP ${response.status}`)

  const nextSessionId = response.headers.get('mcp-session-id') ?? sessionId
  const contentType = response.headers.get('content-type') ?? ''
  if (response.status === 202 || response.status === 204) {
    return { response: null, sessionId: nextSessionId ?? undefined }
  }

  const text = await response.text()
  let payload: JsonRpcResponse | null = null
  if (contentType.includes('text/event-stream')) {
    const data = text.split(/\r?\n/).filter((line) => line.startsWith('data:')).map((line) => line.slice(5).trim())
    for (const item of data) {
      try {
        const candidate = JSON.parse(item) as JsonRpcResponse
        if ((id !== undefined && candidate.id === id) || candidate.error) payload = candidate
      } catch {
        // Ignore non-JSON SSE keepalives and unrelated events.
      }
    }
  } else if (text.trim()) {
    payload = JSON.parse(text) as JsonRpcResponse
  }

  if (payload?.error) throw new Error(payload.error.message ?? `MCP request ${method} failed`)
  return { response: payload, sessionId: nextSessionId ?? undefined }
}

async function withMcpSession<T>(
  action: (call: (method: string, params?: Record<string, unknown>) => Promise<JsonRpcResponse | null>) => Promise<T>,
): Promise<T> {
  const config = getMcpConfig()
  let sessionId: string | undefined
  let nextId = 1

  const initialized = await rpc(config.endpoint, config.token, 'initialize', {
    protocolVersion: MCP_PROTOCOL_VERSION,
    capabilities: {},
    clientInfo: { name: 'drp-activity-verification', version: '0.1.0' },
  }, undefined, nextId++)
  sessionId = initialized.sessionId
  if (!initialized.response?.result) throw new Error('MCP server returned no initialize result')

  await rpc(config.endpoint, config.token, 'notifications/initialized', undefined, sessionId)
  const result = await action(async (method, params) => {
    const reply = await rpc(config.endpoint, config.token, method, params, sessionId, nextId++)
    sessionId = reply.sessionId
    return reply.response
  })
  return result
}

export interface MCPToolSummary {
  name: string
  description?: string
  inputSchema: Record<string, unknown>
}

export async function listAllowedMcpTools(): Promise<MCPToolSummary[]> {
  const config = getMcpConfig()
  return withMcpSession(async (call) => {
    const response = await call('tools/list')
    const tools = response?.result?.tools
    if (!Array.isArray(tools)) throw new Error('MCP server returned an invalid tools/list response')
    return tools
      .filter((tool: { name?: string }) => typeof tool.name === 'string' && config.allowedTools.includes(tool.name))
      .map((tool: { name: string; description?: string; inputSchema?: Record<string, unknown> }) => ({
        name: tool.name,
        description: tool.description,
        inputSchema: tool.inputSchema ?? {},
      }))
  })
}

export async function callAllowedMcpTool(
  name: string,
  args: Record<string, unknown>,
): Promise<unknown> {
  const config = getMcpConfig()
  if (!config.allowedTools.includes(name)) throw new Error('MCP tool is not allowlisted')
  return withMcpSession(async (call) => {
    const response = await call('tools/call', { name, arguments: args })
    if (!response?.result) throw new Error('MCP server returned no tool result')
    return response.result
  })
}
