import { useCompetenceFilter } from '../../api/data/competence/competenceQueries'
import { EmployeeTableRow } from '../../api/data/employee/employeeApiTypes'
import { SearchableColumn } from '../../pages/employee/table/EmployeeTableWithFilter'
import { EmployeeForCustomerList } from '../../api/data/customer/customerApiTypes'

export interface CategoryWithGroup {
  category: string
  group: string
}

export interface FilterEntry {
  value: string
  threshold: number
}

export interface FilterObject {
  column:
    | EmployeeTableColumnMapping.MOTIVATION
    | EmployeeTableColumnMapping.COMPETENCE
  label: string
  filters: FilterEntry[]
  placeholder: string
  datafetch: () => CategoryWithGroup[]
}

export enum EmployeeTableColumnMapping {
  CUSTOMER = 3,
  MOTIVATION = 5,
  COMPETENCE = 6,
}

export function searchRow(
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
  filterValue: string,
  filterThreshold: number
) {
  return columnValue?.[filterValue] >= filterThreshold
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

    if (filters.length > 0) {
      filters.forEach((filterObject) => {
        filterObject.filters.forEach((filterEntry) => {
          rowMatchesFilters =
            rowMatchesFilters &&
            filterRow(
              row.rowData[filterObject.column],
              filterEntry.value,
              filterEntry.threshold
            )
        })
      })
    }
    return rowMatchesSearchTerm && rowMatchesFilters
  })
}

export function filterNonCustomer(rows: EmployeeTableRow[]) {
  return rows.filter((row) => {
    const rowDataIndex = EmployeeTableColumnMapping['CUSTOMER']
    const hasNoCustomer =
      !row.rowData[rowDataIndex]?.customer &&
      row.rowData[0].role === 'Consultant'
    return hasNoCustomer
  })
}

export function handleFilterChange(
  prevFilters: FilterObject[],
  newFilterValues: string[],
  index: number
) {
  const filters = prevFilters[index].filters.map((filterRow) => filterRow.value)
  const newFilters: FilterEntry[] = []
  newFilterValues.forEach((element) => {
    if (!filters.includes(element)) {
      const entry: FilterEntry = { value: element, threshold: 1 }
      newFilters.push(entry)
    }

    if (filters.includes(element)) {
      const filterIndex = filters.indexOf(element)
      newFilters.push(prevFilters[index].filters[filterIndex])
    }
  })
  prevFilters[index].filters = newFilters
  return [...prevFilters]
}

export function handleThresholdChange(
  prevFilters: FilterObject[],
  filterValue: string,
  filterThreshold: number,
  index: number
) {
  const filterIndex = prevFilters[index].filters.findIndex(
    (filter) => filter.value == filterValue
  )
  if (filterIndex >= 0) {
    prevFilters[index].filters[filterIndex].threshold = filterThreshold
  }
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
