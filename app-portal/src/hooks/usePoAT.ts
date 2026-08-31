'use client'

import { useMutation } from '@tanstack/react-query'
import { submitActivity, type ActivityClaim, type SubmissionResponse } from '@/lib/api'
import { useAppStore } from '@/store/app-store'

interface SubmitActivityInput {
  title: string
  description: string
  location?: string
  file: File
  timestamp: string
  hash: string
}

export function usePoAT() {
  const address = useAppStore((state) => state.address)
  
  return useMutation({
    mutationFn: async ({ file, hash, ...rest }: SubmitActivityInput): Promise<SubmissionResponse> => {
      if (!address) {
        throw new Error('Wallet not connected')
      }

      // TODO: Upload file to IPFS and get CID (for now, use placeholder)
      // In production, this would call IPFS API or backend endpoint
      const mediaCid = `QmPlaceholder${Date.now()}` // Placeholder CID

      const claim: ActivityClaim = {
        ...rest,
        media_cid: mediaCid,
        hash,
        actor_id: address
      }

      return submitActivity(claim)
    }
  })
}
