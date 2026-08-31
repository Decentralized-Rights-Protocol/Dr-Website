import { env } from '@/lib/env'

interface VerifyPayload {
  type: 'activity' | 'status'
  input: Record<string, unknown>
}

interface AssistantPayload {
  prompt: string
  context?: Record<string, unknown>
}

export async function verifyWithAI(payload: VerifyPayload) {
  const response = await fetch(`${env.NEXT_PUBLIC_AI_API}/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    throw new Error('AI verification failed')
  }

  return response.json() as Promise<{ verdict: 'approve' | 'flag' | 'reject'; confidence: number; notes?: string }>
}

export async function askElderAI(payload: AssistantPayload) {
  const response = await fetch(`${env.NEXT_PUBLIC_AI_API}/assistant`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    throw new Error('AI assistant request failed')
  }

  return response.json() as Promise<{ reply: string; suggestions?: string[] }>
}
