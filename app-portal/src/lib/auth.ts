import { apiRequest } from '@/lib/api'
import { STORAGE_KEYS } from '@/lib/constants'

export interface Session {
  token: string
  expiresAt: number
  walletAddress?: string
  roles: string[]
}

export function storeSession(session: Session) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session))
}

export function loadSession(): Session | null {
  if (typeof window === 'undefined') return null
  const value = localStorage.getItem(STORAGE_KEYS.session)
  if (!value) return null
  try {
    return JSON.parse(value) as Session
  } catch (error) {
    console.error('Failed to parse session payload', error)
    return null
  }
}

export function clearSession() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEYS.session)
}

export async function beginOAuth(provider: 'google' | 'apple') {
  const { data } = await apiRequest<{ url: string }>({
    path: `/auth/oauth/${provider}`,
    method: 'POST'
  })
  return data.url
}

export async function verifyJwt(token: string) {
  const { data } = await apiRequest<{ valid: boolean; roles: string[] }>({
    path: '/auth/verify',
    method: 'POST',
    body: { token }
  })
  return data
}
