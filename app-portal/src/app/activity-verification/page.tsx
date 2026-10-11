'use client'

import { ethers } from 'ethers'
import { FormEvent, useState } from 'react'
import { useWallet } from '@/hooks/useWallet'

type Result = {
  activity?: { claimId: string; decision: string; reasons: string[]; evidence: Array<{ contentHash: string }> }
  protocol?: { status: string; response?: unknown; message?: string; httpStatus?: number }
  error?: string
}

export default function ActivityVerificationPage() {
  const { address, connect, isConnecting } = useWallet()
  const [source, setSource] = useState<'github' | 'community'>('github')
  const [activityType, setActivityType] = useState('merged_pull_request')
  const [statement, setStatement] = useState('')
  const [sourceId, setSourceId] = useState('')
  const [sourceUrl, setSourceUrl] = useState('')
  const [evidenceNotes, setEvidenceNotes] = useState('')
  const [result, setResult] = useState<Result | null>(null)
  const [busy, setBusy] = useState(false)
  const [mcpBusy, setMcpBusy] = useState(false)
  const [mcpStatus, setMcpStatus] = useState<{ connected: boolean; tools?: Array<{ name: string; description?: string }>; error?: string } | null>(null)

  async function checkMcpConnection() {
    setMcpBusy(true)
    try {
      const response = await fetch('/api/mcp/tools', { cache: 'no-store' })
      const payload = await response.json() as { connected: boolean; tools?: Array<{ name: string; description?: string }>; error?: string }
      setMcpStatus(payload)
    } catch {
      setMcpStatus({ connected: false, error: 'Could not reach the DRP MCP gateway.' })
    } finally {
      setMcpBusy(false)
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setResult(null)
    try {
      if (!address || !window.ethereum) throw new Error('Connect a compatible wallet before submitting')
      const signedPayload = {
        subjectId: address,
        source,
        activityType,
        statement,
        sourceId,
        sourceUrl: sourceUrl || undefined,
        evidenceNotes,
        issuedAt: new Date().toISOString(),
      }
      const message = JSON.stringify(signedPayload)
      const provider = new ethers.BrowserProvider(window.ethereum as ethers.Eip1193Provider)
      const signer = await provider.getSigner()
      const signature = await signer.signMessage(message)
      const response = await fetch('/api/verification/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, signature }),
      })
      const payload = await response.json() as Result
      setResult(payload)
    } catch {
      setResult({ error: 'Could not submit the claim. Check your connection and try again.' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="max-w-3xl space-y-3">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#00e5cc]">DRP • MCP Activity Verification</p>
        <h1 className="text-3xl font-black tracking-tight sm:text-5xl">Verify activity with evidence, not assumptions.</h1>
        <p className="text-sm leading-6 text-white/55 sm:text-base">Submit a GitHub contribution reference or a community activity report. DRP applies the same claim format, records evidence commitments, and can forward the request to the DRP Verification Network.</p>
      </header>

      <section className="rounded-2xl border border-white/10 bg-white/[.025] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-sm font-bold">MCP source connection</h2><p className="mt-1 text-xs text-white/45">Checks the configured remote MCP server and lists only explicitly allowlisted tools.</p></div><button type="button" onClick={checkMcpConnection} disabled={mcpBusy} className="rounded-lg border border-white/15 px-4 py-2 text-xs font-bold text-white/80 disabled:opacity-40">{mcpBusy ? 'Checking…' : 'Check connection'}</button></div>
        {mcpStatus && <div aria-live="polite" className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3 text-xs">{mcpStatus.connected ? <><p className="font-semibold text-emerald-300">MCP server reachable · {mcpStatus.tools?.length ?? 0} allowlisted tools</p>{mcpStatus.tools?.length ? <ul className="mt-2 space-y-1 text-white/55">{mcpStatus.tools.map(tool => <li key={tool.name}><code>{tool.name}</code>{tool.description ? ` — ${tool.description}` : ''}</li>)}</ul> : <p className="mt-1 text-white/45">No tools are allowlisted. Configure DRP_MCP_ALLOWED_TOOLS on the server.</p>}</> : <p className="text-amber-200/80">MCP not connected: {mcpStatus.error}</p>}</div>}
      </section>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ['01', 'Connect a source', 'MCP source tools are configured server-side and restricted by an explicit allowlist.'],
          ['02', 'Prepare evidence', 'DRP hashes the supplied evidence payload and flags claims that need independent checks.'],
          ['03', 'Verify and attest', 'Network acceptance is not a verified decision; verifier attestations and review still matter.'],
        ].map(([number, title, text]) => (
          <section key={number} className="rounded-2xl border border-white/10 bg-white/[.025] p-5">
            <p className="text-xs font-black tracking-widest text-[#00e5cc]">{number}</p>
            <h2 className="mt-3 text-sm font-bold">{title}</h2>
            <p className="mt-2 text-xs leading-5 text-white/45">{text}</p>
          </section>
        ))}
      </div>

      <form onSubmit={submit} className="space-y-5 rounded-2xl border border-white/10 bg-white/[.025] p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold">New activity claim</h2>
          {address ? <span className="rounded-full border border-[#00e5cc]/20 bg-[#00e5cc]/10 px-3 py-1.5 text-xs text-[#00e5cc]">{address.slice(0, 8)}…{address.slice(-6)}</span> : <button type="button" onClick={() => connect().catch(() => undefined)} disabled={isConnecting} className="rounded-lg bg-[#00e5cc] px-4 py-2 text-xs font-bold text-[#030308]">{isConnecting ? 'Connecting…' : 'Connect wallet'}</button>}
        </div>

        <fieldset className="space-y-2">
          <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">Activity source</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => { setSource('github'); setActivityType('merged_pull_request') }} className={`rounded-xl border p-4 text-left transition ${source === 'github' ? 'border-[#00e5cc]/50 bg-[#00e5cc]/[.08]' : 'border-white/10 bg-black/10'}`}>
              <span className="block text-sm font-bold">GitHub contribution</span><span className="mt-1 block text-xs text-white/45">Commit, merged pull request, issue, or review</span>
            </button>
            <button type="button" onClick={() => { setSource('community'); setActivityType('community_service') }} className={`rounded-xl border p-4 text-left transition ${source === 'community' ? 'border-[#00e5cc]/50 bg-[#00e5cc]/[.08]' : 'border-white/10 bg-black/10'}`}>
              <span className="block text-sm font-bold">Community activity</span><span className="mt-1 block text-xs text-white/45">Outreach, volunteering, education, or environmental work</span>
            </button>
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-xs font-semibold text-white/65">Activity type
            <select value={activityType} onChange={(e) => setActivityType(e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#090911] px-3 py-3 text-sm text-white">
              {(source === 'github' ? [['merged_pull_request', 'Merged pull request'], ['commit', 'Commit'], ['issue', 'Issue'], ['code_review', 'Code review']] : [['community_service', 'Community service'], ['tree_planting', 'Tree planting'], ['education_outreach', 'Education outreach'], ['volunteering', 'Volunteering']]).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
          <label className="space-y-2 text-xs font-semibold text-white/65">Source record ID
            <input required value={sourceId} onChange={(e) => setSourceId(e.target.value)} placeholder={source === 'github' ? 'owner/repo#123 or commit SHA' : 'event ID or organizer reference'} className="w-full rounded-xl border border-white/10 bg-[#090911] px-3 py-3 text-sm text-white placeholder:text-white/25" />
          </label>
        </div>

        <label className="block space-y-2 text-xs font-semibold text-white/65">What happened?
          <textarea required value={statement} onChange={(e) => setStatement(e.target.value)} maxLength={2000} rows={3} placeholder="Describe the contribution or community activity." className="w-full rounded-xl border border-white/10 bg-[#090911] px-3 py-3 text-sm text-white placeholder:text-white/25" />
        </label>

        <label className="block space-y-2 text-xs font-semibold text-white/65">Evidence URL (optional)
          <input type="url" value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} placeholder={source === 'github' ? 'https://github.com/owner/repo/pull/123' : 'Link to project page or public evidence'} className="w-full rounded-xl border border-white/10 bg-[#090911] px-3 py-3 text-sm text-white placeholder:text-white/25" />
        </label>

        <label className="block space-y-2 text-xs font-semibold text-white/65">Evidence notes
          <textarea value={evidenceNotes} onChange={(e) => setEvidenceNotes(e.target.value)} rows={2} placeholder="Context for the reviewer. Do not include sensitive personal information." className="w-full rounded-xl border border-white/10 bg-[#090911] px-3 py-3 text-sm text-white placeholder:text-white/25" />
        </label>

        {source === 'community' && <p className="rounded-xl border border-amber-300/20 bg-amber-300/[.06] p-3 text-xs leading-5 text-amber-100/75">Community claims are submitted for review. An organizer or independent witness attestation is required; a self-report alone does not establish that the activity occurred.</p>}
        {source === 'github' && <p className="rounded-xl border border-sky-300/20 bg-sky-300/[.05] p-3 text-xs leading-5 text-sky-100/70">A pasted GitHub URL is only a reference. It must be fetched and checked through an authorized MCP source before DRP can treat it as source-verified evidence.</p>}

        <button type="submit" disabled={busy || !address} className="w-full rounded-xl bg-[#00e5cc] px-5 py-3.5 text-sm font-extrabold text-[#030308] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40">{busy ? 'Preparing verification…' : 'Submit activity claim'}</button>
        {!address && <p className="text-center text-xs text-white/35">Connect your wallet before submitting a claim.</p>}
      </form>

      {result && <section aria-live="polite" className="space-y-3 rounded-2xl border border-white/10 bg-white/[.025] p-5">
        <h2 className="text-base font-bold">Submission result</h2>
        {result.error ? <p className="text-sm text-rose-300">{result.error}</p> : <>
          {result.activity && <div className="space-y-2 text-sm"><p><span className="text-white/45">Claim ID:</span> <code className="break-all text-[#00e5cc]">{result.activity.claimId}</code></p><p><span className="text-white/45">Local decision:</span> <strong>{result.activity.decision}</strong></p><p><span className="text-white/45">Evidence commitments:</span> {result.activity.evidence.length}</p>{result.activity.reasons.map((reason) => <p key={reason} className="text-xs text-amber-200/75">• {reason}</p>)}</div>}
          {result.protocol && <div className="mt-3 rounded-xl border border-white/10 bg-black/20 p-4"><p className="text-sm font-semibold">Network status: {result.protocol.status}</p>{result.protocol.message && <p className="mt-1 text-xs text-white/50">{result.protocol.message}</p>}{result.protocol.response !== undefined && <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap break-words text-[11px] text-white/55">{JSON.stringify(result.protocol.response, null, 2)}</pre>}</div>}
        </>}
      </section>}
    </div>
  )
}
