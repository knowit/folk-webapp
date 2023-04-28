import React from 'react'
import { styled } from '@mui/material/styles'

const ComponentRoot = styled('div')(({ theme }) => ({
  width: '100%',
  padding: 15,
  fontSize: 16,
  backgroundColor: theme.palette.background.paper,
  borderLeft: `1px solid ${theme.palette.primary.contrastText}`,
  borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
  borderRight: `1px solid ${theme.palette.primary.contrastText}`,
  borderRadius: '0px 0px 6px 6px',
}))

interface GridItemContentProps {
  children: React.ReactNode | React.ReactNode[]
}

export function GridItemContent({ children }: GridItemContentProps) {
  return <ComponentRoot>{children}</ComponentRoot>
}
