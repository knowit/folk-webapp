import { useCompetenceFilter } from '../../api/data/competence/competenceQueries'
import { EmployeeTableRow } from '../../api/data/employee/employeeApiTypes'
import { SearchableColumn } from '../../data/DDTable'
import { EmployeeForCustomerList } from '../../pages/customer/CustomerList'

export interface CategoryWithGroup {
  category: string
  group: string
}

export interface FilterObject {
  name: DynamicFilterType
  values: string[]
  threshold: number
  placeholder: string
  datafetch: () => CategoryWithGroup[]
}

export type DynamicFilterType = 'COMPETENCE' | 'MOTIVATION'

export enum EmployeeTableColumnMapping {
  CUSTOMER = 3,
  MOTIVATION = 5,
  COMPETENCE = 6,
}

function searchRow(
  row: EmployeeTableRow | EmployeeForCustomerList,
  searchableColumns: SearchableColumn[],
  searchTerm: string
) {
  const wordsInSearchTerm = searchTerm
    .split(' ')
    .map(normalizeWord)
    .filter(Boolean)

  const searchableColumnWords = searchableColumns
    .flatMap((column) => {
      const columnValue = column.getSearchValue(row.rowData[column.columnIndex])
      if (typeof columnValue === 'string') {
        return columnValue.split(' ').map(normalizeWord)
      }
      if (typeof columnValue === 'number') {
        return String(columnValue)
      }
      return []
    })
    .filter(Boolean)

  return wordsInSearchTerm.every((searchWord) =>
    searchableColumnWords.reduce(
      (foundWordMatch: boolean, columnWord) =>
        foundWordMatch || columnWord.includes(searchWord),
      false
    )
  )
}

function normalizeWord(word: string) {
  return word.toLowerCase().trim()
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
  rows: EmployeeTableRow[],
  searchableColumns: SearchableColumn[],
  searchTerm: string,
  filters: FilterObject[] = []
) => {
  const hasSearchTerm = !!searchTerm && searchTerm.trim() !== ''
  return rows.filter((row) => {
    const rowMatchesSearchTerm = hasSearchTerm
      ? searchRow(row, searchableColumns, searchTerm)
      : true

    let rowMatchesFilters = true

    filters.forEach((filter) => {
      if (filter.values.length > 0) {
        const rowDataIndex = EmployeeTableColumnMapping[filter.name]
        rowMatchesFilters =
          rowMatchesFilters &&
          filterRow(row.rowData[rowDataIndex], filter.values, filter.threshold)
      }
    })

    return rowMatchesSearchTerm && rowMatchesFilters
  })
}

export function searchEmployeesByCustomer(
  employeesByCustomer: EmployeeForCustomerList[],
  searchableColumns: SearchableColumn[],
  searchTerm: string
) {
  return employeesByCustomer.filter((employee) =>
    searchRow(employee, searchableColumns, searchTerm)
  )
}

export function filterNonCustomer(rows: EmployeeTableRow[]) {
  return rows.filter((row) => {
    const customerColumnIdx = EmployeeTableColumnMapping['CUSTOMER']
    const hasNoCustomer = !row.rowData[customerColumnIdx]
    return hasNoCustomer
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
