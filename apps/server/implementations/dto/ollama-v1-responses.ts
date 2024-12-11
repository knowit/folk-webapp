import { LLMChunk, LLMResponse } from '../../repository/llm-repository'

export class OllamaV1Response extends LLMResponse {
  id: string
  object = 'chat.completion'
  created: Date
  model: string
  choices: OllamaV1Choice[]
  usage: OllamaV1Usage
  systemFingerprint?: string

  constructor(
    id: string,
    created: Date,
    model: string,
    choices: OllamaV1Choice[],
    usage: OllamaV1Usage,
    systemFingerprint?: string
  ) {
    super(choices[0].message.content)
    this.id = id
    this.created = created
    this.model = model
    this.choices = choices
    this.usage = usage
    this.systemFingerprint = systemFingerprint
  }

  static fromJson(json: Record<string, any>): OllamaV1Response {
    return new OllamaV1Response(
      json['id'],
      new Date(json['created'] * 1000),
      json['model'],
      json['choices'].map((choiceJson: any) =>
        OllamaV1Choice.fromJson(choiceJson)
      ),
      OllamaV1Usage.fromJson(json['usage']),
      json['system_fingerprint']
    )
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      object: this.object,
      created: this.created.getTime() / 1000,
      model: this.model,
      choices: this.choices.map((choice) => choice.toJson()),
      usage: this.usage.toJson(),
      system_fingerprint: this.systemFingerprint,
    }
  }
}

export class OllamaV1Choice {
  index: number
  message: OllamaV1Message
  logProbs?: string
  finishReason: string

  constructor(
    index: number,
    message: OllamaV1Message,
    logProbs: string | undefined,
    finishReason: string
  ) {
    this.index = index
    this.message = message
    this.logProbs = logProbs
    this.finishReason = finishReason
  }

  static fromJson(json: Record<string, any>): OllamaV1Choice {
    return new OllamaV1Choice(
      json['index'],
      OllamaV1Message.fromJson(json['message']),
      json['logProbs'],
      json['finish_reason']
    )
  }

  toJson(): Record<string, any> {
    return {
      index: this.index,
      message: this.message.toJson(),
      logProbs: this.logProbs,
      finish_reason: this.finishReason,
    }
  }
}

export class OllamaV1Message {
  role: string
  content?: string
  refusal?: string
  toolCalls?: OllamaV1ToolCall[]

  constructor(
    role: string,
    content?: string,
    refusal?: string,
    toolCalls?: OllamaV1ToolCall[]
  ) {
    this.role = role
    this.content = content
    this.refusal = refusal
    this.toolCalls = toolCalls
  }

  static fromJson(json: Record<string, any>): OllamaV1Message {
    return new OllamaV1Message(
      json['role'],
      json['content'],
      json['refusal'],
      json['tool_calls']?.map((call: any) => OllamaV1ToolCall.fromJson(call))
    )
  }

  toJson(): Record<string, any> {
    return {
      role: this.role,
      content: this.content,
      refusal: this.refusal,
      tool_calls: this.toolCalls?.map((call) => call.toJson()),
    }
  }
}

export class OllamaV1ToolCall {
  id: string
  type: string
  function: OllamaV1ToolFunctionCall

  constructor(id: string, type: string, func: OllamaV1ToolFunctionCall) {
    this.id = id
    this.type = type
    this.function = func
  }

  static fromJson(json: Record<string, any>): OllamaV1ToolCall {
    return new OllamaV1ToolCall(
      json['id'],
      json['type'],
      OllamaV1ToolFunctionCall.fromJson(json['function'])
    )
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      type: this.type,
      function: this.function.toJson(),
    }
  }
}

export class OllamaV1ToolFunctionCall {
  name: string
  arguments?: string

  constructor(name: string, args?: string) {
    this.name = name
    this.arguments = args
  }

  static fromJson(json: Record<string, any>): OllamaV1ToolFunctionCall {
    return new OllamaV1ToolFunctionCall(json['name'], json['arguments'])
  }

  toJson(): Record<string, any> {
    return {
      name: this.name,
      arguments: this.arguments,
    }
  }
}

export class OllamaV1UsageTokenDetails {
  cachedTokens: number
  audioTokens: number

  constructor(cachedTokens: number, audioTokens: number) {
    this.cachedTokens = cachedTokens
    this.audioTokens = audioTokens
  }

  static fromJson(json: Record<string, any>): OllamaV1UsageTokenDetails {
    return new OllamaV1UsageTokenDetails(
      json['cached_tokens'],
      json['audio_tokens']
    )
  }

  toJson(): Record<string, any> {
    return {
      cached_tokens: this.cachedTokens,
      audio_tokens: this.audioTokens,
    }
  }
}

export class OllamaV1Usage {
  promptTokens: number
  completionTokens: number
  totalTokens: number
  usageTokenDetails?: OllamaV1UsageTokenDetails

  constructor(
    promptTokens: number,
    completionTokens: number,
    totalTokens: number,
    usageTokenDetails?: OllamaV1UsageTokenDetails
  ) {
    this.promptTokens = promptTokens
    this.completionTokens = completionTokens
    this.totalTokens = totalTokens
    this.usageTokenDetails = usageTokenDetails
  }

