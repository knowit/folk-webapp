import {
  ChunkEmbedding,
  LLMChunk,
  LLMClient,
  LLMMessage,
  LLMResponse,
  LLMRole,
  Tool,
} from '../repository/llm-repository'
import { AzureOpenAI } from 'openai'
import {
  ChatCompletion,
  ChatCompletionChunk,
  ChatCompletionMessageToolCall,
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
      const response: ChatCompletion =
        await this.client.chat.completions.create(
          {
            model: model,
            messages: messages.toFormattedMessages(),
            tools: tools?.toOpenAITools(),
          },
          options
        )
      const toolCalls = response.choices[0].message.tool_calls
      if (toolCalls != null) {
        messages.push({
          content: '',
          role: LLMRole.assistant,
          toolCalls: toolCalls.toOpenAIToolCalls(),
        })
        for (const toolCall of toolCalls) {
          const tool =
            tools.find((tool) => tool.name == toolCall.function.name) || null
          const toolResponse =
            (await tool?.use(JSON.parse(toolCall.function.arguments))) ??
            'Unable to use not-existing tool ' + toolCall.function.name
          messages.push({
            role: LLMRole.tool,
            content: toolResponse,
            toolCallId: toolCall.id,
          })
        }
        return this.generateReply(model, messages, tools, options)
      }

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
          tools: tools?.toOpenAITools(),
          stream: true,
          ...options,
        })
      yield* this.toLLMStream(chunkStream, model, messages, tools, options)
    } catch (error) {
      console.error('Error generating stream reply:', error)
      throw error
    }
  }

  async *toLLMStream(
    stream: Stream<ChatCompletionChunk>,
    model: string,
    messages: LLMMessage[],
    tools?: Tool[],
    options?: Record<string, any>
  ): AsyncGenerator<LLMChunk> {
    let toolCallingChunk: ChatCompletionChunk
    for await (const output of stream) {
      if (output.choices[0].finish_reason == 'stop') {
        if (toolCallingChunk != null) {
          messages.push({
            role: LLMRole.assistant,
            toolCalls: toolCallingChunk.choices[0].delta.tool_calls,
          })
          for (const toolCall of toolCallingChunk.choices[0].delta.tool_calls ??
            []) {
            const toolCallFunction = toolCall.function
            const tool = tools.find((t) => t.name == toolCallFunction.name)
            const toolResponse =
              (await tool?.use(JSON.parse(toolCall.function.arguments))) ??
              'Unable to use not-existing tool ' + toolCall.function.name
            messages.push({
              role: LLMRole.tool,
              content: toolResponse,
              toolCallId: toolCall.id,
            })
          }
          yield* this.generateStream(model, messages, tools, options)
        }
      } else {
        const chunk: ChatCompletionChunk = output
        const toolCalls = chunk.choices[0].delta.tool_calls
        if (toolCalls == null) {
          yield { content: chunk.choices[0].delta.content }
        } else {
          if (toolCallingChunk == null) {
            toolCallingChunk = chunk
          } else {
            toolCallingChunk.choices[0].delta.content +=
              toolCallingChunk.choices[0].delta.content
          }
        }
      }
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

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    toOpenAITools(): any[]
    toOpenAIToolCalls(): any[]
  }
}

// Define the method implementation
Array.prototype.toOpenAITools = function (): any[] {
  return this.map((tool: Tool) => {
    const properties: Record<string, any> = {}

    for (const param of tool.parameters) {
      properties[param.name] = {
        type: param.type,
        description: param.description,
        ...(param.enums?.length ? { enum: param.enums } : {}),
      }
    }
    const required = tool.parameters
      .filter((param) => param.isRequired)
      .map((param) => param.name)

    const functionDescription = {
      type: 'function',
      function: {
        name: tool.name,
        description: tool.description,
        parameters:
          tool.parameters.length > 0
            ? {
                type: 'object',
                properties: properties, // Correctly assign the properties here
                additionalProperties: false,
                ...(required.length > 0 ? { required: required } : {}),
              }
            : {},
      },
    }
    return functionDescription
  })
}

Array.prototype.toOpenAIToolCalls = function (): any[] {
  return this.map((toolCall: ChatCompletionMessageToolCall) => {
    return {
      id: toolCall.id,
      type: 'function',
      function: {
        name: toolCall.function.name,
        arguments: toolCall.function.arguments,
      },
    }
  })
}
