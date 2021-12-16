import { Grid } from '@material-ui/core'
import React from 'react'
import DDItem, { DDChart } from '../../data/DDItem'
import { ChartSkeleton } from '../EmployeeSite'
import CustomerCardList from './CustomerCardList'

export const CustomerOverview = () => {
  const ubwMessage =
    'Dataene er fra første registrering i UBW og kan derfor være unøyaktige.'

  return (
    <Grid container spacing={2}>
      <DDItem
        url={'/api/data/hoursBilledPerCustomer'}
        title="Timer brukt per kunde"
        Component={DDChart}
        SkeletonComponent={ChartSkeleton}
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
        url={'/api/data/hoursBilledPerWeek'}
        title="Timer brukt per uke"
        Component={DDChart}
        SkeletonComponent={ChartSkeleton}
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
