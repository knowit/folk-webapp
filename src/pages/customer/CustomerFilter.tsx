import * as React from 'react'
import SearchInput from '../../components/SearchInput'
import { SearchableColumn } from '../../data/DDTable'
import {
  CategoryWithGroup,
  searchEmployeesByCustomer,
} from '../../components/filter/FilterUtil'
import { EmployeeForCustomerList } from './CustomerList'
import { GridItemHeader } from '../../components/gridItem/GridItemHeader'

interface CustomerFilterProps {
  title: string
  onFilter: (filteredRows: EmployeeForCustomerList[]) => void
  employees: EmployeeForCustomerList[]
  searchableColumns: SearchableColumn[]
  categories: CategoryWithGroup[]
}

export function CustomerFilter({
  title,
  onFilter,
  employees,
  searchableColumns,
}: CustomerFilterProps) {
  const handleSearchChange = (searchTerm: string) => {
    const filteredRows = searchEmployeesByCustomer(
      employees,
      searchableColumns,
      searchTerm
    )
    onFilter(filteredRows)
  }

  return (
    <GridItemHeader title={title} green>
      <SearchInput
        placeholder={'Søk på konsulentnavn eller kunde'}
        onSearch={(searchTerm) => handleSearchChange(searchTerm)}
        onClear={() => onFilter(employees)}
      />
    </GridItemHeader>
  )
}
