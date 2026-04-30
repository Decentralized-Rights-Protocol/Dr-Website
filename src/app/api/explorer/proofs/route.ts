import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../../convex/_generated/api';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const type = searchParams.get('type') as 'PoST' | 'PoAT' | null;
    const walletAddress = searchParams.get('walletAddress') || undefined;

    const proofs = await convex.query(api.proofs.getExplorerProofs, {
      limit,
      type: type || undefined,
      walletAddress,
    });

    return NextResponse.json(proofs);
  } catch (error: any) {
    console.error('Error in /api/explorer/proofs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
