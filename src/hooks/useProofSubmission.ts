'use client'

import { useState } from 'react'
import { ethers } from 'ethers'
import { useAppStore } from '@/store/app-store'

interface ProofSubmissionInput {
  type: 'PoST' | 'PoAT'
  data: any
  metadata?: any
}

export function useProofSubmission() {
  const address = useAppStore((state) => state.address)
  const [isPending, setIsPending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [txHash, setTxHash] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const submitProof = async ({ type, data, metadata }: ProofSubmissionInput) => {
    setIsPending(true)
    setIsSuccess(false)
    setTxHash(null)
    setError(null)

    if (!address) {
      const err = new Error('Wallet not connected')
      setError(err)
      setIsPending(false)
      throw err
    }

    try {
      // 1. Prepare message to sign
      const message = JSON.stringify(data, Object.keys(data).sort());
      
      // 2. Request signature from wallet
      if (!window.ethereum) throw new Error('No ethereum provider found');
      const provider = new ethers.BrowserProvider(window.ethereum as any);
      const signer = await provider.getSigner();
      const signature = await signer.signMessage(message);

      // 3. Call Submission API
      const response = await fetch('/api/proofs/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: address, // Using address as userId for now
          walletAddress: address,
          type,
          data,
          metadata,
          signature
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Submission failed');
      }

      const result = await response.json();
      setTxHash(result.txHash);
      setIsSuccess(true);
      return result;
    } catch (err: any) {
      console.error('Proof submission failed:', err);
      setError(err);
      throw err;
    } finally {
      setIsPending(false);
    }
  };

  return {
    submitProof,
    isPending,
    isSuccess,
    txHash,
    error
  };
}
