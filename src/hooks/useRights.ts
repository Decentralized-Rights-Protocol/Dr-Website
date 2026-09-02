/**
 * useRights Hook
 * 
 * React hook for interacting with the $RIGHTS governance token module.
 * Provides functionality for querying balances, voting, delegation,
 * and managing $RIGHTS token operations.
 */

import { useCallback, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useWallet } from './useWallet';
import { 
  apiClient, 
  TokenBalance, 
  TransactionRequest, 
  TransactionResponse,
  Proposal,
  Vote,
  Delegation
} from '../lib/api';

// ============================================================================
// TYPES
// ============================================================================

/** RIGHTS token state */
export interface RightsState {
  balance: string;
  formattedBalance: string;
  delegated: string;
  locked: string;
  loading: boolean;
  error: Error | null;
  lastUpdated: number | null;
}

/** Vote parameters */
export interface VoteParams {
  proposalId: number;
  vote: 'yes' | 'no' | 'abstain' | 'veto';
}

/** Delegation parameters */
export interface DelegationParams {
  delegateeId: string;
  amount: string; // In $RIGHTS tokens
}

/** Proposal creation parameters */
export interface CreateProposalParams {
  title: string;
  description: string;
  proposalType: string;
  changes: string[];
}

// ============================================================================
// MAIN HOOK
// ============================================================================

/**
 * useRights Hook
 * 
 * Provides comprehensive $RIGHTS token management functionality.
 * 
 * @returns Object with RIGHTS state and operations
 */
export function useRights() {
  const { address, connected } = useWallet();
  const queryClient = useQueryClient();

  // ==========================================================================
  // QUERIES
  // ==========================================================================

  /** Fetch user's $RIGHTS balance */
  const { data: balanceData, isLoading, error, isError } = useQuery({
    queryKey: ['rights', 'balance', address],
    queryFn: async () => {
      if (!address) return null;
      return apiClient.getUserBalance(address, 'rights');
    },
    enabled: !!address && connected,
    staleTime: 30000, // 30 seconds
  });

  // Format balance for display
  const formattedBalance = useMemo(() => {
    if (!balanceData?.balance) return '0';
    try {
      // Assuming $RIGHTS has similar decimals as $DeRi for now
      // In production, this would use the actual decimals configuration
      const amount = BigInt(balanceData.balance);
      const rights = amount / BigInt(1000000);
      return rights.toString();
    } catch {
      return '0';
    }
  }, [balanceData?.balance]);

  /** Fetch user's delegations */
  const { data: delegations, isLoading: delegationsLoading } = useQuery({
    queryKey: ['rights', 'delegations', address],
    queryFn: async () => {
      if (!address) return [];
      // In production, this would fetch from the governance API
      return [] as Delegation[];
    },
    enabled: !!address && connected,
    staleTime: 60000, // 1 minute
  });

  /** Fetch user's votes */
  const { data: votes, isLoading: votesLoading } = useQuery({
    queryKey: ['rights', 'votes', address],
    queryFn: async () => {
      if (!address) return [];
      // In production, this would fetch from the governance API
      return [] as Vote[];
    },
    enabled: !!address && connected,
    staleTime: 60000, // 1 minute
  });

  /** Fetch all proposals */
  const { data: proposals, isLoading: proposalsLoading } = useQuery({
    queryKey: ['rights', 'proposals'],
    queryFn: () => {
      // In production, this would fetch from the governance API
      return [] as Proposal[];
    },
    staleTime: 30000, // 30 seconds
  });

  // ==========================================================================
  // MUTATIONS
  // ==========================================================================

  /** Cast a vote on a proposal */
  const voteMutation = useMutation({
    mutationFn: async (params: VoteParams) => {
      if (!address) throw new Error('Wallet not connected');

      return apiClient.castVote({
        voterId: address,
        proposalId: params.proposalId,
        vote: params.vote,
      });
    },
    onSuccess: () => {
      // Invalidate votes and proposals cache
      queryClient.invalidateQueries({ queryKey: ['rights', 'votes'] });
      queryClient.invalidateQueries({ queryKey: ['rights', 'proposals'] });
    },
  });

  /** Delegate voting power */
  const delegateMutation = useMutation({
    mutationFn: async (params: DelegationParams) => {
      if (!address) throw new Error('Wallet not connected');

      return apiClient.delegateVotingPower({
        delegatorId: address,
        delegateeId: params.delegateeId,
        amount: params.amount,
      });
    },
    onSuccess: () => {
      // Invalidate balance and delegations cache
      queryClient.invalidateQueries({ queryKey: ['rights', 'balance'] });
      queryClient.invalidateQueries({ queryKey: ['rights', 'delegations'] });
    },
  });

  /** Create a new proposal */
  const createProposalMutation = useMutation({
    mutationFn: async (params: CreateProposalParams) => {
      if (!address) throw new Error('Wallet not connected');

      return apiClient.createProposal({
        creatorId: address,
        title: params.title,
        description: params.description,
        proposalType: params.proposalType,
        changes: params.changes,
      });
    },
    onSuccess: () => {
      // Invalidate proposals cache
      queryClient.invalidateQueries({ queryKey: ['rights', 'proposals'] });
    },
  });

  // ==========================================================================
  // HELPER FUNCTIONS
  // ==========================================================================

  /** Convert rights to base units (human-readable to base units) */
  const toBaseUnits = useCallback((amount: string | number): string => {
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(numericAmount)) return '0';
    return Math.round(numericAmount * 1000000).toString();
  }, []);

  /** Convert from base units to rights (base units to human-readable) */
  const fromBaseUnits = useCallback((amount: string | number | bigint): string => {
    const numericAmount = typeof amount === 'string' ? BigInt(amount) : BigInt(amount);
    const rights = numericAmount / BigInt(1000000);
    return rights.toString();
  }, []);

  // ==========================================================================
  // RETURN VALUE
  // ==========================================================================

  return {
    // State
    address,
    connected,
    balance: balanceData?.balance || '0',
    formattedBalance,
    delegated: balanceData?.delegated || '0',
    locked: balanceData?.locked || '0',
    loading: isLoading || delegationsLoading || votesLoading || proposalsLoading,
    error: isError ? error : null,
    lastUpdated: balanceData?.last_updated || null,

    // Data
    delegations,
    votes,
    proposals,

    // Mutations
    vote: voteMutation.mutateAsync,
    voteLoading: voteMutation.isPending,
    voteError: voteMutation.error,
    voteData: voteMutation.data,

    delegate: delegateMutation.mutateAsync,
    delegateLoading: delegateMutation.isPending,
    delegateError: delegateMutation.error,
    delegateData: delegateMutation.data,

    createProposal: createProposalMutation.mutateAsync,
    createProposalLoading: createProposalMutation.isPending,
    createProposalError: createProposalMutation.error,
    createProposalData: createProposalMutation.data,

    // Helpers
    toBaseUnits,
    fromBaseUnits,

    // Utilities
    refresh: () => {
      queryClient.invalidateQueries({ queryKey: ['rights'] });
    },
  };
}

