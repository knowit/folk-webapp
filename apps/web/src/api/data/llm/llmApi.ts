import { getAtApiV2 } from '../../client'
import { LLMMessage } from 'server/routers/llm/llmTypes'
import { LLMReplyResponse, LLMStreamResponse } from './llmApiTypes'

export const generateReply = (messages: LLMMessage[]) =>
  getAtApiV2<LLMReplyResponse>('/llm/generateReply', {
    params: { messages },
  })

export const generateStream = (messages: LLMMessage[]) =>
  getAtApiV2<LLMStreamResponse>('/llm/generateStream', {
    params: { messages },
  })
