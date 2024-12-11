import {
  ChunkEmbedding,
  LLMChunk,
  LLMClient,
  LLMMessage,
  LLMResponse,
  LLMRole,
  Tool,
} from '../repository/llm-repository'
import { OllamaV1Chunk, OllamaV1Response } from './dto/ollama-v1-responses'

export class OllamaLLMRepositoryImpl extends LLMClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    super()
    this.baseUrl = baseUrl
  }

  private async postReply(
    endpoint: string,
    body: Record<string, any>
  ): Promise<OllamaV1Response> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    })
    console.log('Body: ' + JSON.stringify(body))
    const rawText = await response.text()
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${rawText}`)
    }
    return OllamaV1Response.fromJson(JSON.parse(rawText))
  }

  async generateReply(
    model: string,
    messages: LLMMessage[],
    tools?: Tool[],
    options?: Record<string, any>
  ): Promise<LLMResponse> {
    const body = {
      model,
      messages: toOllamaMessages(messages),
      tools: toOllamaTools(tools),
      stream: false,
      options,
    }
    const chatResponse: OllamaV1Response = await this.postReply(
      '/v1/chat/completions',
      body
    )
    console.log(
      'Messages:' + JSON.stringify(toOllamaMessages(messages), null, 2)
    )
    const toolCalls = chatResponse.choices[0].message.toolCalls
    if (toolCalls != null && toolCalls.length > 0) {
      const toolCall = toolCalls[0]
      messages.push({
        content: null,
        role: LLMRole.assistant,
        toolCalls: [toolCall],
      })
      const tool =
        tools.find((tool) => tool.name == toolCall.function.name) || null
      const toolArguments = toolCall.function.arguments
      const toolResponse =
        (await tool?.use(toolArguments ? JSON.parse(toolArguments) : null)) ??
        'Unable to use non-existing tool ' + toolCall.function.name
      messages.push({
        role: LLMRole.tool,
        toolCallId: toolCall.id,
        content: toolResponse,
      })
      return this.generateReply(model, messages, tools, options)
    }
    return { content: chatResponse.choices[0].message.content }
  }

  generateStream(
    model: string,
    messages: LLMMessage[],
    tools?: Tool[],
    options?: Record<string, any>
  ): AsyncGenerator<LLMChunk> {
    const body = {
      model,
      messages: toOllamaMessages(messages),
      tools: toOllamaTools(tools),
      stream: true,
      options,
    }
    console.log(
      'Messages:' + JSON.stringify(toOllamaMessages(messages), null, 2)
    )
    return async function* () {
      const response = await fetch(`${this.baseUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const rawBody = await response.text()
        throw new Error(`HTTP error! status: ${response.status} - ${rawBody}`)
      }

      const stream = response.body
        ?.pipeThrough(new TextDecoderStream())
        .pipeThrough(OllamaV1Decoder.decoder)

      if (!stream) {
        throw new Error('ReadableStream not supported by the response.')
      }

      const reader = stream.getReader()
      let toolCallingChunk: OllamaV1Chunk | null = null

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        if (value === '[DONE]') {
          if (toolCallingChunk != null) {
            messages.push({
              content: null,
              role: LLMRole.assistant,
              toolCalls: toolCallingChunk.choices[0].delta.toolCalls?.map(
                (toolCall) => toolCall.toJson()
              ),
            })

            for (const toolCall of toolCallingChunk.choices[0].delta
              .toolCalls ?? []) {
              const toolCallFunction = toolCall.functionCall
              const tool = tools?.find((t) => t.name === toolCallFunction.name)
              const toolResponse =
                (await tool?.use(
                  JSON.parse(toolCallFunction.functionArguments)
                )) ??
                `Unable to use non-existent tool: ${toolCallFunction.name}`

              messages.push({
                role: LLMRole.tool,
                content: toolResponse,
                toolCallId: toolCall.id,
              })
            }

            yield* this.generateStream(model, messages, tools, options)
          }
          continue
        }

        const chunk: OllamaV1Chunk = value
        const toolCalls = chunk.choices[0].delta.toolCalls
        if (toolCalls == null) {
          yield chunk
        } else {
          if (toolCallingChunk == null) {
            toolCallingChunk = chunk
          } else {
            toolCallingChunk = toolCallingChunk.copyWith(chunk)
          }
        }
      }
    }.call(this)
  }

  async generateEmbedding(
    embeddingModel: string,
    chunks: string[],
    options?: Record<string, any>
  ): Promise<ChunkEmbedding[]> {
    const body = {
      model: embeddingModel,
      input: chunks,
      options: options,
    }
    return []
    /*const response = await this.ollama.embed({
      model: embeddingModel,
      input: chunks,
    })
    return response.embeddings.map((embedding: any, index: number) => ({
      chunk: chunks[index],
      vector: embedding,
    }))*/
  }
}

class OllamaV1Decoder {
  static get decoder(): TransformStream<string, OllamaV1Chunk | '[DONE]'> {
    return new TransformStream<string, OllamaV1Chunk | '[DONE]'>({
      start() {
        this.buffer = '' // Buffer for incomplete JSON lines
      },
      transform(chunk, controller) {
        this.buffer += chunk

        const lines = this.buffer.split('\n')
        this.buffer = lines.pop() || '' // Keep the last incomplete line in the buffer

        for (const line of lines) {
          if (line.startsWith('data:')) {
            const content = line.substring(5).trim()
            if (content === '[DONE]') {
              controller.enqueue('[DONE]')
            } else if (content) {
              try {
                const chunk = OllamaV1Chunk.fromJson(JSON.parse(content)) // Convert to OllamaV1Chunk
                controller.enqueue(chunk) // Output the OllamaV1Chunk instance
              } catch (error) {
                console.error('Error parsing JSON:', content, error)
                // If parsing fails, wait for more data
                this.buffer += line
              }
            }
          }
        }
      },
      flush(controller) {
        // Try to process the remaining buffer
        if (this.buffer.trim()) {
          try {
            const jsonObject = JSON.parse(this.buffer.trim())
            const chunk = OllamaV1Chunk.fromJson(jsonObject)
            controller.enqueue(chunk)
          } catch (error) {
            console.error('Error parsing remaining buffer:', error)
          }
        }
        controller.terminate()
      },
    })
  }
}

function toOllamaMessages(messages: LLMMessage[] | null): any[] {
  return messages.map((llmMessage: LLMMessage) => {
    return {
      role: LLMRole[llmMessage.role],
      content: llmMessage.content,
      tool_calls: llmMessage.toolCalls,
      tool_call_id: llmMessage.toolCallId,
      images: llmMessage.images,
    }
  })
}

function toOllamaTools(tools: Tool[] | null): any[] {
  if (tools == null) return null
  return tools.map((tool: Tool) => {
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
