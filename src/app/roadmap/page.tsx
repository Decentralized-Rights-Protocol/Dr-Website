import { Metadata } from 'next'
import { RoadmapTimeline } from '@/components/roadmap-timeline'

export const metadata: Metadata = {
  title: 'Roadmap',
  description: 'Explore the Decentralized Rights Protocol roadmap and timeline for building a quantum-safe blockchain platform for human rights protection.',
}

export default function RoadmapPage() {
  return (
    <div className="min-h-screen pt-20">
      <RoadmapTimeline />
    </div>
  )
}
