import * as React from 'react'
import { styled } from '@mui/material/styles'

const ListItemStyled = styled('li')(() => ({
  paddingBottom: '0.25em',
}))

interface Props {
  children: React.ReactNode
}

export function ExperienceListItem({ children }: Props) {
  return <ListItemStyled>{children}</ListItemStyled>
}
