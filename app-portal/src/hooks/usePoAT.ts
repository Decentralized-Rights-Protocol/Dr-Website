'use client'

import { useMutation } from '@tanstack/react-query'
import { apiRequest, type ActivityProofPayload } from '@/lib/api'

interface SubmitActivityInput {
  title: string
  description: string
  location?: string
  file: File
  timestamp: string
  hash: string
}

export function usePoAT() {
  return useMutation({
    mutationFn: async ({ file, ...rest }: SubmitActivityInput) => {
      const formData = new FormData()
      formData.append('file', file)
      const { data: media } = await apiRequest<{ cid: string }, FormData>({
        path: '/verify/activity/media',
        method: 'POST',
        body: formData,
        isMultipart: true
      })

      const payload: ActivityProofPayload = {
        ...rest,
        mediaCid: media.cid
      }

      const { data } = await apiRequest<{ status: string; reward?: { token: string; amount: number } }, ActivityProofPayload>({
        path: '/verify/activity',
        method: 'POST',
        body: payload
      })

      return data
    }
  })
}
