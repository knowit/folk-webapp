import { SearchableColumn, TableState } from '../data/DDTable'

export type Action =
  | {
      type: 'REMOVE_FROM_MOTIVATION_FILTER'
      filter: string
      allRows: any[]
      searchableColumns: SearchableColumn[]
    }
  | {
      type: 'CLEAR_MOTIVATION_FILTER'
      allRows: any[]
      searchableColumns: SearchableColumn[]
    }
  | {
      type: 'REMOVE_FROM_COMPETENCE_FILTER'
      filter: string
      allRows: any[]
      searchableColumns: SearchableColumn[]
    }
  | {
      type: 'CLEAR_COMPETENCE_FILTER'
      allRows: any[]
      searchableColumns: SearchableColumn[]
    }
  | {
      type: 'CHANGE_SEARCH_TERM'
      searchTerm: string
      allRows: any[]
      searchableColumns: SearchableColumn[]
    }
  | {
      type: 'UPDATE_COMPETENCE_FILTER'
      filterList: string[]
      allRows: any[]
      searchableColumns: SearchableColumn[]
    }
  | {
      type: 'UPDATE_MOTIVATION_FILTER'
      filterList: string[]
      allRows: any[]
      searchableColumns: SearchableColumn[]
    }
  | {
      type: 'UPDATE_MOTIVATION_THRESHOLD'
      threshold: number
      allRows: any[]
      searchableColumns: SearchableColumn[]
    }
  | {
      type: 'UPDATE_COMPETENCE_THRESHOLD'
      threshold: number
      allRows: any[]
      searchableColumns: SearchableColumn[]
    }

export function reducer(currentState: TableState, action: Action) {
  switch (action.type) {
    case 'REMOVE_FROM_MOTIVATION_FILTER':
      return {
        ...currentState,
        rows: searchAndFilter(
          currentState.rows,
          currentState.motivationFilter.filter(
            (filter) => filter !== action.filter
          ),
          currentState.motivationThreshold,
          currentState.competenceFilter,
          currentState.competenceThreshold,
          currentState.searchTerm,
          action.allRows,
          action.searchableColumns
        ),
        motivationFilter: currentState.motivationFilter.filter(
          (filter) => filter !== action.filter
        ),
      }
    case 'CLEAR_MOTIVATION_FILTER':
      return {
        ...currentState,
        rows: searchAndFilter(
          currentState.rows,
          [],
          currentState.motivationThreshold,
          currentState.competenceFilter,
          currentState.competenceThreshold,
          currentState.searchTerm,
          action.allRows,
          action.searchableColumns
        ),
        motivationFilter: [],
      }
    case 'REMOVE_FROM_COMPETENCE_FILTER':
      return {
        ...currentState,
        rows: searchAndFilter(
          currentState.rows,
          currentState.motivationFilter,
          currentState.motivationThreshold,
          currentState.competenceFilter.filter(
            (filter) => filter !== action.filter
          ),
          currentState.competenceThreshold,
          currentState.searchTerm,
          action.allRows,
          action.searchableColumns
        ),
        competenceFilter: currentState.competenceFilter.filter(
          (filter) => filter !== action.filter
        ),
      }
    case 'CLEAR_COMPETENCE_FILTER':
      return {
        ...currentState,
        rows: searchAndFilter(
          currentState.rows,
          currentState.motivationFilter,
          currentState.motivationThreshold,
          [],
          currentState.competenceThreshold,
          currentState.searchTerm,
          action.allRows,
          action.searchableColumns
        ),
        competenceFilter: [],
      }
    case 'CHANGE_SEARCH_TERM':
      return {
        ...currentState,
        rows: searchAndFilter(
          currentState.rows,
          currentState.motivationFilter,
          currentState.motivationThreshold,
          currentState.competenceFilter,
          currentState.competenceThreshold,
          action.searchTerm,
          action.allRows,
          action.searchableColumns
        ),
        searchTerm: action.searchTerm,
      }
    case 'UPDATE_MOTIVATION_FILTER':
      return {
        ...currentState,
        rows: searchAndFilter(
          currentState.rows,
          action.filterList,
          currentState.motivationThreshold,
          currentState.competenceFilter,
          currentState.competenceThreshold,
          currentState.searchTerm,
          action.allRows,
          action.searchableColumns
        ),
        motivationFilter: action.filterList,
      }
    case 'UPDATE_COMPETENCE_FILTER':
      return {
        ...currentState,
        rows: searchAndFilter(
          currentState.rows,
          currentState.motivationFilter,
          currentState.motivationThreshold,
          action.filterList,
          currentState.competenceThreshold,
          currentState.searchTerm,
          action.allRows,
          action.searchableColumns
        ),
        competenceFilter: action.filterList,
      }
    case 'UPDATE_MOTIVATION_THRESHOLD':
      return {
        ...currentState,
        rows: searchAndFilter(
          currentState.rows,
          currentState.motivationFilter,
          action.threshold,
          currentState.competenceFilter,
          currentState.competenceThreshold,
          currentState.searchTerm,
          action.allRows,
          action.searchableColumns
        ),
        motivationThreshold: action.threshold,
      }
    case 'UPDATE_COMPETENCE_THRESHOLD':
      return {
        ...currentState,
        rows: searchAndFilter(
          currentState.rows,
          currentState.motivationFilter,
          currentState.motivationThreshold,
          currentState.competenceFilter,
          action.threshold,
          currentState.searchTerm,
          action.allRows,
          action.searchableColumns
        ),
        competenceThreshold: action.threshold,
      }
    default:
      return currentState
  }
}

const searchRow = (
  row: any,
  searchableColumns: SearchableColumn[],
  searchTerm: string
) =>
  searchableColumns
    .map((column) =>
      column
        .getSearchValue(row.rowData[column.columnIndex])
        .toLowerCase()
        .trim()
        .includes(searchTerm.toLowerCase().trim())
    )
    .reduce((a, b) => a || b, false)

const filterRow = (
  columnValue: { [key: string]: any },
  filters: string[],
  filterThreshold: number
) =>
  filters
    .map((filterKey) => {
      return columnValue?.[filterKey] >= filterThreshold
    })
    .reduce((a, b) => a && b)

const searchAndFilter = (
  currentRows: any[],
  motivationFilter: string[],
  motivationThreshold: number,
  competenceFilter: string[],
  competenceThreshold: number,
  searchTerm: string,
  allRows: any[],
  searchableColumns: SearchableColumn[]
) => {
  const hasMotivationFilters = motivationFilter.length > 0
  const hasCompetenceFilters = competenceFilter.length > 0
  const hasSearchTerm = !!searchTerm && searchTerm.trim() !== ''

  if (!hasSearchTerm && !hasMotivationFilters && !hasCompetenceFilters) {
    if (currentRows.length !== allRows.length) {
      return allRows
    }
    return currentRows
  }

  return allRows.filter((row) => {
    const rowMatchesSearchTerm = hasSearchTerm
      ? searchRow(row, searchableColumns, searchTerm)
      : true
    const rowMatchesMotivationFilters = hasMotivationFilters
      ? filterRow(
          row.rowData[row.rowData.length - 2],
          motivationFilter,
          motivationThreshold
        )
      : true
    const rowMatchesCompetenceFilters = hasCompetenceFilters
      ? filterRow(
          row.rowData[row.rowData.length - 1],
          competenceFilter,
          competenceThreshold
        )
      : true
    return (
      rowMatchesSearchTerm &&
      rowMatchesMotivationFilters &&
      rowMatchesCompetenceFilters
    )
  })
}
