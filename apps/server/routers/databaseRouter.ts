import express, { Router } from 'express'
import { PostgresChatRepository } from '../implementations/repositories/postgres-chat-repository'

const router: Router = express.Router()

const db = new PostgresChatRepository()

router.delete('/chats', async (req, res) => {
  const result = await db.deleteChat(req.body.chatId)
  res.send(result)
})

router.get('/chat', async (req, res) => {
  const result = await db.getChat(req.body.chatId)
  res.send(result)
})

router.get('/chats', async (req, res) => {
  const result = await db.getChatsForUser(req.body.userId)
  res.send(result)
})

router.get('/chatMessages', async (req, res) => {
  const result = await db.getChatMessagesForChat(req.body.chatId)
  res.send(result)
})

router.post('/chat', async (req, res) => {
  const result = await db.addChat(req.body.userId)
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

router.post('/setup', async (_, res) => {
  const result = await db.setupPostgres()
  res.send(result)
})

export { router as databaseRouter }
