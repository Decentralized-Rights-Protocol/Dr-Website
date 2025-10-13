import crypto from 'crypto'
import { z } from 'zod'
import jwt from 'jsonwebtoken'

export const iso8601Timestamp = z.string().refine((v) => !Number.isNaN(Date.parse(v)), 'Invalid timestamp')
export const addressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/)

export function sha256(data: string | Buffer): string {
  return crypto.createHash('sha256').update(data).digest('hex')
}

export function hmacSha256(secret: string, data: string): string {
  return crypto.createHmac('sha256', secret).update(data).digest('hex')
}

export function verifyHmacSignature(secret: string, payload: string, signature: string): boolean {
  const expected = hmacSha256(secret, payload)
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
}

export function verifyJwtAndRole(token: string, secret: string, roles: string[]): { ok: boolean; payload?: any } {
  try {
    const payload = jwt.verify(token, secret)
    if (typeof payload === 'object' && 'role' in payload && roles.includes((payload as any).role)) {
      return { ok: true, payload }
    }
    return { ok: false }
  } catch {
    return { ok: false }
  }
}
