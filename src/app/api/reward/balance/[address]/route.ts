import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    const { address } = params;
    
    // Validate address format
    if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return NextResponse.json(
        { error: 'Invalid wallet address format' },
        { status: 400 }
      );
    }

    // Forward request to FastAPI backend
    const backendUrl = process.env.LEARN_API_URL || 'http://localhost:8001';
    const response = await fetch(`${backendUrl}/api/reward/balance/${address}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error fetching user balance:', error);
    // Return a successful response with default values instead of 500 error
    return NextResponse.json({
      balance: 0,
      balance_formatted: '0.00',
      symbol: 'DeRi-TEST',
      network: 'testnet',
      message: 'Balance service temporarily unavailable'
    });
  }
}
