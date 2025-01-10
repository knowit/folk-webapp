import {
  LLMChunk,
  LLMClient,
  LLMMessage,
  LLMResponse,
  Tool,
} from '../repository/llm-repository'
import fetch from 'node-fetch'

/*
Quick implementation for out LLMClient to communicate with a intermediary python endpoint that handles all pre- and
post processing of prompt and messages, to better facilitate data storage in DataBricks so that we can easier 
optimize and evaluate MLFlow
*/
export class PythonAppLLMClientImpl extends LLMClient {
  // TODO: Test and verify endpoint with actual values and interject it into the KnowitGPT pipeline. This is only scaffolding.
  constructor(endpoint: string) {
    super()
    this.endpoint = endpoint
  }

  endpoint: string

  async generateReply(
    model: string,
    messages: LLMMessage[],
    tools?: Tool[],
    options?: Record<string, never>
  ): Promise<LLMResponse> {
    // Build your request payload
    const payload = {
      model,
      messages,
      tools,
      ...options,
    }

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // JSONify the payload
      })

      if (!response.ok) {
        // You can throw a custom error or handle non-2xx statuses here
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Parse the JSON response
      const data: LLMResponse = await response.json()
      return data
    } catch (error) {
      // Handle fetch/connection errors here
      throw new Error(`Failed to generate reply: ${error}`)
    }
  }

  async *generateStream(
    model: string,
    messages: LLMMessage[],
    tools?: Tool[],
    options?: Record<string, never>
  ): AsyncGenerator<LLMChunk> {
    const payload = {
      model,
      messages,
      tools,
      ...options,
    }

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload), // JSONify the payload
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const nodeStream = response.body
    if (!nodeStream) {
      throw new Error('No response body')
    }

    const decoder = new TextDecoder()
    let bufferedText = ''

    for await (const chunk of nodeStream) {
      // Narrow down the type:
      if (typeof chunk === 'string') {
        // If it’s already a string, just append it
        bufferedText += chunk
      } else {
        // Otherwise, assume it’s a Buffer/Uint8Array and decode it
        bufferedText += decoder.decode(chunk)
      }

      // Split on newlines for NDJSON
      const lines = bufferedText.split('\n')
      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i].trim()
        if (line) {
          yield JSON.parse(line)
        }
      }
      bufferedText = lines[lines.length - 1]
    }

    // Handle leftover text
    if (bufferedText.trim()) {
      yield JSON.parse(bufferedText.trim())
    }
  }
}
