// A given response based on a LLM generation. Ensure that added fields are supported by all implementations
export type LLMResponse = {
  content: string
}

// A given chunk with a single token based on a LLM generation. Ensure that added fields are supported by all implementations
export type LLMChunk = {
  content?: string
}

/// A message in a chat history with LLM's. Format is standardized to content, role and image
export type LLMMessage = {
  content?: string
  role: LLMRole
  images?: string
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