  static fromJson(json: Record<string, any>): OllamaV1Usage {
    return new OllamaV1Usage(
      json['prompt_tokens'],
      json['completion_tokens'],
      json['total_tokens'],
      json['prompt_tokens_details']
        ? OllamaV1UsageTokenDetails.fromJson(json['prompt_tokens_details'])
        : undefined
    )
  }

  toJson(): Record<string, any> {
    return {
      prompt_tokens: this.promptTokens,
      completion_tokens: this.completionTokens,
      total_tokens: this.totalTokens,
      prompt_tokens_details: this.usageTokenDetails?.toJson(),
    }
  }
}

export class OllamaV1Chunk extends LLMChunk {
  constructor(
    public id: string,
    public created: Date,
    public model: string,
    public systemFingerprint: string,
    public choices: OllamaV1ChunkChoice[]
  ) {
    super(choices[0].delta.role, choices[0].delta.content)
    this.createdAt = created
    this.done = choices[0].finishReason !== null
  }

  createdAt: Date
  done: boolean
  object = 'chat.completion.chunk'

  static fromJson(json: Record<string, any>): OllamaV1Chunk {
    return new OllamaV1Chunk(
      json.id,
      new Date(json.created * 1000),
      json.model,
      json.system_fingerprint,
      json.choices.map((choice: any) => OllamaV1ChunkChoice.fromJson(choice))
    )
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      created: this.created.getTime() / 1000,
      model: this.model,
      choices: this.choices.map((choice) => choice.toJson()),
      system_fingerprint: this.systemFingerprint,
    }
  }

  copyWith(newChunk: OllamaV1Chunk): OllamaV1Chunk {
    return new OllamaV1Chunk(
      this.id,
      this.created,
      this.model,
      this.systemFingerprint,
      this.choices.map(
        (choice) =>
          new OllamaV1ChunkChoice(
            choice.index,
            new OllamaV1ChunkChoiceDelta(
              choice.delta.role,
              choice.delta.content,
              choice.delta.toolCalls?.map((toolCall) => {
                const newToolCall = newChunk.choices[0].delta.toolCalls?.[0]
                return new OllamaV1ChunkToolCall(
                  toolCall.index,
                  toolCall.id,
                  new OllamaV1ChunkToolCallFunction(
                    // Preserve the current name or take from the new chunk
                    toolCall.functionCall.name ??
                      newToolCall?.functionCall.name,
                    // Preserve the current arguments only if they are non-empty
                    toolCall.functionCall.functionArguments &&
                    toolCall.functionCall.functionArguments.trim() !== '{}'
                      ? toolCall.functionCall.functionArguments
                      : newToolCall?.functionCall.functionArguments ?? ''
                  )
                )
              })
            ),
            choice.logProbs,
            choice.finishReason
          )
      )
    )
  }
}

class OllamaV1ChunkChoice {
  constructor(
    public index: number,
    public delta: OllamaV1ChunkChoiceDelta,
    public logProbs: string | null,
    public finishReason: string | null
  ) {}

  static fromJson(json: Record<string, any>): OllamaV1ChunkChoice {
    return new OllamaV1ChunkChoice(
      json.index,
      OllamaV1ChunkChoiceDelta.fromJson(json.delta),
      json.logProbs ?? null,
      json.finish_reason ?? null
    )
  }

  toJson(): Record<string, any> {
    return {
      index: this.index,
      delta: this.delta.toJson(),
      logProbs: this.logProbs,
      finish_reason: this.finishReason,
    }
  }
}

class OllamaV1ChunkChoiceDelta {
  constructor(
    public role: string | null,
    public content: string | null,
    public toolCalls: OllamaV1ChunkToolCall[] | null
  ) {}

  static fromJson(json: Record<string, any>): OllamaV1ChunkChoiceDelta {
    return new OllamaV1ChunkChoiceDelta(
      json.role ?? null,
      json.content ?? null,
      json.tool_calls
        ? json.tool_calls.map((call: any) =>
            OllamaV1ChunkToolCall.fromJson(call)
          )
        : null
    )
  }

  toJson(): Record<string, any> {
    return {
      role: this.role,
      content: this.content,
      tool_calls: this.toolCalls?.map((call) => call.toJson()),
    }
  }
}

class OllamaV1ChunkToolCall {
  constructor(
    public index: number,
    public id: string | null,
    public functionCall: OllamaV1ChunkToolCallFunction
  ) {}

  public type = 'function'

  static fromJson(json: Record<string, any>): OllamaV1ChunkToolCall {
    return new OllamaV1ChunkToolCall(
      json.index,
      json.id ?? null,
      OllamaV1ChunkToolCallFunction.fromJson(json.function)
    )
  }

  toJson(): Record<string, any> {
    return {
      index: this.index,
      id: this.id,
      type: this.type,
      function: this.functionCall.toJson(),
    }
  }
}

class OllamaV1ChunkToolCallFunction {
  constructor(public name: string | null, public functionArguments: string) {}

  static fromJson(json: Record<string, any>): OllamaV1ChunkToolCallFunction {
    return new OllamaV1ChunkToolCallFunction(json.name ?? null, json.arguments)
  }

  toJson(): Record<string, any> {
    return {
      name: this.name,
      arguments: this.functionArguments,
    }
  }

  copyWith(
    functionArguments: string,
    name?: string
  ): OllamaV1ChunkToolCallFunction {
    return new OllamaV1ChunkToolCallFunction(
      this.name ?? name ?? null,
      this.functionArguments + functionArguments
    )
  }
}
