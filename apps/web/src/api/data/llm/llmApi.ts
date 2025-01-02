import { getAtApiV2, getToken } from '../../client'
import { LLMMessage } from 'server/routers/llm/llmTypes'
import { io } from 'socket.io-client'
import { LLMChunk, LLMReplyResponse } from './llmApiTypes'

export const generateReply = (messages: LLMMessage[]) =>
  getAtApiV2<LLMReplyResponse>('/llm/generateReply', {
    params: { messages },
  })

const socket = io('http://localhost:3010', {
  auth: {
    token: ``, // Include any token required for authentication
  },
  transports: ['websocket'],
  withCredentials: true, // Ensure cookies are included
})

let isSocketInitialized = false

export const generateStream = (
  messages: LLMMessage[],
  onChunk: (chunk: LLMChunk) => void,
  onDone: () => void,
  onError: (error: any) => void
) => {
  if (!isSocketInitialized) {
    socket.on('connect', () => {
      console.log('Connected to server:', socket.id)
      isSocketInitialized = true
    })
  }
  socket.on('chunk', (chunk) => {
    console.log('Received chunk')
    onChunk(chunk)
  })

  socket.on('done', () => {
    console.log('Stream completed')
    onDone()
  })

  socket.on('error', (error) => {
    console.error('Stream error:', error)
    onError(error)
  })

  socket.on('disconnect', (reason) => {
    console.log('Disconnected from server:', reason)
  })

  if (socket.connected) {
    socket.emit('generateStream', { messages })
  } else {
    console.error('Socket is not conneced. Cannot emit events.')
    onError(new Error('Socket not connected'))
  }
}
