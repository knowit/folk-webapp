import React, { useEffect, useState } from 'react'
import CustomerCardListOverview from './CustomerCardListOverview'
import { Grid } from '@mui/material'
import CustomerHoursPerWeekSection from './CustomerHoursPerWeekSection'
import { useSelectedCustomerIds } from '../util/local-storage-hooks'

export const CustomerOverview = () => {
  const [showHistoricCustomers, setShowHistoricCustomers] = useState(false)
  const { selectedCustomerIds, setSelectedCustomerIds } =
    useSelectedCustomerIds()

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
