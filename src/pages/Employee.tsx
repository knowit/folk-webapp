import React from 'react'
import { Grid } from '@material-ui/core'
import { EmployeeTable } from '../components/EmployeeTable'

export default function Employee() {
  return (
    <Grid container spacing={2}>
      <EmployeeTable />
    </Grid>
  )
}
