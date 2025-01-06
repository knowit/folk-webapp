import { Server, Socket } from 'socket.io'
import { AzureOpenAILLMRepositoryImpl } from '../../implementations/azure-openai-llm-repository-impl'
import { LLMMessage } from './llmTypes'

const client = new AzureOpenAILLMRepositoryImpl(
  process.env.AZURE_OPENAI_ENDPOINT ?? 'http://localhost:3000',
  process.env.AZURE_OPENAI_API_KEY ?? 'test-api-key',
  process.env.AZURE_OPENAI_API_VERSION ?? '2023-01-01'
)

const model = 'gpt-4o'

export const llmSocketHandler = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('Client connected:', socket.id)

    // Handle generateStream event
    socket.on('generateStream', async (data: { messages: LLMMessage[] }) => {
      const { messages } = data

      try {
        const response = client.generateStream(model, messages, null, null)

        // Emit data chunks over WebSocket
        for await (const chunk of response) {
          socket.emit('chunk', chunk)
        }

        // Notify the client when the stream is done
        socket.emit('done')
      } catch (error) {
        console.error('Error during streaming:', error)
        socket.emit('error', { message: 'Streaming failed', error })
      }
    })

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id)
    })
  })
}
