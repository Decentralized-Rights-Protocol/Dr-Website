'use client'

import Link from 'next/link'

export function FormConsent({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
  return <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[.03] p-3 text-xs leading-5 text-white/60 focus-within:ring-2 focus-within:ring-[#00e5cc]">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#00e5cc]" aria-describedby="form-consent-copy" />
    <span id="form-consent-copy">I confirm that I have the right to submit this information and evidence, and I understand that it will be processed for verification as described in the <Link href="/privacy" className="text-[#00e5cc] underline">Privacy Policy</Link> and governed by the <Link href="/terms" className="text-[#00e5cc] underline">Terms</Link>. I will not submit private keys, seed phrases, or unnecessary sensitive personal data.</span>
  </label>
}
