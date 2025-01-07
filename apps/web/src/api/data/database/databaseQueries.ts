import useSWR from 'swr'
import {
  deleteChat,
  getChat,
  getChatMessages,
  getChats,
  postChat,
  postChatMessages,
} from './databaseApi'
import { LLMRole } from '../llm/llmApiTypes'

export const useDeletChat = (chatId: string) =>
  useSWR(
    chatId != '' ? { url: '/chats', chatId } : null,
    (params) => deleteChat(params?.chatId),
    {
      revalidateOnFocus: false,
    }
  )

export const useGetChat = (chatId: string) =>
  useSWR(
    chatId != '' ? { url: '/chats', chatId } : null, // Only call if messages exist
    (params) => getChat(params?.chatId),
    {
      revalidateOnFocus: false,
    }
  )

export const useGetChats = (userId: string) =>
  useSWR(
    userId != '' ? { url: '/chats', userId } : null, // Only call if messages exist
    (params) => getChats(params?.userId),
    {
      revalidateOnFocus: false,
    }
  )

export const useGetChatMessages = (chatId: string) =>
  useSWR(
    chatId != '' ? { url: '/chatMessages', chatId } : null, // Only call if messages exist
    (params) => getChatMessages(params?.chatId),
    {
      revalidateOnFocus: false,
    }
  )

export const usePostChat = (userId: string) =>
  useSWR(
    userId != '' ? { url: '/chatMessages', userId } : null, // Only call if messages exist
    (params) => postChat(params?.userId),
    {
      revalidateOnFocus: false,
    }
  )

export const usePostChatMessage = (
  chatId: string,
  userId: string,
  message: string,
  role: LLMRole
) =>
  useSWR(
    chatId != '' && userId != '' && message != ''
      ? { url: '/chatMessages', chatId, userId, message, role }
      : null, // Only call if messages exist
    (params) =>
      postChatMessages(
        params?.chatId,
        params?.userId,
        params?.message,
        params?.role
      ),
    {
      revalidateOnFocus: false,
    }
  )
