// Repository connection for all thecommunication with KnowitGPT chat and the chats stored in database

/**
 * Repository for the communication with KnowitGPT in the form of chats and chat messages.
 * This interface defines the classes and methods that are necessary to handle database entries regarding communication
 * with KnowitGPT in the form of chats and chat messages.
 */
export interface IChatRepository {
  /**
   * Add a chat message for a chat.
   *
   * @param chatId - The identifier of the chat that the message is a part of.
   * @param userId - The identifier of the user.
   * @param message - The text of the chat entry.
   * @param role - The role of the creator of the entry. It is either the user or the assistant.
   * @returns `true` if successfully created
   */
  addChatMessage(
    chatId: string,
    userId: string,
    message: string,
    role: ChatRole
  ): boolean

  /**
   * Delete a chat. Only the user can delete their own chat.
   *
   * @param chatId - The identifier for the chat to be deleted.
   * @returns `true` if successfully deleted, otherwise `false`.
   */
  deleteChat(chatId: string): boolean

  /**
   * Retrieve all chats for a user.
   *
   * @param userId - The identifier for the user to retrieve chats for.
   * @param limit - Default to a given set to not overload it.
   * @param offset - Used for pagination combined with limit.
   * @returns All chats with KnowitGPT for the user.
   */
  getChatsForUser(userId: string, limit?: number, offset?: number): Array<Chat>

  /**
   * Retrieve all the chat messages for a chat.
   *
   * @param chatId - The identifier for the chat to retrieve messages for.
   * @returns A list of all the chat messages for the chat.
   */
  getChatMessagesForChat(chatId: string): Promise<Array<ChatMessage>>
}

// A chat user has had with the KnowitGPT
export class Chat {
  id: string
  userId: string
  created: Date
  lastUpdated: Date
  title: string

  constructor(
    id: string,
    userId: string,
    created: Date,
    lastUpdated: Date,
    title: string
  ) {
    this.id = id
    this.userId = userId
    this.created = created
    this.lastUpdated = lastUpdated
    this.title = title
  }
}

// A single message received in a chat with KnowitGPT
export class ChatMessage {
  id: string
  chatId: string
  userId: string
  message: string
  role: ChatRole
  created: Date

  constructor(
    id: string,
    chatId: string,
    userId: string,
    message: string,
    role: ChatRole,
    created: Date
  ) {
    this.id = id
    this.chatId = chatId
    this.userId = userId
    this.message = message
    this.role = role
    this.created = created
  }
}

export enum ChatRole {
  assistant, // Message from KnowitGPT
  user, // Message from user
}
