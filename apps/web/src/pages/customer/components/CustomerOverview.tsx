import React from 'react'
import CustomerCardList from './CustomerCardList'
import { Grid } from '@material-ui/core'
import { HoursBilledPerWeekCard } from '../cards'

export const CustomerOverview = () => {
  return (
    <Grid container spacing={2}>
      <HoursBilledPerWeekCard />
      <CustomerCardList />
    </Grid>
  )
}
