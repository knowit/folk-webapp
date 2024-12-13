import useSWR from 'swr'
import { generateReply, generateStream } from './llmApi'
import { LLMMessage } from 'server/routers/llm/llmTypes'

export const useGenerateLLMReply = (messages: LLMMessage[]) =>
  useSWR(
    messages.length > 0 ? { url: '/generateReply', messages } : null, // Only call if messages exist
    (params) => generateReply(params?.messages),
    {
      revalidateOnFocus: false,
    }
  )

export const useGenerateLLMStream = (messages: LLMMessage[]) =>
  useSWR(
    messages.length > 0
      ? {
          url: '/generateStream',
          messages: messages,
        }
      : null,
    (params) => generateStream(params.messages),
    {
      revalidateOnFocus: false,
    }
  )
