import { NextResponse } from 'next/server'
import { listAllLessons } from '@/lib/learn-utils'

export async function GET() {
  try {
    const lessons = listAllLessons()
    return NextResponse.json({ lessons })
  } catch (error) {
    console.error('Error listing lessons:', error)
    return NextResponse.json(
      { error: 'Internal server error', lessons: [] },
      { status: 500 }
    )
  }
}

