/**
 * API client for the DRP dual-token economy
 * 
 * This file provides TypeScript interfaces and functions for interacting with
 * the DRP blockchain and backend services.
 */

import { useMutation, useQuery } from '@tanstack/react-query';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/** Token types in the DRP dual-token economy */
export type TokenType = 'uderi' | 'rights';

/** Activity types that can generate rewards */
export type ActivityType = 
  | 'poat'              // Proof of Activity
  | 'post'              // Proof of Status
  | 'verification'      // Verification tasks
  | 'ai_elder_duty'     // AI Elder tasks
  | 'content_creation'  // Content creation
  | 'community_engagement' // Community engagement
  | 'humanitarian_work'; // Humanitarian activities

/** Verification status */
export type VerificationStatus = 'pending' | 'verified' | 'rejected' | 'expired';

/** Reward status */
export type RewardStatus = 'pending' | 'distributed' | 'failed';

// ============================================================================
// INTERFACES
// ============================================================================

/** Activity record */
export interface ActivityRecord {
  activity_id: string;
  user_id: string;
  activity_type: ActivityType;
  data: Record<string, unknown>;
  timestamp: number; // Unix timestamp
  verification_status: VerificationStatus;
  verification_confidence: number; // 0-100
  verification_timestamp?: number;
  verifier_id?: string;
  metadata: Record<string, unknown>;
}

/** Token balance */
export interface TokenBalance {
  user_id: string;
  token_type: TokenType;
  balance: string; // In base units (uderi or rights)
  locked?: string;
  delegated?: string;
  last_updated?: number;
}

/** Reward calculation */
export interface RewardCalculation {
  activity_id: string;
  base_reward: string; // In uderi
  activity_score: number; // Multiplier (e.g., 100 = 1.00x)
  verification_confidence: number; // Multiplier (e.g., 100 = 1.00x)
  reputation_multiplier: number; // Multiplier (e.g., 100 = 1.00x)
  network_factor: number; // Multiplier (e.g., 100 = 1.00x)
  final_reward: string; // In uderi (deterministic result)
  calculation_hash: string; // Hash of all inputs for verification
}

/** Transaction request */
export interface TransactionRequest {
  from: string;
  to?: string;
  amount: string; // In base units
  token_type?: TokenType;
  reason?: string;
  signer?: string;
}

/** Transaction response */
export interface TransactionResponse {
  success: boolean;
  error?: string;
  tx_hash?: string;
  tx_url?: string;
}

/** Network stats */
export interface NetworkStats {
  total_users: number;
  total_activities: number;
  total_rewards_distributed: string;
  current_epoch: number;
  current_block: number;
  deri_total_supply: string;
  rights_total_supply: string;
  last_updated: number;
}

/** Emission limits */
export interface EmissionLimits {
  max_per_block: string;    // 1M uderi per block
  max_per_epoch: string;    // 100M uderi per epoch
  max_per_activity: string; // 10K uderi per activity
  max_per_identity: string;  // 1M uderi per identity
}

/** Proposal */
export interface Proposal {
  id: number;
  creator: string;
  title: string;
  description: string;
  type: string;
  status: 'open' | 'passed' | 'rejected' | 'executed';
  changes: string[];
  created_at: number;
  voting_end: number;
}

/** Vote */
export interface Vote {
  proposal_id: number;
  voter: string;
  vote: 'yes' | 'no' | 'abstain' | 'veto';
  timestamp: number;
}

/** Delegation */
export interface Delegation {
  delegator: string;
  delegatee: string;
  amount: string; // In $RIGHTS tokens
}

/** AI Elder */
export interface AIElder {
  elder_id: string;
  name: string;
  role: string;
  capabilities: string[];
  status: 'active' | 'inactive' | 'revoked';
  created_at: number;
  last_activity: number;
  reputation_score: number;
}

// ============================================================================
// API CLIENT
// ============================================================================

/** API endpoint configuration */
export interface ApiConfig {
  baseUrl: string;
  chainId?: string;
  timeout?: number;
}

/** Default API configuration */
export const defaultApiConfig: ApiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
};

/** Create API client */
export class ApiClient {
  private config: ApiConfig;

  constructor(config: ApiConfig = defaultApiConfig) {
    this.config = config;
  }

  /** Fetch with timeout and error handling */
  private async fetchWithTimeout(
    endpoint: string,
    options?: RequestInit
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      this.config.timeout || 10000
    );

