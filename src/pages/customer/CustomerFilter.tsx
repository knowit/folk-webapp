import React, { useEffect, useReducer } from 'react'
import CompetenceFilterInput, {
  CategoryWithGroup,
} from '../../components/CompetenceFilterInput'
import { FilterHeader } from '../../components/FilterHeader'
import { reducer } from '../../components/FilterSearch'
import { GridItemHeader } from '../../components/GridItem'
import SearchInput from '../../components/SearchInput'
import { SearchableColumn, TableState } from '../../data/DDTable'

interface CustomerFilterProps {
  title: string
  filter: any
  employees: any
  searchableColumns: SearchableColumn[]
  categories: CategoryWithGroup[]
}

export default function CustomerFilter({
  title,
  filter,
  employees,
  searchableColumns,
  categories,
}: CustomerFilterProps) {
  const allRows = employees as { rowData: any[] }[]

  const initialState: TableState = {
    rows: allRows,
    motivationFilter: [],
    motivationThreshold: 4,
    competenceFilter: [],
    competenceThreshold: 3,
    searchTerm: '',
  }

  const handleSearchAndFilter = (rows: any[]) => {
    filter(rows)
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    handleSearchAndFilter(state.rows)
  }, [state.rows])

  return (
    <>
      <GridItemHeader title={title} green>
        <CompetenceFilterInput
          filterList={state.competenceFilter}
          dispatch={dispatch}
          allRows={allRows}
          searchableColumns={searchableColumns}
          type="COMPETENCE"
          categories={categories}
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