import type { ReactNode } from 'react'
import { PremiumPage, PremiumContainer } from '@/components/site/PremiumPage'

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <PremiumPage>
      <div className="pt-24 pb-20">
        <PremiumContainer>{children}</PremiumContainer>
      </div>
    </PremiumPage>
  )
}
