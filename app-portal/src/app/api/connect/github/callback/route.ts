import { NextRequest, NextResponse } from 'next/server'
import { encryptSecret } from '@/lib/secure-cookie'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  const state = request.nextUrl.searchParams.get('state')
  const expectedState = request.cookies.get('drp_github_oauth_state')?.value
  const clientId = process.env.GITHUB_CLIENT_ID
  const clientSecret = process.env.GITHUB_CLIENT_SECRET
  const redirectUri = process.env.GITHUB_REDIRECT_URI || `${request.nextUrl.origin}/api/connect/github/callback`

  if (!code || !state || !expectedState || state !== expectedState) return NextResponse.redirect(new URL('/connect?error=invalid_oauth_state', request.url))
  if (!clientId || !clientSecret || !process.env.APP_ENCRYPTION_KEY) return NextResponse.redirect(new URL('/connect?error=github_not_configured', request.url))

  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code, redirect_uri: redirectUri }), cache: 'no-store',
  })
  const tokenData = await tokenResponse.json()
  if (!tokenResponse.ok || !tokenData.access_token) return NextResponse.redirect(new URL('/connect?error=github_authorization_failed', request.url))

  let encryptedToken: string
  try { encryptedToken = encryptSecret(tokenData.access_token) } catch { return NextResponse.redirect(new URL('/connect?error=github_not_configured', request.url)) }

  const response = NextResponse.redirect(new URL('/connect?connected=github', request.url))
  response.cookies.set('drp_github_token', encryptedToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 60 * 60 * 24 * 30, path: '/' })
  response.cookies.set('drp_github_oauth_state', '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 0, path: '/' })
  return response
}
