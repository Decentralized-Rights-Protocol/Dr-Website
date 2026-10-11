import { verifyMessage } from 'ethers'
import { NextRequest, NextResponse } from 'next/server'
import { prepareActivityClaim, type ActivityClaimInput } from '@/lib/verification/activity-engine'

export const runtime = 'nodejs'

interface SignedActivityPayload {
  subjectId: string
  source: 'github' | 'community'
  activityType: string
  statement: string
  sourceId: string
  sourceUrl?: string
  evidenceNotes?: string
  issuedAt: string
}

interface ProtocolEvidence {
  version: string
  id: string
  sourceId: string
  type: string
  contentHash: string
  metadata: Record<string, string>
  createdAt: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { message?: unknown; signature?: unknown }
    if (typeof body.message !== 'string' || typeof body.signature !== 'string') {
      return NextResponse.json({ error: 'A wallet-signed activity payload is required' }, { status: 400 })
    }

    let signed: SignedActivityPayload
    try {
      signed = JSON.parse(body.message) as SignedActivityPayload
    } catch {
      return NextResponse.json({ error: 'Signed payload must be valid JSON' }, { status: 400 })
    }

    if (
      typeof signed.subjectId !== 'string' ||
      typeof signed.sourceId !== 'string' ||
      typeof signed.activityType !== 'string' ||
      typeof signed.statement !== 'string' ||
      typeof signed.issuedAt !== 'string' ||
      !['github', 'community'].includes(signed.source)
    ) {
      return NextResponse.json({ error: 'Signed payload is missing required fields' }, { status: 400 })
    }

    let recoveredAddress: string
    try {
      recoveredAddress = verifyMessage(body.message, body.signature)
    } catch {
      return NextResponse.json({ error: 'Invalid wallet signature' }, { status: 401 })
    }
    if (recoveredAddress.toLowerCase() !== signed.subjectId.toLowerCase()) {
      return NextResponse.json({ error: 'Wallet signature does not match the claim subject' }, { status: 401 })
    }

    const issuedAt = Date.parse(signed.issuedAt)
    if (Number.isNaN(issuedAt) || Date.now() - issuedAt > 5 * 60_000 || issuedAt - Date.now() > 60_000) {
      return NextResponse.json({ error: 'Signed claim expired; sign and submit again' }, { status: 401 })
    }

    const input: ActivityClaimInput = {
      subjectId: signed.subjectId,
      source: signed.source,
      activityType: signed.activityType,
      statement: signed.statement,
      humanReviewRequired: signed.source === 'community',
      evidence: [{
        sourceId: signed.sourceId,
        evidenceType: signed.source === 'github' ? 'github_reference' : 'community_activity_report',
        sourceUrl: signed.sourceUrl,
        content: {
          notes: signed.evidenceNotes ?? '',
          sourceId: signed.sourceId,
          sourceUrl: signed.sourceUrl ?? null,
          issuedAt: signed.issuedAt,
        },
      }],
    }
    const prepared = prepareActivityClaim(input)

    const protocolUrl = process.env.DRP_PROTOCOL_URL
    if (!protocolUrl) {
      return NextResponse.json({
        activity: prepared,
        protocol: { status: 'NOT_CONFIGURED', message: 'Set DRP_PROTOCOL_URL to submit claims to the DRP Verification Network.' },
      }, { status: 202 })
    }

    const evidence: ProtocolEvidence[] = prepared.evidence.map((item) => ({
      version: '0.1',
      id: item.id,
      sourceId: item.sourceId,
      type: item.type,
      contentHash: item.contentHash,
      metadata: item.metadata,
      createdAt: item.createdAt,
    }))

    const verificationRequest = {
      version: '0.1',
      id: prepared.claimId,
      claim: {
        version: '0.1',
        id: prepared.claimId,
        subject: prepared.subjectId,
        type: prepared.source === 'github' ? `github:${prepared.activityType}` : `community:${prepared.activityType}`,
        statement: prepared.statement,
        createdAt: prepared.createdAt,
      },
      evidence,
      policy: {
        version: '0.1',
        id: `${prepared.claimId}:policy`,
        minVerifiers: 2,
        minEvidence: 1,
      },
      createdAt: prepared.createdAt,
    }

    const response = await fetch(new URL('/drp/v1/verify', protocolUrl), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(verificationRequest),
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    })
    const responseBody = await response.json().catch(() => null)

    if (!response.ok) {
      return NextResponse.json({
        activity: prepared,
        protocol: { status: 'SUBMISSION_FAILED', httpStatus: response.status, response: responseBody },
      }, { status: 502 })
    }

    return NextResponse.json({
      activity: prepared,
      protocol: { status: 'SUBMITTED', response: responseBody },
    }, { status: 202 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid activity claim'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
