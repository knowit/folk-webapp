import React, { useEffect, useReducer } from 'react'
import { GridItemHeader } from './GridItem'
import SearchInput from './SearchInput'
import { reducer, SearchableColumn, TableState } from '../data/DDTable'
import CompetenceFilterInput from './CompetenceFilterInput'
import { FilterHeader } from './FilterHeader'

interface CustomerFilterProps {
  title: string;
  filter: any;
  employees: any;
  searchableColumns: SearchableColumn[];
}

export default function CustomerFilter({title, filter, employees, searchableColumns }: CustomerFilterProps) {
  const allRows = employees as { rowData: any[] }[]

  const initialState: TableState = {
    rows: allRows,
    motivationFilter: [],
    motivationThreshold: 4,
    competenceFilter: [],
    competenceThreshold: 3,
    searchTerm: '',
  };

  const handleSearchAndFilter = (rows: any[]) => {
    filter(rows)
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    handleSearchAndFilter(state.rows)
  }, [state.rows])

  return (
    <>
      <GridItemHeader
        title={title}
        green
      >
        <CompetenceFilterInput
          filterList={state.competenceFilter}
          dispatch={dispatch}
          allRows={allRows}
          searchableColumns={searchableColumns}
          type="COMPETENCE"
        />
        <SearchInput
          dispatch={dispatch}
          allRows={allRows}
          searchableColumns={searchableColumns}
        />
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
    </>
  )

}
