import { readFileSync, readdirSync, existsSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

export interface LessonMetadata {
  id: string
  slug: string
  title: string
  description: string
  duration: number
  reward: number
  level: number
  module: string
  content: string // Markdown content (not HTML)
}

export interface LessonFile {
  slug: string
  level: number
  filename: string
  path: string
}

/**
 * Custom order mapping to match curriculum expectations
 * This ensures IDs match the intended curriculum order
 */
const CURRICULUM_ORDER: Record<number, string[]> = {
  1: [
    'what-is-blockchain',        // 1-1
    'cryptography-and-hashing',     // 1-2
    'consensus-mechanisms',     // 1-3
    'smart-contracts-101'       // 1-4
  ],
  2: [
    'drp-architecture',         // 2-1
    'post-poat-consensus',       // 2-2
    'elder-quorum-system',      // 2-3
    'activity-proofs'           // 2-4
  ],
  3: [
    'drp-development-kit',      // 3-1
    'building-dapps',           // 3-2
    'contributing-to-drp',      // 3-3
    'testing-and-deployment'        // 3-4
  ],
  4: [
    'enterprise-integration',   // 4-1
    'supply-chain-applications', // 4-2
    'identity-access-management', // 4-3
    'cross-chain-interoperability' // 4-4
  ],
  5: [
    'advanced-drp-concepts',    // 5-1
    'governance-mechanisms',    // 5-2
    'economic-models',          // 5-3
    'future-of-drp'             // 5-4
  ]
}

/**
 * Parse frontmatter from MDX file content using gray-matter
 */
function parseFrontmatter(content: string): { frontmatter: Record<string, any>, body: string } {
  try {
    const parsed = matter(content)
    return {
      frontmatter: parsed.data || {},
      body: parsed.content || ''
    }
  } catch (error) {
    console.error('Error parsing frontmatter:', error)
    return { frontmatter: {}, body: content }
  }
}

/**
 * Create a slug from a filename
 */
function createSlug(filename: string): string {
  return filename.replace(/\.mdx?$/, '').toLowerCase()
}

/**
 * Get all lesson files from the filesystem
 */
export function getAllLessonFiles(): LessonFile[] {
  const lessons: LessonFile[] = []
  // Use process.cwd() which works in both dev and production
  const learnDir = join(process.cwd(), 'src', 'content', 'learn')
  
  try {
    if (!existsSync(learnDir)) {
      console.error(`[Learn Utils] Learn directory does not exist: ${learnDir}`)
      console.error(`[Learn Utils] Current working directory: ${process.cwd()}`)
      return lessons
    }
    
    // Read level directories
    const levelDirs = readdirSync(learnDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .filter(name => /^\d+$/.test(name)) // Only numeric directories
    
    levelDirs.forEach(levelStr => {
      const level = parseInt(levelStr)
      if (isNaN(level)) return
      
      const levelDir = join(learnDir, levelStr)
      const files = readdirSync(levelDir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
      
      files.forEach(file => {
        const slug = createSlug(file)
        const filePath = join(levelDir, file)
        lessons.push({
          slug,
          level,
          filename: file,
          path: filePath
        })
      })
    })
    
    return lessons
  } catch (error) {
    console.error('[Learn Utils] Error reading lesson files:', error)
    if (error instanceof Error) {
      console.error('[Learn Utils] Error details:', error.message)
    }
    return lessons
  }
}

/**
 * Map lesson ID (e.g., "1-1") to a slug based on curriculum order
 */
function mapIdToSlug(lessonId: string): string | null {
  const [levelStr, lessonNumStr] = lessonId.split('-')
  const level = parseInt(levelStr)
  const lessonNum = parseInt(lessonNumStr)
  
  if (isNaN(level) || isNaN(lessonNum)) {
    console.error(`[Learn Utils] Invalid lesson ID format: ${lessonId}`)
    return null
  }
  
  // Use curriculum order if available
  if (CURRICULUM_ORDER[level]) {
    if (lessonNum > 0 && lessonNum <= CURRICULUM_ORDER[level].length) {
      return CURRICULUM_ORDER[level][lessonNum - 1]
    }
  }
  
  // Fallback to alphabetical order
  const allFiles = getAllLessonFiles()
  const levelFiles = allFiles
    .filter(f => f.level === level)
    .sort((a, b) => a.slug.localeCompare(b.slug))
  
  if (lessonNum > 0 && lessonNum <= levelFiles.length) {
    return levelFiles[lessonNum - 1].slug
  }
  
  console.error(`[Learn Utils] Could not map lesson ID ${lessonId} to slug`)
  return null
}

/**
 * Load a lesson by ID (e.g., "1-1") or slug
 */
export function loadLessonById(lessonId: string): LessonMetadata | null {
  try {
    // Try direct slug match first (if it's not an ID format)
    let slug = lessonId
    let level: number | null = null
    
    // Check if it's an ID format (e.g., "1-1")
    if (lessonId.includes('-') && /^\d+-\d+$/.test(lessonId)) {
      const mappedSlug = mapIdToSlug(lessonId)
      if (!mappedSlug) {
        console.error(`[Learn Utils] Could not map lesson ID ${lessonId} to slug`)
        return null
      }
      slug = mappedSlug
      level = parseInt(lessonId.split('-')[0])
    }
    
    // Find the file
    const allFiles = getAllLessonFiles()
    const lessonFile = allFiles.find(f => f.slug === slug)
    
    if (!lessonFile) {
      console.error(`[Learn Utils] Lesson file not found for slug: ${slug} (from ID: ${lessonId})`)
      console.error(`[Learn Utils] Available slugs for level ${level || 'any'}: ${allFiles.filter(f => !level || f.level === level).map(f => f.slug).join(', ')}`)
      return null
    }
    
    if (!existsSync(lessonFile.path)) {
      console.error(`[Learn Utils] Lesson file path does not exist: ${lessonFile.path} (slug: ${slug}, ID: ${lessonId})`)
      return null
    }
    
    // Read and parse the file
    const content = readFileSync(lessonFile.path, 'utf-8')
    const { frontmatter, body } = parseFrontmatter(content)
    
    return {
      id: lessonId,
      slug: lessonFile.slug,
      title: frontmatter.title || 'Untitled Lesson',
      description: frontmatter.description || '',
      duration: frontmatter.duration || 15,
      reward: frontmatter.reward || 10,
      level: frontmatter.level || lessonFile.level || level || 1,
      module: frontmatter.module || lessonFile.slug,
      content: body.trim()
    }
  } catch (error) {
    console.error(`[Learn Utils] Error loading lesson ${lessonId}:`, error)
    if (error instanceof Error) {
      console.error(`[Learn Utils] Error details: ${error.message}`)
      console.error(`[Learn Utils] Stack: ${error.stack}`)
    }
    return null
  }
}

/**
 * Load a lesson by slug
 */
export function loadLessonBySlug(slug: string): LessonMetadata | null {
  try {
    const allFiles = getAllLessonFiles()
    const lessonFile = allFiles.find(f => f.slug === slug)
    
    if (!lessonFile) {
      console.error(`[Learn Utils] Lesson file not found for slug: ${slug}`)
      console.error(`[Learn Utils] Available slugs: ${allFiles.map(f => `${f.level}-${f.slug}`).join(', ')}`)
      return null
    }
    
    if (!existsSync(lessonFile.path)) {
      console.error(`[Learn Utils] Lesson file path does not exist: ${lessonFile.path}`)
      return null
    }
    
    const content = readFileSync(lessonFile.path, 'utf-8')
    const { frontmatter, body } = parseFrontmatter(content)
    
    // Generate ID from level and position using curriculum order
    let id: string
    if (CURRICULUM_ORDER[lessonFile.level]) {
      const position = CURRICULUM_ORDER[lessonFile.level].indexOf(slug) + 1
      if (position > 0) {
        id = `${lessonFile.level}-${position}`
      } else {
        // Fallback to alphabetical order
        const levelFiles = allFiles
          .filter(f => f.level === lessonFile.level)
          .sort((a, b) => a.slug.localeCompare(b.slug))
        const position = levelFiles.findIndex(f => f.slug === slug) + 1
        id = `${lessonFile.level}-${position}`
      }
    } else {
      // Fallback to alphabetical order
      const levelFiles = allFiles
        .filter(f => f.level === lessonFile.level)
        .sort((a, b) => a.slug.localeCompare(b.slug))
      const position = levelFiles.findIndex(f => f.slug === slug) + 1
      id = `${lessonFile.level}-${position}`
    }
    
    return {
      id,
      slug: lessonFile.slug,
      title: frontmatter.title || 'Untitled Lesson',
      description: frontmatter.description || '',
      duration: frontmatter.duration || 15,
      reward: frontmatter.reward || 10,
      level: frontmatter.level || lessonFile.level,
      module: frontmatter.module || lessonFile.slug,
      content: body.trim()
    }
  } catch (error) {
    console.error(`[Learn Utils] Error loading lesson by slug ${slug}:`, error)
    if (error instanceof Error) {
      console.error(`[Learn Utils] Error details: ${error.message}`)
    }
    return null
  }
}

/**
 * List all available lessons
 */
export function listAllLessons(): Array<{ id: string; slug: string; level: number; title: string; description: string }> {
  const lessons: Array<{ id: string; slug: string; level: number; title: string; description: string }> = []
  const allFiles = getAllLessonFiles()
  
  // Group by level
  const byLevel: Record<number, LessonFile[]> = {}
  allFiles.forEach(file => {
    if (!byLevel[file.level]) {
      byLevel[file.level] = []
    }
    byLevel[file.level].push(file)
  })
  
  // Process each level using curriculum order
  Object.keys(byLevel).forEach(levelStr => {
    const level = parseInt(levelStr)
    let files = byLevel[level]
    
    // Sort according to curriculum order if available
    if (CURRICULUM_ORDER[level]) {
      files = CURRICULUM_ORDER[level]
        .map(slug => files.find(f => f.slug === slug))
        .filter((f): f is LessonFile => f !== undefined)
        .concat(files.filter(f => !CURRICULUM_ORDER[level].includes(f.slug)))
    } else {
      // Fallback to alphabetical
      files = files.sort((a, b) => a.slug.localeCompare(b.slug))
    }
    
    files.forEach((file, index) => {
      try {
        const content = readFileSync(file.path, 'utf-8')
        const { frontmatter } = parseFrontmatter(content)
        
        lessons.push({
          id: `${level}-${index + 1}`,
          slug: file.slug,
          level,
          title: frontmatter.title || file.slug,
          description: frontmatter.description || ''
        })
      } catch (error) {
        console.error(`[Learn Utils] Error reading lesson file ${file.path}:`, error)
      }
    })
  })
  
  return lessons.sort((a, b) => {
    if (a.level !== b.level) return a.level - b.level
    return a.id.localeCompare(b.id)
  })
}

/**
 * Get all lesson slugs for static generation
 */
export function getAllLessonSlugs(): string[] {
  return getAllLessonFiles().map(f => f.slug)
}

/**
 * Generate quiz questions for a lesson based on its content
 */
export function generateQuizForLesson(lesson: LessonMetadata): {
  questions: Array<{
    id: string
    question: string
    options: string[]
    correct: number
  }>
} {
  // Extract key concepts from content
  const content = lesson.content.toLowerCase()
  
  // Generate questions based on lesson content
  const questions: Array<{
    id: string
    question: string
    options: string[]
    correct: number
  }> = []
  
  // Question 1: About the main topic
  if (content.includes('blockchain')) {
    questions.push({
      id: 'q1',
      question: `What is the primary focus of "${lesson.title}"?`,
      options: [
        'Understanding blockchain technology',
        'Learning programming languages',
        'Designing websites',
        'Creating mobile apps'
      ],
      correct: 0
    })
  }
  
  // Question 2: About key concepts
  if (content.includes('consensus') || content.includes('agreement')) {
    questions.push({
      id: 'q2',
      question: 'Which mechanism helps blockchain networks reach agreement?',
      options: [
        'Consensus mechanism',
        'Database replication',
        'Central authority',
        'Random selection'
      ],
      correct: 0
    })
  }
  
  // Question 3: About DRP
  if (content.includes('drp') || content.includes('decentralized rights')) {
    questions.push({
      id: 'q3',
      question: 'What does DRP stand for?',
      options: [
        'Decentralized Rights Protocol',
        'Data Retrieval Process',
        'Dynamic Resource Planning',
        'Digital Rights Protection'
      ],
      correct: 0
    })
  }
  
  // Default questions if none matched
  if (questions.length === 0) {
    questions.push({
      id: 'q1',
      question: `What is the main topic of "${lesson.title}"?`,
      options: [
        lesson.title,
        'A different topic',
        'Another subject',
        'Something else'
      ],
      correct: 0
    })
    
    questions.push({
      id: 'q2',
      question: `How long is this lesson?`,
      options: [
        `${lesson.duration} minutes`,
        '5 minutes',
        '1 hour',
        '2 hours'
      ],
      correct: 0
    })
  }
  
  // Add at least 3 questions
  while (questions.length < 3) {
    questions.push({
      id: `q${questions.length + 1}`,
      question: `What is an important concept in "${lesson.title}"?`,
      options: [
        'Key concept discussed in the lesson',
        'Unrelated topic',
        'Something else',
        'Not applicable'
      ],
      correct: 0
    })
  }
  
  return { questions }
}

/**
 * Clean markdown content for display
 */
export function cleanMarkdown(content: string): string {
  // Remove excessive newlines
  return content
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}
