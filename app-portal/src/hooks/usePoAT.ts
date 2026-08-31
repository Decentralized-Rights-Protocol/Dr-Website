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
}

async function sha256(file: File): Promise<string> {
  const bytes = await file.arrayBuffer()
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export function usePoAT() {
  const address = useAppStore((state) => state.address)

  return useMutation({
    mutationFn: async ({ file, ...rest }: SubmitActivityInput): Promise<SubmissionResponse> => {
      if (!address) throw new Error('Wallet not connected')

      // The browser creates an integrity commitment over the submitted evidence.
      // A real IPFS CID is only claimed once the backend has actually stored the file.
      const hash = await sha256(file)
      const claim: ActivityClaim = {
        ...rest,
        hash,
        actor_id: address,
      }

      return submitActivity(claim)
    },
  })
}
