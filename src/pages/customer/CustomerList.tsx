import { Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React, { useEffect, useState, useCallback } from 'react'
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
import { useFetchedData } from '../../hooks/service'
import CustomerDropdown from './CustomerDropdown'
import CustomerFilter from './CustomerFilter'
interface Customers {
  [key: string]: []
}

export type Payload = { [key: string]: any }

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

export default function CustomerList() {
  const [initialData, setInitialData] = useState<Payload>([])
  const [dropdowns, setDropdowns] = useState<JSX.Element[]>([])
  const [payload, pending] = useFetchedData<Payload>({
    url: '/api/data/employeeTable',
  })

  const categories = useCategories()

  function groupByCustomers(payload: Payload, customerDataIndex: number) {
    return payload.reduce(
      (
        groups: { [x: string]: any },
        employee: { rowData: { customer: string | number }[] }
      ) => {
        const group = groups[employee.rowData[customerDataIndex].customer] || []
        group.push(employee)
        groups[employee.rowData[customerDataIndex].customer] = group
        return groups
      },
      {}
    )
  }

  const createDropwDowns = useCallback(
    (customers: Customers, expand?: boolean) => {
      const dropdowns: any[] = []
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

  const handleSearchAndFilter = (filtered: any[]) => {
    const expand = filtered.length === initialData.length
    const grouped = groupByCustomers(filtered, 2)
    createDropwDowns(grouped, !expand)
  }

  const prepareTablePayLoad = useCallback(() => {
    const statusIconData = 2
    const customerData = 3

    if (Array.isArray(payload) && !pending) {
      payload.map((emp) => {
        if (emp.rowData[customerData].customer === undefined) {
          emp.rowData[customerData] = { customer: 'Ikke i prosjekt' }
        }
        emp.rowData.splice(statusIconData, 1)
      })
      setInitialData(payload)
      const groups = groupByCustomers(payload, 2) // customerIndex changes after splice
      createDropwDowns(groups)
    }
  }, [createDropwDowns, payload, pending])

  useEffect(() => {
    prepareTablePayLoad()
  }, [prepareTablePayLoad])

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
