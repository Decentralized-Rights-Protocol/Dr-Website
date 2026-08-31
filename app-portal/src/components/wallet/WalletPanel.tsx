'use client'

import { Wallet, Loader2, ExternalLink, Coins } from 'lucide-react'
import { useWallet } from '@/hooks/useWallet'

export function WalletPanel() {
  const { address, connect, disconnect, isConnecting, balances, isFetchingBalances } = useWallet()

  const shortAddress = address ? `${address.slice(0, 6)}…${address.slice(-4)}` : null

  return (
    <section className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
      <header className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600 dark:bg-primary-500/15 dark:text-primary-200">
          <Wallet className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Wallet</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Link your wallet to sign proofs and receive on-chain rewards.
          </p>
        </div>
      </header>

      <div className="mt-5 space-y-4">
        {address ? (
          <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200/70 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-950">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Connected address</p>
            <p className="font-mono text-sm text-neutral-900 dark:text-neutral-100">{address}</p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={disconnect}
                className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                Disconnect
              </button>
              <a
                href={`https://explorer.decentralizedrights.com/address/${address}`}
                className="inline-flex items-center gap-2 rounded-xl border border-primary-500 px-4 py-2 text-sm font-medium text-primary-600 transition hover:bg-primary-50 dark:border-primary-400 dark:text-primary-300 dark:hover:bg-primary-900/40"
                target="_blank"
                rel="noreferrer"
              >
                View on explorer
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => connect()}
            disabled={isConnecting}
            className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isConnecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wallet className="h-4 w-4" />}
            Connect wallet
          </button>
        )}

        <div className="rounded-2xl border border-neutral-200/70 bg-neutral-50/70 p-4 dark:border-neutral-700 dark:bg-neutral-900/50">
          <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">Token balances</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <BalanceCard
              label="$DeRi"
              amount={balances?.deri ?? 0}
              description="Utility credits earned from verified activities"
              loading={isFetchingBalances}
            />
            <BalanceCard
              label="$RIGHTS"
              amount={balances?.rights ?? 0}
              description="Governance weight unlocked via Proof of Status"
              loading={isFetchingBalances}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

interface BalanceCardProps {
  label: string
  amount: number
  description: string
  loading?: boolean
}

function BalanceCard({ label, amount, description, loading }: BalanceCardProps) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-950">
      <div className="flex items-center gap-2 text-primary-600 dark:text-primary-300">
        <Coins className="h-4 w-4" />
        <p className="text-sm font-semibold">{label}</p>
      </div>
      <p className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        {loading ? '…' : amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </p>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">{description}</p>
    </div>
  )
}
