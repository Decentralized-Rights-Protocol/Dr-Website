/* Server-side structured logging for Vercel Observability.
 * Avoid logging secrets, tokens, mnemonics, or user-sensitive content.
 */

type LogLevel = 'info' | 'warn' | 'error'

type LogMeta = Record<string, unknown>

const REDACT_KEYS = /(secret|token|authorization|cookie|password|mnemonic|private|key)/i

export function logInfo(event: string, meta?: LogMeta) {
  send('info', event, meta)
}

export function logWarn(event: string, meta?: LogMeta) {
  send('warn', event, meta)
}

export function logError(event: string, meta?: LogMeta) {
  send('error', event, meta)
}

export function logRpcCall(target: string, meta?: LogMeta) {
  logInfo('rpc_call', { target, ...meta })
}

export function logIpfsFetch(cid: string, meta?: LogMeta) {
  logInfo('ipfs_fetch', { cid, ...meta })
}

export function logWalletConnectionFailure(reason: string, meta?: LogMeta) {
  logWarn('wallet_connection_failed', { reason, ...meta })
}

export function logPoatVerification(requestId: string, meta?: LogMeta) {
  logInfo('poat_verification_request', { requestId, ...meta })
}

export function logGovernanceSubmissionFailure(reason: string, meta?: LogMeta) {
  logError('governance_submission_failed', { reason, ...meta })
}

function send(level: LogLevel, event: string, meta?: LogMeta) {
  const payload = {
    level,
    event,
    // Include a timestamp for quick correlation in logs
    ts: new Date().toISOString(),
    ...sanitizeMeta(meta),
  }
  // eslint-disable-next-line no-console
  console[level](JSON.stringify(payload))
}

function sanitizeMeta(meta?: LogMeta): LogMeta | undefined {
  if (!meta) return undefined
  const out: LogMeta = {}
  for (const [key, value] of Object.entries(meta)) {
    if (REDACT_KEYS.test(key)) continue
    if (typeof value === 'string' && value.length > 2048) {
      out[key] = `${value.slice(0, 2044)}…`
    } else {
      out[key] = value
    }
  }
  return out
}

