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

  let buffer = ''

  for await (const chunk of response) {
    buffer += chunk // Add received chunk to the buffer

    let boundary = buffer.indexOf('\n') // Find newline delimiter
    while (boundary !== -1) {
      const jsonString = buffer.slice(0, boundary) // Extract JSON string
      buffer = buffer.slice(boundary + 1) // Remove processed chunk from the buffer

      try {
        const parsedChunk = JSON.parse(jsonString) // Parse the JSON string
        onChunk(parsedChunk) // Call onChunk with the parsed object
      } catch (error) {
        console.error('Failed to parse chunk:', jsonString, error)
      }

      boundary = buffer.indexOf('\n') // Look for the next newline
    }
  }
}
