'use client'

import { ParticleBackground } from '@/components/particle-background'

export function LessonSkeleton() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #312e81, #581c87)' }}>
      <ParticleBackground />
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="bg-white/10 dark:bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg border border-white/20 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
          </div>
          
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          
          <div className="flex items-center space-x-6">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Content Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 dark:bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg border border-white/20 p-6">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-32 mb-4"></div>
              
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/5"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-48 mt-6"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-40 mt-6"></div>
                <ul className="space-y-2 mt-4">
                  <li className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></li>
                  <li className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></li>
                  <li className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/5"></li>
                </ul>
              </div>
              
              <div className="mt-8">
                <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-48 mx-auto"></div>
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 dark:bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg border border-white/20 p-6 h-64">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-32 mb-4"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

