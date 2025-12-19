'use client'

import React from 'react'
import { ConceptDiagram } from './ConceptDiagram'

/**
 * Detects ASCII art diagrams in content and replaces them with SVG diagrams
 * Recognizes patterns like:
 * - Box diagrams (┌─┐│└┘)
 * - Flow diagrams (→, ↓, arrows)
 * - Layer diagrams (stacked boxes)
 */
export function AsciiDiagramReplacer({ content }: { content: string }) {
  // Detect common ASCII diagram patterns
  const hasBoxDiagram = /┌[─┐]|├[─┤]|└[─┘]|│[^│]*│/.test(content)
  const hasFlowArrows = /→|↓|↑|←/.test(content)
  // Use [\s\S] instead of . with s flag for cross-line matching
  const hasLayers = /┌[\s\S]*?┐[\s\S]*?├[\s\S]*?┤/.test(content)
  
  // For now, return null - we'll integrate this into ReactMarkdown components
  // The actual replacement will happen in the markdown renderer
  return null
}

/**
 * Custom ReactMarkdown component to replace ASCII diagrams
 * Replaces ASCII art box diagrams with clean SVG diagrams
 */
export const diagramComponents = {
  // Replace code blocks that contain ASCII diagrams
  code: ({ node, inline, className, children, ...props }: any) => {
    if (inline) {
      return <code className={className} {...props}>{children}</code>
    }
    
    const codeString = String(children).replace(/\n$/, '')
    
    // Detect ASCII box diagrams (box-drawing characters)
    const hasBoxDrawing = /┌|├|└|│|┐|┤|┘|─/.test(codeString)
    
    if (hasBoxDrawing) {
      // Determine diagram type based on structure
      let diagramType: 'flow' | 'layers' | 'architecture' | 'pipeline' | null = null
      let title = 'Visual Diagram'
      let caption = 'This diagram illustrates the concept described above'
      
      // Check for layer/architecture patterns (multiple horizontal boxes)
      // Use [\s\S] instead of . with s flag for cross-line matching
      if (/┌[\s\S]*?┐[\s\S]*?├[\s\S]*?┤/.test(codeString) || /Layer|Architecture|Stack/i.test(codeString)) {
        diagramType = 'layers'
        title = 'System Architecture'
        caption = 'This diagram shows the layered structure described in the text'
      }
      // Check for flow patterns (arrows, sequential steps)
      else if (/→|↓|Flow|Process|Step/i.test(codeString) || /Block.*→|→.*Block/.test(codeString)) {
        diagramType = 'flow'
        title = 'Process Flow'
        caption = 'This diagram illustrates the sequential flow of the process'
      }
      // Check for pipeline patterns
      else if (/Pipeline|Stage|Phase/i.test(codeString)) {
        diagramType = 'pipeline'
        title = 'Processing Pipeline'
        caption = 'This diagram shows the pipeline stages'
      }
      // Default to architecture for box diagrams
      else {
        diagramType = 'architecture'
        title = 'System Structure'
        caption = 'This diagram represents the structure described above'
      }
      
      if (diagramType) {
        return (
          <div className="my-6">
            <ConceptDiagram
              type={diagramType}
              title={title}
              caption={caption}
            />
          </div>
        )
      }
    }
    
    // Default code block rendering (preserve non-diagram code blocks)
    return (
      <pre className={className} {...props}>
        <code>{children}</code>
      </pre>
    )
  }
}

