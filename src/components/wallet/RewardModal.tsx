"use client";

import React, { useState, useEffect } from "react";
import { X, Coins, CheckCircle, ExternalLink, Loader2, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  rewardData: {
    amount: number;
    activity: string;
    transactionHash?: string;
    lessonId?: string;
    score?: number;
  } | null;
}

interface RewardResponse {
  success: boolean;
  transaction_hash?: string;
  reward_amount?: number;
  message: string;
  error?: string;
}

export function RewardModal({ isOpen, onClose, rewardData }: RewardModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [rewardResult, setRewardResult] = useState<RewardResponse | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isOpen && rewardData) {
      processReward();
    }
  }, [isOpen, rewardData]);

  const processReward = async () => {
    if (!rewardData) return;

    setIsProcessing(true);
    setRewardResult(null);

    try {
      // Get wallet address from localStorage or wallet state
      const walletAddress = localStorage.getItem('connectedWallet');
      if (!walletAddress) {
        throw new Error('No wallet connected');
      }

      const response = await fetch('/api/reward/lesson-complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wallet_address: walletAddress,
          lesson_id: rewardData.lessonId,
          score: rewardData.score || 0
        })
      });

      const result: RewardResponse = await response.json();
      setRewardResult(result);

      if (result.success) {
        setShowSuccess(true);
        // Auto-close after 3 seconds
        setTimeout(() => {
          onClose();
        }, 3000);
      }

    } catch (error) {
      console.error('Error processing reward:', error);
      setRewardResult({
        success: false,
        message: 'Failed to process reward',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getExplorerUrl = (txHash: string) => {
    // You can make this dynamic based on the network
    return `https://sepolia.etherscan.io/tx/${txHash}`;
  };

  const getActivityDisplayName = (activity: string) => {
    switch (activity) {
      case 'lesson_completion': return 'Lesson Completion';
      case 'quiz_perfect': return 'Perfect Quiz Score';
      case 'achievement_unlock': return 'Achievement Unlocked';
      case 'level_completion': return 'Level Completed';
      case 'streak_bonus': return 'Streak Bonus';
      default: return activity.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-x-3">
            <div className="p-2 bg-white/20 rounded-full">
              <Gift className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Reward Earned!</h2>
              <p className="text-blue-100 text-sm">You've completed a learning activity</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isProcessing && (
            <div className="text-center py-8">
              <div className="flex flex-col items-center gap-x-4">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  Processing Reward...
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Sending {rewardData?.amount} DeRi tokens to your wallet
                </p>
              </div>
            </div>
          )}

          {rewardResult && !isProcessing && (
            <div className="text-center">
              {rewardResult.success ? (
                <div className="py-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                    Reward Sent Successfully!
                  </h3>
                  
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-center gap-x-2 mb-2">
                      <Coins className="h-5 w-5 text-green-500" />
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {rewardResult.reward_amount ? (rewardResult.reward_amount / 10**18).toFixed(2) : '0'} DeRi
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      {getActivityDisplayName(rewardData?.activity || '')}
                    </p>
                    {rewardData?.score && (
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        Score: {rewardData.score}%
                      </p>
                    )}
                  </div>

                  {rewardResult.transaction_hash && (
                    <div className="mb-4">
                      <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-2">
                        Transaction Hash:
                      </p>
                      <div className="bg-neutral-100 dark:bg-neutral-700 rounded-md p-2 mb-2">
                        <p className="font-mono text-xs text-neutral-900 dark:text-white break-all">
                          {rewardResult.transaction_hash}
                        </p>
                      </div>
                      <a
                        href={getExplorerUrl(rewardResult.transaction_hash)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-x-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" />
                        View on Explorer
                      </a>
                    </div>
                  )}

                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                    {rewardResult.message}
                  </p>
                </div>
              ) : (
                <div className="py-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
                      <X className="h-8 w-8 text-red-500" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                    Reward Failed
                  </h3>
                  
                  <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                    {rewardResult.message}
                  </p>
                  
                  {rewardResult.error && (
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-md p-3 mb-4">
                      <p className="text-xs text-red-700 dark:text-red-300">
                        Error: {rewardResult.error}
                      </p>
                    </div>
                  )}
                  
                  <button
                    onClick={processReward}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          )}

          {!isProcessing && !rewardResult && (
            <div className="text-center py-4">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <Gift className="h-8 w-8 text-blue-500" />
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                Ready to Claim Reward
              </h3>
              
              <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4">
                You've earned {rewardData?.amount} DeRi tokens for completing this activity!
              </p>
              
              <button
                onClick={processReward}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                Claim Reward
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {showSuccess && (
          <div className="bg-green-50 dark:bg-green-900/20 px-6 py-3 border-t border-green-200 dark:border-green-800">
            <p className="text-xs text-green-700 dark:text-green-300 text-center">
              This modal will close automatically in a few seconds...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
