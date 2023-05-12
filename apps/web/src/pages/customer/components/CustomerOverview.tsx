import React, { useEffect, useState } from 'react'
import CustomerCardListOverview from './CustomerCardListOverview'
import { Grid } from '@mui/material'
import { HoursBilledPerWeekCard } from '../cards'
import { useCustomerCards } from '../../../api/data/customer/customerQueries'

export const CustomerOverview = () => {
  const { data } = useCustomerCards()
  const customers = data?.map((item) => item.customer)
  const [showHistoricCustomer, setShowHistoricCustomer] = useState(false)
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
    const selectedPeriodEndDate = localStorage.getItem('selectedPeriodEndDate')
    if (selectedPeriodEndDate) {
      setSelectedPeriodEndDate(new Date(JSON.parse(selectedPeriodEndDate)))
    } else {
      setSelectedPeriodEndDate(null)
    }
  }, [])
  useEffect(() => {
    if (selectedPeriodEndDate !== null) {
      localStorage.setItem(
        'selectedPeriodEndDate',
        JSON.stringify(selectedPeriodEndDate)
      )
    } else {
      if (localStorage.getItem('selectedPeriodEndDate')) {
        localStorage.removeItem('selectedPeriodEndDate')
      }
    }
  }, [selectedPeriodEndDate])

  const handleCustomerHistory = () => {
    setShowHistoricCustomer(!showHistoricCustomer)
  }

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    customerId: string
  ) => {
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
          setSelectedPeriodStartDate(startDate)
          setSelectedPeriodEndDate(endDate)
        }}
        customersWithConsultants={customers}
        customerHistory={showHistoricCustomer}
        handleCustomerHistory={handleCustomerHistory}
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
