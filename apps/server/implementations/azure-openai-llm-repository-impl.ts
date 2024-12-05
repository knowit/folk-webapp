import {
  ChunkEmbedding,
  LLMChunk,
  LLMClient,
  LLMMessage,
  LLMResponse,
  Tool,
} from '../repository/llm-repository'
import { AzureOpenAI } from 'openai'
import {
  ChatCompletion,
  ChatCompletionChunk,
  CreateEmbeddingResponse,
} from 'openai/resources'
import { Stream } from 'openai/streaming'

export class AzureOpenAILLMRepositoryImpl extends LLMClient {
  constructor(endpoint: string, apiKey: string, apiVersion: string) {
    super()
    this.client = new AzureOpenAI({
      endpoint: endpoint,
      apiKey: apiKey,
      apiVersion: apiVersion,
    })
  }

  client: AzureOpenAI

  async generateReply(
    model: string,
    messages: LLMMessage[],
    tools?: Tool[],
    options?: Record<string, any>
  ): Promise<LLMResponse> {
    try {
      // Make the API call
      const response: ChatCompletion =
        await this.client.chat.completions.create({
          model,
          messages: messages.toFormattedMessages(),
          ...options,
        })

      // Return a response matching the LLMResponse interface
      return {
        content: response.choices[0]?.message?.content || '',
      }
    } catch (error) {
      console.error('Error generating reply:', error)
      throw error
    }
  }

  async *generateStream(
    model: string,
    messages: LLMMessage[],
    tools?: Tool[],
    options?: Record<string, any>
  ): AsyncGenerator<LLMChunk> {
    try {
      // Make the API call
      const chunkStream: Stream<ChatCompletionChunk> =
        await this.client.chat.completions.create({
          model,
          messages: messages.toFormattedMessages(),
          stream: true,
          ...options,
        })

      for await (const chunk of chunkStream) {
        // Transform the chunk into the desired LLMChunk format if necessary
        const llmChunk: LLMChunk = {
          content: chunk.choices[0].delta.content,
          ...chunk,
        }
        yield llmChunk
      }
    } catch (error) {
      console.error('Error generating stream reply:', error)
      throw error
    }
  }

  async generateEmbedding(
    embeddingModel: string,
    chunks: string[]
  ): Promise<ChunkEmbedding[]> {
    try {
      const embeddings: CreateEmbeddingResponse =
        await this.client.embeddings.create({
          input: chunks,
          model: embeddingModel,
        })
      return embeddings.data.map((entry, index) => ({
        chunk: chunks[index],
        vector: entry.embedding,
      }))
    } catch (error) {
      console.error('Error generating embeddings:', error)
      throw error
    }
  }
}
