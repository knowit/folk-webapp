/**
 * Repository for the communication with KnowitGPT in the form of chats and chat messages.
 * This interface defines the classes and methods that are necessary to handle database entries regarding communication
 * with KnowitGPT in the form of chats and chat messages.
 */
export interface IChatRepository {
  /**
   * Creates a chat for a user.
   *
   * @param userId - The identifier of the user that the chat is created for.
   * @param title - The title given to the chat.
   * @returns The created chat
   */
  addChat(userId: string, title: string): Promise<Chat>

  /**
   * Add a chat message for a chat.
   *
   * @param userId - The identifier of the user.
   * @param chatId - The identifier of the chat that the message is a part of.
   * @param message - The text of the chat entry.
   * @param role - The role of the creator of the entry. It is either the user or the assistant.
   * @returns The created chat message
   */
  addChatMessage(
    userId: string,
    chatId: string,
    message: string,
    role: ChatRole
  ): Promise<ChatMessage>

  /**
   * Delete a chat. Only the user can delete their own chat.
   *
   * @param userId - The identifier for the user.
   * @param chatId - The identifier for the chat to be deleted.
   * @returns `true` if an entry is deleted, otherwise `false`.
   */
  deleteChat(userId: string, chatId: string): Promise<boolean>

  /**
   * Retrieve a specific chat for a user.
   *
   * @param userId - The identifier for the user.
   * @param chatId - The identifier for the chat to retrieve
   * @returns Chat with the given identifier.
   */
  getChat(userId: string, chatId: string): Promise<Chat>

  /**
   * Retrieve all chats for a user.
   *
   * @param userId - The identifier for the user to retrieve chats for.
   * @param limit - Default to a given set to not overload it.
   * @param offset - Used for pagination combined with limit.
   * @returns All chats with KnowitGPT for the user.
   */
  getChatsForUser(
    userId: string,
    limit?: number,
    offset?: number
  ): Promise<Array<Chat>>

  /**
   * Retrieve all the chat messages for a chat.
   *
   * @param userId - The identifier for the user.
   * @param chatId - The identifier for the chat to retrieve messages for.
   * @returns A list of all the chat messages for the chat.
   */
  getChatMessagesForChat(
    userId: string,
    chatId: string
  ): Promise<Array<ChatMessage>>
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
