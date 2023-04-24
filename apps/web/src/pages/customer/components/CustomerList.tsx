import * as React from 'react'
import { useState } from 'react'
import { Box } from '@mui/material'
import { BaseSkeleton } from '../../../components/skeletons/BaseSkeleton'
import { GridItem } from '../../../components/gridItem/GridItem'
import {
  CenteredHeaderCell,
  ConsultantCell,
  CvCell,
  SortableHeaderCell,
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
    headerCell: SortableHeaderCell,
  },
  { title: 'Tittel', width: 222 },
  {
    title: 'Kunde',
    width: 480,
    getValue: (customerProject: string) => {
      return customerProject
    },
    headerCell: SortableHeaderCell,
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
    return <FallbackMessage error={error} />
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
      return <BaseSkeleton variant="rectangular" height={500} width={'100%'} />
    }

    if (filteredData.length === 0) {
      return (
        <GridItem fullSize>
          <div style={{ padding: '5px' }}>Ingen treff.</div>
        </GridItem>
      )
    }

    return filteredData
      .sort((a, b) => b.employees.length - b.employees.length)
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
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CustomerFilter currentSearchTerm={searchTerm} onSearch={setSearchTerm} />
      <RowCount>
        Viser {filteredData?.length || 0} av {data?.length || 0} kunder
      </RowCount>
      {getCustomerAccordions()}
    </Box>
  )
}
