import { ArrowUp } from 'lucide-react'

type ChatInputProps = {
  prompt: string
  setPrompt: React.Dispatch<React.SetStateAction<string>>
  onSend: () => void
}

function ChatInput({
  prompt,
  setPrompt,
  onSend
}: ChatInputProps) {
  return (
    <div className='flex justify-center items-center gap-4 px-4 py-5 w-full bg-neutral-400 rounded-bl-lg rounded-br-lg'>
      <input
        type='text'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSend()
          }
        }}
        placeholder='Escribe un mensaje...'
        className='bg-[#181818] py-2.5 px-5 rounded-[20px] w-full text-xl outline-none text-white'
      />

      <button
        className='bg-white rounded-full w-9 h-8 flex justify-center items-center cursor-pointer transition-all duration-300 ease-out hover:scale-110 active:scale-90'
        onClick={onSend}
      >
        <ArrowUp />
      </button>
    </div>
  )
}

export default ChatInput