import React, { useState } from 'react'
import { GridItemHeader } from '../../../components/gridItem/GridItemHeader'
import { FilterHeader } from '../../../components/filter/FilterHeader'
import SearchInput from '../../../components/SearchInput'
import FilterInput from '../../../components/filter/FilterInput'
import {
  DDTableProps,
  GetColumnValueFn,
} from '../../../components/sortableTable/tableTypes'
import { styled } from '@mui/material/styles'
import {
  filterNonCustomer,
  FilterObject,
  handleFilterChange,
  handleThresholdChange,
  searchAndFilter,
} from '../../../components/filter/FilterUtil'
import {
  SortableEmployeeTable,
  getEmployeeSearchableColumns,
} from './SortableEmployeeTable'

import { Paper } from '@mui/material'
import { RowCount } from '../../../components/sortableTable/RowCount'
import { FilteredDownloadCell } from '../../../components/sortableTable/DataCells'
import { statusDisplayDetails } from '../../../components/sortableTable/cells/ProjectStatusCell'
import { useMatomo } from '@jonkoops/matomo-tracker-react'

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

export default function EmployeeTableWithFilter({
  payload,
  title,
  initialFilters,
}: DDTableProps) {
  const allRows = payload
  const [filters, setFilters] = useState<FilterObject[]>(initialFilters)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [displayNonProject, setDisplayNonProject] = useState(false)
  const { trackEvent } = useMatomo()

  function toggleDisplayNonProject() {
    if (!displayNonProject) {
      trackEvent({
        category: 'Filtering',
        action: 'Filtered employees by only showing free ones',
        name: `Filter by only showing free employees`,
      })
    }

    setDisplayNonProject(!displayNonProject)
  }

  const searchableColumns = getEmployeeSearchableColumns()
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
      {filterHeaders ? filterHeaders : null}
      <FilteredDownloadCell
        filters={filters ? filters : []}
        consultants={NonProject.map((row) => [
          row['rowData'][0].name,
          row['rowData'][1],
          statusDisplayDetails[row['rowData'][2]]?.label,
          row['rowData'][3].customer,
        ])}
      />
      <RowCount>
        Viser {NonProject.length} av {allRows.length} ansatte aktive i angitt
        periode
      </RowCount>
      <Paper
        elevation={0}
        style={{
          height: '100%',
          width: '100%',
        }}
        sx={{ backgroundColor: 'background.default' }}
      >
        <SortableEmployeeTable checkBox={checkBox} data={NonProject} />
      </Paper>
    </>
  )
}
