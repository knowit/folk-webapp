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

export const useGetChat = (userId: string, chatId: string) =>
  useSWR(
    chatId ? { url: '/chat', userId, chatId } : null,
    (params) => getChat(params?.userId, params?.chatId),
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

export const useGetChatMessages = (userId: string, chatId: string) =>
  useSWR(
    chatId ? { url: '/chatMessages', userId, chatId } : null,
    (params) => getChatMessages(params?.userId, params?.chatId),
    {
      revalidateOnFocus: false,
    }
  )

export const postChat = async (userId: string, title: string) => {
  const response = await postAtApiV2<Chat>('/database/chat', {
    params: { userId, title },
  })
  console.log(response)
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
