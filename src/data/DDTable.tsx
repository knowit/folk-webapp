import React, { useReducer } from 'react'
import { GridItemHeader } from '../components/GridItem'
import { FilterHeader } from '../components/FilterHeader'
import DataTable from './components/table/DataTable'
import SearchInput from '../components/SearchInput'
import CompetenceFilterInput from '../components/CompetenceFilterInput'
import RowCount from '../components/RowCount'
import { DDComponentProps } from './types'
import { makeStyles } from '@material-ui/core/styles'
import { reducer } from '../components/FilterSearch'

export interface Column {
  title: string
  expandable?: boolean
  searchable?: boolean
  getSearchValue?: GetSearchValueFn
}

type GetSearchValueFn = (data: unknown) => string

export interface SearchableColumn {
  columnIndex: number
  getSearchValue: GetSearchValueFn
}

const useStyles = makeStyles({
  searchBars: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-around',
    width: '900px',
  },
})

export interface TableState {
  rows: any[]
  motivationFilter: string[]
  motivationThreshold: number
  competenceFilter: string[]
  competenceThreshold: number
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
  const initialState: TableState = {
    rows: allRows,
    motivationFilter: [],
    motivationThreshold: 4,
    competenceFilter: [],
    competenceThreshold: 3,
    searchTerm: '',
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const { columns } = props as { columns: Column[] }
  const searchableColumns = getSearchableColumns(columns)

  const classes = useStyles()

  return (
    <>
      <GridItemHeader title={title}>
        <div className={classes.searchBars}>
          <CompetenceFilterInput
            filterList={state.competenceFilter}
            dispatch={dispatch}
            allRows={allRows}
            searchableColumns={searchableColumns}
            type="COMPETENCE"
          />
          <CompetenceFilterInput
            filterList={state.motivationFilter}
            dispatch={dispatch}
            allRows={allRows}
            searchableColumns={searchableColumns}
            type="MOTIVATION"
          />
          <SearchInput
            dispatch={dispatch}
            allRows={allRows}
            searchableColumns={searchableColumns}
          />
        </div>
      </GridItemHeader>
      {state.competenceFilter.length > 0 && (
        <FilterHeader
          filterList={state.competenceFilter}
          filterThreshold={state.competenceThreshold}
          dispatch={dispatch}
          allRows={allRows}
          searchableColumns={searchableColumns}
          type="COMPETENCE"
        />
      )}
      {state.motivationFilter.length > 0 && (
        <FilterHeader
          filterList={state.motivationFilter}
          filterThreshold={state.motivationThreshold}
          dispatch={dispatch}
          allRows={allRows}
          searchableColumns={searchableColumns}
          type="MOTIVATION"
        />
      )}
      <RowCount>
        {state.rows.length} av {allRows.length}
      </RowCount>
      <DataTable rows={state.rows} columns={[]} {...props} />
    </>
  )
}
