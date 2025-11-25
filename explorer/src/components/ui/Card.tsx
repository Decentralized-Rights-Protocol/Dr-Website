import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: 'purple' | 'blue' | 'none'
}

export function Card({ children, className, hover = true, glow = 'purple' }: CardProps) {
  const glowClass = glow === 'purple' ? 'glow-purple' : glow === 'blue' ? 'glow-blue' : ''
  
  return (
    <div
      className={cn(
        'rounded-2xl bg-[#12121a] border border-purple-500/20 shadow-2xl shadow-purple-500/10 p-6',
        hover && 'card-hover',
        glowClass,
        className
      )}
    >
      {children}
    </div>
  )
}







