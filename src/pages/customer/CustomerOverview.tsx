import { Grid } from '@material-ui/core'
import React from 'react'
import {
  useHoursBilledPerCustomer,
  useHoursBilledPerWeek,
} from '../../api/data/customer/customerQueries'
import DDChart from '../../data/DDChart'
import CustomerCardList from './CustomerCardList'

export const CustomerOverview = () => {
  const ubwMessage =
    'Dataene er fra første registrering i UBW og kan derfor være unøyaktige.'

  return (
    <Grid container spacing={2}>
      <DDChart
        fetchHook={useHoursBilledPerCustomer}
        title="Timer brukt per kunde"
        description={ubwMessage}
        dataComponentProps={{
          chartVariants: [
            {
              type: 'BarChart',
              props: {
                dataKey: 'kunde',
                yLabels: ['timer'],
                margin: { top: 40, right: 20, bottom: 65, left: 40 },
              },
            },
          ],
        }}
      />

      <DDChart
        fetchHook={useHoursBilledPerWeek}
        title="Timer brukt per uke"
        description={ubwMessage}
        dataComponentProps={{
          chartVariants: [
            {
              type: 'LineChart',
            },
          ],
        }}
      />

      <CustomerCardList />
    </Grid>
  )
}
