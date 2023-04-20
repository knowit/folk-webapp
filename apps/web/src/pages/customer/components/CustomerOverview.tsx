import React, { useEffect, useState } from 'react'
import CustomerCardList from './CustomerCardList'
import { Grid } from '@mui/material'
import { HoursBilledPerWeekCard } from '../cards'

export const CustomerOverview = () => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([])
  useEffect(() => {
    const selectedCustomerIds = localStorage.getItem('selectedCustomerIds')
    if (selectedCustomerIds) {
      setSelectedCustomerIds(JSON.parse(selectedCustomerIds))
    }
  }, [])
  useEffect(() => {
    localStorage.setItem(
      'selectedCustomerIds',
      JSON.stringify(selectedCustomerIds)
    )
  }, [selectedCustomerIds])

  return (
    <Grid container spacing={2}>
      <HoursBilledPerWeekCard
        selectedCustomerIds={selectedCustomerIds}
        setSelectedCustomerIds={setSelectedCustomerIds}
      />
      <CustomerCardList />
    </Grid>
  )
}
