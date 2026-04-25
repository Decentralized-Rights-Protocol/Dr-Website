import { NextResponse } from 'next/server';
import { PolicyEngine } from '../../../../../convex/lib/drp/elders';
import { hashData, signData } from '../../../../../convex/lib/drp/crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, category, metadata, proof, userId } = body;

    if (!type || !category || !proof) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Run Elder Verification
    const verification = PolicyEngine.assessActivity({
      userId: userId || 'external_user',
      type,
      category,
      metadata,
      proof,
      timestamp: new Date().toISOString(),
    });

    // 2. Cryptographic Hashing & Signing
    const activityHash = hashData(body);
    const signature = signData(activityHash);

    return NextResponse.json({
      verdict: verification.verdict,
      score: verification.score,
      reward: verification.reward,
      rationale: verification.rationale,
      proof: {
        hash: activityHash,
        signature: signature,
        algorithm: 'SHA3-512 + Mock Dilithium'
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
