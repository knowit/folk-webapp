import * as React from 'react'
import { Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { useEffect, useState, useCallback, useMemo } from 'react'
import { useEmployeeTable } from '../../api/data/employee/employeeQueries'
import EmployeeInfo from '../employee/components/EmployeeInfo'
import {
  EmployeeTableColumnMapping,
  useCategories,
} from '../../components/filter/FilterUtil'
import { GridItem } from '../../components/gridItem/GridItem'
import { Customer, CvLinks } from '../../api/data/employee/employeeApiTypes'
import {
  CenteredHeaderCell,
  ConsultantCell,
  CustomerStatusCell,
  CvCell,
} from '../../data/components/table/DataCells'
import { getSearchableColumns } from '../../data/DDTable'
import CustomerDropdown from './CustomerDropdown'
import { CustomerFilter } from './CustomerFilter'

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

const customerColumnIdx = 2

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

export default function CustomerList() {
  const [dropdowns, setDropdowns] = useState<JSX.Element[]>([])
  const { data, error } = useEmployeeTable()

  const categories = useCategories()

  const pending = !data

  const transformedEmployeeData: EmployeeForCustomerList[] = useMemo(() => {
    return (data ?? [])
      .filter((employee) => {
        const hasCustomer = Boolean(
          employee.rowData[EmployeeTableColumnMapping['CUSTOMER']]
        )
        return hasCustomer
      })
      .map((employee) => ({
        ...employee,
        // Picking only relevant columns
        rowData: [
          employee.rowData[0],
          employee.rowData[1],
          employee.rowData[3],
          employee.rowData[4],
        ],
      }))
  }, [data])

  const createDropDowns = useCallback(
    (customers: EmployeeGroupedCustomers) => {
      const dropdowns: JSX.Element[] = []
      if (!pending && customers) {
        Object.keys(customers)
          .sort((aCustomerName, bCustomerName) =>
            String(aCustomerName).localeCompare(bCustomerName)
          )
          .forEach((customer) =>
            dropdowns.push(
              <CustomerDropdown
                key={`${customer}`}
                customerName={customer}
                employees={customers[customer]}
                columns={customerColumns}
              />
            )
          )
      }
      setDropdowns(dropdowns)
    },
    [pending, setDropdowns]
  )

  useEffect(() => {
    const employeeGroups = groupByCustomers(transformedEmployeeData)
    createDropDowns(employeeGroups)
  }, [transformedEmployeeData, createDropDowns])

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

  const handleSearchAndFilter = (filtered: EmployeeForCustomerList[]) => {
    const grouped = groupByCustomers(filtered)
    createDropDowns(grouped)
  }

  const getFallbackMessage = (message: string) => {
    return (
      <GridItem fullSize>
        <div style={{ padding: '5px' }}>{message}</div>
      </GridItem>
    )
  }

  const getCustomerDropdowns = () => {
    if (error) {
      return getFallbackMessage('Det oppstod en feil ved henting av data.')
    }

    if (pending) {
      return <Skeleton width={'100%'} animation="wave" />
    }

    if (dropdowns.length === 0) {
      return getFallbackMessage('Ingen treff.')
    }

    return dropdowns
  }

  return (
    <Grid container>
      {pending ? (
        <Skeleton width={'100%'} animation="wave" />
      ) : (
        <CustomerFilter
          title="Filtre"
          onFilter={handleSearchAndFilter}
          employees={transformedEmployeeData}
          searchableColumns={getSearchableColumns(customerColumns)}
          categories={categories}
        />
      )}

      {getCustomerDropdowns()}
    </Grid>
  )
}
