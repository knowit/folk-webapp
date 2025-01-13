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
  return (
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
            key={chat.chatId}
            style={{
              cursor: 'pointer',
              textDecoration:
                chat.chatId === activeChatId ? 'underline' : 'none',
            }}
            onClick={() => onLoadChat(chat.chatId)}
          >
            {chat.chatId}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChatLog
