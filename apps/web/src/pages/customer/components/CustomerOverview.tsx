import React, { useEffect, useState } from 'react'
import CustomerCardListOverview from './CustomerCardListOverview'
import { Grid } from '@mui/material'
import { HoursBilledPerWeekCard } from '../cards'
import { useCustomerCards } from '../../../api/data/customer/customerQueries'
import storageTokens from '../util/local-storage-tokens'
import { useMatomo } from '@jonkoops/matomo-tracker-react'

export const CustomerOverview = () => {
  const { data } = useCustomerCards()
  const customers = data?.map((item) => item.customer)
  const [showHistoricCustomer, setShowHistoricCustomer] = useState(false)
  const [selectedCustomerIds, setSelectedCustomerIds] = useState(null)
  const [selectedPeriodStartDate, setPeriodStartDate] = useState(null)
  const [selectedPeriodEndDate, setPeriodEndDate] = useState(null)
  const { trackEvent } = useMatomo()

  useEffect(() => {
    const selectedCustomerIds = localStorage.getItem('selectedCustomerIds')
    const startDate = storageTokens.getPeriodStartDate()
    const endDate = storageTokens.getPeriodEndDate()

    if (selectedCustomerIds) {
      setSelectedCustomerIds(JSON.parse(selectedCustomerIds))
    } else {
      setSelectedCustomerIds([])
    }

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

  const handleCustomerHistory = () => {
    setShowHistoricCustomer(!showHistoricCustomer)
  }

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    customerId: string
  ) => {
    trackEvent({ category: 'filter-kunde', action: 'click-event' })
    if (event.target.checked) {
      setSelectedCustomerIds([...selectedCustomerIds, customerId])
    } else {
      setSelectedCustomerIds(
        selectedCustomerIds.filter((id) => id !== customerId)
      )
    }
  }

  return (
    <Grid container spacing={2}>
      <HoursBilledPerWeekCard
        selectedCustomerIds={selectedCustomerIds}
        setSelectedCustomerIds={setSelectedCustomerIds}
        handleCheckboxChange={handleCheckboxChange}
        selectedPeriodStartDate={selectedPeriodStartDate}
        selectedPeriodEndDate={selectedPeriodEndDate}
        handleDateRangeChange={function (
          startDate?: Date,
          endDate?: Date
        ): void {
          setPeriodStartDate(startDate)
          setPeriodEndDate(endDate)
        }}
        customersWithConsultants={customers}
        customerHistory={showHistoricCustomer}
        handleCustomerHistory={handleCustomerHistory}
        customerSpecificGraph={false}
      />
      <CustomerCardListOverview
        selectedCustomerIds={selectedCustomerIds}
        showHistoricalData={showHistoricCustomer}
        customersWithConsultants={customers}
        handleCheckboxChange={handleCheckboxChange}
      />
    </Grid>
  )
}
