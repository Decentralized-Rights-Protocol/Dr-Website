'use client'

import { useMutation } from '@tanstack/react-query'
import { apiRequest, type StatusProofPayload } from '@/lib/api'

interface SubmitStatusInput {
  category: string
  issuer: string
  credentialFile: File
  referenceCode?: string
}

export function usePoST() {
  return useMutation({
    mutationFn: async ({ credentialFile, ...rest }: SubmitStatusInput) => {
      const formData = new FormData()
      formData.append('file', credentialFile)

      const { data: media } = await apiRequest<{ cid: string }, FormData>({
        path: '/verify/status/credential',
        method: 'POST',
        body: formData,
        isMultipart: true
      })

      const payload: StatusProofPayload = {
        ...rest,
        credentialCid: media.cid
      }

      const { data } = await apiRequest<{ status: string; reward?: { token: string; amount: number } }, StatusProofPayload>({
        path: '/verify/status',
        method: 'POST',
        body: payload
      })

      return data
    }
  })
}
