import { getAtApiV2 } from '../../client'
import { LLMMessage } from 'server/routers/llm/llmTypes'
import { io } from 'socket.io-client'
import { LLMReplyResponse } from './llmApiTypes'

export const generateReply = (messages: LLMMessage[]) =>
  getAtApiV2<LLMReplyResponse>('/llm/generateReply', {
    params: { messages },
  })

const socket = io('http://localhost:3000') // Adjust URL for production

export const generateStream = (
  messages: LLMMessage[],
  onChunk: (chunk: LLMMessage) => void,
  onDone: () => void,
  onError: (error: any) => void
) => {
  socket.on('connect', () => {
    console.log('Connected to server:', socket.id)

    // Emit a generateStream event to start streaming
    socket.emit('generateStream', { messages })

    // Listen for data chunks
    socket.on('chunk', (chunk) => {
      onChunk(chunk)
    })

    // Listen for stream completion
    socket.on('done', () => {
      onDone()
    })

    // Handle errors
    socket.on('error', (error) => {
      console.error('Stream error:', error)
      onError(error)
    })
  })

  socket.on('disconnect', () => {
    console.log('Disconnected from server')
  })
}
