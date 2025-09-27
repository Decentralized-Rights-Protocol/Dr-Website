import { HeroSection } from '@/components/hero-section'
import { MissionSection } from '@/components/mission-section'
import { QuickLinks } from '@/components/quick-links'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <MissionSection />
      <QuickLinks />
    </div>
  )
}