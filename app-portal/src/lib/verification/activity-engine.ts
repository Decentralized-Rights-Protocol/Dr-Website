import { createHash } from 'node:crypto'

export type ActivitySource = 'github' | 'community'
export type ActivityDecision = 'PENDING_REVIEW' | 'READY_FOR_PROTOCOL' | 'REJECTED'

export interface ActivityEvidenceInput {
  sourceId: string
  evidenceType: string
  content: Record<string, unknown>
  observedAt?: string
  sourceUrl?: string
}

export interface ActivityClaimInput {
  subjectId: string
  activityType: string
  statement: string
  source: ActivitySource
  evidence: ActivityEvidenceInput[]
  humanReviewRequired?: boolean
}

export interface PreparedActivity {
  claimId: string
  subjectId: string
  source: ActivitySource
  activityType: string
  statement: string
  decision: ActivityDecision
  reasons: string[]
  evidence: Array<{
    id: string
    sourceId: string
    type: string
    contentHash: string
    metadata: Record<string, string>
    createdAt: string
  }>
  createdAt: string
}

const MAX_STATEMENT_LENGTH = 2000
const MAX_EVIDENCE_ITEMS = 20
const ALLOWED_SOURCES: ActivitySource[] = ['github', 'community']

function sha256(value: unknown): string {
  // JSON.stringify is sufficient for this initial commitment format only when
  // the caller supplies a stable object shape. A canonical JSON scheme is a
  // follow-up requirement before signatures are treated as portable proofs.
  const serialized = JSON.stringify(value)\n  return createHash('sha256').update(serialized ?? 'null').digest('hex')
}

export function prepareActivityClaim(input: ActivityClaimInput): PreparedActivity {
  const now = new Date().toISOString()
  const reasons: string[] = []

  if (!input || typeof input !== 'object') throw new Error('Activity claim is required')
  if (!input.subjectId?.trim()) throw new Error('subjectId is required')
  if (!input.activityType?.trim()) throw new Error('activityType is required')
  if (!input.statement?.trim()) throw new Error('statement is required')
  if (input.statement.length > MAX_STATEMENT_LENGTH) throw new Error('statement is too long')
  if (!ALLOWED_SOURCES.includes(input.source)) throw new Error('Unsupported activity source')
  if (!Array.isArray(input.evidence) || input.evidence.length > MAX_EVIDENCE_ITEMS) {
    throw new Error(`evidence must be an array of at most ${MAX_EVIDENCE_ITEMS} items`)
  }

  const evidence = input.evidence.map((item, index) => {
    if (!item.sourceId?.trim() || !item.evidenceType?.trim()) {
      throw new Error(`evidence[${index}] requires sourceId and evidenceType`)
    }
    const createdAt = item.observedAt && !Number.isNaN(Date.parse(item.observedAt))
      ? new Date(item.observedAt).toISOString()
      : now
    const metadata: Record<string, string> = {
      source: input.source,
      sourceId: item.sourceId,
    }
    if (item.sourceUrl) metadata.sourceUrl = item.sourceUrl.slice(0, 1000)
    return {
      id: `evidence:${sha256({ source: input.source, sourceId: item.sourceId, content: item.content })}`,
      sourceId: item.sourceId,
      type: item.evidenceType,
      contentHash: sha256(item.content),
      metadata,
      createdAt,
    }
  })

  const uniqueEvidence = new Set(evidence.map((item) => item.contentHash))
  if (evidence.length === 0) reasons.push('No source evidence supplied')
  if (uniqueEvidence.size !== evidence.length) reasons.push('Duplicate evidence detected')
  if (input.source === 'community') reasons.push('Community activity requires an organizer or independent witness attestation')
  if (input.humanReviewRequired) reasons.push('Human review was explicitly requested')

  const decision: ActivityDecision = reasons.length > 0 ? 'PENDING_REVIEW' : 'READY_FOR_PROTOCOL'
  const claimId = `claim:${sha256({ subjectId: input.subjectId, activityType: input.activityType, source: input.source, evidence })}`

  return {
    claimId,
    subjectId: input.subjectId,
    source: input.source,
    activityType: input.activityType,
    statement: input.statement.trim(),
    decision,
    reasons,
    evidence,
    createdAt: now,
  }
}
