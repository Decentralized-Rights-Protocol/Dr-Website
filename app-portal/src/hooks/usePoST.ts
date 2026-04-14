'use client'

import { useState } from 'react'
import { useMutation } from 'convex/react'
import { useAppStore } from '@/store/app-store'
import { api } from '../../convex/_generated/api'

interface SubmitStatusInput {
  category: string
  issuer: string
  credentialFile: File
  referenceCode?: string
}

export function usePoST() {
  const address = useAppStore((state) => state.address)
  const createSubmission = useMutation(api.submissions.createSubmission)
  const [isPending, setIsPending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  
  return {
    isPending,
    isSuccess,
    isError: error !== null,
    error,
    mutateAsync: async ({ credentialFile, category, issuer, referenceCode }: SubmitStatusInput) => {
      setIsPending(true)
      setIsSuccess(false)
      setError(null)

      if (!address) {
        const nextError = new Error('Wallet not connected')
        setIsPending(false)
        setError(nextError)
        throw nextError
      }

      try {
        const result = await createSubmission({
          walletAddress: address,
          kind: 'status',
          title: `${category} credential`,
          description: `Status verification request from ${issuer}${referenceCode ? ` (${referenceCode})` : ''}.`,
          occurredAt: new Date().toISOString(),
          payloadHash: `${credentialFile.name}:${credentialFile.size}:${credentialFile.lastModified}`,
          attachmentName: credentialFile.name,
          attachmentMimeType: credentialFile.type,
          attachmentSizeBytes: credentialFile.size,
        })
        setIsSuccess(true)
        return result
      } catch (nextError) {
        const normalized = nextError instanceof Error ? nextError : new Error('Submission failed')
        setError(normalized)
        throw normalized
      } finally {
        setIsPending(false)
      }
    },
  }
}
