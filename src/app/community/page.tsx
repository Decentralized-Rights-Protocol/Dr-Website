import { buildPageMetadata } from '@/lib/seo/seo'
import { StructuredData } from '@/components/seo/StructuredData'
import { CommunityClient } from './CommunityClient'

export const metadata = buildPageMetadata({
  title: 'DRP Community | Builders, Advocates & Human Rights Partners',
  description:
    'Join the Decentralized Rights Protocol (DRP) community: connect with builders, human-rights organizations, and governance participants shaping AI-verified, rights-first blockchain infrastructure.',
  canonical: '/community',
})

export default function CommunityPage() {
  return (
    <>
      <StructuredData />
      <CommunityClient />
    </>
  )
}
