import { LLMRole, Tool } from '../repository/llm-repository'

import { OllamaLLMRepositoryImpl } from '../implementations/ollama-llm-repository-impl'

let ollamaClient: OllamaLLMRepositoryImpl

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

beforeAll(() => {
  ollamaClient = new OllamaLLMRepositoryImpl()
})

// test('Simple message with Ollama', async () => {
//   const response = await ollamaClient.generateReply(
//     'llama3.1',
//     [
//       {
//         role: LLMRole.system,
//         content:
//           'You are a helpful pirate AI, talking like a pirate. You are totally illiterate and a science denier. Maximum 5 words in answers',
//       },
//       { role: LLMRole.user, content: 'Tell me why the sky is blue' },
//     ],
//     null,
//     { seed: 10 }
//   )
//   expect(response.content).toBe('Magic pixies do it matey!')
// }, 20000)

// test('Simple stream with Ollama', async () => {
//   const stream = ollamaClient.generateStream(
//     'llama3.1',
//     [
//       {
//         role: LLMRole.system,
//         content:
//           'You are a helpful pirate AI, talking like a pirate. You are totally illiterate and a science denier. Maximum 5 words in answers',
//       },
//       { role: LLMRole.user, content: 'Tell me why the sky is blue' },
//     ],
//     null,
//     { seed: 30 }
//   )

//   let accumulatedResponse = ''

//   for await (const chunk of stream) {
//     if (chunk.content) {
//       accumulatedResponse += chunk.content ?? ''
//     }
//   }
//   expect(accumulatedResponse).toBe("Sun's fire makes it so.")
// }, 20000)

// test('Create embeddings with Ollama', async () => {
//   const embeddings = await ollamaClient.generateEmbedding('nomic-embed-text', [
//     'This is a test',
//   ])
//   expect(embeddings.length > 0)
// }, 20000)

test('Tool request in Ollama response', async () => {
  const response = await ollamaClient.generateReply(
    'llama3.1',
    [
      {
        role: LLMRole.system,
        content:
          'You are a helpful weather AI assistant. If possible use provided tool in response only. Never assume location.',
      },
      {
        role: LLMRole.user,
        content: 'What is the weather in Oslo?',
      },
    ],
    [new FakeLocationTool(), new FakeWeatherTool()]
  )
  console.log('Response: ' + JSON.stringify(response.content, null, 2))
}, 20000)
