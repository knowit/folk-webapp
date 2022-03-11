import * as React from 'react'
import { Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import EmployeeInfo from '../employee/components/EmployeeInfo'
import { GridItem } from '../../components/gridItem/GridItem'
import {
  CenteredHeaderCell,
  ConsultantCell,
  CvCell,
} from '../../data/components/table/DataCells'
import { FallbackMessage } from '../employee/components/FallbackMessage'
import { useEmployeesByCustomer } from '../../api/data/customer/customerQueries'
import CustomerAccordion from './CustomerAccordion'
import { Columns } from '../../data/types'

const customerColumns: Columns[] = [
  {
    title: 'Konsulent',
    isExpandable: true,
    getSearchValue: (consultant: { value: string }) => {
      return consultant.value
    },
    renderCell: ConsultantCell,
    renderExpanded: EmployeeInfo,
  },
  { title: 'Tittel' },
  {
    title: 'Kunde',
    getSearchValue: (customerProject: string) => {
      return customerProject
    },
  },
  {
    title: 'CV',
    renderCell: CvCell,
    headerCell: CenteredHeaderCell,
  },
]

export default function CustomerList() {
  // const [searchTerm, setSearchTerm] = useState('')
  const { data, error } = useEmployeesByCustomer()
  const isLoading = !data

  if (error) {
    return (
      <FallbackMessage
        isError
        message="Det oppstod en feil ved henting av data."
      />
    )
  }

  // const filteredData = searchEmployeesByCustomer(
  //   data,
  //   getSearchableColumns(customerColumns),
  //   searchTerm
  // )

  const getCustomerAccordions = () => {
    if (isLoading) {
      return <Skeleton width={'100%'} animation="wave" />
    }

    if (data.length === 0) {
      return (
        <GridItem fullSize>
          <div style={{ padding: '5px' }}>Ingen treff.</div>
        </GridItem>
      )
    }

    return data
      .sort(
        ({ customer_name: aCustomerName }, { customer_name: bCustomerName }) =>
          String(aCustomerName).localeCompare(bCustomerName)
      )
      .map(({ customer_name, employees }) => (
        <CustomerAccordion
          key={customer_name}
          customerName={customer_name}
          employees={employees}
          columns={customerColumns}
        />
      ))
  }

  return (
    <Grid container>
      {/*isLoading ? (
        <Skeleton width={'100%'} animation="wave" />
      ) : (
        <CustomerFilter onSearch={setSearchTerm} />
      )*/}

      {getCustomerAccordions()}
    </Grid>
  )
}
