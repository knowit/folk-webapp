import React, { useEffect, useState } from 'react'
import CustomerCardList from './CustomerCardList'
import { Grid } from '@mui/material'
import { HoursBilledPerWeekCard } from '../cards'

export const CustomerOverview = () => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  useEffect(() => {
    const selectedCustomerIds = localStorage.getItem('selectedCustomerIds')
    if (selectedCustomerIds) {
      setSelectedCustomerIds(JSON.parse(selectedCustomerIds))
    } else {
      setSelectedCustomerIds([])
    }
  }, [])
  useEffect(() => {
    if (selectedCustomerIds !== null) {
      localStorage.setItem(
        'selectedCustomerIds',
        JSON.stringify(selectedCustomerIds)
      )
    }
  }, [selectedCustomerIds])

  return (
    <Grid container spacing={2}>
      <HoursBilledPerWeekCard
        selectedCustomerIds={selectedCustomerIds}
        setSelectedCustomerIds={setSelectedCustomerIds}
        startDate={startDate}
        endDate={endDate}
        handleDateRangeChange={function (
          startDate?: Date,
          endDate?: Date
        ): void {
          setStartDate(startDate)
          setEndDate(endDate)
        }}
      />
      <CustomerCardList />
    </Grid>
  )
}
