import React, { useEffect, useState } from 'react'
import { useFetchedData } from '../hooks/service'
import CustomerDropdown from './CustomerDropdown'
import { Column, getSearchableColumns, SearchableColumn } from '../data/DDTable'
import { Grid } from '@material-ui/core'
import CustomerFilter from './CustomerFilter'
import { useCategories } from './CompetenceFilterInput'

interface Customers {
  [key: string]: []
}

export type Payload = { [key: string]: any };

export default function CustomerList() {
  const [payload, pending] = useFetchedData<Payload>({ url: '/api/data/employeeTable' })
  const [initialData, setInitialData] = useState<Payload>([])
  const [dropdowns, setDropdowns] = useState<any[]>([])
  const [searchableColumns, setSearchableColumns] = useState<SearchableColumn[]>()
  const categories = useCategories()

  function preparePayloadForTable() {
    const statusIconData = 2
    const customerData = 3

    if (Array.isArray(payload) && !pending) {
      payload.map(emp => {
        if (emp.rowData[customerData].customer === undefined) {
          emp.rowData[customerData] = {'customer': 'Uten prosjekt'}
        }
        emp.rowData.splice(statusIconData, 1)
      })
      setInitialData(payload)

      const groups = groupByCustomers(payload, 2) // customerIndex changes after splice
      createDropdowns(groups)
    }
  }

  function handleColumns(columns: Column[]) {
    setSearchableColumns(getSearchableColumns(columns))
  }

  function groupByCustomers(payload: Payload, customerDataIndex: number) {
    return payload.reduce((groups: { [x: string]: any }, employee: { rowData: { customer: string | number }[] }) => {
      const group = (groups[employee.rowData[customerDataIndex].customer] || [])
      group.push(employee)
      groups[employee.rowData[customerDataIndex].customer] = group
      return groups
    }, {})
  }

  function createDropdowns(customers: Customers, expand?: boolean) {
    const dropdowns: any[] = []
    !pending && customers && Object.keys(customers).sort().forEach(customer =>
      dropdowns.push(
        <CustomerDropdown
          key={`${customer}`}
          customerName={customer}
          employees={customers[customer]}
          expand={expand}
          callback={handleColumns}
        />)
    )
    setDropdowns(dropdowns)
  }

  const handleSearchAndFilter = (filtered: []) => {
    const expand = filtered.length === initialData.length
    const grouped = groupByCustomers(filtered, 2)
    createDropdowns(grouped, !expand)
  }

  useEffect(() => {
    preparePayloadForTable()
  }, [payload, pending])

  return (
    <Grid container> {/* todo placeholder for ingen hits? */}
      {pending ? <></> : // todo skeletoncomponent
        <CustomerFilter
          title='Filtre'
          filter={handleSearchAndFilter}
          employees={initialData}
          searchableColumns={searchableColumns ? searchableColumns : [] as SearchableColumn[]}
          categories={categories}
        />
      }
      { dropdowns } {/* todo skeletoncomponent  */}
    </Grid>
  )
}