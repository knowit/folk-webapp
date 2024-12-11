import React, { useState } from 'react'
import ChatBubble from './ChatBubble'
import { useGenerateLLMReply } from '../../../api/data/llm/llmQueries'
import { LLMRole } from '../../../api/data/llm/llmApiTypes'

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  )
  const [input, setInput] = useState('')
  // const [loading, setLoading] = useState(false)

  const HandleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, isUser: true }
      setMessages((prev) => [...prev, userMessage])
      setInput('')

      // setLoading(true)
      try {
        const llmMessages = [
          ...messages.map((msg) => ({
            role: msg.isUser ? LLMRole.user : LLMRole.assistant,
            content: msg.text,
          })),
          { role: LLMRole.user, content: input },
        ]
        const { data, error } = useGenerateLLMReply(llmMessages)
        if (error) {
          console.error('Error generating reply:', error)
        }
        console.log(data)

        const botMessage = { text: data.content, isUser: false }
        setMessages((prev) => [...prev, botMessage])
      } catch (error) {
        console.error('Error generating reply:', error)
        const errorMessage = {
          text: 'Something went wrong. Please try again.',
          isUser: false,
        }
        setMessages((prev) => [...prev, errorMessage])
      }
      // finally {
      //   setLoading(false)
      // }
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      HandleSend()
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
          onClick={HandleSend}
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
