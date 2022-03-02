import * as React from 'react'
import SearchInput from '../../components/SearchInput'
import { SearchableColumn } from '../../data/DDTable'
import {
  CategoryWithGroup,
  searchAndFilter,
} from '../../components/filter/FilterUtil'
import { EmployeeTableResponse } from '../../api/data/employee/employeeApiTypes'
import { GridItemHeader } from '../../components/gridItem/GridItemHeader'

interface CustomerFilterProps {
  title: string
  onFilter: (filteredRows: EmployeeTableResponse[]) => void
  employees: EmployeeTableResponse[]
  searchableColumns: SearchableColumn[]
  categories: CategoryWithGroup[]
}

export default function CustomerFilter({
  title,
  onFilter,
  employees,
  searchableColumns,
}: CustomerFilterProps) {
  const handleSearchChange = (searchTerm: string) => {
    const filteredRows = searchAndFilter(
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
