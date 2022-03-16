import React, { useState } from 'react'
import { GridItemHeader } from '../components/gridItem/GridItemHeader'
import { FilterHeader } from '../components/filter/FilterHeader'
import DataTable from './components/table/DataTable'
import SearchInput from '../components/SearchInput'
import FilterInput from '../components/filter/FilterInput'
import { RowCount } from './components/RowCount'
import { Column, DDTableProps, GetSearchValueFn } from './types'
import { makeStyles } from '@material-ui/core/styles'
import {
  filterNonCustomer,
  FilterObject,
  handleFilterChange,
  handleThresholdChange,
  searchAndFilter,
} from '../components/filter/FilterUtil'
import { SortOrder } from './components/table/cells/SortableHeaderCell'

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
    width: '900px',
  },
})

const sortColumn = (rows: any[], currentSort: ColumnSort) => {
  const compare = (a: any, b: any) => {
    return JSON.stringify(a.rowData[currentSort.columnIndex])
      .toLowerCase()
      .localeCompare(
        JSON.stringify(b.rowData[currentSort.columnIndex]).toLowerCase()
      )
  }

  if (!currentSort) return rows
  switch (currentSort.sortOrder) {
    case 'ASC':
      return rows.sort((a, b) => compare(a, b))
    case 'DESC':
      return rows.sort((a, b) => compare(b, a))
    default:
      return rows
  }
}

export function getSearchableColumns(columns: Column[]): SearchableColumn[] {
  const result: SearchableColumn[] = []
  columns.forEach((column, index) => {
    if (column.getSearchValue) {
      result.push({
        columnIndex: index,
        getSearchValue: column.getSearchValue,
      })
    }
  })
  return result
}

export default function DDTable({
  payload,
  title,
  initialFilters,
  props,
}: DDTableProps) {
  const allRows = payload
  const [filters, setFilters] = useState<FilterObject[]>(initialFilters)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [columnSort, setColumnSort] = useState<ColumnSort>({
    columnIndex: 0,
    sortOrder: 'NONE',
  })
  const [displayNonProject, setDisplayNonProject] = useState(false)

  function toggleDisplayNonProject() {
    setDisplayNonProject(!displayNonProject)
  }

  const searchableColumns = getSearchableColumns(props.columns)
  const filteredRows = searchAndFilter(
    allRows,
    searchableColumns,
    searchTerm,
    filters
  )

  const NonProject = displayNonProject
    ? filterNonCustomer(filteredRows)
    : filteredRows

  const sortedRows = sortColumn(NonProject, columnSort)

  const classes = useStyles()

  const filterInputs = filters.map(
    ({ values, placeholder, datafetch }, index) => (
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
    )
  )

  const filterHeaders = filters.map(
    ({ values, threshold, column, label }, index) =>
      values.length > 0 && (
        <FilterHeader
          key={column}
          title={label}
          type={column}
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
  )

  const checkBox = {
    label: 'Se kun ledige',
    changeHandler: toggleDisplayNonProject,
    checked: displayNonProject,
  }

  return (
    <>
      <GridItemHeader title={title}>
        <div className={classes.searchBars}>
          {filterInputs}
          <SearchInput
            placeholder={'Søk konsulent, kunde, etc...'}
            onSearch={(searchTerm) => {
              setSearchTerm(searchTerm)
            }}
            onClear={() => setSearchTerm('')}
          />
        </div>
      </GridItemHeader>
      {filterHeaders}
      <RowCount>
        Viser {sortedRows.length} av {allRows.length} ansatte
      </RowCount>
      <DataTable
        setColumnSort={setColumnSort}
        currentColumnSort={columnSort}
        checkBox={checkBox}
        rows={sortedRows}
        columns={props.columns}
      />
    </>
  )
}
