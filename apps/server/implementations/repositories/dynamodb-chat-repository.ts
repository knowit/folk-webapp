import {
  Chat,
  ChatMessage,
  ChatRole,
  IChatRepository,
} from '../../repository/chat-repository'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb'
import { randomUUID } from 'crypto'

export class DynamoDBChatRepository implements IChatRepository {
  client: DynamoDBDocumentClient

  constructor() {
    const dynamoDbClient = new DynamoDBClient({
      region: 'eu-central-1',
      credentials: {
        accessKeyId: process.env.DYNAMODB_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.DYNAMODB_AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.DYNAMODB_AWS_SESSION_TOKEN,
      },
    })
    this.client = DynamoDBDocumentClient.from(dynamoDbClient)
  }

  async addChat(userId: string, title: string): Promise<Chat> {
    try {
      const chatId = randomUUID().toString()
      const created = new Date()
      const lastUpdated = new Date()

      const command = new PutCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Item: {
          userId: userId,
          chatId: chatId,
          messages: [],
          created: created.toISOString(),
          lastUpdated: lastUpdated.toISOString(),
          title: title,
        },
      })
      await this.client.send(command)

      return {
        chatId: chatId,
        userId: userId,
        created: created,
        lastUpdated: lastUpdated,
        title: title,
      }
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
      const created = new Date()
      const messageObject = {
        id: randomUUID().toString(),
        chatId,
        userId,
        message,
        role,
        created: created.toISOString(),
      }

      const updateCommand = new UpdateCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Key: { userId, chatId },
        UpdateExpression:
          'SET #messages = list_append(#messages, :newMessage), #lastUpdated = :created',
        ExpressionAttributeNames: {
          '#messages': 'messages',
          '#lastUpdated': 'lastUpdated',
        },
        ExpressionAttributeValues: {
          ':newMessage': [messageObject],
          ':created': created.toISOString(),
        },
        ReturnValues: 'UPDATED_NEW',
      })

      await this.client.send(updateCommand)
      return new ChatMessage(
        messageObject.id,
        messageObject.chatId,
        messageObject.userId,
        messageObject.message,
        messageObject.role,
        new Date(messageObject.created)
      )
    } catch (error) {
      console.error('Failed to add chat message to chat.', error)
    }
  }
  async deleteChat(userId: string, chatId: string): Promise<boolean> {
    try {
      const deleteCommand = new DeleteCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Key: { userId, chatId },
      })

      const result = await this.client.send(deleteCommand)
      return result.$metadata.httpStatusCode === 200
    } catch (error) {
      console.log('Failed to delete chat.', error)
    }
  }

  async getChat(userId: string, chatId: string): Promise<Chat> {
    try {
      const getCommand = new GetCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Key: { userId, chatId },
      })

      const result = await this.client.send(getCommand)
      if (!result.Item) {
        throw new Error('Chat not found')
      }

      return result.Item as Chat
    } catch (error) {
      console.error('Failed to get chat.', error)
    }
  }

  async getChatsForUser(
    userId: string,
    limit?: number,
    offset?: number
  ): Promise<Array<Chat>> {
    try {
      const queryCommand = new QueryCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId,
        },
        Limit: limit,
      })

      const result = await this.client.send(queryCommand)
      const items = result.Items || []
      return items.slice(offset) as Array<Chat>
    } catch (error) {
      console.error('Failed to get chats for user.', error)
    }
  }
  async getChatMessagesForChat(
    userId: string,
    chatId: string
  ): Promise<Array<ChatMessage>> {
    try {
      const getCommand = new GetCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Key: { userId, chatId },
      })

      const result = await this.client.send(getCommand)
      return result.Item.messages as Array<ChatMessage>
    } catch (error) {
      console.error('Failed to get chat messages for chat.', error)
    }
  }
}
