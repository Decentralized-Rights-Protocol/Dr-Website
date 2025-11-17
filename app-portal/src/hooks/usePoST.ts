'use client'

import { useMutation } from '@tanstack/react-query'
import { submitStatus, type StatusClaim, type SubmissionResponse } from '@/lib/api'
import { useAppStore } from '@/store/app-store'

interface SubmitStatusInput {
  category: string
  issuer: string
  credentialFile: File
  referenceCode?: string
}

export function usePoST() {
  const address = useAppStore((state) => state.address)
  
  return useMutation({
    mutationFn: async ({ credentialFile, ...rest }: SubmitStatusInput): Promise<SubmissionResponse> => {
      if (!address) {
        throw new Error('Wallet not connected')
      }

      // TODO: Upload credential file to IPFS and get CID (for now, use placeholder)
      // In production, this would call IPFS API or backend endpoint
      const credentialCid = `QmPlaceholder${Date.now()}` // Placeholder CID

      const claim: StatusClaim = {
        ...rest,
        credential_cid: credentialCid,
        actor_id: address
      }

      return submitStatus(claim)
    }
  })
}
