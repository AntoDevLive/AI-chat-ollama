export async function askOllamaStream(
  prompt: string,
  onChunk: (chunk: string) => void
): Promise<void> {
  const res = await fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama3',
      stream: true,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    })
  })

  if (!res.body) {
    throw new Error('No se recibió respuesta del servidor')
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()

  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()

    if (done) break

    buffer += decoder.decode(value, { stream: true })

    const lines = buffer.split('\n')

    buffer = lines.pop() || ''

    for (const line of lines) {
      if (!line.trim()) continue

      try {
        const json = JSON.parse(line)

        if (json.message?.content) {
          onChunk(json.message.content)
        }
      } catch {
        
      }
    }
  }
}