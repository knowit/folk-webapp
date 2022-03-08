import * as React from 'react'
import { Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { useState, useMemo } from 'react'
import { useEmployeeTable } from '../../api/data/employee/employeeQueries'
import EmployeeInfo from '../employee/components/EmployeeInfo'
import {
  EmployeeTableColumnMapping,
  searchEmployeesByCustomer,
} from '../../components/filter/FilterUtil'
import { GridItem } from '../../components/gridItem/GridItem'
import {
  Customer,
  CvLinks,
  EmployeeTableRow,
} from '../../api/data/employee/employeeApiTypes'
import {
  CenteredHeaderCell,
  ConsultantCell,
  CustomerStatusCell,
  CvCell,
} from '../../data/components/table/DataCells'
import { getSearchableColumns } from '../../data/DDTable'
import CustomerAccordion from './CustomerAccordion'
import SearchInput from '../../components/SearchInput'
import { GridItemHeader } from '../../components/gridItem/GridItemHeader'
import { FallbackMessage } from '../../components/FallbackMessage'

type EmployeeGroupedCustomers = Record<string, EmployeeForCustomerList[]>

export interface EmployeeForCustomerList {
  rowId: string
  rowData: [
    employeeInfo: {
      value: string // employee name
      image?: string
      email: string
      user_id: string
      degree?: string
    },
    jobTitle: string | undefined | null,
    customer: Customer | undefined | null,
    cvLinks: CvLinks | undefined | null
  ]
}

const customerColumnIdx = 2
const customerColumns = [
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
    renderCell: CustomerStatusCell,
    getSearchValue: (customer: Customer | null) => {
      return customer?.customer
        ? `${customer.customer} ${customer.workOrderDescription}`
        : ''
    },
  },
  {
    title: 'CV',
    renderCell: CvCell,
    headerCell: CenteredHeaderCell,
  },
]

function hasCustomer(employee: EmployeeTableRow) {
  return Boolean(employee.rowData[EmployeeTableColumnMapping['CUSTOMER']])
}

function transformDataForCustomerList(
  employee: EmployeeTableRow
): EmployeeForCustomerList {
  return {
    ...employee,
    // Picking only relevant columns
    rowData: [
      employee.rowData[0],
      employee.rowData[1],
      employee.rowData[3],
      employee.rowData[4],
    ],
  }
}

function groupByCustomers(employees: EmployeeForCustomerList[]) {
  return employees.reduce((groups, employee) => {
    const customerName = employee.rowData[customerColumnIdx]?.customer
    if (customerName) {
      const group = groups[customerName] || []
      group.push(employee)
      groups[customerName] = group
    }
    return groups
  }, {} as EmployeeGroupedCustomers)
}

export default function CustomerList() {
  const [searchTerm, setSearchTerm] = useState('')
  const { data, error } = useEmployeeTable()
  const isLoading = !data

  // We memoize the data transformation to avoid this happening on each render
  const transformedEmployeeData = useMemo(() => {
    return (data ?? []).filter(hasCustomer).map(transformDataForCustomerList)
  }, [data])

  if (error) {
    return (
      <FallbackMessage
        isError
        message="Det oppstod en feil ved henting av data."
      />
    )
  }

  const filteredEmployeeData = searchEmployeesByCustomer(
    transformedEmployeeData,
    getSearchableColumns(customerColumns),
    searchTerm
  )

  const getCustomerAccordions = () => {
    if (isLoading) {
      return <Skeleton width={'100%'} animation="wave" />
    }

    if (filteredEmployeeData.length === 0) {
      return (
        <GridItem fullSize>
          <div style={{ padding: '5px' }}>Ingen treff.</div>
        </GridItem>
      )
    }

    const customerGroups = groupByCustomers(filteredEmployeeData)

    return Object.entries(customerGroups)
      .sort(([aCustomerName], [bCustomerName]) =>
        String(aCustomerName).localeCompare(bCustomerName)
      )
      .map(([customerName, employees]) => (
        <CustomerAccordion
          key={customerName}
          customerName={customerName}
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
        <GridItemHeader title="Filtre" green>
          <SearchInput
            placeholder={'Søk på konsulentnavn eller kunde'}
            onSearch={setSearchTerm}
            onClear={() => setSearchTerm('')}
          />
        </GridItemHeader>
      )}

      {getCustomerAccordions()}
    </Grid>
  )
}
