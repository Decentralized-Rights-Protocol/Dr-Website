'use client'

import { useState } from 'react'
import { useMutation } from 'convex/react'
import { useAppStore } from '@/store/app-store'
import { api } from '../../convex/_generated/api'

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
  const createSubmission = useMutation(api.submissions.createSubmission)
  const [isPending, setIsPending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  
  return {
    isPending,
    isSuccess,
    isError: error !== null,
    error,
    mutateAsync: async ({ file, hash, ...rest }: SubmitActivityInput) => {
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
          kind: 'activity',
          title: rest.title,
          description: rest.description,
          location: rest.location,
          occurredAt: rest.timestamp,
          payloadHash: hash,
          attachmentName: file.name,
          attachmentMimeType: file.type,
          attachmentSizeBytes: file.size,
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
