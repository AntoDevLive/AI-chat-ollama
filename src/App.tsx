import { useState } from 'react'

import ChatHeader from './components/ChatHeader'
import ChatMessages from './components/ChatMessages'
import ChatInput from './components/ChatInput'

import { askOllama } from './services/ollama'
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

    const loadingMessage: Message = {
      role: 'assistant',
      content: '',
      loading: true
    }

    setMessages(prev => [
      ...prev,
      userMessage,
      loadingMessage
    ])

    const currentPrompt = prompt

    setPrompt('')

    try {
      const assistantMessage = await askOllama(currentPrompt)

      setMessages(prev =>
        prev.map((message, index) =>
          index === prev.length - 1
            ? {
              role: 'assistant',
              content: assistantMessage.content,
              loading: false
            }
            : message
        )
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
    <section className='flex flex-col justify-center items-center w-120 m-auto'>
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