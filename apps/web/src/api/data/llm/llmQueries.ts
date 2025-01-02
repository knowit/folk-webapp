import useSWR from 'swr'
import { generateReply, generateStream } from './llmApi'
import { LLMChunk, LLMMessage } from './llmApiTypes'

export const useGenerateLLMReply = (messages: LLMMessage[]) =>
  useSWR(
    messages.length > 0 ? { url: '/generateReply', messages } : null, // Only call if messages exist
    (params) => generateReply(params?.messages),
    {
      revalidateOnFocus: false,
    }
  )

export const useGenerateLLMStream = (messages: LLMMessage[]) => {
  const { data, error } = useSWR(
    messages.length > 0 ? JSON.stringify(messages) : null, // Use a unique key
    async () => {
      const chunks: LLMMessage[] = []
      return new Promise<LLMMessage[]>((resolve, reject) => {
        generateStream(
          messages,
          (chunk) => chunks.push(chunk), // Collect chunks
          () => resolve(chunks), // Resolve on done
          (err) => reject(err) // Reject on error
        )
      })
    },
    {
      revalidateOnFocus: false,
    }
  )

  return { chunks: data || [], error }
}
