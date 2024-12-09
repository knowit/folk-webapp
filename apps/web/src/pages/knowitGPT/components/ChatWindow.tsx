import React, { useState } from 'react'
import ChatBubble from './ChatBubble'

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  )
  const [input, setInput] = useState('')

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, isUser: true }
      setMessages((prev) => [...prev, userMessage])
      setInput('')

      // Simulating bot response with a delay
      const botResponse = { text: `You said: ${input}`, isUser: false }
      setTimeout(() => setMessages((prev) => [...prev, botResponse]), 500)
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
          onKeyDown={handleKeyDown} // Add this for Enter key support
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
            backgroundColor: '#0d6efd',
            color: 'white',
            width: '20%',
          }}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatWindow
