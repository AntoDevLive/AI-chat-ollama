import type { Message } from '../types/message'

type MessageBubbleProps = {
  message: Message
}

function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div
      className={`flex ${message.role === 'user'
          ? 'justify-end'
          : 'justify-start'
        }`}
    >
      <div
        className={`px-4 py-2 max-w-[75%] wrap-break-word ${message.role === 'user'
            ? 'bg-[#181818] text-white rounded-2xl rounded-br-md'
            : 'bg-white text-black rounded-2xl rounded-bl-md'
          }`}
      >
        {message.loading ? (
          <div className='flex items-center justify-center px-5 py-2'>
            <div className='loader'></div>
          </div>
        ) : (
          message.content
        )}
      </div>
    </div>
  )
}

export default MessageBubble