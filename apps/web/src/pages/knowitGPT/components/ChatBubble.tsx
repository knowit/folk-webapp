interface ChatBubbleProps {
  message: string
  isUser: boolean
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isUser }) => {
  return (
    <div
      style={{
        textAlign: isUser ? 'right' : 'left',
        margin: '10px 0',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          backgroundColor: isUser ? '#d1e7dd' : '#f8d7da',
          color: isUser ? '#0f5132' : '#842029',
          borderRadius: '10px',
          padding: '10px',
          maxWidth: '70%',
        }}
      >
        {message}
      </div>
    </div>
  )
}

export default ChatBubble
