import useSWR from 'swr'
import { deleteChat, getChat, getChatMessages, getChats } from './databaseApi'
import { LLMRole } from '../llm/llmApiTypes'
import { postAtApiV2 } from '../../client'
import { Chat, ChatMessage } from './databaseTypes'

export const useDeletChat = (chatId: string) =>
  useSWR(
    chatId != null ? { url: '/chats', chatId } : null,
    (params) => deleteChat(params?.chatId),
    {
      revalidateOnFocus: false,
    }
  )

export const useGetChat = (chatId: string) =>
  useSWR(
    chatId ? { url: '/chat', chatId } : null,
    (params) => getChat(params?.chatId),
    {
      revalidateOnFocus: false,
    }
  )

export const useGetChats = (userId: string) =>
  useSWR(
    userId ? { url: '/chats', userId } : null,
    (params) => getChats(params?.userId),
    {
      revalidateOnFocus: false,
    }
  )

export const useGetChatMessages = (chatId: string) =>
  useSWR(
    chatId ? { url: '/chatMessages', chatId } : null,
    (params) => getChatMessages(params?.chatId),
    {
      revalidateOnFocus: false,
    }
  )

export const postChat = async (userId: string) => {
  const response = await postAtApiV2<Chat>('/database/chat', {
    params: { userId },
  })
  return response
}

export const postChatMessages = async (
  chatId: string,
  userId: string,
  message: string,
  role: LLMRole
) => {
  if (chatId != null && message != null) {
    return await postAtApiV2<ChatMessage>('/database/chatMessages', {
      params: { chatId, userId, message, role },
    })
  }
}
