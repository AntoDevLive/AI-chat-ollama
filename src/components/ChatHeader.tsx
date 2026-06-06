type ChatHeaderProps = {
  isChatStarted: boolean
}

function ChatHeader({ isChatStarted }: ChatHeaderProps) {
  return (
    <div className='text-white rounded-tl-lg rounded-tr-lg flex justify-start items-center gap-3 text-2xl w-full bg-neutral-800 py-2 px-4'>
      <img
        className='rounded-full w-10'
        src='/ollama.png'
        alt='Ollama'
      />

      <div className='flex flex-col justify-start items-start relative'>
        <span
          className={`
            transition-all duration-500 ease-out
            ${isChatStarted ? '-translate-y-2.5' : ''}
          `}
        >
          Ollama
        </span>

        <div
          className={`
            flex justify-center items-center text-sm text-green-500 font-semibold gap-1 tracking-wide transition-all duration-500 ease-out absolute -bottom-2 left-0.5
            ${isChatStarted
              ? 'opacity-100'
              : 'opacity-0'
            }
          `}
        >
          <div className='w-2 h-2 bg-green-500 rounded-full animate-[pulse-online_2s_infinite]' />
          <span>Online</span>
        </div>
      </div>
    </div>
  )
}

export default ChatHeader