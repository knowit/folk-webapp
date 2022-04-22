import * as React from 'react'
import { useState } from 'react'
import { Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { GridItem } from '../../../components/gridItem/GridItem'
import {
  CenteredHeaderCell,
  ConsultantCell,
  CvCell,
} from '../../../components/table/DataCells'
import { useEmployeesByCustomer } from '../../../api/data/customer/customerQueries'
import { CustomerAccordion } from './CustomerAccordion'
import { Column } from '../../../components/table/tableTypes'
import { CustomerFilter } from './CustomerFilter'
import { getSearchableColumns } from '../../../components/table/DDTable'
import { searchEmployeesByCustomer } from '../util/search-employees-by-customer'
import { RowCount } from '../../../components/table/RowCount'
import { ConsultantInfo } from '../../../api/data/employee/employeeApiTypes'
import { EmployeeTableExpandedInfo } from '../../employee/table/EmployeeTableExpandedInfo'
import { FallbackMessage } from '../../employee/components/FallbackMessage'

const customerColumns: Column[] = [
  {
    title: 'Konsulent',
    width: 385,
    isExpandable: true,
    getValue: (consultant: ConsultantInfo) => {
      return consultant.name
    },
    renderCell: ConsultantCell,
    renderExpanded: EmployeeTableExpandedInfo,
  },
  { title: 'Tittel', width: 222 },
  {
    title: 'Kunde',
    width: 480,
    getValue: (customerProject: string) => {
      return customerProject
    },
  },
  {
    title: 'CV',
    width: 53,
    renderCell: CvCell,
    headerCell: CenteredHeaderCell,
  },
]

export default function CustomerList() {
  const [searchTerm, setSearchTerm] = useState('')
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

  const filteredData = data
    ? searchEmployeesByCustomer(
        data,
        getSearchableColumns(customerColumns),
        searchTerm
      )
    : []

  const getCustomerAccordions = () => {
    if (isLoading) {
      return <Skeleton width={'100%'} animation="wave" />
    }

    if (filteredData.length === 0) {
      return (
        <GridItem fullSize>
          <div style={{ padding: '5px' }}>Ingen treff.</div>
        </GridItem>
      )
    }

    return filteredData
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
      {isLoading ? (
        <Skeleton width={'100%'} animation="wave" />
      ) : (
        <>
          <CustomerFilter onSearch={setSearchTerm} />
          <RowCount>
            Viser {filteredData.length} av {data.length} kunder
          </RowCount>
        </>
      )}

      {getCustomerAccordions()}
    </Grid>
  )
}
