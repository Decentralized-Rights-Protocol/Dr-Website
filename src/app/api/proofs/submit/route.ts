import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import { ethers } from 'ethers';
import { blockchainService } from '@/lib/blockchain';

export async function POST(request: NextRequest) {
  try {
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    const body = await request.json();
    const { userId, walletAddress, type, data, metadata, signature } = body;

    // 1. Validate payload schema
    if (!userId || !walletAddress || !type || !data || !signature) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (type !== 'PoST' && type !== 'PoAT') {
      return NextResponse.json({ error: 'Invalid proof type' }, { status: 400 });
    }

    // 2. Verify wallet signature (supporting EVM for now)
    // In a real scenario, check if walletAddress is EVM or Cosmos and use appropriate verification
    try {
      const message = JSON.stringify(data, Object.keys(data).sort());
      const recoveredAddress = ethers.verifyMessage(message, signature);
      if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    } catch (err) {
      console.error('Signature verification failed:', err);
      return NextResponse.json({ error: 'Signature verification failed' }, { status: 401 });
    }

    // 3. Generate proofHash (SHA256 of data)
    const dataStr = JSON.stringify(data, Object.keys(data).sort());
    const proofHash = crypto.createHash('sha256').update(dataStr).digest('hex');

    // 4. Timestamp it
    const timestamp = new Date().toISOString();

    // 5. Store temporarily in DB (Convex)
    const result = await convex.mutation(api.proofs.submitProof, {
      userId,
      walletAddress,
      type,
      data,
      metadata,
      proofHash,
      timestamp,
    });

    // 6. Write to Blockchain (Task 2)
    // In a real app, this might be better as a background job to avoid blocking the response
    // but for this task we'll do it inline or as a fire-and-forget
    const blockchainResult = await blockchainService.submitProof(proofHash, type, metadata);

    if (blockchainResult.success) {
      await convex.mutation(api.proofs.updateProofTx, {
        proofId: result.proofId,
        txHash: blockchainResult.txHash,
        status: 'Processing',
      });
    }

    // Return: { success: true, proofId, proofHash }
    return NextResponse.json({
      success: true,
      proofId: result.proofId,
      proofHash: result.proofHash,
      txHash: blockchainResult.txHash,
    });
  } catch (error: any) {
    console.error('Error in /api/proofs/submit:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
