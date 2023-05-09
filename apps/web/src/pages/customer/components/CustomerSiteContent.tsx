import { makeStyles } from '@mui/styles'
import * as React from 'react'
import {
  useCustomerCards,
  useEmployeesByCustomer,
} from '../../../api/data/customer/customerQueries'
import { EmployeesForCustomer } from './EmployeesForCustomer'

import { EmployeeNotFound } from '../../employee/components/EmployeeNotFound'
import { HoursBilledPerCustomerCard, HoursBilledPerWeekCard } from '../cards'
import { CustomerSpecificHoursBilledGraph } from './CustomerSpesificHoursBilledGraph'

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
  column: {
    flexGrow: 5,
    flexBasis: '10%',
    maxWidth: '50%', // Chart does not honor flexBasis
    '&:not(:first-child)': {
      marginLeft: '50px',
    },
  },
})

interface Props {
  customerId: string
}

export function CustomerSiteContent({ customerId }: Props) {
  const classes = useStyles()

  const { data, error } = useEmployeesByCustomer()
  const { data: cardData } = useCustomerCards()
  const isLoading = !data

  const hoursData = cardData?.find((data) => data.customer == customerId)

  const customerData = data?.filter((data) => data.customer_name == customerId)

  if (customerData?.length == 0) {
    return <EmployeeNotFound employeeId={customerId} />
  }

  return (
    <article className={classes.root}>
      <div className={classes.header}>
        <h1> {customerId} </h1>
      </div>
      <div className={classes.body}>
        <div className={classes.column}>
          <section>
            <h2>Konsulenter på Prosjekt</h2>
            <EmployeesForCustomer
              employees={customerData ? customerData[0]?.employees : null}
              isLoading={isLoading}
              error={error}
            />
          </section>
        </div>
        <div className={classes.column}>
          <h2>Timer brukt per periode</h2>
          <CustomerSpecificHoursBilledGraph
            customerId={customerId}
          ></CustomerSpecificHoursBilledGraph>
          <section>
            <strong>Antall timer siste perioden:</strong>{' '}
            {hoursData?.billedLastPeriod}
            <br />
            <strong>Antall timer totalt:</strong> {hoursData?.billedTotal}
          </section>
        </div>
      </div>
    </article>
  )
}
