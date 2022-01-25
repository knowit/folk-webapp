import { Grid } from '@material-ui/core'
import React from 'react'
import {
  useHoursBilledPerCustomer,
  useHoursBilledPerWeek,
} from '../../api/data/customer/customerQueries'
import DDItem from '../../data/DDItem'
import CustomerCardList from './CustomerCardList'

export const CustomerOverview = () => {
  const ubwMessage =
    'Dataene er fra første registrering i UBW og kan derfor være unøyaktige.'

  return (
    <Grid container spacing={2}>
      <DDItem
        fetchHook={useHoursBilledPerCustomer}
        title="Timer brukt per kunde"
        description={ubwMessage}
        dataComponentProps={{
          chartVariants: [
            {
              type: 'Bar',
              props: {
                dataKey: 'kunde',
                yLabels: ['timer'],
                margin: { top: 40, right: 20, bottom: 65, left: 40 },
              },
            },
          ],
        }}
      />

      <DDItem
        fetchHook={useHoursBilledPerWeek}
        title="Timer brukt per uke"
        description={ubwMessage}
        dataComponentProps={{
          chartVariants: [
            {
              type: 'Line',
            },
          ],
        }}
      />

      <CustomerCardList />
    </Grid>
  )
}
