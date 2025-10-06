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
      content: "Hello! I'm your DRP Learning Assistant. I'm here to help you understand blockchain concepts, DRP architecture, and answer any questions you have about your learning journey. What would you like to know?",
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
      return {
        content: `Great question about blockchain! Since you're at Level ${context.currentLevel}, let me explain it in a way that builds on what you've learned.

**Blockchain** is a distributed ledger technology that maintains a continuously growing list of records (blocks) that are linked and secured using cryptography. Think of it as a digital notebook that everyone can see and verify, but no one can alter without everyone else knowing.

Key concepts for your level:
• **Decentralization**: No single authority controls the network
• **Immutability**: Once data is recorded, it cannot be changed
• **Consensus**: How the network agrees on valid transactions
• **Cryptography**: Mathematical security that protects the data

This directly relates to DRP's approach to decentralized rights management. Would you like me to explain how DRP uses these blockchain principles?`,
        suggestions: [
          "How does DRP use blockchain?",
          "What's the difference between blockchain and DRP?",
          "Explain consensus mechanisms",
          "Give me a practical example"
        ]
      };
    }

    if (lowerMessage.includes('consensus') || lowerMessage.includes('post') || lowerMessage.includes('poat')) {
      return {
        content: `Excellent! Consensus is a core concept in DRP. Let me break down DRP's unique consensus mechanisms:

**DRP uses a hybrid consensus approach:**

1. **PoST (Proof of Stake + Time)**: Validators stake tokens and are selected based on both their stake and the time they've been active in the network. This ensures experienced participants have influence.

2. **PoAT (Proof of Activity)**: This verifies that participants are actively contributing to the network through real-world activities, not just holding tokens.

**Why this matters for DRP:**
• **Rights Management**: Ensures those making decisions about digital rights are both invested and active
• **Sybil Resistance**: Prevents fake accounts from gaining influence
• **Real-world Integration**: PoAT connects blockchain decisions to actual activities

The Elder Quorum system you're learning about uses this consensus to make decisions about protocol changes and rights management.

Would you like me to explain how the Elder Quorum works, or do you have questions about staking?`,
        suggestions: [
          "How does Elder Quorum work?",
          "What is staking in DRP?",
          "Explain activity proofs",
          "Give me a real example"
        ]
      };
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('lesson') || lowerMessage.includes('current')) {
      return {
        content: `I'd be happy to help with your current lesson on "${context.currentLesson}"! 

Based on your progress at Level ${context.currentLevel}, here are some key points to focus on:

**For DRP Architecture:**
• Understand the layered approach: Application → Protocol → Consensus → Network
• Learn how different components interact
• Focus on the role of each layer in rights management

**Study Tips:**
• Take notes on how DRP differs from traditional blockchains
• Practice explaining the concepts in your own words
• Try to connect each concept to real-world applications

**Common Questions Students Ask:**
• "How does DRP handle scalability?"
• "What makes DRP different from other protocols?"
• "How do I become an Elder?"

Would you like me to quiz you on these concepts, or do you have a specific question about the architecture?`,
        suggestions: [
          "Quiz me on DRP architecture",
          "Explain scalability in DRP",
          "How do I become an Elder?",
          "Give me practice questions"
        ]
      };
    }

    if (lowerMessage.includes('quiz') || lowerMessage.includes('test') || lowerMessage.includes('practice')) {
      return {
        content: `Perfect! Let's test your knowledge. Here are some practice questions based on your current level:

**Level ${context.currentLevel} Quiz Questions:**

1. **Multiple Choice**: What is the primary purpose of DRP's hybrid consensus?
   A) To reduce energy consumption
   B) To ensure rights management decisions are made by active, invested participants
   C) To increase transaction speed
   D) To reduce network fees

2. **True/False**: PoAT (Proof of Activity) only considers token holdings for validator selection.

3. **Short Answer**: Explain how the Elder Quorum system contributes to DRP's decentralized governance.

Take your time to think about these. When you're ready, share your answers and I'll provide feedback and explanations!

**Pro Tip**: Don't worry about getting them wrong - mistakes are how we learn!`,
        suggestions: [
          "I think the answer is B",
          "I'm not sure about PoAT",
          "Can you explain Elder Quorum again?",
          "Give me more practice questions"
        ]
      };
    }

    // Default response
    return {
      content: `That's an interesting question! I'm here to help you understand DRP and blockchain concepts. 

Based on your current progress at Level ${context.currentLevel}, I can help you with:
• Blockchain fundamentals and how they apply to DRP
• DRP's unique consensus mechanisms (PoST + PoAT)
• Smart contracts and their role in rights management
• The Elder Quorum system and governance
• Practical applications and real-world use cases

Could you be more specific about what you'd like to learn? I can provide explanations, examples, or even quiz you on topics you've covered!`,
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
