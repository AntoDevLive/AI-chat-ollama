import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import type { Message } from '../types/message'

type MessageBubbleProps = {
  message: Message
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div
      className={`flex ${isUser
          ? 'justify-end'
          : 'justify-start'
        }`}
    >
      <div
        className={`px-4 py-2 max-w-[85%] sm:max-w-[75%] break-words ${isUser
            ? 'bg-[#181818] text-white rounded-2xl rounded-br-md'
            : 'bg-white text-black rounded-2xl rounded-bl-md'
          }`}
      >
        {message.loading ? (
          <div className='flex items-center justify-center px-5 py-2'>
            <div className='loader'></div>
          </div>
        ) : isUser ? (
          message.content
        ) : (
          <div className='prose prose-sm max-w-none prose-pre:bg-neutral-900 prose-pre:text-white'>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}

export default MessageBubble