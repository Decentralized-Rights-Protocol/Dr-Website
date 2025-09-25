import { Hero } from '@/components/Hero'
import { ImpactHighlights } from '@/components/impact-highlights'
import { RoadmapTimeline } from '@/components/roadmap-timeline'
import { NewsletterSignup } from '@/components/newsletter-signup'

export default function Home() {
  return (
    <>
      <Hero />
      <ImpactHighlights />
      <RoadmapTimeline />
      <NewsletterSignup />
    </>
  )
}
