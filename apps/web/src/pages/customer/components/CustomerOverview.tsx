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

  useEffect(() => {
    const startDate = localStorage.getItem('startDate')
    if (startDate) {
      setStartDate(new Date(JSON.parse(startDate)))
    } else {
      setStartDate(null)
    }
  }, [])
  useEffect(() => {
    if (startDate !== null) {
      localStorage.setItem('startDate', JSON.stringify(startDate))
    }
  }, [startDate])

  useEffect(() => {
    const endDate = localStorage.getItem('endDate')
    if (endDate) {
      setEndDate(new Date(JSON.parse(endDate)))
    } else {
      setEndDate(null)
    }
  }, [])
  useEffect(() => {
    if (endDate !== null) {
      localStorage.setItem('endDate', JSON.stringify(endDate))
    }
  }, [endDate])

  return (
    <Grid container spacing={2}>
      <HoursBilledPerWeekCard
        selectedCustomerIds={selectedCustomerIds}
        setSelectedCustomerIds={setSelectedCustomerIds}
        startDate={startDate}
        endDate={endDate}
        handleDateRangeChange={function (
          startDate?: string,
          endDate?: string
        ): void {
          setStartDate(startDate)
          setEndDate(endDate)
        }}
      />
      <CustomerCardList />
    </Grid>
  )
}
