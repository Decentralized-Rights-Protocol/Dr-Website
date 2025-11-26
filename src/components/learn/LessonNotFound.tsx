'use client'

import Link from 'next/link'
import { BookOpen, ArrowLeft, Sparkles } from 'lucide-react'

export function LessonNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center animate-fade-in-up">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text animate-pulse">
            404
          </div>
          <div className="absolute inset-0 text-9xl font-bold text-blue-500/20 blur-2xl">
            404
          </div>
          
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        
        <div className="mb-6">
          <BookOpen className="h-16 w-16 text-blue-500 mx-auto mb-4 animate-bounce" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Lesson Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            The lesson you're looking for doesn't exist or may have been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/learn"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Sparkles className="h-5 w-5" />
            Browse Lessons
          </Link>
          
          <Link
            href="/learn"
            className="inline-flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Learn
          </Link>
        </div>
      </div>
    </div>
  )
}

