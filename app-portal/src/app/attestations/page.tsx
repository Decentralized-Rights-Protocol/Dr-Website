'use client'

import { ShieldCheck, ExternalLink, Share2, Ban, Fingerprint } from 'lucide-react'

export default function AttestationsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00e5cc]/20 bg-[#00e5cc]/[.07] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-[#00e5cc]"><ShieldCheck className="h-3.5 w-3.5" /> Proof wallet</div>
        <h1 className="text-3xl font-black tracking-tight sm:text-5xl">Your DRP attestations.</h1>
        <p className="mt-4 text-base leading-7 text-white/50">Portable verification results designed to prove a claim without repeatedly exposing the underlying private evidence.</p>
      </div>

      <div className="mt-10 rounded-2xl border border-white/[.08] bg-white/[.025] p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-sm font-bold">Attestation wallet</p><p className="mt-1 text-xs text-white/35">Blockchain-backed issuance will appear here as the DRP attestation layer comes online.</p></div>
          <Fingerprint className="h-7 w-7 text-white/20" />
        </div>
        <div className="mt-6 rounded-xl border border-dashed border-white/10 p-8 text-center"><p className="text-sm font-semibold text-white/45">No issued attestations yet</p><p className="mx-auto mt-2 max-w-md text-xs leading-5 text-white/25">Successful source verification is the first step. The network attestation issuer will be connected here rather than fabricating a proof.</p></div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          ['View proof', ExternalLink, 'Inspect the verification record and source metadata.'],
          ['Share', Share2, 'Create a portable verification experience for another application.'],
          ['Revoke', Ban, 'Revoke eligible attestations or source access when supported.'],
        ].map(([title, Icon, text]) => <div key={title as string} className="rounded-2xl border border-white/[.08] bg-white/[.02] p-5"><Icon className="h-4 w-4 text-[#00e5cc]" /><p className="mt-4 text-xs font-bold">{title as string}</p><p className="mt-2 text-[11px] leading-5 text-white/30">{text as string}</p></div>)}
      </div>
    </div>
  )
}
