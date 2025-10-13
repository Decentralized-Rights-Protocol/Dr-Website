import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiter (best-effort; for Vercel Edge)
const RATE_LIMIT = 100 // requests
const WINDOW_MS = 60 * 1000 // 1 minute
const ipBuckets = new Map<string, { count: number; resetAt: number }>()

const ALLOWED_ORIGINS = [
  'https://decentralizedrights.com',
  'https://www.decentralizedrights.com',
  'https://explorer.decentralizedrights.com',
]

function corsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Credentials': 'true',
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Preflight
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { headers: corsHeaders(req.headers.get('origin')) })
  }

  // Basic rate limiting per IP
  const ip = req.ip ?? req.headers.get('x-forwarded-for') ?? 'unknown'
  const now = Date.now()
  const bucket = ipBuckets.get(ip)
  if (!bucket || now > bucket.resetAt) {
    ipBuckets.set(ip, { count: 1, resetAt: now + WINDOW_MS })
  } else {
    bucket.count += 1
    if (bucket.count > RATE_LIMIT) {
      return new NextResponse('Too Many Requests', { status: 429 })
    }
  }

  const res = NextResponse.next()
  const headers = corsHeaders(req.headers.get('origin'))
  Object.entries(headers).forEach(([k, v]) => res.headers.set(k, v))

  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|site.webmanifest|robots.txt|sitemap.xml).*)',
  ],
}
