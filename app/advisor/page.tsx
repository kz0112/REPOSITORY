'use client'

import { useState, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Navbar } from '@/components/navbar'
import { BackgroundPattern, CardCornerOrnament } from '@/components/kazakh-ornaments'
import { Send, Bot, User } from 'lucide-react'

const SUGGESTED_QUESTIONS = [
  'Инвестиция бастауға кеңес бер',
  'Инфляциядан қалай қорғануға болады?',
  'Криптовалютаға салым салу қауіпсіз бе?',
  'Ай сайын 50000 теңге үнемдесем, 10 жылда қанша болады?',
]

function getMessageText(message: { parts?: Array<{ type: string; text?: string }> }): string {
  if (!message.parts || !Array.isArray(message.parts)) return ''
  return message.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text' && typeof p.text === 'string')
    .map((p) => p.text)
    .join('')
}

export default function AdvisorPage() {
  const [mounted, setMounted] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
    onError: (err) => {
      console.log('[v0] Chat error:', err)
      if (err.message?.includes('credit card') || err.message?.includes('customer_verification')) {
        setError('AI Gateway-ге кредит картасын қосу қажет. Vercel аккаунтыңызға кіріп, картаңызды қосыңыз.')
      } else {
        setError('Қате орын алды. Қайта көріңіз.')
      }
    },
  })

  const isLoading = status === 'streaming' || status === 'submitted'
  
  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col">
        <BackgroundPattern />
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Bot className="w-16 h-16 text-primary/30 mx-auto mb-4 animate-pulse" />
            <p className="text-muted-foreground">Жүктелуде...</p>
          </div>
        </main>
      </div>
    )
  }

  const handleSuggestedQuestion = (question: string) => {
    setError(null)
    sendMessage({ text: question })
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    setError(null)
    sendMessage({ text: input })
    setInput('')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundPattern />
      <Navbar />
      
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-6">
        {/* Chat Header */}
        <div className="glass-card p-4 mb-4 relative">
          <CardCornerOrnament position="top-left" />
          <CardCornerOrnament position="top-right" />
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                <span className="gold-text">ЖИ Кеңесшi</span> — Алибек
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 pulse-online" />
                <span className="text-sm text-muted-foreground">Онлайн</span>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Questions */}
        {messages.length === 0 && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-3">Жылдам сұрақтар:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((question, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestedQuestion(question)}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm glass-card hover:border-primary/50 transition-colors rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-[400px]">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Bot className="w-16 h-16 text-primary/30 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Сәлем! Мен Алибек, сiздiң қаржы кеңесшiңiз.
                  <br />
                  Қаржы туралы кез келген сұрақ қойыңыз.
                </p>
              </div>
            </div>
          )}
          
          {messages.map((message) => {
            const text = getMessageText(message)
            if (!text) return null
            
            return (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex items-start gap-3 max-w-[85%] ${
                    message.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent/20 text-accent'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  
                  {/* Message bubble */}
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-sm'
                        : 'glass-card rounded-tl-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                      {text}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
          
          {/* Typing indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-accent" />
                </div>
                <div className="glass-card px-4 py-3 rounded-2xl rounded-tl-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-accent typing-dot" />
                    <div className="w-2 h-2 rounded-full bg-accent typing-dot" />
                    <div className="w-2 h-2 rounded-full bg-accent typing-dot" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={onSubmit} className="relative">
          <div className="glass-card p-2 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Сұрағыңызды жазыңыз..."
              className="flex-1 bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-3 bg-primary text-primary-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
