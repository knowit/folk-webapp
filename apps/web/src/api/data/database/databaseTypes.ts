export type Chats = Chat[]

export type Chat = {
  chatId: string
  userId: string
  created: Date
  lastUpdated: Date
  title: string
}

export type ChatMessage = {
  id: string
  chatId: string
  userId: string
  message: string
  role: string
  created: Date
}
