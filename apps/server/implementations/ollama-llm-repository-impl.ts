import {
  ChunkEmbedding,
  LLMChunk,
  LLMClient,
  LLMMessage,
  LLMResponse,
  Tool,
} from '../repository/llm-repository'

export class OllamaLLMRepositoryImpl extends LLMClient {
  constructor() {
    super()
    this.client = 'http://localhost:11434/api/chat'
  }

  client: string

  async generateReply(
    model: string,
    messages: LLMMessage[],
    tools?: Tool[],
    options?: Record<string, any>
  ): Promise<LLMResponse> {
    const body = {
      model: 'llama3.1',
      messages: [{ role: 'user', content: prompt }],
    }

    try {
      const response = await fetch(this.client, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!response.ok) {
        console.error('Error generating reply:', response.text)
        return
      }

      const reader = response.body?.getReader()
      const textDecoder = new TextDecoder()

      if (!reader) {
        console.error('No response body')
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

  generateStream(
    model: string,
    messages: LLMMessage[],
    tools?: Tool[],
    options?: Record<string, any>
  ): AsyncGenerator<LLMChunk> {
    throw new Error('Method not implemented.')
  }
  generateEmbedding(
    embeddingModel: string,
    chunks: string[]
  ): Promise<ChunkEmbedding[]> {
    throw new Error('Method not implemented.')
  }
}
