export type LLMReplyResponse = LLMResponse

export type LLMStreamResponse = LLMChunk[]

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

export type LLMMessage = {
  content?: string
  role: LLMRole
  images?: string
}

export type LLMChunk = {
  content?: string
  role: string
}

export type LLMResponse = {
  content: string
}
