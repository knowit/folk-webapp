import { Grid } from '@mui/material'
import { EmployeeTable } from './table/EmployeeTable'
import { pageTitle } from '../../utils/pagetitle'

export default function EmployeePage() {
  pageTitle('Ansatte')
  return (
    <Grid container spacing={2}>
      <EmployeeTable />
    </Grid>
  )
}
