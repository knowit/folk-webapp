import { Grid } from '@mui/material'
import { EmployeeTable } from './table/EmployeeTable'
import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { useEffect } from 'react'

export default function EmployeePage() {
  const { trackPageView } = useMatomo()

  useEffect(() => {
    trackPageView({
      documentTitle: 'Ansatte',
    })
  }, [trackPageView])

  return (
    <Grid container spacing={2}>
      <EmployeeTable />
    </Grid>
  )
}
