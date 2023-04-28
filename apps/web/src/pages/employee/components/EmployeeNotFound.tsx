import * as React from 'react'
import { styled } from '@mui/material/styles'

const ComponentRoot = styled('article')(() => ({
  adding: '0 25px',
}))
const ComponentHeader = styled('h1')(() => ({
  marginBottom: 0,
}))

interface Props {
  employeeId: string
}

export function EmployeeNotFound({ employeeId }: Props) {
  return (
    <ComponentRoot>
      <ComponentHeader>Fant ingen ansatte med oppgitt ID</ComponentHeader>
      <p>{`Vennligst kontrollér ID-en (${employeeId}) som er oppgitt i adressefeltet.`}</p>
    </ComponentRoot>
  )
}
