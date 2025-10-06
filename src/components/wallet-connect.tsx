'use client'

import * as React from 'react'
import { Wallet, LogOut, Copy, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WalletState {
  isConnected: boolean
  address: string | null
  balance: string | null
  chainId: number | null
}

export function WalletConnect() {
  const [walletState, setWalletState] = React.useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
    chainId: null
  })
  const [isConnecting, setIsConnecting] = React.useState(false)
  const [showDropdown, setShowDropdown] = React.useState(false)

  // Mock wallet connection - in production, this would use Web3 libraries
  const connectWallet = async () => {
    setIsConnecting(true)
    
    // Simulate wallet connection
    setTimeout(() => {
      setWalletState({
        isConnected: true,
        address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
        balance: '1,250.50',
        chainId: 1
      })
      setIsConnecting(false)
    }, 2000)
  }

  const disconnectWallet = () => {
    setWalletState({
      isConnected: false,
      address: null,
      balance: null,
      chainId: null
    })
    setShowDropdown(false)
  }

  const copyAddress = () => {
    if (walletState.address) {
      navigator.clipboard.writeText(walletState.address)
      // You could add a toast notification here
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (!walletState.isConnected) {
    return (
      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className={cn(
          'flex items-center gap-x-2 rounded-md px-4 py-2 text-sm font-medium transition-colors',
          'bg-primary-600 text-white hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
      >
        <Wallet className="h-4 w-4" />
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-x-2 rounded-md px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        <div className="h-2 w-2 rounded-full bg-green-500"></div>
        <span className="hidden sm:inline">{formatAddress(walletState.address!)}</span>
        <span className="hidden md:inline text-xs text-neutral-500">
          {walletState.balance} $DeRi
        </span>
      </button>

      {showDropdown && (
        <div className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white dark:bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                Connected Wallet
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {walletState.address}
              </p>
            </div>
            
            <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600 dark:text-neutral-300">Balance:</span>
                <span className="text-sm font-medium text-neutral-900 dark:text-white">
                  {walletState.balance} $DeRi
                </span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-neutral-600 dark:text-neutral-300">Network:</span>
                <span className="text-sm font-medium text-neutral-900 dark:text-white">
                  Ethereum Mainnet
                </span>
              </div>
            </div>

            <div className="py-1">
              <button
                onClick={copyAddress}
                className="flex w-full items-center gap-x-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
              >
                <Copy className="h-4 w-4" />
                Copy Address
              </button>
              
              <button
                onClick={() => window.open(`https://etherscan.io/address/${walletState.address}`, '_blank')}
                className="flex w-full items-center gap-x-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                View on Etherscan
              </button>
              
              <button
                onClick={disconnectWallet}
                className="flex w-full items-center gap-x-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
