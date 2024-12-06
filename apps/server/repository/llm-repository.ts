// Interface for a generic LLM so we can quickly adapt to changes with differing implementations
export abstract class LLMClient {
  /*
   Generates a completed LLM response from whichever LLM we connect
   Args:
    model: The model used by the LLM to give a response
    messages: The message history based on openai/ollama standard with content, image and role
    tools: potential tools the client should have available
    options: Any LLM speciic options. These are generally not transferable across LLM's
  Returns:
    a completed LLM response when it is generated
  */
  abstract generateReply(
    model: string,
    messages: LLMMessage[],
    tools?: Tool[],
    options?: Record<string, any>
  ): Promise<LLMResponse>

  /*
   Generates a stream of LLM chunks from whichever LLM we connect
   Args:
    model: The model used by the LLM to give a response
    messages: The message history based on openai/ollama standard with content, image and role
    tools: potential tools the client should have available
    options: Any LLM speciic options. These are generally not transferable across LLM's
  Returns:
    A stream of tokens for the LLM response
  */
  abstract generateStream(
    model: string,
    messages: LLMMessage[],
    tools?: Tool[],
    options?: Record<string, any>
  ): AsyncGenerator<LLMChunk>

  /*
  Generates embeddings for the list of chunks sent in, returning the vector spaces in return
  Args:
    model: the embedding model you want to use to embed. Typically openAI uses text-generation-large while ollama uses nomic-embedding
    chunks: the strings you want to embed
  Returns:
    A list of embedded chunks
  */
  abstract generateEmbedding(
    embeddingModel: string,
    chunks: string[]
  ): Promise<ChunkEmbedding[]>
}

export interface ChunkEmbedding {
  chunk: string
  vector: number[]
}

export abstract class Tool {
  name: string
  description: string
  parameters: ToolParam[]
  abstract use(
    args: Record<string, any>,
    options?: Record<string, any>
  ): Promise<any>
}

export interface ToolParam {
  name: string
  type: string
  description: string
  enums?: string[]
  isRequired?: boolean
}
// A given response based on a LLM generation. Ensure that added fields are supported by all implementations
export interface LLMResponse {
  content: string
}

// A given chunk with a single token based on a LLM generation. Ensure that added fields are supported by all implementations
export interface LLMChunk {
  content?: string
}

/// A message in a chat history with LLM's. Format is standardized to content, role and image
export interface LLMMessage {
  content?: string
  role: LLMRole
  images?: string
  toolCalls?: Record<string, any>
  toolCallId?: string
}

// The differing roles an LLMMessage can have
export enum LLMRole {
  // Response from LLM
  assistant = 'assistant',
  // Tool response from LLM
  tool = 'tool',
  // System prompt, defines LLM handling
  system = 'system',
  // Message from user
  user = 'user',
}

// Extend Array to include a custom method
declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    toFormattedMessages(): any[]
  }
}

// Define the method implementation
Array.prototype.toFormattedMessages = function (): any[] {
  return this.map((message: LLMMessage) => {
    // Construct the formatted message
    const payload: any = {
      role: LLMRole[message.role],
    }
    if (message.content) {
      payload['content'] = message.content
    }
    if (message.images) {
      payload['image_url'] = message.images
    }
    if (message.toolCallId) {
      payload['tool_call_id'] = message.toolCallId
    }
    if (message.toolCalls) {
      payload['tool_calls'] = message.toolCalls
    }
    return payload
  })
}
