/**
 * useDeri Hook
 * 
 * React hook for interacting with the $DeRi token module.
 * Provides functionality for querying balances, transferring tokens,
 * and managing $DeRi token operations.
 */

import { useCallback, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useWallet } from './useWallet';
import { apiClient, TokenBalance, TransactionRequest, TransactionResponse } from '../lib/api';

// ============================================================================
// TYPES
// ============================================================================

/** DeRi token state */
export interface DeRiState {
  balance: string;
  formattedBalance: string;
  loading: boolean;
  error: Error | null;
  lastUpdated: number | null;
}

/** Transfer parameters */
export interface TransferParams {
  to: string;
  amount: string; // In uderi (base units)
  formattedAmount?: string; // In deri (human-readable)
}

/** Mint parameters (restricted) */
export interface MintParams {
  to: string;
  amount: string; // In uderi
  reason: string;
}

/** Burn parameters */
export interface BurnParams {
  amount: string; // In uderi
  reason: string;
}

// ============================================================================
// MAIN HOOK
// ============================================================================

/**
 * useDeri Hook
 * 
 * Provides comprehensive $DeRi token management functionality.
 * 
 * @returns Object with DeRi state and operations
 */
export function useDeri() {
  const { address, connected } = useWallet();
  const queryClient = useQueryClient();

  // ==========================================================================
  // QUERIES
  // ==========================================================================

  /** Fetch user's $DeRi balance */
  const { data: balanceData, isLoading, error, isError } = useQuery({
    queryKey: ['deri', 'balance', address],
    queryFn: async () => {
      if (!address) return null;
      return apiClient.getUserBalance(address, 'uderi');
    },
    enabled: !!address && connected,
    staleTime: 30000, // 30 seconds
  });

  // Format balance for display
  const formattedBalance = useMemo(() => {
    if (!balanceData?.balance) return '0';
    try {
      const amount = BigInt(balanceData.balance);
      const deri = amount / BigInt(1000000); // 1 deri = 1,000,000 uderi
      return deri.toString();
    } catch {
      return '0';
    }
  }, [balanceData?.balance]);

  // ==========================================================================
  // MUTATIONS
  // ==========================================================================

  /** Transfer $DeRi tokens to another address */
  const transferMutation = useMutation({
    mutationFn: async (params: TransferParams) => {
      if (!address) throw new Error('Wallet not connected');

      const request: TransactionRequest = {
        from: address,
        to: params.to,
        amount: params.amount,
        token_type: 'uderi',
      };

      return apiClient.transferTokens(request);
    },
    onSuccess: (response: TransactionResponse) => {
      // Invalidate balance cache on success
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['deri', 'balance', address] });
      }
    },
  });

  /** Mint $DeRi tokens (restricted operation) */
  const mintMutation = useMutation({
    mutationFn: async (params: MintParams) => {
      if (!address) throw new Error('Wallet not connected');

      // Note: Minting is restricted to authorized module accounts
      // This is a placeholder for the actual implementation
      const request: TransactionRequest = {
        from: address,
        to: params.to,
        amount: params.amount,
        token_type: 'uderi',
        reason: params.reason,
        signer: address,
      };

      return apiClient.transferTokens(request);
    },
    onSuccess: (response: TransactionResponse) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['deri', 'balance'] });
      }
    },
  });

  /** Burn $DeRi tokens */
  const burnMutation = useMutation({
    mutationFn: async (params: BurnParams) => {
      if (!address) throw new Error('Wallet not connected');

      const request: TransactionRequest = {
        from: address,
        amount: params.amount,
        token_type: 'uderi',
        reason: params.reason,
      };

      return apiClient.transferTokens(request);
    },
    onSuccess: (response: TransactionResponse) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['deri', 'balance', address] });
      }
    },
  });

  // ==========================================================================
  // HELPER FUNCTIONS
  // ==========================================================================

  /** Convert deri to uderi (human-readable to base units) */
  const toUderi = useCallback((amount: string | number): string => {
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(numericAmount)) return '0';
    return Math.round(numericAmount * 1000000).toString();
  }, []);

  /** Convert uderi to deri (base units to human-readable) */
  const toDeri = useCallback((amount: string | number | bigint): string => {
    const numericAmount = typeof amount === 'string' ? BigInt(amount) : BigInt(amount);
    const deri = numericAmount / BigInt(1000000);
    return deri.toString();
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
    loading: isLoading,
    error: isError ? error : null,
    lastUpdated: balanceData?.last_updated || null,

    // Mutations
    transfer: transferMutation.mutateAsync,
    transferLoading: transferMutation.isPending,
    transferError: transferMutation.error,
    transferData: transferMutation.data,

    mint: mintMutation.mutateAsync,
    mintLoading: mintMutation.isPending,
    mintError: mintMutation.error,
    mintData: mintMutation.data,

    burn: burnMutation.mutateAsync,
    burnLoading: burnMutation.isPending,
    burnError: burnMutation.error,
    burnData: burnMutation.data,

    // Helpers
    toUderi,
    toDeri,

    // Utilities
    refreshBalance: () => {
      queryClient.invalidateQueries({ queryKey: ['deri', 'balance', address] });
    },
  };
}

// ============================================================================
// SPECIFIC HOOKS
// ============================================================================

/** Hook for fetching a specific user's $DeRi balance */
export function useDeRiBalance(address: string) {
  return useQuery({
    queryKey: ['deri', 'balance', address],
    queryFn: () => apiClient.getUserBalance(address, 'uderi'),
    enabled: !!address,
    staleTime: 30000,
  });
}

/** Hook for transferring $DeRi tokens */
export function useTransferDeRi() {
  const { address } = useWallet();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: TransferParams) => {
      if (!address) throw new Error('Wallet not connected');

      const request: TransactionRequest = {
        from: address,
        to: params.to,
        amount: params.amount,
        token_type: 'uderi',
      };

      return apiClient.transferTokens(request);
    },
    onSuccess: (response: TransactionResponse) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['deri', 'balance'] });
      }
    },
  });
}

/** Hook for fetching multiple $DeRi balances */
export function useMultipleDeRiBalances(addresses: string[]) {
  return useQuery({
    queryKey: ['deri', 'balances', ...addresses],
    queryFn: async () => {
      const balances = await Promise.all(
        addresses.map(addr => apiClient.getUserBalance(addr, 'uderi'))
      );
      return balances.reduce((acc, balance, index) => {
        acc[addresses[index]] = balance;
        return acc;
      }, {} as Record<string, TokenBalance>);
    },
    enabled: addresses.length > 0,
    staleTime: 30000,
  });
}

