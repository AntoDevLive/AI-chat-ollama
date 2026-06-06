import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import type { Message } from '../types/message'

type ChatMessagesProps = {
  messages: Message[]
}

function ChatMessages({ messages }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [messages])

  return (
    <div className='bg-slate-300 h-110 w-full p-4 flex flex-col gap-3 overflow-y-auto'>
      {messages.map((message, index) => (
        <MessageBubble
          key={index}
          message={message}
        />
      ))}

      <div ref={bottomRef}></div>
    </div>
  )
}

export default ChatMessages