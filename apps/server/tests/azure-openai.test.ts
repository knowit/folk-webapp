import { AzureOpenAILLMRepositoryImpl } from '../implementations/azure-openai-llm-repository-impl'
import { LLMRole, LLMMessage, Tool } from '../repository/llm-repository'

class FakeLocationTool extends Tool {
  name = 'get_location'
  description =
    'Lets you find the location of a place in latitude and longitude'
  parameters = [
    {
      name: 'location',
      description: 'The place you want to find latitude and longitude for',
      type: 'string',
      isRequired: true,
    },
  ]
  async use(args: Record<string, any>): Promise<any> {
    const location = args['location']
    if (location == null) {
      return (
        'Unable to get location for get_location: ' +
        JSON.stringify(args, null, 2)
      )
    }
    return 'Location of ' + location + ' is at 34.2 latitude, 23.2 longitude'
  }
}

class FakeWeatherTool extends Tool {
  name = 'get_weather'
  description = 'Retrieves weather for a given latitude and longitude'
  parameters = [
    {
      name: 'latitude',
      description: 'The latitude of the place you want weather for',
      type: 'string',
      isRequired: true,
    },
    {
      name: 'longitude',
      description: 'The longitude of the place you want weather for',
      type: 'string',
      isRequired: true,
    },
  ]
  async use(args: Record<string, any>): Promise<any> {
    const latitude = args['latitude']
    const longitude = args['longitude']
    if (latitude == null || longitude == null) {
      return 'Missing latitude or longitude for weather'
    }
    return (
      'The weather at ' +
      latitude +
      ' latitude and ' +
      longitude +
      ' longitude is snowy and -10 celsius'
    )
  }
}

test('generateReply handles a simple text message', async () => {
  const messages: LLMMessage[] = [
    {
      role: LLMRole.system,
      content:
        'You are a helpful AI assistant. Answer with very short message, max 5 words.',
    },
    {
      role: LLMRole.user,
      content: 'Why is the sky blue?',
    },
  ]
  const azureClient = new AzureOpenAILLMRepositoryImpl(
    process.env.AZURE_OPENAI_ENDPOINT,
    process.env.AZURE_OPENAI_API_KEY,
    process.env.AZURE_OPENAI_API_VERSION
  )
  const options = { seed: 5 }
  const response = await azureClient.generateReply(
    'gpt-4o',
    messages,
    null,
    options
  )
  console.log('Test Case 1 Response:', response.content)
})

test('generateStream using simple request', async () => {
  const messages: LLMMessage[] = [
    {
      role: LLMRole.system,
      content:
        'You are a helpful AI assistant. Answer with very long message, around 10 words',
    },
    {
      role: LLMRole.user,
      content: 'Why is the sky blue?',
    },
  ]
  const azureClient = new AzureOpenAILLMRepositoryImpl(
    process.env.AZURE_OPENAI_ENDPOINT,
    process.env.AZURE_OPENAI_API_KEY,
    process.env.AZURE_OPENAI_API_VERSION
  )
  const options = { seed: 5 }
  const stream = azureClient.generateStream('gpt-4o', messages, null, options)
  let accumulatedResponse = 'Stream Response: ' // Start with the prefix

  for await (const chunk of stream) {
    if (chunk.content) {
      accumulatedResponse += chunk.content // Append the new content
    }
  }
  console.log(accumulatedResponse)
})

test('generateReply with tool uses tool for response', async () => {
  const messages: LLMMessage[] = [
    {
      role: LLMRole.system,
      content:
        'You are a helpful weather AI assistant. If possible use provided tool in response only. Never assume location.',
    },
    {
      role: LLMRole.user,
      content: 'What is the weather in Oslo?',
    },
  ]
  const azureClient = new AzureOpenAILLMRepositoryImpl(
    process.env.AZURE_OPENAI_ENDPOINT,
    process.env.AZURE_OPENAI_API_KEY,
    process.env.AZURE_OPENAI_API_VERSION
  )
  const options = { seed: 5 }
  const tools = [new FakeLocationTool(), new FakeWeatherTool()]
  const response = await azureClient.generateReply(
    'gpt-4o',
    messages,
    tools,
    options
  )
  console.log('Response:', response.content)
})

test('generateStream with tool uses tool for response', async () => {
  const messages: LLMMessage[] = [
    {
      role: LLMRole.system,
      content:
        'You are a helpful weather AI assistant. If possible use provided tool in response only. Never assume location.',
    },
    {
      role: LLMRole.user,
      content: 'What is the weather in Oslo?',
    },
  ]
  const azureClient = new AzureOpenAILLMRepositoryImpl(
    process.env.AZURE_OPENAI_ENDPOINT,
    process.env.AZURE_OPENAI_API_KEY,
    process.env.AZURE_OPENAI_API_VERSION
  )
  const options = { seed: 5 }
  const tools = [new FakeLocationTool(), new FakeWeatherTool()]
  const response = await azureClient.generateReply(
    'gpt-4o',
    messages,
    tools,
    options
  )
  console.log('Response:', response.content)
}, 20000)
