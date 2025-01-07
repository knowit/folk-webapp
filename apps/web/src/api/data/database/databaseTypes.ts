export type Chats = Chat[]

export type Chat = {
  id: string
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
  role: ChatRole
  created: Date
}

export enum ChatRole {
  assistant, // Message from KnowitGPT
  user, // Message from user
}
