import { buildPageMetadata } from '@/lib/seo/seo'
import { StructuredData } from '@/components/seo/StructuredData'
import { GovernanceClient } from './GovernanceClient'

export const metadata = buildPageMetadata({
  title: 'DRP Governance | Human-Centric Decision-Making with AI Elders',
  description:
    'DRP governance aligns decentralized voting with rights baselines: AI Elders triage and explain, Proof of Status (PoST) and Proof of Activity (PoAT) ground decisions in verifiable participation.',
  canonical: '/economics/governance',
})

export default function GovernancePage() {
  return (
    <>
      <StructuredData type="governance" />
      <GovernanceClient />
    </>
  )
}

