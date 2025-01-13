import React from 'react'
import { Chats } from '../../../api/data/database/databaseTypes'

interface ChatLogProps {
  chatHistory: Chats | null
  activeChatId: string | null
  onLoadChat: (chatId: string) => void
}

const ChatLog: React.FC<ChatLogProps> = ({
  chatHistory,
  activeChatId,
  onLoadChat,
}) => {
  console.log(chatHistory)
  return chatHistory ? (
    <div
      style={{
        width: '30%',
        borderRight: '1px solid #ccc',
        padding: '1%',
        overflowY: 'auto',
      }}
    >
      <h3>Old chats</h3>
      <ul>
        {chatHistory?.map((chat) => (
          <li
            key={chat.id}
            style={{
              cursor: 'pointer',
              textDecoration: chat.id === activeChatId ? 'underline' : 'none',
            }}
            onClick={() => onLoadChat(chat.id)}
          >
            {chat.id}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div
      style={{
        width: '30%',
        borderRight: '1px solid #ccc',
        padding: '1%',
        overflowY: 'auto',
      }}
    >
      <h3>Old chats</h3>
    </div>
  )
}

export default ChatLog
