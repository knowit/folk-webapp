// import { styled } from '@mui/material/styles'
import { MultiLineSkeleton } from '../../../components/skeletons/MultiLineSkeleton'
import { AiChat, useAsStreamAdapter } from '@nlux/react'
import { send } from './send'
import { personas } from './personas'
import { FallbackMessage } from '../../employee/components/FallbackMessage'
import '@nlux/themes/nova.css'

interface Props {
  isLoading?: boolean
  error?: object
}

export function GPTChat({ isLoading, error }: Props) {
  const adapter = useAsStreamAdapter(send, [])

  if (isLoading) {
    return <MultiLineSkeleton lines={7} />
  }

  if (error) {
    return <FallbackMessage error={error} />
  }

  return (
    <div style={{ width: '60%', minHeight: 350, margin: 'auto' }}>
      <h1>Test</h1>
      <AiChat
        adapter={adapter}
        personaOptions={personas}
        displayOptions={{ colorScheme: 'dark' }}
      />
    </div>
  )
}
