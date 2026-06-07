import { useState } from 'react'

import ChatHeader from './components/ChatHeader'
import ChatMessages from './components/ChatMessages'
import ChatInput from './components/ChatInput'

import { askOllamaStream } from './services/ollama'
import type { Message } from './types/message'

function App() {
  const [prompt, setPrompt] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])

  const preguntarIA = async (): Promise<void> => {
    if (!prompt.trim()) return

    const userMessage: Message = {
      role: 'user',
      content: prompt
    }

    const assistantMessage: Message = {
      role: 'assistant',
      content: '',
      loading: true
    }

    setMessages(prev => [
      ...prev,
      userMessage,
      assistantMessage
    ])

    const currentPrompt = prompt

    setPrompt('')

    try {
      await askOllamaStream(
        currentPrompt,
        (chunk: string) => {
          setMessages(prev =>
            prev.map((message, index) =>
              index === prev.length - 1
                ? {
                  ...message,
                  loading: false,
                  content: message.content + chunk
                }
                : message
            )
          )
        }
      )
    } catch (error) {
      console.error(error)

      setMessages(prev =>
        prev.map((message, index) =>
          index === prev.length - 1
            ? {
              role: 'assistant',
              content: 'Error al conectar con Ollama.',
              loading: false
            }
            : message
        )
      )
    }
  }

  return (
    <section className='flex flex-col justify-center items-center w-3xl mx-auto px-2 sm:px-4'>
      <ChatHeader isChatStarted={messages.length > 0} />

      <ChatMessages messages={messages} />

      <ChatInput
        prompt={prompt}
        setPrompt={setPrompt}
        onSend={preguntarIA}
      />
    </section>
  )
}

export default App