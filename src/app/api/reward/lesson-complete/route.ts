import { NextRequest, NextResponse } from 'next/server';
import { logError, logInfo } from '@/lib/logging';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { wallet_address, lesson_id, score } = body;

    // Validate required fields
    if (!wallet_address || !lesson_id || score === undefined) {
      return NextResponse.json(
        { code: 'BAD_REQUEST', message: 'Missing required fields: wallet_address, lesson_id, score' },
        { status: 400 }
      );
    }

    // Validate wallet address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(wallet_address)) {
      return NextResponse.json(
        { code: 'BAD_REQUEST', message: 'Invalid wallet address format' },
        { status: 400 }
      );
    }

    // Validate score range
    if (score < 0 || score > 100) {
      return NextResponse.json(
        { code: 'BAD_REQUEST', message: 'Score must be between 0 and 100' },
        { status: 400 }
      );
    }

    // Forward request to FastAPI backend
    const backendUrl = process.env.LEARN_API_URL || 'http://localhost:8001';
    logInfo('reward_forward_request', { lesson_id, score });
    const response = await fetch(`${backendUrl}/api/reward/lesson-complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wallet_address,
        lesson_id,
        score
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const backendMessage = (errorData && (errorData.error || errorData.message)) || `Backend responded with status: ${response.status}`;
      logError('reward_backend_error', { status: response.status, backendMessage });
      throw new Error(backendMessage);
    }

    const data = await response.json();
    logInfo('reward_success', { lesson_id });
    return NextResponse.json(data);

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    logError('reward_process_error', { message });
    return NextResponse.json(
      { 
        code: 'INTERNAL_ERROR',
        message: 'Failed to process reward',
        details: message
      },
      { status: 500 }
    );
  }
}
