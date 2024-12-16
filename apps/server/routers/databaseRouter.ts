import express, { Router } from 'express'
import { PostgresChatRepository } from '../implementations/repositories/postgres-chat-repository'

const router: Router = express.Router()

const db = new PostgresChatRepository()

router.delete('/chats', async (req, res) => {
  const chatId = req.body.chatId
  const result = await db.deleteChat(chatId)
  res.send(result)
})

router.get('/chats', async (req, res) => {
  const userId = req.body.userId
  const result = await db.getChatsForUser(userId)
  res.send(result)
})

router.get('/chatMessages', async (req, res) => {
  const chatId = req.body.chatId
  const result = await db.getChatMessagesForChat(chatId)
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

router.post('/setup', async (_, res) => {
  const result = await db.setupPostgres()
  res.send(result)
})

export { router as databaseRouter }
