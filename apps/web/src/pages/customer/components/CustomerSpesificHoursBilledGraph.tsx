import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { HoursBilledPerWeekCard } from '../cards'

export const CustomerSpecificHoursBilledGraph = ({ customerId }) => {
  const [specificSelectedPeriodStartDate, setSelectedPeriodStartDate] =
    useState(null)
  const [specificSelectedPeriodEndDate, setSelectedPeriodEndDate] =
    useState(null)

  useEffect(() => {
    const specificSelectedPeriodStartDate = localStorage.getItem(
      'specificSelectedPeriodStartDate'
    )
    if (specificSelectedPeriodStartDate) {
      setSelectedPeriodStartDate(
        new Date(JSON.parse(specificSelectedPeriodStartDate))
      )
    } else {
      setSelectedPeriodStartDate(null)
    }
  }, [])
  useEffect(() => {
    if (specificSelectedPeriodStartDate !== null) {
      localStorage.setItem(
        'specificSelectedPeriodStartDate',
        JSON.stringify(specificSelectedPeriodStartDate)
      )
    } else {
      if (localStorage.getItem('specificSelectedPeriodStartDate')) {
        localStorage.removeItem('specificSelectedPeriodStartDate')
      }
    }
  }, [specificSelectedPeriodStartDate])

  useEffect(() => {
    const specificSelectedPeriodEndDate = localStorage.getItem(
      'specificSelectedPeriodEndDate'
    )
    if (specificSelectedPeriodEndDate) {
      setSelectedPeriodEndDate(
        new Date(JSON.parse(specificSelectedPeriodEndDate))
      )
    } else {
      setSelectedPeriodEndDate(null)
    }
  }, [])
  useEffect(() => {
    if (specificSelectedPeriodEndDate !== null) {
      localStorage.setItem(
        'specificSelectedPeriodEndDate',
        JSON.stringify(specificSelectedPeriodEndDate)
      )
    } else {
      if (localStorage.getItem('specificSelectedPeriodEndDate')) {
        localStorage.removeItem('specificSelectedPeriodEndDate')
      }
    }
  }, [specificSelectedPeriodEndDate])

  return (
    <Grid container spacing={2}>
      <HoursBilledPerWeekCard
        selectedCustomerIds={new Array(customerId)}
        selectedPeriodStartDate={specificSelectedPeriodStartDate}
        selectedPeriodEndDate={specificSelectedPeriodEndDate}
        handleDateRangeChange={function (
          startDate?: Date,
          endDate?: Date
        ): void {
          setSelectedPeriodStartDate(startDate)
          setSelectedPeriodEndDate(endDate)
        }}
        customerSpecificGraph={true}
        customersWithConsultants={new Array(customerId)}
        customerHistory={true}
      />
    </Grid>
  )
}
