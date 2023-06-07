import React from 'react'
import { styled } from '@mui/material/styles'

const RowCountStyled = styled('div')(() => ({
  textAlign: 'right',
  padding: '10px 15px',
  fontWeight: 'bold',
  width: '100%',
}))

interface RowCountProps {
  children: React.ReactNode
}

export function RowCount({ children }: RowCountProps) {
  return <RowCountStyled>{children}</RowCountStyled>
}
