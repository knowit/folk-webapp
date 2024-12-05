// Repository for communication with KnowitGPT chat and the chats stored in database
export interface ChatRepository {
  /* 
  Retrieves a list of chats a user has had with KnowitGPT
  Args:
    user_id: the knowit identifier for the user
    limit: default to a given set to not overload it
    offset: used for pagination combined with limit
  Returns:
    A list of Chat objects
  */
  fetchChatsForUser(
    user_id: string,
    limit?: number,
    offset?: number
  ): Array<Chat>

  // Retrieves the current messages for a given chat_id
  fetchMessagesForChat(chat_id: string): Array<ChatMessage>
  /*
  Sends a new message from user for a given chat.
  Handling of this includes using RAG as well as communicating with LLM to generate
  a good stream that answers the question
  */
  sendMessage(
    user_id: string,
    chat_id: string,
    prompt: string
  ): AsyncGenerator<ChatChunk>

  // Deletes a chat from log. Returns true if successful. User can only delete his own
  deleteChatFromHistory(chat_id: string, user_id: string): boolean
}

// A chat user has had with the KnowitGPT
class Chat {
  id: string
  created: Date
  lastUpdated: Date
  title: string

  constructor(id: string, created: Date, lastUpdated: Date, title: string) {
    this.id = id
    this.created = created
    this.lastUpdated = lastUpdated
    this.title = title
  }
}

// A single message received in a chat with KnowitGPT
export class ChatMessage {
  id: string
  chat_id: string
  message: string
  role: ChatRole
  timestamp: Date

  constructor(
    id: string,
    chat_id: string,
    message: string,
    role: ChatRole,
    timestamp: Date
  ) {
    this.id = id
    this.chat_id = chat_id
    this.message = message
    this.role = role
    this.timestamp = timestamp
  }
}

// A single token received from KnowitGPT after a message is sent
export class ChatChunk {
  content: string
  timestamp: Date

  constructor(content: string, timestamp: Date) {
    this.content = content
    this.timestamp = timestamp
  }
}

export enum ChatRole {
  // Message from KnowitGPT
  assistant,
  // Message from user
  user,
}
