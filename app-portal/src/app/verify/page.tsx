'use client'

import { useState } from 'react'
import { CheckCircle2, Github, Loader2, ShieldCheck, AlertTriangle, ArrowRight, Fingerprint } from 'lucide-react'

export default function VerifyPage() {
  const [claim, setClaim] = useState('I contributed to an open-source project.')
  const [repository, setRepository] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  async function verify() {
    setLoading(true); setError(''); setResult(null)
    try {
      const response = await fetch(`/api/verify/github?repository=${encodeURIComponent(repository)}`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Verification failed')
      setResult(data)
    } catch (e) { setError(e instanceof Error ? e.message : 'Verification failed') }
    finally { setLoading(false) }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00e5cc]/20 bg-[#00e5cc]/[.07] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-[#00e5cc]"><ShieldCheck className="h-3.5 w-3.5" /> Verify at the source</div>
        <h1 className="text-3xl font-black tracking-tight sm:text-5xl">Make a claim. Let DRP check it.</h1>
        <p className="mt-4 text-base leading-7 text-white/50">DRP uses authenticated source data and deterministic checks first. AI can assist interpretation, but it is not the final authority.</p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <section className="rounded-2xl border border-white/[.08] bg-white/[.025] p-6">
          <div className="flex items-center gap-3"><Github className="h-5 w-5" /><div><p className="text-sm font-bold">GitHub source verification</p><p className="text-[11px] text-white/35">Public repository contribution MVP</p></div></div>
          <label className="mt-7 block text-xs font-semibold text-white/60">Your claim</label>
          <textarea value={claim} onChange={e=>setClaim(e.target.value)} className="mt-2 min-h-24 w-full rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-white outline-none ring-0 placeholder:text-white/20 focus:border-[#00e5cc]/40" />
          <label className="mt-5 block text-xs font-semibold text-white/60">Repository</label>
          <input value={repository} onChange={e=>setRepository(e.target.value)} placeholder="owner/repository" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-[#00e5cc]/40" />
          <button disabled={loading || !repository.includes('/')} onClick={verify} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#00e5cc] px-4 py-3 text-xs font-black text-[#030308] disabled:cursor-not-allowed disabled:opacity-40">{loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Checking source…</> : <>Verify from GitHub <ArrowRight className="h-4 w-4" /></>}</button>
          {error && <div className="mt-4 flex gap-2 rounded-xl border border-red-400/20 bg-red-400/[.05] p-3 text-xs text-red-200"><AlertTriangle className="h-4 w-4 shrink-0" />{error}</div>}
        </section>

        <section className="rounded-2xl border border-white/[.08] bg-white/[.02] p-6">
          <p className="text-[10px] font-bold uppercase tracking-[.18em] text-white/30">Verification session</p>
          {!result && !loading && <div className="flex min-h-64 items-center justify-center text-center"><div><Fingerprint className="mx-auto h-8 w-8 text-white/20" /><p className="mt-4 text-sm font-semibold text-white/50">Waiting for a claim</p><p className="mt-2 text-xs leading-5 text-white/30">Connect GitHub and provide a repository to begin a source check.</p></div></div>}
          {loading && <div className="flex min-h-64 items-center justify-center"><div className="text-center"><Loader2 className="mx-auto h-8 w-8 animate-spin text-[#00e5cc]" /><p className="mt-4 text-sm font-semibold">Inspecting source evidence…</p><p className="mt-2 text-xs text-white/30">Identity, commits and pull requests are being checked.</p></div></div>}
          {result && <div className="mt-6 space-y-3"><div className="rounded-xl border border-[#00e5cc]/20 bg-[#00e5cc]/[.06] p-4"><div className="flex items-center gap-2 text-[#00e5cc]"><CheckCircle2 className="h-5 w-5" /><span className="text-sm font-black">{result.result?.toUpperCase()}</span></div><p className="mt-2 text-xs text-white/40">Source: GitHub · {result.repository}</p></div>{[['Identity', result.identity],['Commits', result.commits],['Pull requests', result.pullRequests]].map(([label,value])=><div key={label as string} className="flex items-center justify-between border-b border-white/[.06] py-3 text-xs"><span className="text-white/40">{label}</span><span className="font-bold">{value}</span></div>)}<p className="pt-2 text-[10px] leading-4 text-white/25">This MVP checks public GitHub activity. It does not claim that source activity alone proves every aspect of a real-world claim.</p></div>}
        </section>
      </div>
    </div>
  )
}
