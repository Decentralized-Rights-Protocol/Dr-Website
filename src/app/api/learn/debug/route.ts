import { NextResponse } from 'next/server'
import { getAllLessonFiles, listAllLessons, CURRICULUM_ORDER } from '@/lib/learn-utils'

export async function GET() {
  try {
    const files = getAllLessonFiles()
    const lessons = listAllLessons()
    
    return NextResponse.json({
      filesFound: files.length,
      files: files.map(f => ({
        slug: f.slug,
        level: f.level,
        filename: f.filename,
        path: f.path
      })),
      lessonsFound: lessons.length,
      lessons: lessons.map(l => ({
        id: l.id,
        slug: l.slug,
        level: l.level,
        title: l.title
      })),
      curriculumOrder: CURRICULUM_ORDER,
      cwd: process.cwd()
    })
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}

