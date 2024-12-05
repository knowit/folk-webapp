import { AzureOpenAILLMRepositoryImpl } from '../implementations/azure-openai-llm-repository-impl'
import { LLMRole, LLMMessage } from '../repository/llm-repository'

test('generateReply handles a simple text message', async () => {
  const messages1: LLMMessage[] = [
    {
      role: LLMRole.system,
      content:
        'You are a helpful AI assistant. Answer with very short message, max 10 words.',
    },
    {
      role: LLMRole.user,
      content: 'Why is sthe sky blue?',
    },
  ]
  const azureClient = new AzureOpenAILLMRepositoryImpl(
    process.env.AZURE_OPENAI_ENDPOINT,
    process.env.AZURE_OPENAI_API_KEY,
    process.env.AZURE_OPENAI_API_VERSION
  )
  const response1 = await azureClient.generateReply('gpt-4o', messages1)
  console.log('Test Case 1 Response:', response1)
})
