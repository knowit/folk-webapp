import React, { useState } from 'react'
import { GridItemHeader } from '../gridItem/GridItemHeader'
import { FilterHeader } from '../filter/FilterHeader'
import DataTable from './DataTable'
import SearchInput from '../SearchInput'
import FilterInput from '../filter/FilterInput'
import { RowCount } from './RowCount'
import { Column, DDTableProps, GetColumnValueFn } from './tableTypes'
import { makeStyles } from '@mui/styles'
import {
  filterNonCustomer,
  FilterObject,
  handleFilterChange,
  handleThresholdChange,
  searchAndFilter,
} from '../filter/FilterUtil'

export interface SearchableColumn {
  columnIndex: number
  getSearchValue: GetColumnValueFn
}

const useStyles = makeStyles({
  searchBars: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-around',
    width: '900px',
  },
})

export function getSearchableColumns(columns: Column[]): SearchableColumn[] {
  const result: SearchableColumn[] = []
  columns.forEach((column, index) => {
    if (column.getValue) {
      result.push({
        columnIndex: index,
        getSearchValue: column.getValue,
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
        Viser {NonProject.length} av {allRows.length} ansatte
      </RowCount>
      <DataTable
        checkBox={checkBox}
        rows={NonProject}
        columns={props.columns}
      />
    </>
  )
}
