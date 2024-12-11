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
  async use(args?: Record<string, any>): Promise<any> {
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
    const latitude: number = args['latitude'] | args['lat']
    const longitude: number = args['longitude'] | args['lon']
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
  ollamaClient = new OllamaLLMRepositoryImpl('http://localhost:11434')
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
//     { seed: 10, temperature: 0 }
//   )
//   console.log('Output: ' + response.content)
//   //  expect(response.content).toBe('Magic pixies do it matey!')
// }, 20000)

// test('Simple stream with Ollama', async () => {
//   const stream = ollamaClient.generateStream(
//     'llama3.1',
//     [
//       {
//         role: LLMRole.system,
//         content:
//           'You are a helpful Pirate AI, talk like a swashbuckling scallywag. Max 5 words',
//       },
//       { role: LLMRole.user, content: 'Tell me why the sky is blue' },
//     ],
//     null,
//     { seed: 30, temperature: 0 }
//   )

//   let accumulatedResponse = ''

//   for await (const chunk of stream) {
//     if (chunk.content) {
//       accumulatedResponse += chunk.content ?? ''
//     }
//   }
//   expect(accumulatedResponse.length).toBeGreaterThan(0)
// }, 20000)

// test('Create embeddings with Ollama', async () => {
//   const embeddings = await ollamaClient.generateEmbedding('nomic-embed-text', [
//     'This is a test',
//   ])
//   expect(embeddings.length).toBeGreaterThan(0)
// }, 20000)

// test('Tool request in Ollama response', async () => {
//   const response = await ollamaClient.generateReply(
//     'llama3.1',
//     [
//       {
//         role: LLMRole.system,
//         content:
//           'You are a helpful weather AI assistant. If possible use provided tool in response only. Never assume location. Use tool responses',
//       },
//       {
//         role: LLMRole.user,
//         content: 'What is the weather in Mengele?',
//       },
//     ],
//     [new FakeLocationTool(), new FakeWeatherTool()]
//   )
//   console.log('Response: ' + JSON.stringify(response.content, null, 2))
// }, 20000)

test('Tool request in Ollama stream', async () => {
  const stream = ollamaClient.generateStream(
    'llama3.1',
    [
      {
        role: LLMRole.system,
        content:
          'You are a helpful weather AI assistant. If possible use provided tool in response only. Never assume location. Use tool responses',
      },
      { role: LLMRole.user, content: 'What is the weather in Mengele?' },
    ],
    [new FakeLocationTool(), new FakeWeatherTool()]
  )
  let accumulatedResponse = ''

  for await (const chunk of stream) {
    if (chunk.content) {
      accumulatedResponse += chunk.content ?? ''
    }
  }
  console.log('Output:' + accumulatedResponse)
}, 20000)
