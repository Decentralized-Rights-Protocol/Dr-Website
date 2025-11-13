'use client'

import { useCallback, useEffect } from 'react'
import { ethers } from 'ethers'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getBalance } from '@/lib/tokenomics'
import { useAppStore } from '@/store/app-store'

type EthereumProvider = ethers.Eip1193Provider & {
  on?: (event: string, handler: (...args: unknown[]) => void) => void
  removeListener?: (event: string, handler: (...args: unknown[]) => void) => void
}

interface WalletBalances {
  deri: number
  rights: number
}

export function useWallet() {
  const address = useAppStore((state) => state.address)
  const isConnecting = useAppStore((state) => state.isConnecting)
  const setAddress = useAppStore((state) => state.setAddress)
  const setConnecting = useAppStore((state) => state.setConnecting)
  const setNetworkName = useAppStore((state) => state.setNetworkName)

  const connectWallet = useCallback(async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error('No Web3 wallet detected')
    }
    const ethereum = window.ethereum as EthereumProvider
    setConnecting(true)
    try {
      const provider = new ethers.BrowserProvider(ethereum)
      const accounts = await provider.send('eth_requestAccounts', [])
      const network = await provider.getNetwork()
      const account = accounts[0] as string | undefined
      if (!account) {
        throw new Error('No account returned by wallet')
      }
      setAddress(account)
      setNetworkName(network.name)
      return account
    } finally {
      setConnecting(false)
    }
  }, [setAddress, setConnecting, setNetworkName])

  const disconnectWallet = useCallback(() => {
    setAddress(null)
    setNetworkName(null)
  }, [setAddress, setNetworkName])

  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum) return
    const ethereum = window.ethereum as EthereumProvider
    const handleAccountsChanged = (...accounts: unknown[]) => {
      const nextAccount = (accounts[0] as string | undefined) ?? null
      if (!nextAccount) {
        disconnectWallet()
      } else {
        setAddress(nextAccount)
      }
    }
    ethereum.on?.('accountsChanged', handleAccountsChanged)
    return () => {
      ethereum.removeListener?.('accountsChanged', handleAccountsChanged)
    }
  }, [disconnectWallet, setAddress])

  const balanceQuery = useQuery<WalletBalances>({
    queryKey: ['wallet-balance', address],
    queryFn: async () => {
      if (!address) return { deri: 0, rights: 0 }
      return getBalance(address)
    },
    enabled: Boolean(address)
  })

  const connectMutation = useMutation({
    mutationFn: connectWallet
  })

  return {
    address,
    isConnecting,
    connect: connectMutation.mutateAsync,
    disconnect: disconnectWallet,
    balances: balanceQuery.data,
    isFetchingBalances: balanceQuery.isLoading
  }
}