    try {
      const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });
      return response;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  // ==========================================================================
  // READ OPERATIONS
  // ==========================================================================

  /** Get activity by ID */
  async getActivity(activityId: string): Promise<ActivityRecord | null> {
    const response = await this.fetchWithTimeout(`/activities/${activityId}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Failed to fetch activity: ${response.statusText}`);
    }
    return response.json();
  }

  /** List activities with filters */
  async listActivities(params: {
    userId?: string;
    activityType?: ActivityType;
    status?: VerificationStatus;
    limit?: number;
    offset?: number;
  } = {}): Promise<ActivityRecord[]> {
    const query = new URLSearchParams();
    if (params.userId) query.set('user_id', params.userId);
    if (params.activityType) query.set('activity_type', params.activityType);
    if (params.status) query.set('status', params.status);
    if (params.limit) query.set('limit', params.limit.toString());
    if (params.offset) query.set('offset', params.offset.toString());

    const response = await this.fetchWithTimeout(`/activities?${query.toString()}`);
    if (!response.ok) {
      throw new Error(`Failed to list activities: ${response.statusText}`);
    }
    return response.json();
  }

  /** Get user balance */
  async getUserBalance(userId: string, tokenType: TokenType): Promise<TokenBalance> {
    const response = await this.fetchWithTimeout(
      `/balances/${userId}?token_type=${tokenType}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch balance: ${response.statusText}`);
    }
    return response.json();
  }

  /** Get reward calculation */
  async getRewardCalculation(activityId: string): Promise<RewardCalculation | null> {
    const response = await this.fetchWithTimeout(`/rewards/calculation/${activityId}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Failed to fetch reward calculation: ${response.statusText}`);
    }
    return response.json();
  }

  /** Get network stats */
  async getNetworkStats(): Promise<NetworkStats> {
    const response = await this.fetchWithTimeout('/network/stats');
    if (!response.ok) {
      throw new Error(`Failed to fetch network stats: ${response.statusText}`);
    }
    return response.json();
  }

  /** Get emission limits */
  async getEmissionLimits(): Promise<EmissionLimits> {
    const response = await this.fetchWithTimeout('/network/emission-limits');
    if (!response.ok) {
      throw new Error(`Failed to fetch emission limits: ${response.statusText}`);
    }
    return response.json();
  }

  /** Get AI Elder by ID */
  async getAIElder(elderId: string): Promise<AIElder | null> {
    const response = await this.fetchWithTimeout(`/ai-elders/${elderId}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Failed to fetch AI Elder: ${response.statusText}`);
    }
    return response.json();
  }

  /** List AI Elders */
  async listAIElders(params: {
    status?: string;
    role?: string;
    limit?: number;
  } = {}): Promise<AIElder[]> {
    const query = new URLSearchParams();
    if (params.status) query.set('status', params.status);
    if (params.role) query.set('role', params.role);
    if (params.limit) query.set('limit', params.limit.toString());

    const response = await this.fetchWithTimeout(`/ai-elders?${query.toString()}`);
    if (!response.ok) {
      throw new Error(`Failed to list AI Elders: ${response.statusText}`);
    }
    return response.json();
  }

  // ==========================================================================
  // WRITE OPERATIONS
  // ==========================================================================

  /** Submit activity */
  async submitActivity(request: {
    userId: string;
    activityType: ActivityType;
    data: Record<string, unknown>;
    metadata?: Record<string, unknown>;
  }): Promise<{ activity_id: string }> {
    const response = await this.fetchWithTimeout('/activities', {
      method: 'POST',
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to submit activity: ${error || response.statusText}`);
    }
    return response.json();
  }

  /** Submit verification */
  async submitVerification(request: {
    activityId: string;
    elderId: string;
    status: VerificationStatus;
    confidence: number; // 0-100
    notes?: string;
  }): Promise<{ success: boolean }> {
    const response = await this.fetchWithTimeout('/verifications', {
      method: 'POST',
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to submit verification: ${error || response.statusText}`);
    }
    return response.json();
  }

  /** Request reward calculation */
  async requestRewardCalculation(request: {
    activityId: string;
    baseReward: string; // In uderi
    activityScore: number;
    verificationConfidence: number;
    reputationMultiplier: number;
    networkFactor: number;
  }): Promise<RewardCalculation> {
    const response = await this.fetchWithTimeout('/rewards/calculate', {
      method: 'POST',
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to request reward calculation: ${error || response.statusText}`);
    }
    return response.json();
  }

  /** Submit reward distribution */
  async submitRewardDistribution(request: {
    calculation: RewardCalculation;
    recipientId: string;
  }): Promise<{ distribution_id: string }> {
    const response = await this.fetchWithTimeout('/rewards/distribute', {
      method: 'POST',
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to submit reward distribution: ${error || response.statusText}`);
    }
    return response.json();
  }

  /** Transfer tokens */
  async transferTokens(request: TransactionRequest): Promise<TransactionResponse> {
    const response = await this.fetchWithTimeout('/transactions/transfer', {
      method: 'POST',
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      const error = await response.text();
      return {
        success: false,
        error: error || response.statusText,
      };
    }
    return response.json();
  }

  /** Create proposal */
  async createProposal(request: {
    creatorId: string;
    title: string;
    description: string;
    proposalType: string;
    changes: string[];
  }): Promise<{ proposal_id: number }> {
    const response = await this.fetchWithTimeout('/governance/proposals', {
      method: 'POST',
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to create proposal: ${error || response.statusText}`);
    }
    return response.json();
  }

  /** Cast vote */
  async castVote(request: {
    voterId: string;
    proposalId: number;
    vote: 'yes' | 'no' | 'abstain' | 'veto';
  }): Promise<{ success: boolean }> {
    const response = await this.fetchWithTimeout('/governance/votes', {
      method: 'POST',
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to cast vote: ${error || response.statusText}`);
    }
    return response.json();
  }

  /** Delegate voting power */
  async delegateVotingPower(request: {
    delegatorId: string;
    delegateeId: string;
    amount: string; // In $RIGHTS tokens
  }): Promise<{ success: boolean }> {
    const response = await this.fetchWithTimeout('/governance/delegations', {
      method: 'POST',
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to delegate voting power: ${error || response.statusText}`);
    }
    return response.json();
  }
}

// ============================================================================
// REACT QUERY HOOKS
// ============================================================================

/** API client instance */
export const apiClient = new ApiClient();

/** Hook for fetching user's $DeRi balance */
export function useDeRiBalance(userId: string) {
  return useQuery({
    queryKey: ['deri', 'balance', userId],
    queryFn: () => apiClient.getUserBalance(userId, 'uderi'),
    staleTime: 30000, // 30 seconds
  });
}

/** Hook for fetching user's $RIGHTS balance */
export function useRightsBalance(userId: string) {
  return useQuery({
    queryKey: ['rights', 'balance', userId],
    queryFn: () => apiClient.getUserBalance(userId, 'rights'),
    staleTime: 30000, // 30 seconds
  });
}

/** Hook for fetching network stats */
export function useNetworkStats() {
  return useQuery({
    queryKey: ['network', 'stats'],
    queryFn: () => apiClient.getNetworkStats(),
    staleTime: 60000, // 1 minute
  });
}

/** Hook for fetching emission limits */
export function useEmissionLimits() {
  return useQuery({
    queryKey: ['network', 'emission-limits'],
    queryFn: () => apiClient.getEmissionLimits(),
    staleTime: 300000, // 5 minutes
  });
}

/** Hook for fetching user activities */
export function useUserActivities(userId: string, status?: VerificationStatus) {
  return useQuery({
    queryKey: ['activities', userId, status],
    queryFn: () => apiClient.listActivities({ userId, status }),
    staleTime: 15000, // 15 seconds
  });
}

/** Hook for submitting an activity */
export function useSubmitActivity() {
  return useMutation({
    mutationFn: (request: {
      userId: string;
      activityType: ActivityType;
      data: Record<string, unknown>;
      metadata?: Record<string, unknown>;
    }) => apiClient.submitActivity(request),
  });
}

/** Hook for transferring tokens */
export function useTransferTokens() {
  return useMutation({
    mutationFn: (request: TransactionRequest) => apiClient.transferTokens(request),
  });
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/** Format token amount for display (from base units to human-readable) */
export function formatTokenAmount(amount: string, decimals: number = 6): string {
  // For $DeRi: 1 deri = 1,000,000 uderi (6 decimals)
  // For $RIGHTS: similar or as configured
  const divisor = Math.pow(10, decimals);
  const numericAmount = parseInt(amount, 10) || 0;
  return (numericAmount / divisor).toFixed(decimals);
}

/** Parse token amount for transaction (from human-readable to base units) */
export function parseTokenAmount(amount: string, decimals: number = 6): string {
  const divisor = Math.pow(10, decimals);
  const numericAmount = parseFloat(amount) || 0;
  return Math.round(numericAmount * divisor).toString();
}

/** Calculate reward using deterministic formula */
export function calculateReward(
  baseReward: string,
  activityScore: number,
  verificationConfidence: number,
  reputationMultiplier: number,
  networkFactor: number
): string {
  // Parse base reward
  const base = parseInt(baseReward, 10) || 0;
  
  // Use integer arithmetic to match the Go implementation
  // Scale: 10^12 for 6 decimal places of precision
  const scale = 1000000000000;
  
  // Scale each component (they're already percentages, e.g., 100 = 1.00x)
  let result = base * scale;
  result = Math.floor((result * activityScore) / scale);
  result = Math.floor((result * verificationConfidence) / scale);
  result = Math.floor((result * reputationMultiplier) / scale);
  result = Math.floor((result * networkFactor) / scale);
  
  return result.toString();
}

/** Generate calculation hash for verification */
export function generateCalculationHash(
  activityId: string,
  baseReward: string,
  activityScore: number,
  verificationConfidence: number,
  reputationMultiplier: number,
  networkFactor: number
): string {
  const data = `${activityId}:${baseReward}:${activityScore}:${verificationConfidence}:${reputationMultiplier}:${networkFactor}`;
  // Simple hash for demonstration (in production, use crypto library)
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(16);
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  ApiClient,
  defaultApiConfig,
  // Types
  TokenType,
  ActivityType,
  VerificationStatus,
  RewardStatus,
  ActivityRecord,
  TokenBalance,
  RewardCalculation,
  TransactionRequest,
  TransactionResponse,
  NetworkStats,
  EmissionLimits,
  Proposal,
  Vote,
  Delegation,
  AIElder,
  // Hooks
  useDeRiBalance,
  useRightsBalance,
  useNetworkStats,
  useEmissionLimits,
  useUserActivities,
  useSubmitActivity,
  useTransferTokens,
  // Utilities
  formatTokenAmount,
  parseTokenAmount,
  calculateReward,
  generateCalculationHash,
};
