'use client'

import Link from 'next/link'
import { CheckCircle2, Github, ShieldCheck, LockKeyhole, ArrowRight, ExternalLink, PlugZap } from 'lucide-react'

const sources = [
  { name: 'GitHub', description: 'Repositories, commits, pull requests and reviews', status: 'available', icon: Github },
  { name: 'Google', description: 'Documents, files and calendar activity', status: 'coming', icon: PlugZap },
  { name: 'LinkedIn', description: 'Professional profile and experience claims', status: 'coming', icon: PlugZap },
  { name: 'Figma', description: 'Design files and contribution activity', status: 'coming', icon: PlugZap },
  { name: 'Discord', description: 'Community participation and activity', status: 'coming', icon: PlugZap },
  { name: 'Notion', description: 'Pages and collaborative contributions', status: 'coming', icon: PlugZap },
]

export default function ConnectPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00e5cc]/20 bg-[#00e5cc]/[.07] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-[#00e5cc]">
          <ShieldCheck className="h-3.5 w-3.5" /> Source verification
        </div>
        <h1 className="text-3xl font-black tracking-tight sm:text-5xl">Connect your digital sources.</h1>
        <p className="mt-4 text-base leading-7 text-white/50 sm:text-lg">
          Don&apos;t upload proof when the source already has the evidence. Authorize DRP to verify eligible digital activity directly from the service where it happened.
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {[
          ['01', 'Connect', 'Authorize a source with explicit, least-privilege access.'],
          ['02', 'Verify', 'DRP checks source facts instead of trusting a screenshot.'],
          ['03', 'Attest', 'A successful verification can become a portable DRP attestation.'],
        ].map(([n, title, text]) => (
          <div key={n} className="rounded-2xl border border-white/[.08] bg-white/[.025] p-5">
            <span className="text-[10px] font-black tracking-[.2em] text-[#00e5cc]">{n}</span>
            <h2 className="mt-3 text-sm font-bold">{title}</h2>
            <p className="mt-2 text-xs leading-5 text-white/40">{text}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sources.map(({ name, description, status, icon: Icon }) => (
          <div key={name} className="group rounded-2xl border border-white/[.08] bg-white/[.025] p-5 transition hover:border-white/[.14] hover:bg-white/[.035]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[.04]">
                <Icon className="h-5 w-5 text-white/70" />
              </div>
              {status === 'available' ? (
                <span className="rounded-full border border-[#00e5cc]/20 bg-[#00e5cc]/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#00e5cc]">Available</span>
              ) : (
                <span className="rounded-full border border-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white/35">Coming soon</span>
              )}
            </div>
            <h2 className="mt-5 text-base font-bold">{name}</h2>
            <p className="mt-2 min-h-10 text-xs leading-5 text-white/40">{description}</p>
            {status === 'available' ? (
              <a href="/api/connect/github/start" className="mt-5 flex items-center justify-between rounded-xl bg-[#00e5cc] px-4 py-3 text-xs font-bold text-[#030308] transition hover:brightness-105">
                Connect GitHub <ArrowRight className="h-4 w-4" />
              </a>
            ) : (
              <button disabled className="mt-5 flex w-full cursor-not-allowed items-center justify-between rounded-xl border border-white/[.07] px-4 py-3 text-xs font-semibold text-white/25">
                Integration in development <LockKeyhole className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-white/[.08] bg-white/[.02] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold">Ready to verify a claim?</p>
          <p className="mt-1 text-xs text-white/40">Connect a source first, then let DRP inspect the evidence at its origin.</p>
        </div>
        <Link href="/verify" className="inline-flex items-center gap-2 text-xs font-bold text-[#00e5cc] hover:underline">Start verification <ExternalLink className="h-3.5 w-3.5" /></Link>
      </div>
    </div>
  )
}
