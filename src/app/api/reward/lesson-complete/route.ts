import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { wallet_address, lesson_id, score } = body;

    // Validate required fields
    if (!wallet_address || !lesson_id || score === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: wallet_address, lesson_id, score' },
        { status: 400 }
      );
    }

    // Validate wallet address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(wallet_address)) {
      return NextResponse.json(
        { error: 'Invalid wallet address format' },
        { status: 400 }
      );
    }

    // Validate score range
    if (score < 0 || score > 100) {
      return NextResponse.json(
        { error: 'Score must be between 0 and 100' },
        { status: 400 }
      );
    }

    // Forward request to FastAPI backend
    const backendUrl = process.env.LEARN_API_URL || 'http://localhost:8001';
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
      throw new Error(errorData.error || `Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error processing lesson completion reward:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to process reward',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
