import { WhyDRPClient } from './WhyDRPClient'
import { StructuredData } from '@/components/seo/StructuredData'
import { buildPageMetadata } from '@/lib/seo/seo'

export const metadata = buildPageMetadata({
  title: 'Why DRP | AI-Verified Human Rights Blockchain',
  description:
    'Learn what makes the Decentralized Rights Protocol (DRP) structurally different: AI-verified Proof of Status (PoST), Proof of Activity (PoAT), quantum-safe cryptography, and governance designed around human rights and sustainability.',
  canonical: '/why-drp',
})

export default function WhyDRPPage() {
  return (
    <>
      <StructuredData />
      <WhyDRPClient />
    </>
  )
}
