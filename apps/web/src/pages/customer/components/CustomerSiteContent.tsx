import { makeStyles } from '@mui/styles'
import {
  useCustomerCardData,
  useHoursBilledPerCustomerCharts,
} from '../../../api/data/customer/customerQueries'
import CustomerCard from '../cards/CustomerCard'
import { EmployeeTable } from '../../employee/table/EmployeeTable'
import { CustomerNotFound } from './CustomerNotFound'
import { ChartPeriod } from '../../../components/charts/chartFilters/useChartData'
import { useState } from 'react'
import { Grid, styled } from '@mui/material'
import { GridItem } from '../../../components/gridItem/GridItem'
import HoursBilledPerWeekChart from '../cards/HoursBilledPerWeekChart'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    lineHeight: '1.25em',
    fontSize: '16px',
    flexDirection: 'column',
    padding: '10px',
  },
  header: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    '& > *:not(:first-child)': {
      marginLeft: '25px',
      flexGrow: 1,
    },
  },
  body: {
    display: 'flex',
    padding: '10px',
    flexDirection: 'row',
    '& section': {
      marginTop: '25px',
    },
  },

  graph: {
    width: '75%',
    marginRight: '5%',
  },

  customerCard: {
    width: '20%',
  },
})

interface Props {
  customerId: string
}

export function CustomerSiteContent({ customerId }: Props) {
  const classes = useStyles()
  const [selectedChartPeriod, setSelectedChartPeriod] = useState(
    ChartPeriod.WEEK
  )
  const { data: hoursBilledData } = useHoursBilledPerCustomerCharts()
  const isLoading = !hoursBilledData

  let historicalCustomer = false

  const cardData = useCustomerCardData(customerId)

  const customerData = hoursBilledData?.data?.find(
    (data) => data.customer == customerId
  )
  let historicalCustomerData = null

  if (!customerData && !isLoading) {
    return <CustomerNotFound customerId={customerId} />
  }

  if (customerData && !cardData) {
    historicalCustomer = true
    historicalCustomerData = {
      customer: customerData.customer,
      consultants: 0,
      billedTotal: customerData.hours,
    }
  }

  return (
    <article className={classes.root}>
      <div className={classes.header}>
        <h1> {customerId} </h1>
      </div>
      <div className={classes.body}>
        <div className={classes.graph}>
          <Grid container spacing={2}>
            <GridItem fullSize>
              <GridContainer>
                <HoursBilledPerWeekChart
                  customersWithConsultants={new Array(customerId)}
                  selectedCustomerIds={new Array(customerId)}
                  specificCustomer
                  selectedChartPeriod={selectedChartPeriod}
                  setSelectedChartPeriod={setSelectedChartPeriod}
                />
              </GridContainer>
            </GridItem>
          </Grid>
        </div>
        <div className={classes.customerCard}>
          {cardData || historicalCustomer ? (
            <CustomerCard
              key={customerId}
              data={cardData ? cardData : historicalCustomerData}
              selectedCustomerIds={[customerId]}
              customerSpecificCard={true}
              vertical={true}
              selectedChartPeriod={selectedChartPeriod}
            />
          ) : null}
        </div>
      </div>
      <div>
        {customerData ? (
          <EmployeeTable
            customerSpecific
            customerId={customerId}
            selectedChartPeriod={selectedChartPeriod}
          />
        ) : (
          ''
        )}
      </div>
    </article>
  )
}

const GridContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: '3fr',
  gridGap: '1rem',
})
