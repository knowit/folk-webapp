import { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { HoursBilledPerWeekCard } from '../cards'
import storageTokens from '../util/local-storage-tokens'

export const CustomerSpecificHoursBilledGraph = ({ customerId }) => {
  const [selectedPeriodStartDate, setPeriodStartDate] = useState(null)
  const [selectedPeriodEndDate, setPeriodEndDate] = useState(null)

  useEffect(() => {
    const startDate = storageTokens.getPeriodStartDate()
    const endDate = storageTokens.getPeriodEndDate()

    setPeriodStartDate(startDate)
    setPeriodEndDate(endDate)
  }, [])
  useEffect(() => {
    storageTokens.setPeriodStartDate(selectedPeriodStartDate)
  }, [selectedPeriodStartDate])

  useEffect(() => {
    storageTokens.setPeriodEndDate(selectedPeriodEndDate)
  }, [selectedPeriodEndDate])

  return (
    <Grid container spacing={2}>
      <HoursBilledPerWeekCard
        selectedCustomerIds={new Array(customerId)}
        selectedPeriodStartDate={selectedPeriodStartDate}
        selectedPeriodEndDate={selectedPeriodEndDate}
        handleDateRangeChange={function (
          startDate?: Date,
          endDate?: Date
        ): void {
          setPeriodStartDate(startDate)
          setPeriodEndDate(endDate)
        }}
        customerSpecificGraph={true}
        customersWithConsultants={new Array(customerId)}
        customerHistory={true}
      />
    </Grid>
  )
}
