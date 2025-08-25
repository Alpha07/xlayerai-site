import { useEffect, useRef, useState } from 'react'
import './index.css'

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: 'Hi! I\'m your cybersecurity assistant. Ask me anything.'
    }
  ])
  const [input, setInput] = useState('')
  const listEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  function handleSend() {
    const trimmed = input.trim()
    if (!trimmed) return

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')

    // Fake assistant reply for UI demo
    setTimeout(() => {
      const reply: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `You asked: "${trimmed}". Here\'s a brief security perspective.`
      }
      setMessages(prev => [...prev, reply])
    }, 600)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex min-h-dvh flex-col bg-neutral-950 text-neutral-100">
      <header className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60">
        <div className="mx-auto w-full max-w-3xl px-4 py-4">
          <h1 className="text-balance text-center text-xl font-semibold text-neutral-200 sm:text-2xl">
            Ask anything about cybersecurity...
          </h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-28 pt-4 sm:pt-6">
        <div className="space-y-4">
          {messages.map(m => (
            <div key={m.id} className="flex w-full">
              <div className={
                m.role === 'user'
                  ? 'ml-auto max-w-[85%] rounded-2xl bg-neutral-800 px-4 py-3 text-sm leading-relaxed sm:text-base'
                  : 'mr-auto max-w-[85%] rounded-2xl bg-neutral-900 px-4 py-3 text-sm leading-relaxed ring-1 ring-neutral-800 sm:text-base'
              }>
                {m.content}
              </div>
            </div>
          ))}
          <div ref={listEndRef} />
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 border-t border-neutral-800 bg-neutral-950/80 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60">
        <div className="mx-auto w-full max-w-3xl px-4 py-3">
          <div className="relative flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Ask a question"
              className="min-h-[44px] w-full resize-none rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-500 shadow-sm outline-none focus:border-neutral-700 focus:ring-0 sm:text-base"
            />
            <button
              aria-label="Send"
              onClick={handleSend}
              className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-200 shadow-sm transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-700 sm:h-12 sm:w-12"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M2.25 12l18-10.5-6.75 10.5 6.75 10.5-18-10.5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
