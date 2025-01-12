import React, { useState, useEffect, useRef, act } from 'react'
import ChatBubble from './ChatBubble'
import ChatLog from './ChatLog'
import { useGenerateLLMStream } from '../../../api/data/llm/llmQueries'
import {
  useGetChatMessages,
  useGetChats,
  postChat,
  postChatMessages,
} from '../../../api/data/database/databaseQueries'
import { useUserInfo } from '../../../hooks/useUserInfo'
import { LLMRole } from '../../../api/data/llm/llmApiTypes'
import { useTheme } from '@mui/material'

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  )
  const [input, setInput] = useState('')
  const [pendingMessages, setPendingMessages] = useState<
    { role: LLMRole; content: string }[]
  >([])
  const userId = useUserInfo().userEmployeeProfile?.user_id
  const [activeChatId, setActiveChatId] = useState<string>(null)

  const lastChunkRef = useRef('')
  const refresh = useRef('false')
  const scrollRef = useRef<HTMLDivElement>(null)

  const { chunks, error, isLoading } = useGenerateLLMStream(pendingMessages)
  const { data: chats, mutate: refreshChats } = useGetChats(userId)
  const { data: chatMessages } = useGetChatMessages(userId, activeChatId)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (chatMessages && refresh.current == 'true') {
      const loadedMessages = chatMessages.map((msg) => ({
        text: msg.message,

        isUser: msg.role == 'user',
      }))
      setMessages(loadedMessages)
    }
  }, [chatMessages])

  // Handle streaming response
  useEffect(() => {
    const lastChunkIndex = chunks.findIndex(
      (chunk) => chunk.id == lastChunkRef.current
    )

    const handlePostMessages = async (message: string) => {
      await postChatMessages(activeChatId, userId, message, LLMRole.assistant)
    }

    if (chunks.length > 0) {
      setMessages((prevMessages) => {
        const isUser = prevMessages.at(-1)?.isUser
        const lastMessageIndex = isUser
          ? prevMessages.length
          : prevMessages.findLastIndex((msg) => !msg.isUser)
        const message = isUser
          ? { text: '', isUser: false }
          : prevMessages[lastMessageIndex]

        chunks.slice(lastChunkIndex + 1).forEach((chunk) => {
          message.text += chunk.content || ''
          lastChunkRef.current = chunk.id
        })

        //problem start
        if (isLoading == false) {
          handlePostMessages(message?.text)
        }
        //problem end

        if (isUser) {
          return [...prevMessages, message]
        } else {
          return prevMessages.map((msg, index) =>
            index === lastMessageIndex ? message : msg
          )
        }
      })
    }

    if (error) {
      console.error('Error generating reply:', error)
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Something went wrong. Please try again.', isUser: false },
      ])
      setPendingMessages([])
    }
  }, [chunks, isLoading, error, lastChunkRef])

  const handleSend = async () => {
    if (input.trim()) {
      let currentChatId = activeChatId
      const userMessage = { text: input, isUser: true }
      setMessages((prev) => [...prev, userMessage])
      setInput('')

      const llmMessages = [
        ...messages.map((msg) => ({
          role: msg.isUser ? LLMRole.user : LLMRole.assistant,
          content: msg.text,
        })),
        { role: LLMRole.user, content: input },
      ]
      setPendingMessages(llmMessages)

      if (activeChatId == null) {
        // Create a new chat if none is active
        const newChat = await postChat(userId, 'Test')
        currentChatId = newChat.chatId
        console.log(newChat)
        console.log(currentChatId)
        setActiveChatId(currentChatId)
        refreshChats() // Refresh chat list
      }

      // Post the message to the database
      await postChatMessages(
        currentChatId,
        userId,
        userMessage.text,
        LLMRole.user
      )
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSend()
    }
  }

  const loadChatFromHistory = (chatId: string) => {
    setActiveChatId(chatId)
    refresh.current = 'true'
  }

  const theme = useTheme()

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '60vh',
        maxHeight: '70vh',
        margin: '2% auto',
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '1%',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <ChatLog
        chatHistory={chats}
        activeChatId={activeChatId}
        onLoadChat={loadChatFromHistory}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            marginBottom: '1%',
            padding: '1%',
          }}
        >
          {messages.map((msg, index) => (
            <ChatBubble key={index} message={msg.text} isUser={msg.isUser} />
          ))}
        </div>
        <div style={{ display: 'flex' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          <button
            onClick={handleSend}
            style={{
              marginLeft: '1%',
              padding: '10px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: isLoading ? '#ccc' : '#0d6efd',
              color: 'white',
              width: '20%',
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow
