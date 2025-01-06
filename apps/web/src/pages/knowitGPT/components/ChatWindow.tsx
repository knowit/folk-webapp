import React, { useState, useEffect, useRef } from 'react'
import ChatBubble from './ChatBubble'
import { useGenerateLLMStream } from '../../../api/data/llm/llmQueries'
import { LLMRole } from '../../../api/data/llm/llmApiTypes'

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  )
  const [input, setInput] = useState('')
  const [pendingMessages, setPendingMessages] = useState<
    { role: LLMRole; content: string }[]
  >([])
  const lastChunkRef = useRef('')

  const { chunks, error, isLoading } = useGenerateLLMStream(pendingMessages)

  useEffect(() => {
    const lastChunkIndex = chunks.findIndex(
      (chunk) => chunk.id == lastChunkRef.current
    )
    if (chunks.length > 0) {
      setMessages((prevMessages) => {
        const isUser = prevMessages.at(-1).isUser
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
  }, [chunks, error, lastChunkRef])

  const handleSend = () => {
    if (input.trim()) {
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
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      style={{
        minHeight: '60vh',
        maxHeight: '70vh',
        margin: '2% auto',
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '1%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f9f9f9',
      }}
    >
      <div
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
  )
}

export default ChatWindow
