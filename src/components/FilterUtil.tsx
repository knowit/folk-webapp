import { useCompetenceFilter } from '../api/data/competence/competenceQueries'
import { EmployeeTableResponse } from '../api/data/employee/employeeApiTypes'
import { SearchableColumn } from '../data/DDTable'

export interface CategoryWithGroup {
  category: string
  group: string
}

export interface FilterObject {
  name: FilterType
  values: string[]
  threshold: number
  placeholder: string
  datafetch: () => CategoryWithGroup[]
}
export type FilterType = 'COMPETENCE' | 'MOTIVATION' | 'CUSTOMER'

const ColumnMapping: Record<FilterType, number> = {
  MOTIVATION: 4,
  COMPETENCE: 5,
  CUSTOMER: 3,
}

function searchRow(
  row: EmployeeTableResponse,
  searchableColumns: SearchableColumn[],
  searchTerm: string
) {
  return searchableColumns
    .map((column) =>
      column
        .getSearchValue(row.rowData[column.columnIndex])
        .toLowerCase()
        .trim()
        .includes(searchTerm.toLowerCase().trim())
    )
    .reduce((a, b) => a || b, false)
}

function filterRow(
  columnValue: Record<string, number>,
  filters: string[],
  filterThreshold: number
) {
  return filters
    .map((filterKey) => {
      return columnValue?.[filterKey] >= filterThreshold
    })
    .reduce((a, b) => a && b)
}

export const searchAndFilter = (
  rows: EmployeeTableResponse[],
  searchableColumns: SearchableColumn[],
  filters: FilterObject[],
  searchTerm: string
) => {
  const hasSearchTerm = !!searchTerm && searchTerm.trim() !== ''
  return rows.filter((row: EmployeeTableResponse) => {
    const rowMatchesSearchTerm = hasSearchTerm
      ? searchRow(row, searchableColumns, searchTerm)
      : true

    let rowMatchesFilters = true

    filters.map((filter) => {
      if (filter.values.length > 0) {
        const rowDataIndex = ColumnMapping[filter.name]
        rowMatchesFilters =
          rowMatchesFilters &&
          filterRow(row.rowData[rowDataIndex], filter.values, filter.threshold)
      }
    })

    return rowMatchesSearchTerm && rowMatchesFilters
  })
}

export function filterNonCustomer(rows: EmployeeTableResponse[]) {
  return rows.filter((row: EmployeeTableResponse) => {
    const rowDataIndex = ColumnMapping['CUSTOMER']
    return Object.keys(row.rowData[rowDataIndex]).length === 0
  })
}

export function handleFilterChange(
  prevFilters: FilterObject[],
  newFilterValues: string[],
  index: number
) {
  prevFilters[index].values = newFilterValues
  return [...prevFilters]
}

export function handleThresholdChange(
  prevFilters: FilterObject[],
  threshold: number,
  index: number
) {
  prevFilters[index].threshold = threshold
  return [...prevFilters]
}

export function useCategories(): CategoryWithGroup[] {
  const { data: categories } = useCompetenceFilter()
  return (categories ?? []).flatMap((mainCategory) =>
    mainCategory.subCategories.map((subCategory) => ({
      category: subCategory,
      group: mainCategory.category,
    }))
  )
}
