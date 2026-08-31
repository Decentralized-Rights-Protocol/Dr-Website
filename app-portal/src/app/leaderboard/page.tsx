import { LeaderboardTable } from '@/components/leaderboard/LeaderboardTable'
import { BadgeShareCard } from '@/components/community/BadgeShareCard'

export const metadata = {
  title: 'Community Leaderboard | DRP App Portal'
}

export default function LeaderboardPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-300">Community</p>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">Celebrate impact across the DRP ecosystem</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Leaderboard rankings highlight organisations and individuals consistently advancing human rights protections through verifiable action.
        </p>
      </header>

      <LeaderboardTable />

      <BadgeShareCard
        badgeTitle="Rights Guardian badge"
        description="Broadcast your verified achievements to inspire cooperative allies and civic partners."
        shareUrl="https://app.decentralizedrights.com/community/share"
      />
    </div>
  )
}
