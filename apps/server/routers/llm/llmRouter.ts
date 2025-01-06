import express, { Router } from 'express'
import { AzureOpenAILLMRepositoryImpl } from '../../implementations/azure-openai-llm-repository-impl'
import { LLMMessage } from './llmTypes'

const router: Router = express.Router()
const client = new AzureOpenAILLMRepositoryImpl(
  process.env.AZURE_OPENAI_ENDPOINT ?? 'http://localhost:3000',
  process.env.AZURE_OPENAI_API_KEY ?? 'test-api-key',
  process.env.AZURE_OPENAI_API_VERSION ?? '2023-01-01'
)

const model = 'gpt-4o'

interface GenerateParams {
  messages: LLMMessage[]
}

// Traditional HTTP route for synchronous generation
router.get<unknown, unknown, unknown, GenerateParams>(
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

// Keep generateStream available as a fallback
router.get<unknown, unknown, unknown, GenerateParams>(
  '/generateStream',
  async (req, res, next) => {
    try {
      const response = client.generateStream(
        model,
        req.query.messages,
        null,
        null
      )

      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.setHeader('Transfer-Encoding', 'chunked')

      let lastRole = 'undefined'

      for await (const chunk of response) {
        const jsonString = JSON.stringify(chunk, (key, value) =>
          value === undefined && key == 'role' ? lastRole : value
        )
        if (chunk.role !== undefined) {
          lastRole = chunk.role
        }
        res.write(jsonString + '\n')
      }

      res.end()
    } catch (error) {
      next(error)
    }
  }
)

export { router as llmRouter }
