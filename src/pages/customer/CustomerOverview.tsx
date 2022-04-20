import { Grid } from '@material-ui/core'
import React from 'react'
import { HoursBilledPerCustomerCard, HoursBilledPerWeekCard } from '.'
import CustomerCardList from './CustomerCardList'

export const CustomerOverview = () => {
  return (
    <Grid container spacing={2}>
      <HoursBilledPerCustomerCard />
      <HoursBilledPerWeekCard />
      <CustomerCardList />
    </Grid>
  )
}
