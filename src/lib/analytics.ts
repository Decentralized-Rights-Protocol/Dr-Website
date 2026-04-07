'use client'

import { track } from '@vercel/analytics'

type DrpEventName =
  | 'whitepaper_download'
  | 'poat_submission_started'
  | 'poat_submission_completed'
  | 'governance_vote_started'
  | 'governance_vote_completed'
  | 'wallet_connect'
  | 'validator_review_opened'
  | 'ui_error'

type AllowedProp = string | number | boolean | null
type EventProps = Record<string, AllowedProp | undefined>

const allowedEvents: Set<DrpEventName> = new Set<DrpEventName>([
  'whitepaper_download',
  'poat_submission_started',
  'poat_submission_completed',
  'governance_vote_started',
  'governance_vote_completed',
  'wallet_connect',
  'validator_review_opened',
  'ui_error',
] as DrpEventName[])

function isProdLike(): boolean {
  if (typeof process === 'undefined') return false
  const env = process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV
  return env === 'production' || env === 'preview'
}

export function trackDRPEvent(name: DrpEventName, props?: EventProps): void {
  if (typeof window === 'undefined') return
  if (!allowedEvents.has(name)) return
  // Never include secrets or personal data. Allow only flat, minimal metadata.
  try {
    if (isProdLike()) {
      track(name, sanitizeProps(props))
    } else {
      // Keep dev noise minimal
      if (process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === '1') {
        // eslint-disable-next-line no-console
        console.debug('[analytics:dev]', name, sanitizeProps(props))
      }
    }
  } catch {
    // Swallow analytics errors to avoid impacting UX
  }
}

function sanitizeProps(input?: EventProps): Record<string, AllowedProp> | undefined {
  if (!input) return undefined
  const output: Record<string, AllowedProp> = {}
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined) continue
    // Basic redaction safeguards
    if (/(secret|token|private|mnemonic|password|key)/i.test(key)) continue
    // Prevent dumping large strings
    if (typeof value === 'string' && value.length > 256) {
      output[key] = `${value.slice(0, 252)}…`
    } else {
      output[key] = value
    }
  }
  return output
}

