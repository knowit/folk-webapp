import { makeStyles } from '@mui/styles'
import * as React from 'react'
import {
  useCustomerCards,
  useEmployeesByCustomer,
} from '../../../api/data/customer/customerQueries'
import { EmployeesForCustomer } from './EmployeesForCustomer'
import { EmployeeNotFound } from '../../employee/components/EmployeeNotFound'
import { CustomerSpecificHoursBilledGraph } from './CustomerSpesificHoursBilledGraph'
import CustomerCard from '../cards/CustomerCard'
import { ConsultantInfo } from '../../../api/data/employee/employeeApiTypes'
import { EmployeeTable } from '../../employee/table/EmployeeTable'

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

  const { data, error } = useEmployeesByCustomer()
  const { data: cardData } = useCustomerCards()
  const isLoading = !data

  const hoursData = cardData?.find((data) => data.customer == customerId)

  const customerData = data?.filter((data) => data.customer_name == customerId)

  if (customerData?.length == 0) {
    return <EmployeeNotFound employeeId={customerId} />
  }

  const consultantInfo: ConsultantInfo[] = []

  if (customerData) {
    customerData[0].employees.forEach((employee) => {
      consultantInfo.push(employee.rowData[0])
    })
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
          {hoursData ? <CustomerCard key={customerId} data={hoursData} /> : ''}
        </div>
      </div>
      <div>
        {
          customerData ? (
            <EmployeeTable customerSpecific={true} customerId={customerId} />
          ) : (
            ''
          )
          // <EmployeesForCustomer
          //   employees={customerData ? customerData[0]?.employees : null}
          //   isLoading={isLoading}
          //   error={error}
          // />
        }
      </div>
    </article>
  )
}
