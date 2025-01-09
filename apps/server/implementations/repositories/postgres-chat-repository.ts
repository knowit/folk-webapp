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

  async addChat(userId: string): Promise<Chat> {
    await this.client.connect()
    try {
      const addChatQuery = {
        text: 'INSERT INTO chat (user_id, title) VALUES ($1, $2) RETURNING *',
        values: [userId, 'test'], // Include title as "test"
      }
      const result = await this.client.query(addChatQuery)
      return result.rows[0]
    } catch (error) {
      console.error('Error occurred when creating a new chat.', error)
    }
  }

  async addChatMessage(
    chatId: string,
    userId: string,
    message: string,
    role: ChatRole
  ): Promise<ChatMessage> {
    await this.client.connect()
    try {
      const addChatMessageQuery = {
        text: 'INSERT INTO chat_message (chat_id, user_id, message, role) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [chatId, userId, message, role],
      }
      const result = await this.client.query(addChatMessageQuery)
      return result.rows[0]
    } catch (error) {
      console.error('Error occurred when adding chat message:', error)
    }
  }

  async deleteChat(chatId: string): Promise<boolean> {
    await this.client.connect()
    try {
      const deleteChatQuery = {
        text: 'DELETE FROM chat WHERE chat_id = $1',
        values: [chatId],
      }
      const result = await this.client.query(deleteChatQuery)
      return result.rows.count() > 0
    } catch (error) {
      console.error('Error occurred when adding chat message.', error)
    }
  }

  async getChat(chatId: string): Promise<Chat> {
    await this.client.connect()
    try {
      const getChatQuery = {
        text: 'SELECT * FROM chat WHERE chat_id = $1',
        values: [chatId],
      }
      const result = await this.client.query(getChatQuery)
      return result.rows[0]
    } catch (error) {
      console.log('Error occurred when fetching chat.', error)
    }
  }

  async getChatMessagesForChat(chatId: string): Promise<ChatMessage[]> {
    await this.client.connect()
    try {
      const getChatMessagesForChatQuery = {
        text: 'SELECT * FROM chat_message WHERE chat_id = $1',
        values: [chatId],
      }
      const result = await this.client.query(getChatMessagesForChatQuery)
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
      const getChatsForUserQuery = {
        text: 'SELECT * FROM chat WHERE user_id = $1',
        values: [userId],
      }
      const result = await this.client.query(getChatsForUserQuery)
      return result.rows
    } catch (error) {
      console.error('Error occurred when fetching chats:', error.message)
    }
  }

  /**
   * This method is only used to set up database locally. Should be removed when database is created in the cloud.
   */
  async setupPostgres(): Promise<void> {
    await this.client.connect()
    try {
      await this.client.query('BEGIN')
      await this.client.query(
        `CREATE TABLE IF NOT EXISTS chat (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
          user_id VARCHAR(255) NOT NULL,
          created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
          last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
          title VARCHAR(255) NOT NULL
        );`
      )

      await this.client.query(
        `CREATE TABLE IF NOT EXISTS chat_message (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
            chat_id UUID NOT NULL,
            user_id VARCHAR(255) NOT NULL,
            message TEXT,
            role VARCHAR(255) NOT NULL,
            created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
            CONSTRAINT fk_chat_message_chat FOREIGN KEY (chat_id) REFERENCES chat (id) ON DELETE CASCADE
        );`
      )

      await this.client.query('COMMIT')
      console.log('Successfully created tables in database.')
    } catch (error) {
      console.error('Error creating tables in database.', error)
    }
  }
}
