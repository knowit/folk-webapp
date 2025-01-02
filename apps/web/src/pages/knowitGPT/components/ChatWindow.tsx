import React, { useState } from 'react'
import ChatBubble from './ChatBubble'
import {
  // useGenerateLLMReply,
  useGenerateLLMStream,
} from '../../../api/data/llm/llmQueries'
import { LLMRole } from '../../../api/data/llm/llmApiTypes'

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  )

  const [input, setInput] = useState('')
  const [pendingMessages, setPendingMessages] = useState<
    { role: LLMRole; content: string }[]
  >([])

  // Call useGenerateLLMReply at the top level
  const { chunks, error } = useGenerateLLMStream(pendingMessages)

  React.useEffect(() => {
    if (chunks.length > 0) {
      console.log(chunks)
      let message = { text: '', isUser: false }
      chunks.forEach((chunk) => {
        message = {
          text: chunk.content ? message.text + chunk.content : message.text,
          isUser: false,
        }
        message.text.length == 0
          ? setMessages((prevMessages) => [...prevMessages, message])
          : setMessages((prevMessages) => [
              ...prevMessages.slice(0, -1),
              message,
            ])
      })

      // Clear pending messages after processing
      setPendingMessages([])
    }

    if (error) {
      console.error('Error generating reply:', error)
      const errorMessage = {
        text: 'Something went wrong. Please try again.',
        isUser: false,
      }
      setMessages((prevMessages) => [...prevMessages, errorMessage])
      setPendingMessages([]) // Clear pending messages after error
    }
  }, [chunks, error]) // Run effect when data or error changes

  const HandleSend = async () => {
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
      console.log(llmMessages)

      setPendingMessages(llmMessages) // Trigger the SWR hook to fetch the reply
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
          onKeyDown={handleKeyDown}
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
