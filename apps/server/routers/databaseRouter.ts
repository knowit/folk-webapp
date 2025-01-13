import express, { Router } from 'express'
import { DynamoDBChatRepository } from '../implementations/repositories/dynamodb-chat-repository'

const router: Router = express.Router()

const db = new DynamoDBChatRepository()

router.delete('/chats', async (req, res) => {
  const result = await db.deleteChat(req.body.userId, req.body.chatId)
  res.send(result)
})

router.get('/chat', async (req, res) => {
  const result = await db.getChat(req.body.userId, req.body.chatId)
  res.send(result)
})

router.get('/chats', async (req, res) => {
  const result = await db.getChatsForUser(req.body.userId)
  res.send(result)
})

router.get('/chatMessages', async (req, res) => {
  const result = await db.getChatMessagesForChat(
    req.body.userId,
    req.body.chatId
  )
  res.send(result)
})

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
