import { getAtApiV2 } from '../../client'
import { LLMMessage } from 'server/routers/llm/llmTypes'
import { LLMChunk, LLMReplyResponse, LLMStreamResponse } from './llmApiTypes'

export const generateReply = (messages: LLMMessage[]) =>
  getAtApiV2<LLMReplyResponse>('/llm/generateReply', {
    params: { messages },
  })

export const generateStream = async (
  messages: LLMChunk[],
  onChunk: (chunk: LLMChunk) => void
) => {
  const response = await getAtApiV2<LLMStreamResponse>('/llm/generateStream', {
    params: { messages },
  })
  console.log(response)

  for (const chunk of response) {
    onChunk(chunk)
  }
}
