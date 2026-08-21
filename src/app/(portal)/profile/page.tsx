"use client";

import { useState } from "react";
import {
  Shield,
  Award,
  TrendingUp,
  Clock,
  Hash,
  CheckCircle2,
  User,
  Copy,
  Check,
} from "lucide-react";
import { useAppStore } from "@/store/app-store";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ProfilePage() {
  const address = useAppStore((state) => state.address);
  const [copiedId, setCopiedId] = useState(false);
  const profile = useQuery(api.users.getProfileByWallet, {
    walletAddress: address,
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  const formatHash = (hash: string) => {
    if (hash.length <= 16) return hash;
    return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
  };

  if (address && !profile) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-foreground/10 w-1/3 mb-4" />
          <div className="h-64 bg-foreground/10" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="space-y-6">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#00e5cc]">
            Profile
          </p>
          <h1 className="text-3xl font-bold text-foreground">User Profile</h1>
        </header>
        <div className="border border-foreground/10 bg-background/90 p-6 shadow-sm">
          <p className="text-foreground/50">
            No Convex profile data available yet. Connect your wallet to
            initialize the app profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#00e5cc]">
          Profile
        </p>
        <h1 className="text-3xl font-bold text-foreground">
          Your Status & Identity
        </h1>
        <p className="text-sm text-foreground/50">
          View your Proof of Status score, quantum-secure ID, and status
          evolution over time.
        </p>
      </header>

      {/* User Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="border border-foreground/10 bg-background/90 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <User className="h-6 w-6 text-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                User Summary
              </h2>
              <p className="text-sm text-foreground/40">Identity & Status</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-foreground/40 mb-1">User ID</p>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono text-foreground/60">
                  {formatAddress(profile.walletAddress)}
                </code>
                <button
                  onClick={() => copyToClipboard(profile.walletAddress)}
                  className="text-foreground/30 hover:text-[#00e5cc] dark:hover:text-[#00e5cc] transition-colors"
                >
                  {copiedId ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs text-foreground/40 mb-1">Verified Status</p>
              <div className="flex items-center gap-2">
                {profile.verificationStatus === "verified" ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 text-sm font-semibold">
                    <CheckCircle2 className="h-4 w-4" />
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border border-yellow-500/40 text-sm font-semibold">
                    <Clock className="h-4 w-4" />
                    Pending
                  </span>
                )}
              </div>
            </div>
            <div>
              <p className="text-xs text-foreground/40 mb-1">Last Updated</p>
              <p className="text-sm text-foreground/60">
                {new Date(profile.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* PoST Score */}
        <div className="border border-foreground/10 bg-background/90 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                PoST Score
              </h2>
              <p className="text-sm text-foreground/40">Proof of Status</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-[#00e5cc]">
                  {profile.statusScore.toFixed(2)}
                </span>
                <span className="text-sm text-foreground/40">points</span>
              </div>
              <div className="h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{
                    width: `${Math.min((profile.statusScore / 100) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
            <div className="pt-4 border-t border-foreground/10">
              <p className="text-xs text-foreground/40 mb-2">
                Total Attestations
              </p>
              <p className="text-2xl font-bold text-foreground">
                {profile.attestations.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quantum Secure ID */}
      <div className="border border-foreground/10 bg-background/90 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-6 w-6 text-[#00e5cc]" />
          <h2 className="text-lg font-semibold text-foreground">
            Quantum-Secure Identity
          </h2>
        </div>
        <div className="space-y-3">
          <p className="text-sm text-foreground/50">
            Your identity is protected by quantum-resistant cryptography,
            ensuring long-term security even against future quantum computing
            threats.
          </p>
          <div className="bg-foreground/[0.02] p-4 border border-foreground/10">
            <code className="text-xs font-mono text-foreground/60 break-all">
              {profile.walletAddress}
            </code>
          </div>
        </div>
      </div>

      {/* Status Evolution / Attestations */}
      <div className="border border-foreground/10 bg-background/90 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-[#00e5cc]" />
            <h2 className="text-lg font-semibold text-foreground">
              Status Evolution
            </h2>
          </div>
          <span className="text-sm text-foreground/40">
            {profile.attestations.length} attestations
          </span>
        </div>
        {profile.attestations.length === 0 ? (
          <p className="text-sm text-foreground/50">
            No attestations yet. Submit your first Proof of Status to get
            started.
          </p>
        ) : (
          <div className="space-y-3">
            {profile.attestations.map((attestation: any, idx: number) => (
              <div
                key={idx}
                className="border border-foreground/10 p-4 bg-foreground/[0.02]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs font-semibold bg-[#00e5cc]/10 text-[#00e5cc]">
                        {attestation.proofKind.toUpperCase()}
                      </span>
                      <span className="text-xs text-foreground/40">
                        {attestation.verifierMode}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground/50">
                      <Hash className="h-3 w-3" />
                      <code className="font-mono">
                        {formatHash(
                          attestation.chainEventRef ??
                            `pending:${attestation.id}`,
                        )}
                      </code>
                    </div>
                  </div>
                  <div className="text-xs text-foreground/40">
                    {new Date(attestation.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
