import React from 'react'
import CustomerCardList from './CustomerCardList'
import { Grid } from '@material-ui/core'
import { HoursBilledPerCustomerCard, HoursBilledPerWeekCard } from '../cards'

export const CustomerOverview = () => {
  return (
    <Grid container spacing={2}>
      <HoursBilledPerCustomerCard />
      <HoursBilledPerWeekCard />
      <CustomerCardList />
    </Grid>
  )
}
