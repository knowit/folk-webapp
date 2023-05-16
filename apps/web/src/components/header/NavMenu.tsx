import React from 'react'
import { styled } from '@mui/material/styles'

const ComponentRoot = styled('ul')(() => ({
  display: 'flex',
  margin: '0 auto',
  height: '100%',
  overflow: 'hidden',
}))

export function NavMenu({ children }: { children: React.ReactNode }) {
  return <ComponentRoot>{children}</ComponentRoot>
}
