import {
  Chat,
  ChatMessage,
  ChatRole,
  IChatRepository,
} from '../../repository/chat-repository'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  GetCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb'
import { randomUUID } from 'crypto'

export class DynamoDBChatRepository implements IChatRepository {
  client: DynamoDBDocumentClient

  constructor() {
    const dynamoDbClient = new DynamoDBClient({})
    this.client = DynamoDBDocumentClient.from(dynamoDbClient)
  }

  async addChat(userId: string): Promise<Chat> {
    try {
      const chat: Chat = {
        id: randomUUID().toString(),
        userId: userId,
        created: new Date(),
        lastUpdated: new Date(),
        title: '',
      }

      const command = new UpdateCommand({
        TableName: 'dev_knowitgpt_chathistory',
        Key: { userId },
        UpdateExpression:
          'SET chats = list_append(if_not_exists(chats, :emptyList), :newChat)',
        ExpressionAttributeValues: {
          ':emptyList': [],
          ':newChat': [chat],
        },
        ReturnValues: 'UPDATED_NEW',
      })

      await this.client.send(command)
      return chat
    } catch (error) {
      console.error('Failed to add chat for user.', error)
    }
  }
  async addChatMessage(
    chatId: string,
    userId: string,
    message: string,
    role: ChatRole
  ): Promise<ChatMessage> {
    try {
      const messageObject: ChatMessage = {
        id: randomUUID().toString(),
        chatId,
        userId,
        message,
        role,
        created: new Date(),
      }

      const getChatsCommand = new GetCommand({
        TableName: 'dev_knowitgpt_chathistory',
        Key: { userId },
        ProjectionExpression: 'chats',
      })

      const { Item } = await this.client.send(getChatsCommand)
      const chatIndex = Item?.chats.findIndex(
        (chat: Chat) => chat.id === chatId
      )
      if (chatIndex === -1) throw new Error('Chat not found')

      const updateCommand = new UpdateCommand({
        TableName: 'dev_knowitgpt_chathistory',
        Key: { userId },
        UpdateExpression: `SET chats[${chatIndex}].messages = list_append(chats[${chatIndex}].messages, :newMessage)`,
        ExpressionAttributeValues: {
          ':newMessage': [messageObject],
        },
        ReturnValues: 'UPDATED_NEW',
      })

      await this.client.send(updateCommand)
      return messageObject
    } catch (error) {
      console.error('Failed to add chat message to chat.', error)
    }
  }
  async deleteChat(chatId: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  async getChat(chatId: string): Promise<Chat> {
    throw new Error('Method not implemented.')
  }

  async getChatsForUser(
    userId: string,
    limit?: number,
    offset?: number
  ): Promise<Array<Chat>> {
    throw new Error('Method not implemented.')
  }
  async getChatMessagesForChat(chatId: string): Promise<Array<ChatMessage>> {
    throw new Error('Method not implemented.')
  }
}
