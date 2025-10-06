'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface DRPLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'horizontal' | 'vertical'
}

export function DRPLogo({ className, size = 'md', variant = 'horizontal' }: DRPLogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-6',
    md: 'h-12 w-8', 
    lg: 'h-16 w-12'
  }

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  if (variant === 'vertical') {
    return (
      <div className={cn(
        'flex flex-col items-center justify-center bg-gradient-to-b from-primary-600 to-primary-800 rounded-lg shadow-lg',
        sizeClasses[size],
        className
      )}>
        <div className="flex flex-col items-center text-white font-bold leading-tight">
          <span className={cn('font-extrabold', textSizeClasses[size])}>D</span>
          <span className={cn('font-extrabold', textSizeClasses[size])}>R</span>
          <span className={cn('font-extrabold', textSizeClasses[size])}>P</span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      'flex items-center justify-center bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg shadow-lg px-3 py-2',
      size === 'sm' ? 'h-8' : size === 'md' ? 'h-10' : 'h-12',
      className
    )}>
      <span className={cn(
        'text-white font-bold tracking-wider',
        textSizeClasses[size]
      )}>
        DRP
      </span>
    </div>
  )
}
