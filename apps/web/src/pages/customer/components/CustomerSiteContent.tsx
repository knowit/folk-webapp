import { makeStyles } from '@mui/styles'
import * as React from 'react'
import {
  useCustomerCards,
  useHoursBilledPerCustomerCharts,
} from '../../../api/data/customer/customerQueries'
import { CustomerSpecificHoursBilledGraph } from './CustomerSpesificHoursBilledGraph'
import CustomerCard from '../cards/CustomerCard'
import { EmployeeTable } from '../../employee/table/EmployeeTable'
import { CustomerNotFound } from './CustomerNotFound'

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
    width: '70%',
    marginRight: '5%',
  },

  customerCard: {
    width: '30%',
  },
})

interface Props {
  customerId: string
}

export function CustomerSiteContent({ customerId }: Props) {
  const classes = useStyles()

  const { data: customerCards } = useCustomerCards()
  const { data: hoursBilledData } = useHoursBilledPerCustomerCharts()
  const isLoading = !hoursBilledData

  let historicalCustomer = false

  const cardData = customerCards?.find((data) => data.customer == customerId)

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
          <h2>Timer brukt per periode</h2>
          <CustomerSpecificHoursBilledGraph customerId={customerId} />
        </div>
        <div className={classes.customerCard}>
          <h2>Fakturerte timer</h2>
          {cardData ? (
            <CustomerCard
              key={customerId}
              data={cardData}
              selectedCustomerIds={[customerId]}
              customerSpecificCard={true}
              horizontalCard={true}
            />
          ) : historicalCustomer ? (
            <CustomerCard
              key={customerId}
              data={historicalCustomerData}
              selectedCustomerIds={[customerId]}
              customerSpecificCard={true}
              horizontalCard={true}
            />
          ) : null}
        </div>
      </div>
      <div>
        {customerData ? (
          <EmployeeTable customerSpecific={true} customerId={customerId} />
        ) : (
          ''
        )}
      </div>
    </article>
  )
}
