import { Grid } from '@mui/material'
import { EmployeeTable } from './table/EmployeeTable'
import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { useEffect } from 'react'
import { pageTitle } from '../../utils/pagetitle'

export default function EmployeePage() {
  const { trackPageView } = useMatomo()

  useEffect(() => {
    trackPageView({
      documentTitle: 'Ansatte',
    })
    pageTitle('Ansatte')
  }, [trackPageView])

  return (
    <Grid container spacing={2}>
      <EmployeeTable />
    </Grid>
  )
}
