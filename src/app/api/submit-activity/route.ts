import { NextRequest, NextResponse } from 'next/server';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  if (!NEXT_PUBLIC_API_URL) {
    return new NextResponse('NEXT_PUBLIC_API_URL is not defined', { status: 500 });
  }

  try {
    const body = await request.json();

    // Call the external FastAPI backend
    const verifyApiUrl = `${NEXT_PUBLIC_API_URL}/api/verify`;
    const response = await fetch(verifyApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Potentially add authorization headers if needed by the FastAPI backend
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('FastAPI /api/verify failed:', errorText);
      return new NextResponse(errorText, { status: response.status });
    }

    const data = await response.json();
    // Assuming the FastAPI backend returns { chain_tx_hash: "..." }
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error in /api/submit-activity:', error);
    return new NextResponse('Internal Server Error: ' + error.message, { status: 500 });
  }
}
