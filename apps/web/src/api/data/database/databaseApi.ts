import { deleteAtApiV2, getAtApiV2, postAtApiV2 } from '../../client'
import { Chat, ChatMessage, Chats } from './databaseTypes'
import { LLMRole } from '../llm/llmApiTypes'

export const deleteChat = (chatId: string) =>
  deleteAtApiV2<boolean>('/database/chats', {
    params: { chatId },
  })

export const getChat = (chatId: string) =>
  getAtApiV2<Chat>('/database/chat', {
    params: { chatId },
  })

export const getChats = (userId: string) =>
  getAtApiV2<Chats>('/database/chats', {
    params: { userId },
  })

export const getChatMessages = (chatId: string) =>
  getAtApiV2<ChatMessage[]>('/database/chatMessages', {
    params: { chatId },
  })

export const postChat = (userId: string) =>
  postAtApiV2<Chat>('/database/chat', {
    params: { userId },
  })

export const postChatMessages = (
  chatId: string,
  userId: string,
  message: string,
  role: LLMRole
) =>
  postAtApiV2<ChatMessage>('/database/chatMessages', {
    params: { chatId, userId, message, role },
  })