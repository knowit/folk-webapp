import React, { useState } from 'react'
import { GridItemHeader } from '../gridItem/GridItemHeader'
import { FilterHeader } from '../filter/FilterHeader'
import DataTable from './DataTable'
import SearchInput from '../SearchInput'
import FilterInput from '../filter/FilterInput'
import { RowCount } from './RowCount'
import { Column, DDTableProps, GetColumnValueFn } from './tableTypes'
import { styled } from '@mui/material/styles'
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

const FilterContainer = styled('div')(() => ({
  flexDirection: 'row',
  display: 'flex',
  justifyContent: 'space-around',
  width: 900,
}))

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

  const filterInputs = filters.map(
    ({ filters, placeholder, datafetch }, index) => (
      <FilterInput
        key={placeholder}
        filterList={filters}
        placeholder={placeholder}
        onSelect={(newFilterValues) =>
          setFilters((prevFilters) =>
            handleFilterChange(prevFilters, newFilterValues, index)
          )
        }
        fetchFilterCategories={datafetch}
      />
    )
  )

  const filterHeaders = filters.map(
    ({ filters, column, label }, index) =>
      filters.length > 0 && (
        <FilterHeader
          key={column}
          title={label}
          type={column}
          filterList={filters}
          onThresholdUpdate={(value, threshold) => {
            setFilters((prevFilters) =>
              handleThresholdChange(prevFilters, value, threshold, index)
            )
          }}
          onSkillClick={(values) => {
            setFilters((prevFilters) =>
              handleFilterChange(prevFilters, values, index)
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
        <FilterContainer>
          {filterInputs}
          <SearchInput
            placeholder={'Søk konsulent, kunde, etc...'}
            onSearch={(searchTerm) => {
              setSearchTerm(searchTerm)
            }}
            onClear={() => setSearchTerm('')}
          />
        </FilterContainer>
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
