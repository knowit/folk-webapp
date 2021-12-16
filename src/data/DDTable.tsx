import React, { useState } from 'react'
import { GridItemHeader } from '../components/GridItem'
import { FilterHeader } from '../components/FilterHeader'
import DataTable from './components/table/DataTable'
import SearchInput from '../components/SearchInput'
import FilterInput, {
  useCategories,
  useCustomer,
} from '../components/FilterInput'
import RowCount from '../components/RowCount'
import { DDComponentProps } from './types'
import { makeStyles } from '@material-ui/core/styles'
import {
  FilterObject,
  handleFilterChange,
  handleThresholdChange,
  searchAndFilter,
} from '../components/FilterSearch'

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
  const initialState = {
    filters: [
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
      {
        name: 'CUSTOMER',
        values: [],
        placeholder: 'Filtrer på kunder...',
        threshold: 0,
        datafetch: useCustomer,
      },
    ],
    searchTerm: '',
  }
  const [state, setState] = useState<TableState>(initialState as TableState)

  const { columns } = props as { columns: Column[] }
  const searchableColumns = getSearchableColumns(columns)
  const filteredRows = searchAndFilter(allRows, searchableColumns, state)

  const classes = useStyles()
  return (
    <>
      <GridItemHeader title={title}>
        <div className={classes.searchBars}>
          {state.filters.map(({ values, placeholder, datafetch }, index) => (
            <FilterInput
              key={placeholder}
              filterList={values}
              placeholder={placeholder}
              onSelect={(filter) =>
                setState((prevState) =>
                  handleFilterChange(prevState, filter, index)
                )
              }
              fetchFilterCategories={datafetch}
            />
          ))}
          <SearchInput
            placeholder={'Søk konsulent, kunde, etc...'}
            onSearch={(searchTerm) => {
              setState((prevState) => ({ ...prevState, searchTerm }))
            }}
            onClear={() =>
              setState((prevState) => ({ ...prevState, searchTerm: '' }))
            }
          />
        </div>
      </GridItemHeader>
      {state.filters.map(
        ({ values, threshold, name }, index) =>
          values.length > 0 && (
            <FilterHeader
              title={name}
              type={name}
              filterList={values}
              filterThreshold={threshold}
              onThresholdUpdate={(value) => {
                setState((prevState) =>
                  handleThresholdChange(prevState, value, index)
                )
              }}
              onSkillClick={(value) => {
                setState((prevState) =>
                  handleFilterChange(prevState, value, index)
                )
              }}
            />
          )
      )}
      <RowCount>
        {filteredRows.length} av {allRows.length}
      </RowCount>
      <DataTable rows={filteredRows} columns={[]} {...props} />
    </>
  )
}
