import { NextRequest, NextResponse } from 'next/server'
import { prepareActivityClaim, type ActivityClaimInput } from '@/lib/verification/activity-engine'

export const runtime = 'nodejs'

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
  let input: ActivityClaimInput
  try {
    input = await request.json() as ActivityClaimInput
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
