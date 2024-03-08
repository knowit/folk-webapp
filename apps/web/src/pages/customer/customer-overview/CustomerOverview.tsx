import React, { useEffect, useState } from 'react'
import CustomerCardListOverview from './CustomerCardListOverview'
import { Grid } from '@mui/material'
import storageTokens from '../util/local-storage-tokens'
import CustomerHoursPerWeekSection from './CustomerHoursPerWeekSection'
import { useSelectedCustomerIds } from '../util/local-storage-hooks'

export const CustomerOverview = () => {
  const [showHistoricCustomers, setShowHistoricCustomers] = useState(false)
  const { selectedCustomerIds, setSelectedCustomerIds } =
    useSelectedCustomerIds()
  const [selectedPeriodStartDate, setPeriodStartDate] = useState(null)
  const [selectedPeriodEndDate, setPeriodEndDate] = useState(null)

  useEffect(() => {
    const startDate = storageTokens.getPeriodStartDate()
    const endDate = storageTokens.getPeriodEndDate()

    setPeriodStartDate(startDate)
    setPeriodEndDate(endDate)
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
    storageTokens.setPeriodStartDate(selectedPeriodStartDate)
  }, [selectedPeriodStartDate])

  useEffect(() => {
    storageTokens.setPeriodEndDate(selectedPeriodEndDate)
  }, [selectedPeriodEndDate])

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    customerId: string
  ) => {
    if (event.target.checked) {
      setSelectedCustomerIds([...selectedCustomerIds, customerId].sort())
    } else {
      setSelectedCustomerIds(
        selectedCustomerIds.filter((id) => id !== customerId)
      )
    }
  }

  return (
    <Grid container spacing={2}>
      <CustomerHoursPerWeekSection
        selectedCustomerIds={selectedCustomerIds}
        handleCheckboxChange={handleCheckboxChange}
        handleDateRangeChange={function (
          startDate?: Date,
          endDate?: Date
        ): void {
          setPeriodStartDate(startDate)
          setPeriodEndDate(endDate)
        }}
        selectedPeriodStartDate={selectedPeriodStartDate}
        selectedPeriodEndDate={selectedPeriodEndDate}
        setSelectedCustomerIds={setSelectedCustomerIds}
        showCustomerHistory={showHistoricCustomers}
        setShowCustomerHistory={setShowHistoricCustomers}
      />
      <CustomerCardListOverview
        selectedCustomerIds={selectedCustomerIds}
        showHistoricalData={showHistoricCustomers}
        handleCheckboxChange={handleCheckboxChange}
      />
    </Grid>
  )
}
