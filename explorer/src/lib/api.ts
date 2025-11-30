/**
 * DRP Explorer API Client - Connects to Dr-Blockchain backend
 * All API URLs read from process.env.NEXT_PUBLIC_API_URL
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.decentralizedrights.com'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface ApiRequestOptions<TBody> {
  path: string
  method?: HttpMethod
  body?: TBody
  headers?: Record<string, string>
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
  headers
}: ApiRequestOptions<TBody>): Promise<ApiResponse<TData>> {
  const requestHeaders = new Headers()
  requestHeaders.set('Content-Type', 'application/json')

  Object.entries(headers ?? {}).forEach(([key, value]) => {
    if (value !== undefined) {
      requestHeaders.set(key, value)
    }
  })

  const payload = body ? JSON.stringify(body) : undefined

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: requestHeaders,
    body: payload as BodyInit | undefined,
    credentials: 'include'
  })

  return parseResponse<TData>(response)
}

// ============================================================================
// Transactions API
// ============================================================================

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
  const response = await apiRequest<Transaction[]>({
    path: `/api/v1/explorer/transactions${query ? `?${query}` : ''}`,
    method: 'GET'
  })
  
  // Transform to match expected format
  const transactions = response.data || []
  return {
    transactions: transactions.map((tx: any) => ({
      tx_hash: tx.tx_hash,
      block_number: tx.block_number || 0,
      timestamp: tx.timestamp,
      from: tx.from_address,
      to: tx.to_address,
      value: tx.value,
      gas_used: tx.gas_used || 0,
      status: tx.status === 'confirmed' ? 'success' : tx.status === 'failed' ? 'failed' : 'pending',
      type: tx.type,
      metadata: tx.metadata
    })),
    total: transactions.length,
    page: params?.page || 1,
    page_size: params?.page_size || 50
  }
}

// ============================================================================
// Activity Feed API
// ============================================================================

export type VerificationStatus = 'pending' | 'approved' | 'rejected' | 'requires-info'

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
  const response = await apiRequest<any[]>({
    path: `/api/v1/explorer/activity${query ? `?${query}` : ''}&limit=${params?.page_size || 50}`,
    method: 'GET'
  })
  
  // Transform to match expected format
  const activities = response.data || []
  return {
    activities: activities.map((act: any) => ({
      id: act.id,
      actor_id: act.actor,
      title: act.title,
      description: act.description || '',
      location: act.metadata?.location,
      timestamp: act.timestamp,
      media_cid: act.metadata?.media_cid,
      hash: act.metadata?.hash || '',
      verification_status: act.metadata?.ai_verdict === 'approved' ? 'approved' : 'pending',
      ai_summary: act.metadata?.ai_summary,
      rewards: act.metadata?.rewards
    })),
    total: activities.length,
    page: params?.page || 1,
    page_size: params?.page_size || 50
  }
}

// ============================================================================
// AI Verification Summary API
// ============================================================================

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
// Status Rankings API
// ============================================================================

export interface StatusRanking {
  rank: number
  user_id: string
  display_name?: string
  post_score: number
  total_attestations: number
  verified_status: boolean
  last_updated: string
}

export interface StatusRankingsResponse {
  rankings: StatusRanking[]
  total: number
  updated_at: string
}

export async function getStatusRankings(params?: {
  limit?: number
  offset?: number
}): Promise<StatusRankingsResponse> {
  const searchParams = new URLSearchParams()
  if (params?.limit) searchParams.set('limit', params.limit.toString())
  if (params?.offset) searchParams.set('offset', params.offset.toString())

  const query = searchParams.toString()
  const response = await apiRequest<StatusRankingsResponse>({
    path: `/api/status/rankings${query ? `?${query}` : ''}`,
    method: 'GET'
  })
  return response.data
}

