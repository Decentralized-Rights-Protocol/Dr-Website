import { WalletPanel } from '@/components/wallet/WalletPanel'

export const metadata = {
  title: 'Wallet & Balances | DRP App Portal'
}

export default function WalletPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-300">Wallet</p>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">Connect a wallet or custodial key</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Link your wallet to sign proofs, receive token rewards, and manage governance stakes securely. All signatures remain client-side.
        </p>
      </header>

      <WalletPanel />

      <section className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 text-sm text-neutral-600 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60 dark:text-neutral-300">
        <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Supported wallets</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Browser wallets – MetaMask, Rabby, Frame</li>
          <li>Mobile wallets via WalletConnect</li>
          <li>Custodial DRP session keys for low-connectivity regions</li>
        </ul>
      </section>
    </div>
  )
}