// ============================================================================
// SPECIFIC HOOKS
// ============================================================================

/** Hook for fetching a specific user's $RIGHTS balance */
export function useRightsBalance(address: string) {
  return useQuery({
    queryKey: ['rights', 'balance', address],
    queryFn: () => apiClient.getUserBalance(address, 'rights'),
    enabled: !!address,
    staleTime: 30000,
  });
}

/** Hook for fetching all proposals */
export function useProposals() {
  return useQuery({
    queryKey: ['rights', 'proposals'],
    queryFn: () => {
      // In production, this would fetch from the governance API
      return [] as Proposal[];
    },
    staleTime: 30000,
  });
}

/** Hook for fetching a specific proposal */
export function useProposal(proposalId: number) {
  return useQuery({
    queryKey: ['rights', 'proposal', proposalId],
    queryFn: async () => {
      // In production, this would fetch from the governance API
      // For now, return a mock proposal
      return {
        id: proposalId,
        creator: '0x...',
        title: 'Sample Proposal',
        description: 'This is a sample proposal',
        type: 'parameter_change',
        status: 'open' as const,
        changes: [],
        created_at: Date.now(),
        voting_end: Date.now() + 86400000, // 24 hours from now
      } as Proposal;
    },
    enabled: proposalId > 0,
    staleTime: 30000,
  });
}

/** Hook for casting a vote */
export function useCastVote() {
  const { address } = useWallet();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: VoteParams) => {
      if (!address) throw new Error('Wallet not connected');

      return apiClient.castVote({
        voterId: address,
        proposalId: params.proposalId,
        vote: params.vote,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rights', 'votes'] });
      queryClient.invalidateQueries({ queryKey: ['rights', 'proposals'] });
    },
  });
}

/** Hook for delegating voting power */
export function useDelegateVotingPower() {
  const { address } = useWallet();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: DelegationParams) => {
      if (!address) throw new Error('Wallet not connected');

      return apiClient.delegateVotingPower({
        delegatorId: address,
        delegateeId: params.delegateeId,
        amount: params.amount,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rights', 'balance'] });
      queryClient.invalidateQueries({ queryKey: ['rights', 'delegations'] });
    },
  });
}

