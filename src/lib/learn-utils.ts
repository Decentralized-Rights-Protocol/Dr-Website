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
  const learnDir = join(process.cwd(), 'src', 'content', 'learn')
  
  try {
    if (!existsSync(learnDir)) {
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
        lessons.push({
          slug,
          level,
          filename: file,
          path: join(levelDir, file)
        })
      })
    })
    
    return lessons.sort((a, b) => {
      if (a.level !== b.level) return a.level - b.level
      return a.slug.localeCompare(b.slug)
    })
  } catch (error) {
    console.error('Error reading lesson files:', error)
    return lessons
  }
}

/**
 * Map lesson ID (e.g., "1-1") to a slug based on file order
 * Files are sorted alphabetically within each level
 */
function mapIdToSlug(lessonId: string): string | null {
  const [levelStr, lessonNumStr] = lessonId.split('-')
  const level = parseInt(levelStr)
  const lessonNum = parseInt(lessonNumStr)
  
  if (isNaN(level) || isNaN(lessonNum)) {
    return null
  }
  
  const allFiles = getAllLessonFiles()
  const levelFiles = allFiles
    .filter(f => f.level === level)
    .sort((a, b) => a.slug.localeCompare(b.slug)) // Sort alphabetically for consistent mapping
  
  if (lessonNum > 0 && lessonNum <= levelFiles.length) {
    return levelFiles[lessonNum - 1].slug
  }
  
  return null
}

/**
 * Load a lesson by ID (e.g., "1-1") or slug
 */
export function loadLessonById(lessonId: string): LessonMetadata | null {
  try {
    // Try direct slug match first
    let slug = lessonId
    let level: number | null = null
    
    // Check if it's an ID format (e.g., "1-1")
    if (lessonId.includes('-') && /^\d+-\d+$/.test(lessonId)) {
      const mappedSlug = mapIdToSlug(lessonId)
      if (!mappedSlug) {
        return null
      }
      slug = mappedSlug
      level = parseInt(lessonId.split('-')[0])
    }
    
    // Find the file
    const allFiles = getAllLessonFiles()
    const lessonFile = allFiles.find(f => f.slug === slug)
    
    if (!lessonFile) {
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
    console.error(`Error loading lesson ${lessonId}:`, error)
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
      return null
    }
    
    const content = readFileSync(lessonFile.path, 'utf-8')
    const { frontmatter, body } = parseFrontmatter(content)
    
    // Generate ID from level and position
    const levelFiles = allFiles.filter(f => f.level === lessonFile.level)
    const position = levelFiles.findIndex(f => f.slug === slug) + 1
    const id = `${lessonFile.level}-${position}`
    
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
    console.error(`Error loading lesson by slug ${slug}:`, error)
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
  
  // Process each level
  Object.keys(byLevel).forEach(levelStr => {
    const level = parseInt(levelStr)
    const files = byLevel[level].sort((a, b) => a.slug.localeCompare(b.slug))
    
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
        console.error(`Error reading lesson file ${file.path}:`, error)
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
 * Generate quiz questions for a lesson
 */
export function generateQuizForLesson(lesson: { title: string; level: number; module: string }): {
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    correct: number;
  }>;
} {
  const title = lesson.title.toLowerCase();
  const questions: Array<{
    id: string;
    question: string;
    options: string[];
    correct: number;
  }> = [];
  
  // Quiz for blockchain basics
  if (title.includes('blockchain') || lesson.module.includes('blockchain')) {
    questions.push(
      {
        id: 'q1',
        question: 'What is the primary characteristic that makes blockchain different from traditional databases?',
        options: [
          'It stores more data',
          'It is decentralized and immutable',
          'It is faster',
          'It uses less storage'
        ],
        correct: 1
      },
      {
        id: 'q2',
        question: 'What does the term "immutable" mean in blockchain context?',
        options: [
          'Data can be easily changed',
          'Data cannot be changed once recorded',
          'Data is temporary',
          'Data is encrypted'
        ],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Which of the following is NOT a key characteristic of blockchain?',
        options: [
          'Decentralization',
          'Immutability',
          'Centralized control',
          'Transparency'
        ],
        correct: 2
      }
    );
  }
  // Quiz for DRP architecture
  else if (title.includes('architecture') || title.includes('drp')) {
    questions.push(
      {
        id: 'q1',
        question: 'What are the four layers of DRP architecture?',
        options: [
          'Application, Protocol, Consensus, Network',
          'Frontend, Backend, Database, API',
          'User, System, Hardware, Software',
          'Input, Process, Output, Storage'
        ],
        correct: 0
      },
      {
        id: 'q2',
        question: 'What is the primary purpose of the Elder Quorum?',
        options: [
          'To mine new blocks',
          'To provide governance and make protocol decisions',
          'To store user data',
          'To process transactions'
        ],
        correct: 1
      },
      {
        id: 'q3',
        question: 'What does PoAT stand for in DRP consensus?',
        options: [
          'Proof of Authority Time',
          'Proof of Activity',
          'Proof of Available Time',
          'Proof of Advanced Technology'
        ],
        correct: 1
      }
    );
  }
  // Default quiz for other lessons
  else {
    questions.push({
      id: 'q1',
      question: `What is the main topic covered in "${lesson.title}"?`,
      options: [
        'Understanding core concepts',
        'Advanced technical details',
        'Practical applications',
        'All of the above'
      ],
      correct: 0
    });
  }
  
  return { questions };
}

/**
 * Clean and return markdown content (keep as markdown, not HTML)
 */
function cleanMarkdown(content: string): string {
  return content.trim()
}
