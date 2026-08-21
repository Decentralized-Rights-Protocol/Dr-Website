"use client";

import { ReviewQueue } from "@/components/review/ReviewQueue";
import { useWallet } from "@/hooks/useWallet";

export default function ReviewPage() {
  const { address } = useWallet();

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#00e5cc]">
          Admin Review
        </p>
        <h1 className="text-2xl font-black text-foreground">
          Stewardship review queue for activity and status attestations
        </h1>
        <p className="text-sm text-foreground/40 leading-relaxed max-w-2xl">
          This workspace is intentionally app-layer only. Reviewer authorization
          still needs a proper authenticated role system before production use.
        </p>
      </header>

      <ReviewQueue walletAddress={address} />
    </div>
  );
}
