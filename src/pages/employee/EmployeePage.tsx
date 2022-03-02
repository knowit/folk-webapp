import React from 'react'
import { Grid } from '@material-ui/core'
import { EmployeeTable } from './components/EmployeeTable'

export default function EmployeePage() {
  return (
    <Grid container spacing={2}>
      <EmployeeTable />
    </Grid>
  )
}
