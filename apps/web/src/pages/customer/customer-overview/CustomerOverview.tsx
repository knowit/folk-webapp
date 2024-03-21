import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import CustomerHoursPerWeekSection from './CustomerHoursPerWeekSection'
import CustomerCardList from './CustomerCardList'
import { ChartPeriod } from '../../../components/charts/chartFilters/useChartData'

export const CustomerOverview = () => {
  const [showHistoricCustomers, setShowHistoricCustomers] = useState(false)
  const [selectedChartPeriod, setSelectedChartPeriod] = useState(
    ChartPeriod.WEEK
  )
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<string[]>([])

  useEffect(() => {
    if (selectedCustomerIds !== null) {
      localStorage.setItem(
        'selectedCustomerIds',
        JSON.stringify(selectedCustomerIds)
      )
    }
  }, [selectedCustomerIds])

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    customerId: string
  ) => {
    if (event.target.checked) {
      setSelectedCustomerIds((oldIds) => oldIds.concat(customerId))
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
        setSelectedCustomerIds={setSelectedCustomerIds}
        showCustomerHistory={showHistoricCustomers}
        setShowCustomerHistory={setShowHistoricCustomers}
        selectedChartPeriod={selectedChartPeriod}
        setSelectedChartPeriod={setSelectedChartPeriod}
      />
      <CustomerCardList
        selectedCustomerIds={selectedCustomerIds}
        showHistoricalData={showHistoricCustomers}
        handleCheckboxChange={handleCheckboxChange}
        selectedChartPeriod={selectedChartPeriod}
      />
    </Grid>
  )
}
