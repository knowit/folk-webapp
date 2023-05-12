import { makeStyles } from '@mui/styles'
import * as React from 'react'
import { useCustomerCards } from '../../../api/data/customer/customerQueries'
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
    width: '25%',
  },
})

interface Props {
  customerId: string
}

export function CustomerSiteContent({ customerId }: Props) {
  const classes = useStyles()

  const { data: cardData } = useCustomerCards()

  const customerData = cardData?.find((data) => data.customer == customerId)

  if (!customerData) {
    return <CustomerNotFound customerId={customerId} />
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
          {customerData ? (
            <CustomerCard
              key={customerId}
              data={customerData}
              selectedCustomerIds={new Array(customerId)}
              customerSpecificCard={true}
            />
          ) : (
            ''
          )}
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
