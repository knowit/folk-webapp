import { Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React, { useEffect, useState, useCallback } from 'react'
import { EmployeeTableResponse } from '../../api/data/employee/employeeApiTypes'
import { useEmployeeTable } from '../../api/data/employee/employeeQueries'
import EmployeeInfo from '../../components/EmployeeInfo'
import { useCategories } from '../../components/FilterInput'
import { GridItem } from '../../components/GridItem'
import { CustomerStatusData } from '../../data/components/table/cells/CustomerStatusCell'
import {
  CenteredHeaderCell,
  ConsultantCell,
  CustomerStatusCell,
  CvCell,
} from '../../data/components/table/DataCells'
import { getSearchableColumns } from '../../data/DDTable'
import CustomerDropdown from './CustomerDropdown'
import CustomerFilter from './CustomerFilter'

const CustomerColumns = [
  {
    title: 'Konsulent',
    searchable: true,
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
    searchable: true,
    getSearchValue: (customer: CustomerStatusData) => {
      return `${customer.customer} ${customer.workOrderDescription}`
    },
  },
  {
    title: 'CV',
    renderCell: CvCell,
    headerCell: CenteredHeaderCell,
  },
]

type EmployeeGroupedCustomers = Record<string, EmployeeTableResponse[]>
export default function CustomerList() {
  const [initialData, setInitialData] = useState<EmployeeTableResponse[]>([])
  const [dropdowns, setDropdowns] = useState<JSX.Element[]>([])
  const { data: employeeData, error } = useEmployeeTable()

  const categories = useCategories()

  const pending = !employeeData && error

  function groupByCustomers(
    employees: EmployeeTableResponse[],
    columnIndex: number
  ) {
    return employees.reduce(
      (groups: EmployeeGroupedCustomers, employee: EmployeeTableResponse) => {
        const group = groups[employee.rowData[columnIndex].customer] || []
        group.push(employee)
        groups[employee.rowData[columnIndex].customer] = group
        return groups
      },
      {}
    )
  }

  const createDropDowns = useCallback(
    (customers: EmployeeGroupedCustomers, expand?: boolean) => {
      const dropdowns: JSX.Element[] = []
      !pending &&
        customers &&
        Object.keys(customers)
          .sort()
          .forEach((customer) =>
            dropdowns.push(
              <CustomerDropdown
                key={`${customer}`}
                customerName={customer}
                employees={customers[customer]}
                expand={expand}
                columns={CustomerColumns}
              />
            )
          )
      setDropdowns(dropdowns)
    },
    [pending]
  )

  const handleSearchAndFilter = (filtered: EmployeeTableResponse[]) => {
    const expand = filtered.length === initialData.length
    const grouped = groupByCustomers(filtered, 2)
    createDropDowns(grouped, !expand)
  }

  const prepareTablePayLoad = useCallback(() => {
    const statusIconData = 2
    const customerData = 3

    if (employeeData && !pending) {
      employeeData.map((employee) => {
        if (!employee.rowData[customerData].customer) {
          employee.rowData[customerData] = { customer: 'Ikke i prosjekt' }
        }
        employee.rowData.splice(statusIconData, 1)
      })
      setInitialData(employeeData)
      const groups = groupByCustomers(employeeData, 2) // customerIndex changes after splice
      createDropDowns(groups)
    }
  }, [createDropDowns, employeeData, pending])

  useEffect(() => {
    if (employeeData) {
      prepareTablePayLoad()
    }
  }, [employeeData, prepareTablePayLoad])

  return (
    <Grid container>
      {pending ? (
        <Skeleton width={'100%'} animation="wave" />
      ) : (
        <CustomerFilter
          title="Filtre"
          filter={handleSearchAndFilter}
          employees={initialData}
          searchableColumns={getSearchableColumns(CustomerColumns)}
          categories={categories}
        />
      )}

      {!dropdowns || pending ? (
        <Skeleton width={'100%'} animation="wave" />
      ) : dropdowns.length > 0 ? (
        dropdowns
      ) : (
        <GridItem fullSize>
          <div style={{ padding: '5px' }}>Ingen treff.</div>
        </GridItem>
      )}
    </Grid>
  )
}
