import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { submitReadingProof } from "@/lib/drp-api-client";

export const useProofSubmission = (userId: string, walletAddress: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitToConvex = useMutation(api.proofs.submitProof);

  const submitProof = async (
    proofData: any,
    signature: string,
    token: string,
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // 1. Submit to Backend for Verification (PoAT generation)
      const verificationResult = await submitReadingProof(proofData, token);

      if (!verificationResult.passed) {
        throw new Error("Verification failed");
      }

      // 2. Submit to Convex for Indexing
      await submitToConvex({
        userId,
        walletAddress,
        type: "PoAT",
        data: verificationResult,
        proofHash: verificationResult.record_hash,
        timestamp: new Date().toISOString(),
      });

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return { submitProof, loading, error, success };
};
