import * as React from 'react'
import { styled } from '@mui/material/styles'

const ComponentRoot = styled('article')(() => ({
  adding: '0 25px',
}))
const ComponentHeader = styled('h1')(() => ({
  marginBottom: 0,
}))

interface Props {
  customerId: string
}

export function CustomerNotFound({ customerId }: Props) {
  return (
    <ComponentRoot>
      <ComponentHeader>Fant ingen kunder med oppgitt ID</ComponentHeader>
      <p>{`Vennligst kontrollér ID-en (${customerId}) som er oppgitt i adressefeltet.`}</p>
    </ComponentRoot>
  )
}
