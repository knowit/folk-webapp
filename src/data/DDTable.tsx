import React, { useState } from 'react'
import { GridItemHeader } from '../components/GridItem'
import { FilterHeader } from '../components/FilterHeader'
import DataTable from './components/table/DataTable'
import SearchInput from '../components/SearchInput'
import FilterInput, { useCategories } from '../components/FilterInput'
import RowCount from '../components/RowCount'
import { DDComponentProps } from './types'
import { makeStyles } from '@material-ui/core/styles'
import {
  FilterObject,
  handleFilterChange,
  handleThresholdChange,
  searchAndFilter,
} from '../components/FilterSearch'
import { SortOrder } from './components/table/cells/SortableHeaderCell'

type GetSearchValueFn = (data: unknown) => string
export interface Column {
  title: string
  expandable?: boolean
  searchable?: boolean
  getSearchValue?: GetSearchValueFn
}
export interface SearchableColumn {
  columnIndex: number
  getSearchValue: GetSearchValueFn
}

export interface ColumnSort {
  columnIndex: number
  sortOrder: SortOrder
}

const useStyles = makeStyles({
  searchBars: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
})

export interface TableState {
  filters: FilterObject[]
  searchTerm: string
}

const sortColumn = (rows: any[], currentSort: ColumnSort) => {
  // Work around grunnet at sortering er blandet mellom en fast string eller et objekt
  const compare = (a: any, b: any) => {
    if (Object.keys(a.rowData[currentSort.columnIndex]).length === 0) return -1
    if (
      a.rowData[currentSort.columnIndex] > b.rowData[currentSort.columnIndex]
    ) {
      return 1
    } else if (
      a.rowData[currentSort.columnIndex] < b.rowData[currentSort.columnIndex]
    ) {
      return -1
    }
    return 0
  }

  if (!currentSort) return rows
  switch (currentSort.sortOrder) {
    case 'ASC':
      return rows.sort(compare)
    case 'DESC':
      return rows.sort(compare).reverse()
    default:
      return rows
  }
}

export function getSearchableColumns(columns: Column[]): SearchableColumn[] {
  return columns.reduce((result, column, index) => {
    if (column.searchable && column.getSearchValue) {
      result.push({
        columnIndex: index,
        getSearchValue: column.getSearchValue,
      })
    }
    return result
  }, [] as SearchableColumn[])
}

export default function DDTable({ payload, title, props }: DDComponentProps) {
  const allRows = payload as { rowData: any[] }[]
  const initialFilters: FilterObject[] = [
    {
      name: 'COMPETENCE',
      values: [],
      threshold: 3,
      placeholder: 'Filtrer på kompetanse...',
      datafetch: useCategories,
    },
    {
      name: 'MOTIVATION',
      values: [],
      threshold: 4,
      placeholder: 'Filtrer på motivasjon...',
      datafetch: useCategories,
    },
  ]

  const [filters, setFilters] = useState<FilterObject[]>(initialFilters)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [sorting, setSorting] = useState<ColumnSort>({
    columnIndex: 0,
    sortOrder: 'NONE',
  })

  const { columns } = props as { columns: Column[] }

  const searchableColumns = getSearchableColumns(columns)
  const filteredRows = searchAndFilter(
    allRows,
    searchableColumns,
    filters,
    searchTerm
  )
  const sortedRows = sortColumn(filteredRows, sorting)

  const classes = useStyles()

  return (
    <>
      <GridItemHeader title={title}>
        <div className={classes.searchBars}>
          {filters.map(({ values, placeholder, datafetch }, index) => (
            <FilterInput
              key={placeholder}
              filterList={values}
              placeholder={placeholder}
              onSelect={(filter) =>
                setFilters((prevFilters) =>
                  handleFilterChange(prevFilters, filter, index)
                )
              }
              fetchFilterCategories={datafetch}
            />
          ))}
          <SearchInput
            placeholder={'Søk konsulent, kunde, etc...'}
            onSearch={(searchTerm) => {
              setSearchTerm(searchTerm)
            }}
            onClear={() => setSearchTerm('')}
          />
        </div>
      </GridItemHeader>
      {filters.map(
        ({ values, threshold, name }, index) =>
          values.length > 0 && (
            <FilterHeader
              title={name}
              type={name}
              filterList={values}
              filterThreshold={threshold}
              onThresholdUpdate={(value) => {
                setFilters((prevFilters) =>
                  handleThresholdChange(prevFilters, value, index)
                )
              }}
              onSkillClick={(value) => {
                setFilters((prevFilters) =>
                  handleFilterChange(prevFilters, value, index)
                )
              }}
            />
          )
      )}
      <RowCount>
        {sortedRows.length} av {allRows.length}
      </RowCount>
      <DataTable
        setSort={setSorting}
        rows={sortedRows}
        columns={[]}
        {...props}
      />
    </>
  )
}
