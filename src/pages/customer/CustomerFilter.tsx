import React, { useEffect, useReducer } from 'react'
import FilterInput, {
  CategoryWithGroup, useCategories,
} from '../../components/FilterInput'
import { FilterHeader } from '../../components/FilterHeader'
//import { reducer } from '../../components/FilterSearch'
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
    filters:[
    {
      name: "CUSTOMER",
      values: [],
      threshold: 3,
      placeholder: "Filtrer på kunder...",
      datafetch: useCategories,
    }],
    searchTerm: '',
  }

  const handleSearchAndFilter = (rows: any[]) => {
    filter(rows)
  }

  //const [state, dispatch] = useReducer(reducer, initialState)

  /*useEffect(() => {
    handleSearchAndFilter(state.rows)
  }, [state.rows])

  return (
    <>
      <GridItemHeader title={title} green>
        <FilterInput
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
      {state.filters.length > 0 && state.filters.map((filter,it) => (
        <FilterHeader
          key={it}
          filterList={filter.values}
          filterThreshold={filter.threshold}
          type={filter.name}

        />
      ))}
    </>
  )*/
  return <></>
}
