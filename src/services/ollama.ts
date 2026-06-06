import type { Message } from "../types/message"

export async function askOllama(prompt: string): Promise<Message> {
  const res = await fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama3',
      stream: false,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    })
  })

  const data = await res.json()

  return {
    role: 'assistant',
    content: data.message.content
  }
}