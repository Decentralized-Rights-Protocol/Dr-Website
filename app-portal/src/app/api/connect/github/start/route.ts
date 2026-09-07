import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'

export async function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID
  if (!clientId) return NextResponse.json({ error: 'GitHub OAuth is not configured on this deployment.' }, { status: 503 })

  const state = randomBytes(24).toString('hex')
  const redirectUri = process.env.GITHUB_REDIRECT_URI || `${request.nextUrl.origin}/api/connect/github/callback`
  const url = new URL('https://github.com/login/oauth/authorize')
  url.searchParams.set('client_id', clientId)
  url.searchParams.set('redirect_uri', redirectUri)
  url.searchParams.set('scope', 'read:user user:email')
  url.searchParams.set('state', state)

  const response = NextResponse.redirect(url)
  response.cookies.set('drp_github_oauth_state', state, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 600, path: '/' })
  return response
}
