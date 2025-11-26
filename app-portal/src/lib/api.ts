/**
 * DRP API Client - Connects to Dr-Blockchain backend
 * All API URLs read from process.env.NEXT_PUBLIC_API_URL
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.decentralizedrights.com'

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

  const response = await fetch(`${API_BASE_URL}${path}`, {
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

// ============================================================================
// Activity Submission API
// ============================================================================

/**
 * Submit activity to Dr-Blockchain backend
 * POST https://api.decentralizedrights.com/api/activity/submit
 */
export async function submitActivity(claim: ActivityClaim): Promise<SubmissionResponse> {
  const response = await apiRequest<SubmissionResponse, ActivityClaim>({
    path: '/api/activity/submit',
    method: 'POST',
    body: claim
  })
  return response.data
}

// ============================================================================
// Status & PoST Score API
// ============================================================================

/**
 * Get user status and PoST score
 * GET https://api.decentralizedrights.com/api/status/profile?id={user}
 */
export interface StatusProfile {
  user_id: string
  post_score: number
  verified_status: boolean
  attestations: Array<{
    category: string
    issuer: string
    verified_at: string
    credential_cid: string
  }>
  last_updated: string
}

export async function getStatusProfile(userId: string): Promise<StatusProfile> {
  const response = await apiRequest<StatusProfile>({
    path: `/api/status/profile?id=${encodeURIComponent(userId)}`,
    method: 'GET'
  })
  return response.data
}

export async function submitStatus(claim: StatusClaim): Promise<SubmissionResponse> {
  const response = await apiRequest<SubmissionResponse, StatusClaim>({
    path: '/api/status/submit',
    method: 'POST',
    body: claim
  })
  return response.data
}

// ============================================================================
// Explorer Data API
// ============================================================================

/**
 * Get transactions from blockchain
 * GET https://api.decentralizedrights.com/api/transactions
 */
export interface Transaction {
  tx_hash: string
  block_number: number
  timestamp: string
  from: string
  to: string
  value: string
  gas_used: number
  status: 'success' | 'failed' | 'pending'
  type: 'activity' | 'status' | 'reward' | 'governance'
  metadata?: Record<string, unknown>
}

export interface TransactionsResponse {
  transactions: Transaction[]
  total: number
  page: number
  page_size: number
}

export async function getTransactions(params?: {
  page?: number
  page_size?: number
  type?: Transaction['type']
  status?: Transaction['status']
}): Promise<TransactionsResponse> {
  const searchParams = new URLSearchParams()
  if (params?.page) searchParams.set('page', params.page.toString())
  if (params?.page_size) searchParams.set('page_size', params.page_size.toString())
  if (params?.type) searchParams.set('type', params.type)
  if (params?.status) searchParams.set('status', params.status)

  const query = searchParams.toString()
  const response = await apiRequest<TransactionsResponse>({
    path: `/api/transactions${query ? `?${query}` : ''}`,
    method: 'GET'
  })
  return response.data
}

/**
 * Get activity feed
 * GET https://api.decentralizedrights.com/api/activity/feed
 */
export interface ActivityFeedItem {
  id: string
  actor_id: string
  title: string
  description: string
  location?: string
  timestamp: string
  media_cid?: string
  hash: string
  verification_status: VerificationStatus
  ai_summary?: string
  orbitdb_cid?: string
  rewards?: {
    deri: number
    rights: number
  }
}

export interface ActivityFeedResponse {
  activities: ActivityFeedItem[]
  total: number
  page: number
  page_size: number
}

export async function getActivityFeed(params?: {
  page?: number
  page_size?: number
  actor_id?: string
}): Promise<ActivityFeedResponse> {
  const searchParams = new URLSearchParams()
  if (params?.page) searchParams.set('page', params.page.toString())
  if (params?.page_size) searchParams.set('page_size', params.page_size.toString())
  if (params?.actor_id) searchParams.set('actor_id', params.actor_id)

  const query = searchParams.toString()
  const response = await apiRequest<ActivityFeedResponse>({
    path: `/api/activity/feed${query ? `?${query}` : ''}`,
    method: 'GET'
  })
  return response.data
}

/**
 * Get AI verification summary
 * GET https://api.decentralizedrights.com/api/ai/summary
 */
export interface AISummary {
  activity_id: string
  summary: string
  confidence_score: number
  verification_status: VerificationStatus
  key_points: string[]
  generated_at: string
  elder_review?: {
    elder_id: string
    decision: string
    reasoning: string
  }
}

export async function getAISummary(activityId: string): Promise<AISummary> {
  const response = await apiRequest<AISummary>({
    path: `/api/ai/summary?activity_id=${encodeURIComponent(activityId)}`,
    method: 'GET'
  })
  return response.data
}

// ============================================================================
// Rewards API
// ============================================================================

/**
 * Claim rewards
 * GET https://api.decentralizedrights.com/api/rewards/claim
 */
export interface RewardClaim {
  user_id: string
  submission_id: string
  deri_amount: number
  rights_amount: number
  tx_hash?: string
  claimed_at: string
}

export async function claimRewards(userId: string, submissionId: string): Promise<RewardClaim> {
  const response = await apiRequest<RewardClaim>({
    path: `/api/rewards/claim?user_id=${encodeURIComponent(userId)}&submission_id=${encodeURIComponent(submissionId)}`,
    method: 'GET'
  })
  return response.data
}

export async function requestReward(submissionId: string, actorId: string, aiAssessment: Record<string, unknown>): Promise<{ success: boolean; tx_hash?: string; reward_amount?: number; message: string }> {
  const response = await apiRequest({
    path: '/api/rewards/request',
    method: 'POST',
    body: {
      submission_id: submissionId,
      actor_id: actorId,
      ai_assessment: aiAssessment
    }
  })
  return response.data as { success: boolean; tx_hash?: string; reward_amount?: number; message: string }
}

// ============================================================================
// Legacy/Additional API functions
// ============================================================================

export async function getSubmission(cid: string): Promise<SubmissionResponse> {
  const response = await apiRequest<SubmissionResponse>({
    path: `/api/submission/${cid}`,
    method: 'GET'
  })
  return response.data
}
