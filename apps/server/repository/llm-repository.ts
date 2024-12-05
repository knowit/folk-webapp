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

export interface Tool {
  name: string
  description: string
  use: (input: string) => Promise<any>
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
  image?: string
}

// The differing roles an LLMMessage can have
export enum LLMRole {
  // Response from LLM
  assistant,
  // Tool response from LLM
  tool,
  // System prompt, defines LLM handling
  system,
  // Message from user
  user,
}

// Extend Array to include a custom method
declare global {
  interface Array<T> {
    toFormattedMessages(): any[]
  }
}

// Define the method implementation
Array.prototype.toFormattedMessages = function (): any[] {
  return this.map((message: LLMMessage) => {
    const { role, content, image } = message

    // Construct the formatted message
    const payload: any = {
      role: LLMRole[role], // Convert enum to string
    }
    if (content) {
      payload.content = content
    }
    if (image) {
      payload.image_url = { url: image }
    }
    return payload
  })
}
