import * as React from 'react'
import { styled } from '@mui/material/styles'

const ComponentRoot = styled('ul')(() => ({
  listStyle: 'none',
  padding: 0,
  margin: 0,
}))

interface Props {
  children: React.ReactNode
}

export function ExperienceList({ children }: Props) {
  return <ComponentRoot>{children}</ComponentRoot>
}
