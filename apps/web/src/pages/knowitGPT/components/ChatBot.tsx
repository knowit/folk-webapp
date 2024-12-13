import { MultiLineSkeleton } from '../../../components/skeletons/MultiLineSkeleton'
import { FallbackMessage } from '../../employee/components/FallbackMessage'
import ChatWindow from './ChatWindow'

interface Props {
  isLoading?: boolean
  error?: object
}

export function ChatBot({ isLoading, error }: Props) {
  if (isLoading) {
    return <MultiLineSkeleton lines={7} />
  }

  if (error) {
    return <FallbackMessage error={error} />
  }

  return (
    <div style={{ width: '60%', minHeight: 350, margin: 'auto' }}>
      <ChatWindow />
    </div>
  )
}
