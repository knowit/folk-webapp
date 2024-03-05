import { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import storageTokens from '../util/local-storage-tokens'
import HoursBilledPerWeekChart from '../cards/HoursBilledPerWeekChart'
import { GridItem } from '../../../components/gridItem/GridItem'

const GridContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: '3fr',
  gridGap: '1rem',
})

export const CustomerSpecificHoursBilledGraph = ({ customerId }) => {
  const [selectedPeriodStartDate, setPeriodStartDate] = useState(null)
  const [selectedPeriodEndDate, setPeriodEndDate] = useState(null)

  useEffect(() => {
    const startDate = storageTokens.getPeriodStartDate()
    const endDate = storageTokens.getPeriodEndDate()

    setPeriodStartDate(startDate)
    setPeriodEndDate(endDate)
    localStorage.setItem('selectedCustomerIds', JSON.stringify([customerId]))
  }, [customerId])

  useEffect(() => {
    storageTokens.setPeriodStartDate(selectedPeriodStartDate)
  }, [selectedPeriodStartDate])

  useEffect(() => {
    storageTokens.setPeriodEndDate(selectedPeriodEndDate)
  }, [selectedPeriodEndDate])

  return (
    <Grid container spacing={2}>
      <GridItem fullSize>
        <GridContainer>
          <HoursBilledPerWeekChart
            handleDateRangeChange={function (
              startDate?: Date,
              endDate?: Date
            ): void {
              setPeriodStartDate(startDate)
              setPeriodEndDate(endDate)
            }}
            startDate={selectedPeriodStartDate}
            endDate={selectedPeriodEndDate}
            customersWithConsultants={new Array(customerId)}
            selectedCustomerIds={new Array(customerId)}
            specificCustomer
          />
        </GridContainer>
      </GridItem>
    </Grid>
  )
}
