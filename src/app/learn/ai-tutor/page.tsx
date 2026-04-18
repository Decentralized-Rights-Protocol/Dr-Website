"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  MessageSquare,
  Send,
  Sparkles,
  User,
  Cpu,
  Lightbulb,
  BookOpen,
  GraduationCap,
  Bot,
  ArrowRight
} from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
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
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-900/20">
            <Bot className="h-8 w-8 text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              AI Learning Assistant
            </h1>
            <p className="text-slate-400 text-sm">
              Your personalized tutor for blockchain and DRP concepts
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Chat Interface */}
        <div className="lg:col-span-3 flex flex-col h-[700px] rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-md overflow-hidden shadow-2xl">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Assistant Online</span>
                <p className="text-xs text-indigo-400 font-medium">Level {tutorContext.currentLevel} • {tutorContext.currentLesson}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-4 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center shadow-md ${
                  message.type === 'user' 
                    ? 'bg-slate-700 text-white' 
                    : 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white'
                }`}>
                  {message.type === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>

                {/* Bubble */}
                <div className={`max-w-[85%] space-y-3`}>
                  <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm
                    ${message.type === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-sm' 
                      : 'bg-slate-800 text-slate-200 border border-slate-700/50 rounded-tl-sm'
                    }`}>
                    {message.type === 'user' 
                      ? message.content 
                      : <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800">
                          <ReactMarkdown>
                            {message.content}
                          </ReactMarkdown>
                        </div>
                    }
                  </div>

                  {/* Suggestions for AI messages */}
                  {message.type === 'assistant' && message.suggestions && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSendMessage(suggestion)}
                          className="px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-[11px] font-medium text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all"
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
              <div className="flex gap-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-slate-800 border border-slate-700/50 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-900/80 backdrop-blur-md border-t border-slate-800">
            <div className="flex gap-3 max-w-4xl mx-auto">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask the AI tutor anything about DRP..."
                className="flex-1 rounded-xl border border-slate-700 bg-slate-800 
                    px-4 py-3 text-sm text-white placeholder-slate-500 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50
                    transition-all"
                disabled={isLoading}
              />
              <Button 
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 
                    text-white font-semibold transition-all hover:scale-105 
                    disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Progress Widget */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Learning Status
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Current Level</p>
                <p className="text-sm font-bold text-white">Level {tutorContext.currentLevel}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Current Lesson</p>
                <p className="text-sm font-bold text-white leading-tight">{tutorContext.currentLesson}</p>
              </div>
              <div className="pt-2">
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[65%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Topics */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Quick Help
            </h3>
            <div className="space-y-2">
              {[
                { label: "Blockchain Basics", icon: <BookOpen className="w-3.5 h-3.5" /> },
                { label: "DRP Consensus", icon: <Cpu className="w-3.5 h-3.5" /> },
                { label: "Practice Quiz", icon: <Sparkles className="w-3.5 h-3.5" /> }
              ].map((topic) => (
                <button
                  key={topic.label}
                  onClick={() => handleSendMessage(`Explain ${topic.label}`)}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-xs text-slate-300 hover:bg-slate-800 hover:border-indigo-500/40 hover:text-white transition-all group"
                >
                  <span className="flex items-center gap-2">
                    {topic.icon}
                    {topic.label}
                  </span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          {/* Recent Topics */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Recent Topics</h3>
            <div className="flex flex-wrap gap-2">
              {tutorContext.recentTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => handleSendMessage(`Tell me more about ${topic}`)}
                  className="px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 hover:bg-indigo-500/20 transition-colors"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
