import React, { useState, useEffect } from 'react'
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
  const allRows = employees
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(
    () => {
      const filteredRows = searchAndFilter(
        allRows,
        searchableColumns,
        searchTerm
      )
      onFilter(filteredRows)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchTerm]
  )

  return (
    <GridItemHeader title={title} green>
      <SearchInput
        placeholder={'Søk på konsulentnavn eller kunde'}
        onSearch={(searchTerm) => setSearchTerm(searchTerm)}
        onClear={() => setSearchTerm('')}
      />
    </GridItemHeader>
  )
}
