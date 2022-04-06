import { Grid } from '@material-ui/core'
import React from 'react'
import {
  useHoursBilledPerCustomerCharts,
  useHoursBilledPerWeekCharts,
} from '../../api/data/customer/customerQueries'
import ChartCard from '../../components/charts/ChartCard'
import CustomerCardList from './CustomerCardList'

export const CustomerOverview = () => {
  const { data: hoursBilledPerCustomerData } = useHoursBilledPerCustomerCharts()
  const { data: hoursBilledPerWeekData } = useHoursBilledPerWeekCharts()

  const ubwMessage =
    'Dataene er fra første registrering i UBW og kan derfor være unøyaktige.'

  return (
    <Grid container spacing={2}>
      {hoursBilledPerCustomerData && (
        <ChartCard
          title="Timer brukt per kunde"
          description={ubwMessage}
          data={hoursBilledPerCustomerData}
        />
      )}

      {hoursBilledPerWeekData && (
        <ChartCard
          title="Timer brukt per uke"
          description={ubwMessage}
          data={hoursBilledPerWeekData}
        />
      )}

      <CustomerCardList />
    </Grid>
  )
}
