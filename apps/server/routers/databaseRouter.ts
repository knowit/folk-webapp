import express, { Router } from 'express'
import { DynamoDBChatRepository } from '../implementations/repositories/dynamodb-chat-repository'

const router: Router = express.Router()

const db = new DynamoDBChatRepository()

interface GetParams {
  userId: string
  chatId: string
}

router.delete('/chats', async (req, res) => {
  const result = await db.deleteChat(req.body.userId, req.body.chatId)
  res.send(result)
})

router.get<unknown, unknown, unknown, GetParams>('/chat', async (req, res) => {
  const result = await db.getChat(req.query.userId, req.query.chatId)
  res.send(result)
})

router.get<unknown, unknown, unknown, string>('/chats', async (req, res) => {
  const result = await db.getChatsForUser(req.query['userId'])
  res.send(result)
})

router.get<unknown, unknown, unknown, GetParams>(
  '/chatMessages',
  async (req, res) => {
    const result = await db.getChatMessagesForChat(
      req.query.userId,
      req.query.chatId
    )
    res.send(result)
  }
)

router.post('/chat', async (req, res) => {
  const result = await db.addChat(req.body.userId, req.body.title)
  res.send(result)
})

router.post('/chatMessages', async (req, res) => {
  const result = await db.addChatMessage(
    req.body.chatId,
    req.body.userId,
    req.body.message,
    req.body.role
  )
  res.send(result)
})

export { router as databaseRouter }
