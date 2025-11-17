import { env } from '@/lib/env'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface ApiRequestOptions<TBody> {
  path: string
  method?: HttpMethod
  body?: TBody
  headers?: Record<string, string>
  isMultipart?: boolean
}

interface ApiResponse<TData> {
  data: TData
  status: number
}

async function parseResponse<TData>(response: Response): Promise<ApiResponse<TData>> {
  const contentType = response.headers.get('content-type') ?? ''
  const isJson = contentType.includes('application/json')
  const payload = (isJson ? await response.json() : await response.text()) as TData
  if (!response.ok) {
    const error = new Error(`API request failed with status ${response.status}`)
    ;(error as Error & { payload?: unknown }).payload = payload
    throw error
  }
  return { data: payload, status: response.status }
}

export async function apiRequest<TData = unknown, TBody = unknown>({
  path,
  method = 'GET',
  body,
  headers,
  isMultipart = false
}: ApiRequestOptions<TBody>): Promise<ApiResponse<TData>> {
  const requestHeaders = new Headers()

  if (!isMultipart) {
    requestHeaders.set('Content-Type', 'application/json')
  }

  Object.entries(headers ?? {}).forEach(([key, value]) => {
    if (value !== undefined) {
      requestHeaders.set(key, value)
    }
  })

  const payload = isMultipart ? (body as FormData | undefined) : body ? JSON.stringify(body) : undefined

  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}${path}`, {
    method,
    headers: requestHeaders,
    body: payload as BodyInit | undefined,
    credentials: 'include'
  })

  return parseResponse<TData>(response)
}

export type VerificationStatus = 'pending' | 'approved' | 'rejected' | 'requires-info'

export interface ActivityProofPayload {
  title: string
  description: string
  location?: string
  timestamp: string
  mediaCid: string
  hash: string
}

export interface StatusProofPayload {
  category: string
  credentialCid: string
  issuer: string
  referenceCode?: string
}

export interface RewardSummary {
  deri: number
  rights: number
  boosts: number
  lastUpdated: string
}

export interface LeaderboardEntry {
  address: string
  displayName: string
  totalRewards: number
  impactScore: number
  rank: number
}

export interface DashboardMetrics {
  totalActivities: number
  verifiedStatus: boolean
  carbonImpact: number
  contributionPoints: number
  streak: number
}

export interface SubmissionResponse {
  submission_id: string
  cid: string
  ipfs_cid: string
  status: string
  timestamp: string
}

export interface ActivityClaim {
  title: string
  description: string
  location?: string
  timestamp: string
  media_cid: string
  hash: string
  actor_id: string
}

export interface StatusClaim {
  category: string
  issuer: string
  reference_code?: string
  credential_cid: string
  actor_id: string
}

// API functions
export async function submitActivity(claim: ActivityClaim): Promise<SubmissionResponse> {
  const response = await apiRequest<SubmissionResponse, ActivityClaim>({
    path: '/submit-activity',
    method: 'POST',
    body: claim
  })
  return response.data
}

export async function submitStatus(claim: StatusClaim): Promise<SubmissionResponse> {
  const response = await apiRequest<SubmissionResponse, StatusClaim>({
    path: '/submit-status',
    method: 'POST',
    body: claim
  })
  return response.data
}

export async function getSubmission(cid: string): Promise<SubmissionResponse> {
  const response = await apiRequest<SubmissionResponse>({
    path: `/submission/${cid}`,
    method: 'GET'
  })
  return response.data
}

export async function requestReward(submissionId: string, actorId: string, aiAssessment: Record<string, unknown>): Promise<{ success: boolean; tx_hash?: string; reward_amount?: number; message: string }> {
  const response = await apiRequest({
    path: '/reward',
    method: 'POST',
    body: {
      submission_id: submissionId,
      actor_id: actorId,
      ai_assessment: aiAssessment
    }
  })
  return response.data as { success: boolean; tx_hash?: string; reward_amount?: number; message: string }
}
