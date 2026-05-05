import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const NEXT_PUBLIC_AI_URL = process.env.NEXT_PUBLIC_AI_URL || 'https://ai.decentralizedrights.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, type, metadata, proof } = body;

    // Map frontend data to AI service's ActivityClaim
    const claim = {
      title: metadata?.title || type || 'Activity',
      description: proof || 'No description provided',
      location: null,
      timestamp: new Date().toISOString(),
      media_cid: metadata?.url || '',
      hash: crypto.createHash('sha256').update(proof || '').digest('hex'),
      actor_id: 'anonymous' // In a real app, get this from auth context
    };

    // Call the AI Verification Service
    const verifyApiUrl = `${NEXT_PUBLIC_AI_URL}/assess-activity`;
    console.log(`Calling AI Verification: ${verifyApiUrl}`);

    const response = await fetch(verifyApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(claim),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI /assess-activity failed:', errorText);
      return new NextResponse(errorText, { status: response.status });
    }

    const assessment = await response.json();
    
    // Transform AI assessment to match frontend's expected verification result
    // Expected: { chainTxHash, status, score, reward, hash, signature }
    const result = {
      chainTxHash: `0x${crypto.randomBytes(32).toString('hex')}`,
      status: assessment.verdict === 'approved' ? 'approved' : 'rejected',
      score: assessment.score,
      reward: {
        deri: Math.floor(assessment.score * 0.5),
        rights: Math.floor(assessment.score * 0.1)
      },
      hash: claim.hash,
      signature: assessment.ai_signature
    };

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in /api/submit-activity:', error);
    return new NextResponse('Internal Server Error: ' + error.message, { status: 500 });
  }
}
