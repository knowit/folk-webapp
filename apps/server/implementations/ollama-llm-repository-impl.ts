import {
  ChunkEmbedding,
  LLMChunk,
  LLMClient,
  LLMMessage,
  LLMResponse,
  LLMRole,
  Tool,
} from '../repository/llm-repository'

import ollama, { ToolCall } from 'ollama'

export class OllamaLLMRepositoryImpl extends LLMClient {
  async generateReply(
    model: string,
    messages: LLMMessage[],
    tools?: Tool[],
    options?: Record<string, any>
  ): Promise<LLMResponse> {
    const chatResponse = await ollama.chat({
      model: model,
      messages: messages?.toOllamaMessages(),
      tools: tools?.toOllamaTools(),
      stream: false,
      options: options,
    })
    const toolCalls = chatResponse.message.tool_calls
    if (toolCalls != null && toolCalls.length > 0) {
      console.log('ToolCalls: ' + JSON.stringify(toolCalls, null, 2))
      messages.push({
        content: '',
        role: LLMRole.assistant,
        toolCalls: toOllamaToolCalls(toolCalls),
      })
      for (const toolCall of toolCalls) {
        const tool =
          tools.find((tool) => tool.name == toolCall.function.name) || null
        const toolResponse =
          (await tool?.use(toolCall.function.arguments)) ??
          'Unable to use not-existing tool ' + toolCall.function.name
        messages.push({
          role: LLMRole.tool,
          content: toolResponse,
        })
      }
      return this.generateReply(model, messages, tools, options)
    }
    return { content: chatResponse.message.content }
  }

  generateStream(
    model: string,
    messages: LLMMessage[],
    tools?: Tool[],
    options?: Record<string, any>
  ): AsyncGenerator<LLMChunk> {
    return streamToAsyncGenerator<LLMChunk>(
      new ReadableStream<LLMChunk>({
        async start(controller) {
          const asyncIterator = await ollama.chat({
            model: model,
            messages: messages?.toOllamaMessages(),
            tools: tools?.toOllamaTools(),
            stream: true,
            options: options,
          })

          for await (const chunk of asyncIterator) {
            controller.enqueue({ content: chunk.message.content })
          }
          controller.close()
        },
      })
    )
  }

  async generateEmbedding(
    embeddingModel: string,
    chunks: string[]
  ): Promise<ChunkEmbedding[]> {
    const response = await ollama.embed({
      model: embeddingModel,
      input: chunks,
    })
    return response.embeddings.map((embedding: any, index: number) => ({
      chunk: chunks[index],
      vector: embedding,
    }))
  }
}

async function* streamToAsyncGenerator<T>(
  stream: ReadableStream<T>
): AsyncGenerator<T> {
  const reader = stream.getReader()
  try {
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      yield value
    }
  } finally {
    reader.releaseLock()
  }
}
declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    toOllamaMessages(): any[]
    toOllamaTools(): any[]
  }
}

Array.prototype.toOllamaMessages = function (): any[] {
  return this.map((llmMessage: LLMMessage) => {
    return { role: LLMRole[llmMessage.role], content: llmMessage.content }
  })
}

Array.prototype.toOllamaTools = function (): any[] {
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

function toOllamaToolCalls(toolCalls: ToolCall[]): any[] {
  return toolCalls.map((toolCall) => ({
    type: 'function',
    function: {
      name: toolCall.function.name,
      arguments: toolCall.function.arguments,
    },
  }))
}
