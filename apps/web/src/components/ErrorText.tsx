import React from 'react'
import { styled } from '@mui/material/styles'

const ComponentRoot = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.error.main,
  height: 280,
}))
const ComponentTitle = styled('div')(() => ({
  fontSize: 18,
  fontWeight: 'bold',
  lineHeight: 1.28,
}))
const ComponentText = styled('div')(() => ({
  fontSize: 16,
  lineHeight: 1.5,
}))

export const NoData = () => <span title="Data ikke tilgjengelig">-</span>

export const ErrorText = () => {
  return (
    <ComponentRoot>
      <ComponentTitle> Oida, en feil har oppstått</ComponentTitle>
      <ComponentText> Data kan ikke vises for dette valget</ComponentText>
      <ComponentText> Vennligst logg inn igjen :) </ComponentText>
    </ComponentRoot>
  )
}

export const LoggedOutErrorText = () => {
  return (
    <ComponentRoot>
      <ComponentTitle> Velkommen til Knowit Folk</ComponentTitle>
      <ComponentText> Vennligst logg inn :) </ComponentText>
    </ComponentRoot>
  )
}
