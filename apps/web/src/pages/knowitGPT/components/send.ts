import { StreamSend, StreamingAdapterObserver } from '@nlux/react'

const ollamaApiUrl = 'http://localhost:11434/api/chat'

export const send: StreamSend = async (
  prompt: string,
  observer: StreamingAdapterObserver
) => {
  const body = {
    model: 'llama3.1',
    messages: [{ role: 'user', content: prompt }],
  }

  try {
    const response = await fetch(ollamaApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      observer.error(new Error('Failed to connect to Ollama server'))
      return
    }

    const reader = response.body?.getReader()
    const textDecoder = new TextDecoder()

    if (!reader) {
      observer.error(new Error('No response body'))
      return
    }

    // Read and stream Ollama's responses
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { value, done } = await reader.read()
      if (done) break

      let content = textDecoder.decode(value)
      const transformedContent = JSON.parse(content)
      content = JSON.stringify(transformedContent.message['content'])
      content = content.slice(1, -1)
      if (content) {
        observer.next(content)
      }
    }

    observer.complete()
  } catch (error) {
    observer.error(error)
  }
}
