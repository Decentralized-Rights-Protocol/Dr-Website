import { NextResponse } from 'next/server'
import { listAllowedMcpTools } from '@/lib/mcp/remote-client'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const tools = await listAllowedMcpTools()
    return NextResponse.json({
      connected: true,
      allowedToolCount: tools.length,
      tools: tools.map(({ name, description }) => ({ name, description })),
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'MCP connection failed'
    return NextResponse.json({ connected: false, error: message }, { status: 503 })
  }
}
