'use client'

import { useState, useEffect } from 'react'
import { Shield, Award, TrendingUp, Clock, Hash, CheckCircle2, User, Copy, Check } from 'lucide-react'
import { getStatusProfile, type StatusProfile } from '@/lib/api'
import { useAppStore } from '@/store/app-store'

export default function ProfilePage() {
  const { user } = useAppStore()
  const [profile, setProfile] = useState<StatusProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [copiedId, setCopiedId] = useState(false)

  useEffect(() => {
    if (user?.id) {
      loadProfile()
    }
  }, [user?.id])

  const loadProfile = async () => {
    if (!user?.id) return
    try {
      setLoading(true)
      const data = await getStatusProfile(user.id)
      setProfile(data)
    } catch (error) {
      console.error('Failed to load profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(true)
    setTimeout(() => setCopiedId(false), 2000)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-6)}`
  }

  const formatHash = (hash: string) => {
    if (hash.length <= 16) return hash
    return `${hash.slice(0, 8)}...${hash.slice(-8)}`
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-4" />
          <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded" />
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="space-y-6">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-300">Profile</p>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">User Profile</h1>
        </header>
        <div className="rounded-3xl border border-neutral-200/80 bg-white/90 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
          <p className="text-neutral-600 dark:text-neutral-300">No profile data available. Please connect your wallet first.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-300">Profile</p>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">Your Status & Identity</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          View your Proof of Status score, quantum-secure ID, and status evolution over time.
        </p>
      </header>

      {/* User Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-neutral-200/80 bg-white/90 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">User Summary</h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Identity & Status</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">User ID</p>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono text-neutral-700 dark:text-neutral-300">{formatAddress(profile.user_id)}</code>
                <button
                  onClick={() => copyToClipboard(profile.user_id)}
                  className="text-neutral-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                >
                  {copiedId ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Verified Status</p>
              <div className="flex items-center gap-2">
                {profile.verified_status ? (
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
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Last Updated</p>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                {new Date(profile.last_updated).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* PoST Score */}
        <div className="rounded-3xl border border-neutral-200/80 bg-white/90 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">PoST Score</h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Proof of Status</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">{profile.post_score.toFixed(2)}</span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">points</span>
              </div>
              <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ width: `${Math.min((profile.post_score / 100) * 100, 100)}%` }}
                />
              </div>
            </div>
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Total Attestations</p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">{profile.attestations.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quantum Secure ID */}
      <div className="rounded-3xl border border-neutral-200/80 bg-white/90 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">Quantum-Secure Identity</h2>
        </div>
        <div className="space-y-3">
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Your identity is protected by quantum-resistant cryptography, ensuring long-term security even against future quantum computing threats.
          </p>
          <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900/50 p-4 border border-neutral-200 dark:border-neutral-800">
            <code className="text-xs font-mono text-neutral-700 dark:text-neutral-300 break-all">
              {profile.user_id}
            </code>
          </div>
        </div>
      </div>

      {/* Status Evolution / Attestations */}
      <div className="rounded-3xl border border-neutral-200/80 bg-white/90 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">Status Evolution</h2>
          </div>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">{profile.attestations.length} attestations</span>
        </div>
        {profile.attestations.length === 0 ? (
          <p className="text-sm text-neutral-600 dark:text-neutral-300">No attestations yet. Submit your first Proof of Status to get started.</p>
        ) : (
          <div className="space-y-3">
            {profile.attestations.map((attestation, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 bg-neutral-50/50 dark:bg-neutral-900/30"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-primary-500/20 text-primary-700 dark:text-primary-300">
                        {attestation.category}
                      </span>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">by {attestation.issuer}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                      <Hash className="h-3 w-3" />
                      <code className="font-mono">{formatHash(attestation.credential_cid)}</code>
                    </div>
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {new Date(attestation.verified_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

