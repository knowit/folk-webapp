import useSWR from 'swr'
import { generateReply, generateStream } from './llmApi'
import { LLMMessage } from 'server/routers/llm/llmTypes'

export const useGenerateLLMReply = (messages: LLMMessage[]) =>
  useSWR(
    {
      url: '/generateReply',
      messages: messages,
    },
    (params) => generateReply(params.messages),
    {
      revalidateOnFocus: false,
    }
  )

export const useGenerateLLMStream = (messages: LLMMessage[]) =>
  useSWR(
    {
      url: '/generateStream',
      messages: messages,
    },
    (params) => generateStream(params.messages),
    {
      revalidateOnFocus: false,
    }
  )
