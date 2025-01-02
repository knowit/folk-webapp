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
  const { data, error, isLoading } = useSWR(
    messages.length > 0 ? '/generateStream' : null,
    async () => {
      const chunks: LLMChunk[] = []
      return new Promise<LLMChunk[]>((resolve, reject) => {
        generateStream(
          messages,
          (chunk) => {
            chunks.push(chunk) // Push each chunk to the array
          },
          () => {
            resolve(chunks) // Resolve the promise when streaming is complete
          },
          (err) => {
            reject(err) // Reject the promise on error
          }
        )
      })
    },
    {
      revalidateOnFocus: false,
      refreshInterval: 10000, // Optional: Refresh every 10 seconds
    }
  )

  return { chunks: data || [], error, isLoading }
}
