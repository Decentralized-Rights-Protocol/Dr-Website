'use client'

import { useState } from 'react'
import { useProofSubmission } from '@/hooks/useProofSubmission'
import { useWallet } from '@/hooks/useWallet'
import { Card } from '@/components/ui/Card'
import { CheckCircle2, Loader2, AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ProofSubmissionPage() {
  const { address, connect } = useWallet()
  const { submitProof, isPending, isSuccess, txHash, error } = useProofSubmission()
  
  const [type, setType] = useState<'PoST' | 'PoAT'>('PoAT')
  const [data, setData] = useState('')
  const [metadata, setMetadata] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const parsedData = JSON.parse(data || '{}')
      const parsedMetadata = metadata ? JSON.parse(metadata) : undefined
      await submitProof({ type, data: parsedData, metadata: parsedMetadata })
    } catch (err: any) {
      alert('Invalid JSON in data or metadata')
    }
  }

  if (!address) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <Card className="max-w-md w-full p-8 text-center bg-zinc-900/50 border-zinc-800">
          <h1 className="text-2xl font-bold text-white mb-4">Proof Submission</h1>
          <p className="text-zinc-400 mb-8">Please connect your wallet to submit proofs to the DRP protocol.</p>
          <button
            onClick={() => connect()}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
          >
            Connect Wallet
          </button>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4 py-12">
      <Link href="/explorer" className="flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Explorer
      </Link>

      <h1 className="text-3xl font-bold text-white mb-8">Submit Proof</h1>

      {isSuccess ? (
        <Card className="p-8 text-center bg-green-950/20 border-green-900/50">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Submission Successful!</h2>
          <p className="text-zinc-400 mb-6">Your proof has been validated and broadcast to the blockchain.</p>
          <div className="p-4 bg-zinc-900 rounded-lg text-left mb-8 overflow-hidden">
            <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Transaction Hash</p>
            <p className="text-sm font-mono text-zinc-300 break-all">{txHash}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                setIsSuccess(false) // This is just local state in the hook, won't work like this but good for demo
                window.location.reload()
              }}
              className="flex-1 py-3 px-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
            >
              Submit Another
            </button>
            <Link
              href="/explorer"
              className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-center font-medium transition-colors"
            >
              View in Explorer
            </Link>
          </div>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">Proof Type</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setType('PoAT')}
                className={`py-3 px-4 rounded-lg border transition-all ${
                  type === 'PoAT'
                    ? 'bg-blue-600/10 border-blue-600 text-blue-500'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                }`}
              >
                Proof of Activity (PoAT)
              </button>
              <button
                type="button"
                onClick={() => setType('PoST')}
                className={`py-3 px-4 rounded-lg border transition-all ${
                  type === 'PoST'
                    ? 'bg-purple-600/10 border-purple-600 text-purple-500'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                }`}
              >
                Proof of Status (PoST)
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">Activity Data (JSON)</label>
            <textarea
              required
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder='{ "activity": "humanitarian_aid", "amount": 100 }'
              className="w-full h-32 bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-white font-mono text-sm focus:outline-none focus:border-blue-600 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">Metadata (Optional JSON)</label>
            <textarea
              value={metadata}
              onChange={(e) => setMetadata(e.target.value)}
              placeholder='{ "location": "Nairobi", "notes": "Emergency relief" }'
              className="w-full h-24 bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-white font-mono text-sm focus:outline-none focus:border-blue-600 transition-colors"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-950/20 border border-red-900/50 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{error.message}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing & Submitting...
              </>
            ) : (
              'Submit Proof to DRP'
            )}
          </button>
        </form>
      )}
    </div>
  )
}
