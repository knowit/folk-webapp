import React, { useEffect, useState } from 'react'
import CustomerCardList from './CustomerCardList'
import { Grid } from '@mui/material'
import { HoursBilledPerWeekCard } from '../cards'

export const CustomerOverview = () => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState(null)
  const [selectedPeriodStartDate, setSelectedPeriodStartDate] = useState(null)
  const [selectedPeriodEndDate, setSelectedPeriodEndDate] = useState(null)

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
    const selectedPeriodStartDate = localStorage.getItem(
      'selectedPeriodStartDate'
    )
    if (selectedPeriodStartDate) {
      setSelectedPeriodStartDate(new Date(JSON.parse(selectedPeriodStartDate)))
    } else {
      setSelectedPeriodStartDate(null)
    }
  }, [])
  useEffect(() => {
    if (selectedPeriodStartDate !== null) {
      localStorage.setItem(
        'selectedPeriodStartDate',
        JSON.stringify(selectedPeriodStartDate)
      )
    } else {
      if (localStorage.getItem('selectedPeriodStartDate')) {
        localStorage.removeItem('selectedPeriodStartDate')
      }
    }
  }, [selectedPeriodStartDate])

  useEffect(() => {
    const endDate = localStorage.getItem('endDate')
    if (endDate) {
      setSelectedPeriodEndDate(new Date(JSON.parse(endDate)))
    } else {
      setSelectedPeriodEndDate(null)
    }
  }, [])
  useEffect(() => {
    if (selectedPeriodEndDate !== null) {
      localStorage.setItem('endDate', JSON.stringify(selectedPeriodEndDate))
    } else {
      if (localStorage.getItem('endDate')) {
        localStorage.removeItem('endDate')
      }
    }
  }, [selectedPeriodEndDate])

  return (
    <Grid container spacing={2}>
      <HoursBilledPerWeekCard
        selectedCustomerIds={selectedCustomerIds}
        setSelectedCustomerIds={setSelectedCustomerIds}
        selectedPeriodStartDate={selectedPeriodStartDate}
        selectedPeriodEndDate={selectedPeriodEndDate}
        handleDateRangeChange={function (
          startDate?: Date,
          endDate?: Date
        ): void {
          setSelectedPeriodStartDate(startDate)
          setSelectedPeriodEndDate(endDate)
        }}
      />
      <CustomerCardList />
    </Grid>
  )
}
