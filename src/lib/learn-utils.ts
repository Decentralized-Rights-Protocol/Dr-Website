import { readFileSync, readdirSync, existsSync } from 'fs'
import { join } from 'path'

export interface LessonMetadata {
  id: string
  title: string
  description: string
  duration: number
  reward: number
  level: number
  module: string
  content: string // Markdown content (not HTML)
}

/**
 * Parse frontmatter from MDX file content
 */
function parseFrontmatter(content: string): { frontmatter: Record<string, any>, body: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return { frontmatter: {}, body: content }
  }
  
  const frontmatterText = match[1]
  const body = match[2]
  const frontmatter: Record<string, any> = {}
  
  // Parse YAML-like frontmatter
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim()
      let value = line.slice(colonIndex + 1).trim()
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      
      // Parse numbers
      if (!isNaN(Number(value))) {
        frontmatter[key] = Number(value)
      } else {
        frontmatter[key] = value
      }
    }
  })
  
  return { frontmatter, body }
}

/**
 * Clean and return markdown content (keep as markdown, not HTML)
 */
function cleanMarkdown(content: string): string {
  // Just return the markdown content as-is
  // ReactMarkdown will handle the rendering on the client side
  return content.trim()
}

/**
 * Load a lesson by ID from MDX files
 */
export function loadLessonById(lessonId: string): LessonMetadata | null {
  try {
    // Parse lesson ID format: "level-lessonNumber" (e.g., "1-1", "2-1")
    const [level, lessonNumber] = lessonId.split('-').map(Number)
    
    if (!level || !lessonNumber) {
      return null
    }
    
    const learnDir = join(process.cwd(), 'src', 'content', 'learn')
    const levelDir = join(learnDir, level.toString())
    
    if (!existsSync(levelDir)) {
      return null
    }
    
    // Get all MDX files in the level directory
    const files = readdirSync(levelDir).filter(f => f.endsWith('.mdx'))
    
    // Try to find the lesson by matching filename or by index
    // For now, we'll map lesson numbers to files by index
    const fileIndex = lessonNumber - 1
    if (fileIndex >= 0 && fileIndex < files.length) {
      const filePath = join(levelDir, files[fileIndex])
      const content = readFileSync(filePath, 'utf-8')
      const { frontmatter, body } = parseFrontmatter(content)
      
      // Generate quiz data based on lesson content (simplified)
      const quiz = generateQuizFromContent(body, frontmatter)
      
      return {
        id: lessonId,
        title: frontmatter.title || 'Untitled Lesson',
        description: frontmatter.description || '',
        duration: frontmatter.duration || 15,
        reward: frontmatter.reward || 10,
        level: frontmatter.level || level,
        module: frontmatter.module || 'general',
        content: cleanMarkdown(body)
      }
    }
    
    return null
  } catch (error) {
    console.error(`Error loading lesson ${lessonId}:`, error)
    return null
  }
}

/**
 * Generate a basic quiz from lesson content (simplified version)
 */
function generateQuizFromContent(content: string, frontmatter: Record<string, any>): {
  questions: Array<{
    id: string
    question: string
    options: string[]
    correct: number
  }>
} {
  // This is a simplified quiz generator
  // In production, quizzes should be stored in the MDX frontmatter or a separate file
  const questions: Array<{
    id: string
    question: string
    options: string[]
    correct: number
  }> = []
  
  // Generate basic quiz questions based on lesson title
  const title = frontmatter.title || ''
  
  if (title.toLowerCase().includes('blockchain')) {
    questions.push({
      id: 'q1',
      question: 'What is the primary characteristic that makes blockchain different from traditional databases?',
      options: [
        'It stores more data',
        'It is decentralized and immutable',
        'It is faster',
        'It uses less storage'
      ],
      correct: 1
    })
  }
  
  if (title.toLowerCase().includes('architecture')) {
    questions.push({
      id: 'q1',
      question: 'What are the four layers of DRP architecture?',
      options: [
        'Application, Protocol, Consensus, Network',
        'Frontend, Backend, Database, API',
        'User, System, Hardware, Software',
        'Input, Process, Output, Storage'
      ],
      correct: 0
    })
  }
  
  // Default quiz if no specific questions generated
  if (questions.length === 0) {
    questions.push({
      id: 'q1',
      question: `What is the main topic of this lesson about ${title}?`,
      options: [
        'Understanding the fundamentals',
        'Advanced concepts',
        'Practical applications',
        'All of the above'
      ],
      correct: 0
    })
  }
  
  return { questions }
}

/**
 * List all available lessons
 */
export function listAllLessons(): Array<{ id: string; level: number; title: string }> {
  const lessons: Array<{ id: string; level: number; title: string }> = []
  const learnDir = join(process.cwd(), 'src', 'content', 'learn')
  
  try {
    if (!existsSync(learnDir)) {
      return lessons
    }
    
    const levelDirs = readdirSync(learnDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
    
    levelDirs.forEach(levelStr => {
      const level = parseInt(levelStr)
      if (isNaN(level)) return
      
      const levelDir = join(learnDir, levelStr)
      const files = readdirSync(levelDir).filter(f => f.endsWith('.mdx'))
      
      files.forEach((file, index) => {
        try {
          const filePath = join(levelDir, file)
          const content = readFileSync(filePath, 'utf-8')
          const { frontmatter } = parseFrontmatter(content)
          
          lessons.push({
            id: `${level}-${index + 1}`,
            level,
            title: frontmatter.title || file.replace('.mdx', '')
          })
        } catch (error) {
          console.error(`Error reading lesson file ${file}:`, error)
        }
      })
    })
    
    return lessons.sort((a, b) => {
      if (a.level !== b.level) return a.level - b.level
      return a.id.localeCompare(b.id)
    })
  } catch (error) {
    console.error('Error listing lessons:', error)
    return lessons
  }
}

