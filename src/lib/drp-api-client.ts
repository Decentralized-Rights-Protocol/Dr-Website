/**
 * DRP verification-service client for proof-of-activity submissions.
 * Thin wrapper around the shared apiRequest helper in @/lib/api so the
 * request shape/base URL/error handling stays consistent with the rest
 * of the app's backend calls.
 */
import { apiRequest } from "@/lib/api";

export interface ReadingProofVerificationResult {
  passed: boolean;
  record_hash: string;
  [key: string]: unknown;
}

export async function submitReadingProof(
  proofData: unknown,
  token: string,
): Promise<ReadingProofVerificationResult> {
  const { data } = await apiRequest<ReadingProofVerificationResult>({
    path: "/v1/proofs/reading/verify",
    method: "POST",
    body: proofData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
