import express, { Router } from 'express'
import { PostgresChatRepository } from '../implementations/repositories/postgres-chat-repository'
import { DynamoDBChatRepository } from '../implementations/repositories/dynamodb-chat-repository'

const router: Router = express.Router()

const db = new DynamoDBChatRepository()

router.delete('/chats', async (req, res) => {
  const result = await db.deleteChat(req.body.userId, req.body.chatId)
  res.send(result)
})

router.get<unknown, unknown, unknown, string>('/chat', async (req, res) => {
  const result = await db.getChat(req.query['chatId'])
  res.send(result)
})

router.get<unknown, unknown, unknown, string>('/chats', async (req, res) => {
  const result = await db.getChatsForUser(req.query['userId'])
  res.send(result)
})

router.get<unknown, unknown, unknown, string>(
  '/chatMessages',
  async (req, res) => {
    console.log(req.query['chatId'])
    const result = await db.getChatMessagesForChat(req.query['chatId'])
    console.log(result)
    res.send(result)
  }
)

router.post('/chat', async (req, res) => {
  const result = await db.addChat(req.body.userId, req.body.title)
  res.send(result)
})

router.post('/chatMessages', async (req, res) => {
  console.log('ny melding')
  const result = await db.addChatMessage(
    req.body.chatId,
    req.body.userId,
    req.body.message,
    req.body.role
  )
  res.send(result)
})

/*
router.post('/setup', async (_, res) => {
  const result = await db.setupPostgres()
  res.send(result)
})
 */

export { router as databaseRouter }
