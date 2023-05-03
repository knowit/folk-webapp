import React from 'react'
import { styled } from '@mui/material/styles'

const ComponentRoot = styled('div')(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: 16,
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  borderBottom: `1px solid ${theme.palette.background.paper}`,
  borderLeft: `1px solid ${theme.palette.background.paper}`,
  padding: 0,
  paddingRight: 15,
  paddingLeft: 15,
  justifyContent: 'center',
}))

export default function CenteredHeaderCell({ title }: { title: string }) {
  return <ComponentRoot>{title}</ComponentRoot>
}
