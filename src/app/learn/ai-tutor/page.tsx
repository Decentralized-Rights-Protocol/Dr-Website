"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  UserIcon,
  CpuChipIcon,
  LightBulbIcon,
  BookOpenIcon,
  AcademicCapIcon
} from "@heroicons/react/24/outline";
import {
  formatStructuredResponse,
  generatePatternMode,
  generateGuidedQuestion,
  shouldUsePatternMode,
  addGamificationElements,
  adaptComplexity
} from "@/learn/utils/ai-tutor-helpers";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface TutorContext {
  currentLevel: number;
  currentLesson?: string;
  recentTopics: string[];
  learningStyle: 'visual' | 'textual' | 'interactive';
}

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: `Hello! I'm your DRP Learning Assistant. I'm here to TEACH, not just answer.

**How I help you learn:**
🔹 I give clear, simple explanations first
🔹 I provide 2-4 different perspectives on the same idea
🔹 I use plain language, then technical details
🔹 I end with questions to help you think actively
🔹 I adapt to your level - no assumptions about prior knowledge

**My teaching approach:**
• **Structured answers** with core explanation, variants, key takeaways, and check questions
• **Pattern mode** for complex topics - we build understanding step by step
• **Guided guessing** - you think first, then we discuss together
• **No overwhelming walls of text** - clear, concise, interactive

What would you like to explore? Ask me anything about blockchain, DRP, or your current lesson!`,
      timestamp: new Date(),
      suggestions: [
        "Explain blockchain basics",
        "What is DRP consensus?",
        "Help with current lesson",
        "Quiz me on recent topics"
      ]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tutorContext, setTutorContext] = useState<TutorContext>({
    currentLevel: 2,
    currentLesson: 'DRP Architecture',
    recentTopics: ['Blockchain', 'Consensus', 'Smart Contracts'],
    learningStyle: 'interactive'
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputMessage.trim();
    if (!messageToSend) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Simulate AI response - in real implementation, this would call your AI service
      const response = await simulateAIResponse(messageToSend, tutorContext);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateAIResponse = async (message: string, context: TutorContext): Promise<{content: string, suggestions?: string[]}> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('blockchain') || lowerMessage.includes('block chain')) {
      const coreExplanation = adaptComplexity(
        "Blockchain is a digital ledger that stores records (blocks) linked together using cryptography. Everyone can see and verify the records, but no one can change them without everyone else knowing.",
        context.currentLevel
      );
      
      const variants = [
        {
          label: "Intuitive",
          content: "Think of blockchain like a shared Google Doc where everyone has a copy. When someone makes a change, everyone sees it, and the system checks that the change is valid before accepting it."
        },
        {
          label: "Technical",
          content: "Blockchain is a distributed ledger technology that maintains a continuously growing list of cryptographically linked blocks. Each block contains a hash of the previous block, creating an immutable chain."
        },
        {
          label: "DRP Context",
          content: "In DRP, blockchain ensures that digital rights ownership and activity proofs are recorded permanently and transparently, without needing a central authority to verify them."
        }
      ];
      
      const keyTakeaway = "Blockchain enables trust without a central authority by distributing verification across the network.";
      const checkQuestion = "Why would a blockchain fail if nodes didn't use a consensus mechanism?";
      
      const content = formatStructuredResponse(coreExplanation, variants, keyTakeaway, checkQuestion);
      
      return {
        content: addGamificationElements(content, "the core concept of blockchain", "advanced cryptography details"),
        suggestions: [
          "How does DRP use blockchain?",
          "Explain consensus mechanisms",
          "What makes blockchain secure?",
          "Give me a practical example"
        ]
      };
    }

    if (lowerMessage.includes('consensus') || lowerMessage.includes('post') || lowerMessage.includes('poat')) {
      // Check if this is complex enough for Pattern Mode
      if (shouldUsePatternMode('consensus', message)) {
        const patternResponse = generatePatternMode(
          'Consensus',
          [
            {
              word: 'Agreement',
              question: 'What are we agreeing on?',
              explanation: 'We need all computers in the network to agree on which transactions are valid and which block comes next.'
            },
            {
              word: 'Distributed Nodes',
              question: 'Who is doing the agreeing?',
              explanation: 'Multiple independent computers (nodes) participate in the network, each maintaining a copy of the ledger.'
            },
            {
              word: 'Rules + Verification',
              question: 'How do they agree without trust?',
              explanation: 'They follow a set of rules (consensus mechanism) that mathematically verifies transactions and blocks.'
            }
          ],
          'Agreement + Nodes + Rules = Consensus'
        );
        
        return {
          content: patternResponse,
          suggestions: [
            "Continue with consensus",
            "Explain PoST specifically",
            "How does PoAT work?",
            "Give me a real example"
          ]
        };
      }
      
      const coreExplanation = adaptComplexity(
        "Consensus is how all computers in a blockchain agree on which transactions are valid and which block comes next, without needing a central authority.",
        context.currentLevel
      );
      
      const variants = [
        {
          label: "Intuitive",
          content: "Think of consensus like a group vote where everyone agrees on the same decision before moving forward. In blockchain, this happens automatically through mathematical rules."
        },
        {
          label: "Technical",
          content: "Consensus is a protocol that enables distributed nodes to reach agreement on the ledger state despite failures or malicious actors. DRP uses PoST (Proof of Stake + Time) combining stake (40%) with participation time (60%)."
        },
        {
          label: "DRP Context",
          content: "In DRP, consensus also verifies human activity and rights-related actions through PoAT (Proof of Activity), not just financial transactions. This ensures decisions are made by active, invested participants."
        }
      ];
      
      const keyTakeaway = "Consensus ensures trust without a central authority by enabling distributed agreement.";
      const checkQuestion = "Why would a blockchain fail if nodes didn't use a consensus mechanism?";
      
      const content = formatStructuredResponse(coreExplanation, variants, keyTakeaway, checkQuestion);
      
      return {
        content: addGamificationElements(content, "the core concept of consensus", "advanced PoST/PoAT mechanics"),
        suggestions: [
          "How does PoST work?",
          "Explain PoAT in detail",
          "What is the Elder Quorum?",
          "Give me a real example"
        ]
      };
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('lesson') || lowerMessage.includes('current')) {
      const coreExplanation = `I'd be happy to help with your current lesson on "${context.currentLesson || 'DRP concepts'}"! Let me break down the key points in a way that helps you understand deeply.`;
      
      const variants = [
        {
          label: "Key Concepts",
          content: `For Level ${context.currentLevel}, focus on understanding the layered approach: Application → Protocol → Consensus → Network. Each layer has a specific role in rights management.`
        },
        {
          label: "Study Strategy",
          content: "Take notes on how DRP differs from traditional blockchains. Practice explaining concepts in your own words. Connect each concept to real-world applications you care about."
        },
        {
          label: "Common Questions",
          content: "Students often ask: 'How does DRP handle scalability?', 'What makes DRP different?', 'How do I become an Elder?' These are great questions that show you're thinking critically!"
        }
      ];
      
      const keyTakeaway = "Understanding comes from active engagement: explain concepts in your own words and connect them to real applications.";
      const checkQuestion = "What specific part of the lesson would you like to explore deeper? I can break it down step by step!";
      
      const content = formatStructuredResponse(coreExplanation, variants, keyTakeaway, checkQuestion);
      
      return {
        content: addGamificationElements(content, "effective study strategies"),
        suggestions: [
          "Quiz me on DRP architecture",
          "Explain scalability in DRP",
          "How do I become an Elder?",
          "Break down a specific concept"
        ]
      };
    }

    if (lowerMessage.includes('quiz') || lowerMessage.includes('test') || lowerMessage.includes('practice')) {
      // Use guided guessing approach
      const guidedQuestion = generateGuidedQuestion(
        "What is the primary purpose of DRP's hybrid consensus?",
        [
          "To reduce energy consumption",
          "To ensure rights management decisions are made by active, invested participants",
          "To increase transaction speed",
          "To reduce network fees"
        ],
        "Think about what makes DRP different from other blockchains"
      );
      
      return {
        content: `Perfect! Let's test your knowledge with guided questions. I'll ask, you think, then we'll discuss together.\n\n${guidedQuestion}\n\n**Remember**: There's no pressure! Take your time to think. When you pick an answer, I'll help you understand why it's right or guide you toward the correct understanding.`,
        suggestions: [
          "I think the answer is B",
          "I'm not sure, can you help?",
          "Give me another question",
          "Explain consensus again first"
        ]
      };
    }

    // Default response - use structured format
    const coreExplanation = "I'm here to help you understand DRP and blockchain concepts through clear explanations, multiple perspectives, and guided learning.";
    
    const variants = [
      {
        label: "How I Teach",
        content: "I explain concepts simply first, then provide different perspectives (intuitive, technical, DRP-specific), and end with a question to check your understanding."
      },
      {
        label: "What I Can Help With",
        content: `Based on your Level ${context.currentLevel} progress, I can help with blockchain fundamentals, DRP consensus (PoST + PoAT), smart contracts, governance, and real-world applications.`
      },
      {
        label: "Learning Approach",
        content: "I use structured explanations, pattern-building for complex topics, and guided questions to help you think actively rather than just memorize."
      }
    ];
    
    const keyTakeaway = "Active learning through multiple perspectives and reflection leads to deeper understanding.";
    const checkQuestion = "What topic would you like to explore? Try asking about something specific, and I'll break it down step by step!";
    
    const content = formatStructuredResponse(coreExplanation, variants, keyTakeaway, checkQuestion);
    
    return {
      content: addGamificationElements(content, "how the AI Tutor works"),
      suggestions: [
        "Explain DRP consensus mechanisms",
        "Help me understand smart contracts",
        "What are some DRP use cases?",
        "Quiz me on recent lessons"
      ]
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #312e81, #581c87)' }}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
              <CpuChipIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                DRP Learning Assistant
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Your AI tutor for blockchain and DRP concepts
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <SparklesIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      DRP Learning Assistant
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Level {tutorContext.currentLevel} • {tutorContext.currentLesson}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      {message.suggestions && (
                        <div className="mt-3 space-y-2">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSendMessage(suggestion)}
                              className="block w-full text-left text-xs p-2 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about DRP or blockchain..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() || isLoading}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md transition-colors"
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Learning Context */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <BookOpenIcon className="h-5 w-5 mr-2" />
                Your Progress
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Current Level</p>
                  <p className="font-semibold text-gray-900 dark:text-white">Level {tutorContext.currentLevel}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Current Lesson</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{tutorContext.currentLesson}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Learning Style</p>
                  <p className="font-semibold text-gray-900 dark:text-white capitalize">{tutorContext.learningStyle}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <LightBulbIcon className="h-5 w-5 mr-2" />
                Quick Help
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleSendMessage("Explain blockchain basics")}
                  className="w-full text-left p-2 text-sm bg-gray-50 dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  Blockchain Basics
                </button>
                <button
                  onClick={() => handleSendMessage("What is DRP consensus?")}
                  className="w-full text-left p-2 text-sm bg-gray-50 dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  DRP Consensus
                </button>
                <button
                  onClick={() => handleSendMessage("Help with current lesson")}
                  className="w-full text-left p-2 text-sm bg-gray-50 dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  Current Lesson Help
                </button>
                <button
                  onClick={() => handleSendMessage("Quiz me on recent topics")}
                  className="w-full text-left p-2 text-sm bg-gray-50 dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  Practice Quiz
                </button>
              </div>
            </div>

            {/* Recent Topics */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <AcademicCapIcon className="h-5 w-5 mr-2" />
                Recent Topics
              </h3>
              <div className="space-y-2">
                {tutorContext.recentTopics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(`Explain ${topic}`)}
                    className="w-full text-left p-2 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
