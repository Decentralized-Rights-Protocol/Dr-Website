"use client";

import React, { useState, useEffect } from "react";
import { Wallet, LogOut, Copy, ExternalLink, Coins, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  chainId: number | null;
  networkName: string | null;
}

interface DeRiBalance {
  balance: number;
  balance_formatted: number;
  symbol: string;
  error?: string;
}

export function WalletConnectButton() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
    chainId: null,
    networkName: null
  });
  const [deriBalance, setDeriBalance] = useState<DeRiBalance | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);

  // Check if wallet is already connected on mount
  useEffect(() => {
    checkWalletConnection();
  }, []);

  // Load DeRi balance when wallet connects
  useEffect(() => {
    if (walletState.isConnected && walletState.address) {
      loadDeRiBalance();
    }
  }, [walletState.isConnected, walletState.address]);

  const checkWalletConnection = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          const chainId = await window.ethereum.request({ method: "eth_chainId" });
          setWalletState({
            isConnected: true,
            address: accounts[0],
            balance: null, // Will be loaded separately
            chainId: parseInt(chainId, 16),
            networkName: getNetworkName(parseInt(chainId, 16))
          });
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("Please install MetaMask or another Web3 wallet");
      return;
    }

    setIsConnecting(true);
    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // Get chain ID
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      const networkName = getNetworkName(parseInt(chainId, 16));

      setWalletState({
        isConnected: true,
        address: accounts[0],
        balance: null,
        chainId: parseInt(chainId, 16),
        networkName
      });

      // Persist for reward flows
      try {
        localStorage.setItem('connectedWallet', accounts[0]);
      } catch {}

      // Listen for account changes
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      if (error.code === 4001) {
        alert("Please connect to MetaMask to continue");
      } else {
        alert("Failed to connect wallet. Please try again.");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const loadDeRiBalance = async () => {
    if (!walletState.address) return;
    
    setIsLoadingBalance(true);
    try {
      const response = await fetch(`/api/reward/balance/${walletState.address}`);
      const data = await response.json();
      setDeriBalance(data);
    } catch (error) {
      console.error("Error loading DeRi balance:", error);
      setDeriBalance({ balance: 0, balance_formatted: 0, symbol: "DeRi-TEST", error: "Failed to load balance" });
    } finally {
      setIsLoadingBalance(false);
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      setWalletState(prev => ({ ...prev, address: accounts[0] }));
      try {
        localStorage.setItem('connectedWallet', accounts[0]);
      } catch {}
    }
  };

  const handleChainChanged = (chainId: string) => {
    const newChainId = parseInt(chainId, 16);
    setWalletState(prev => ({
      ...prev,
      chainId: newChainId,
      networkName: getNetworkName(newChainId)
    }));
  };

  const disconnectWallet = () => {
    setWalletState({
      isConnected: false,
      address: null,
      balance: null,
      chainId: null,
      networkName: null
    });
    setDeriBalance(null);
    setShowDropdown(false);
    try { localStorage.removeItem('connectedWallet'); } catch {}
    
    // Remove event listeners
    if (window.ethereum) {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    }
  };

  const copyAddress = () => {
    if (walletState.address) {
      navigator.clipboard.writeText(walletState.address);
      // You could add a toast notification here
    }
  };

  const getNetworkName = (chainId: number): string => {
    switch (chainId) {
      case 1: return "Ethereum Mainnet";
      case 11155111: return "Sepolia Testnet";
      case 137: return "Polygon Mainnet";
      case 80001: return "Polygon Mumbai";
      default: return `Chain ${chainId}`;
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getExplorerUrl = (address: string, chainId: number) => {
    switch (chainId) {
      case 1: return `https://etherscan.io/address/${address}`;
      case 11155111: return `https://sepolia.etherscan.io/address/${address}`;
      case 137: return `https://polygonscan.com/address/${address}`;
      case 80001: return `https://mumbai.polygonscan.com/address/${address}`;
      default: return `https://etherscan.io/address/${address}`;
    }
  };

  if (!walletState.isConnected) {
    return (
      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className={cn(
          "flex items-center gap-x-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200",
          "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
          "text-white shadow-lg hover:shadow-xl",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "hover:scale-105 active:scale-95"
        )}
      >
        <Wallet className="h-4 w-4" />
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-x-2 rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors border border-neutral-200 dark:border-neutral-700"
      >
        <div className="flex items-center gap-x-2">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span className="hidden sm:inline font-mono text-xs">
            {formatAddress(walletState.address!)}
          </span>
        </div>
        {deriBalance && (
          <div className="flex items-center gap-x-1 text-xs text-green-600 dark:text-green-400">
            <Coins className="h-3 w-3" />
            <span>{deriBalance.balance_formatted.toFixed(2)}</span>
          </div>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-lg bg-white dark:bg-neutral-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                Wallet Connected
              </h3>
              <div className="flex items-center gap-x-1 text-xs text-green-600 dark:text-green-400">
                <CheckCircle className="h-3 w-3" />
                <span>Connected</span>
              </div>
            </div>
            
            {/* Address */}
            <div className="mb-4">
              <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-1">Address</p>
              <div className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-700 rounded-md p-2">
                <span className="font-mono text-xs text-neutral-900 dark:text-white">
                  {walletState.address}
                </span>
                <button
                  onClick={copyAddress}
                  className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded transition-colors"
                >
                  <Copy className="h-3 w-3" />
                </button>
              </div>
            </div>
            
            {/* Network */}
            <div className="mb-4">
              <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-1">Network</p>
              <div className="bg-neutral-50 dark:bg-neutral-700 rounded-md p-2">
                <span className="text-xs text-neutral-900 dark:text-white">
                  {walletState.networkName}
                </span>
              </div>
            </div>
            
            {/* DeRi Balance */}
            <div className="mb-4">
              <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-1">DeRi Balance</p>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-md p-2">
                {isLoadingBalance ? (
                  <div className="flex items-center gap-x-2">
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-500"></div>
                    <span className="text-xs text-neutral-600 dark:text-neutral-300">Loading...</span>
                  </div>
                ) : deriBalance ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2">
                      <Coins className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                        {deriBalance.balance_formatted.toFixed(2)} {deriBalance.symbol}
                      </span>
                    </div>
                    {deriBalance.error && (
                      <span className="text-xs text-red-500">Error</span>
                    )}
                  </div>
                ) : (
                  <span className="text-xs text-neutral-600 dark:text-neutral-300">No balance data</span>
                )}
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex gap-x-2">
              <button
                onClick={() => window.open(getExplorerUrl(walletState.address!, walletState.chainId!), '_blank')}
                className="flex-1 flex items-center justify-center gap-x-1 px-3 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-md transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                <span>View on Explorer</span>
              </button>
              
              <button
                onClick={disconnectWallet}
                className="flex-1 flex items-center justify-center gap-x-1 px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md transition-colors"
              >
                <LogOut className="h-3 w-3" />
                <span>Disconnect</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Extend Window interface for ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
}
