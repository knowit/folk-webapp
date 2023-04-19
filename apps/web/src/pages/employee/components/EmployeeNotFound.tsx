import * as React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  root: {
    padding: '0 25px',
  },
  header: {
    marginBottom: '0',
  },
})

interface Props {
  employeeId: string
}

export function EmployeeNotFound({ employeeId }: Props) {
  const classes = useStyles()

  return (
    <article className={classes.root}>
      <h1 className={classes.header}>Fant ingen ansatte med oppgitt ID</h1>
      <p>{`Vennligst kontrollér ID-en (${employeeId}) som er oppgitt i adressefeltet.`}</p>
    </article>
  )
}
