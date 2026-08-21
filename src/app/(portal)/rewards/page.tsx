import { RewardHistory } from "@/components/rewards/RewardHistory";

export const metadata = {
  title: "Rewards & Incentives | DRP App Portal",
};

export default function RewardsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#00e5cc]">
          Rewards
        </p>
        <h1 className="text-2xl font-black text-foreground">
          Track $DeRi utility credits and $RIGHTS governance weight
        </h1>
        <p className="text-sm text-foreground/40 leading-relaxed max-w-2xl">
          Every verified activity and confirmed status funnels rewards directly
          to your wallet. Review history, monitor sustainability boosts, and
          export transaction logs.
        </p>
      </header>

      <RewardHistory />
    </div>
  );
}
