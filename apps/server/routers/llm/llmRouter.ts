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
  model: string
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
      const response = await client.generateStream(
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

export { router as llmRouter }
