import { RewardHistory } from '@/components/rewards/RewardHistory'

export const metadata = {
  title: 'Rewards & Incentives | DRP App Portal'
}

export default function RewardsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-300">Rewards</p>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">Track $DeRi utility credits and $RIGHTS governance weight</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Every verified activity and confirmed status funnels rewards directly to your wallet. Review history, monitor sustainability boosts, and export transaction logs.
        </p>
      </header>

      <RewardHistory />
    </div>
  )
}
