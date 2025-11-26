import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: 'purple' | 'blue' | 'none'
  onClick?: () => void
}

export function Card({ children, className, hover = true, glow = 'purple', onClick }: CardProps) {
  const glowClass = glow === 'purple' ? 'glow-purple' : glow === 'blue' ? 'glow-blue' : ''
  
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-2xl bg-[#06172d]/60 backdrop-blur-sm border border-purple-500/20 shadow-xl shadow-purple-500/5 p-6',
        hover && 'transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500/40',
        glowClass,
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}







