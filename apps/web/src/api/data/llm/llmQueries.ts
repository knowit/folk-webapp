import useSWR from 'swr'
import { generateReply, generateStream } from './llmApi'
import { LLMChunk, LLMMessage } from './llmApiTypes'
import { useEffect, useState } from 'react'

export const useGenerateLLMReply = (messages: LLMMessage[]) =>
  useSWR(
    messages.length > 0 ? { url: '/generateReply', messages } : null, // Only call if messages exist
    (params) => generateReply(params?.messages),
    {
      revalidateOnFocus: false,
    }
  )

export const useGenerateLLMStream = (messages: LLMMessage[]) => {
  const [chunks, setChunks] = useState<LLMChunk[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (messages.length === 0) return

    setChunks([]) // Clear chunks for new messages
    setError(null)
    setIsLoading(true)

    const handleChunk = (chunk: LLMChunk) => {
      setChunks((prevChunks) => [...prevChunks, chunk]) // Add chunk to state
    }

    const handleDone = () => {
      setIsLoading(false) // Mark as not loading when done
    }

    const handleError = (err: any) => {
      setError(err)
      setIsLoading(false)
    }

    generateStream(messages, handleChunk, handleDone, handleError)

    // Clean-up logic in case the component unmounts
    return () => {
      // If needed, you can disconnect the socket or cancel the operation here
    }
  }, [messages])

  return { chunks, error, isLoading }
}
