import {
  Chat,
  ChatMessage,
  ChatRole,
  IChatRepository,
} from '../../repository/chat-repository'
import { Pool } from 'pg'

export class PostgresChatRepository implements IChatRepository {
  client: Pool

  constructor() {
    this.client = new Pool({
      user: 'postgres',
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      database: process.env.POSTGRES_DATABASE_NAME,
    })
  }

  async addChatMessage(
    chatId: string,
    userId: string,
    message: string,
    role: ChatRole
  ): Promise<ChatMessage> {
    await this.client.connect()
    try {
      const query = {
        text: 'INSERT INTO chat_message (chat_id, user_id, message, role) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [chatId, userId, message, role],
      }
      const result = await this.client.query(query)
      return result.rows[0]
    } catch (error) {
      console.error('Error occurred when adding chat message:', error)
    }
  }

  async deleteChat(chatId: string): Promise<boolean> {
    await this.client.connect()
    try {
      const query = {
        text: 'DELETE FROM chat_message WHERE chat_id = $1',
        values: [chatId],
      }
      const result = await this.client.query(query)
      return result.rows.count() > 0
    } catch (error) {
      console.error('Error occurred when adding chat message:', error)
    }
  }

  async getChatMessagesForChat(chatId: string): Promise<ChatMessage[]> {
    await this.client.connect()
    try {
      const query = {
        text: 'SELECT * FROM chat_message WHERE chat_id = $1',
        values: [chatId],
      }
      const result = await this.client.query(query)
      return result.rows
    } catch (error) {
      console.error(
        'Error occurred when fetching chat messages:',
        error.message
      )
    }
  }

  async getChatsForUser(
    userId: string,
    limit?: number,
    offset?: number
  ): Promise<Chat[]> {
    await this.client.connect()
    try {
      const query = {
        text: 'SELECT * FROM chat WHERE user_id = $1',
        values: [userId],
      }
      const result = await this.client.query(query)
      return result.rows
    } catch (error) {
      console.error('Error occurred when fetching chats:', error.message)
    }
  }
}
