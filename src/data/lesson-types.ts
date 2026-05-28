export interface LessonSection {
  type: 'intro' | 'concept' | 'diagram' | 'code' | 'quiz' | 'callout';
  title?: string;
  content: string;
  code?: string;
  language?: string;
  diagramType?: 'flow' | 'comparison' | 'timeline' | 'stack';
  diagramData?: Record<string, unknown>;
  quizOptions?: string[];
  quizAnswer?: number;
  quizExplanation?: string;
  calloutType?: 'info' | 'warning' | 'success' | 'drp';
}

export interface Lesson {
  slug: string;
  title: string;
  subtitle: string;
  path: number;
  pathName: string;
  pathIcon: string;
  lessonNumber: number;
  duration: string;
  xp: number;
  deri: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites: string[];
  tags: string[];
  sections: LessonSection[];
  nextLesson: string | null;
  prevLesson: string | null;
  keyTakeaways: string[];
}
