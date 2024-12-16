import express, { Router } from 'express'
import { AzureOpenAILLMRepositoryImpl } from '../../implementations/azure-openai-llm-repository-impl'
import { LLMMessage } from './llmTypes'

const router: Router = express.Router()
const client = new AzureOpenAILLMRepositoryImpl(
  process.env.AZURE_OPENAI_ENDPOINT,
  process.env.AZURE_OPENAI_API_KEY,
  process.env.AZURE_OPENAI_API_VERSION
)

const model = 'gpt-4o'

interface generateParams {
  messages: LLMMessage[]
}

router.get<unknown, unknown, unknown, generateParams>(
  '/generateReply',
  async (req, res, next) => {
    try {
      const response = await client.generateReply(
        model,
        req.query.messages,
        null,
        null
      )
      res.send(response)
    } catch (error) {
      next(error)
    }
  }
)

router.get<unknown, unknown, unknown, generateParams>(
  '/generateStream',
  async (req, res, next) => {
    try {
      const response = client.generateStream(
        'gpt-4o',
        req.query.messages,
        null,
        null
      )

      // Set headers for streaming
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.setHeader('Transfer-Encoding', 'chunked')

      let lastrole = 'undefined'

      // Stream the data using an async generator
      for await (const chunk of response) {
        const jsonString = JSON.stringify(chunk, (key, value) =>
          value === undefined && key == 'role' ? lastrole : value
        )
        if (chunk.role != undefined) {
          lastrole = chunk.role
        }
        res.write(jsonString + '\n') // Write each chunk as a JSON string with a newline
      }

      res.end() // End the response
    } catch (error) {
      next(error) // Pass errors to the error handler middleware
    }
  }
)

export { router as llmRouter }
