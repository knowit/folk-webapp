import React, { useState, useEffect } from 'react'
import FilterInput, {
  CategoryWithGroup,
  useCategories,
} from '../../components/FilterInput'
import { FilterHeader } from '../../components/FilterHeader'
import { GridItemHeader } from '../../components/GridItem'
import SearchInput from '../../components/SearchInput'
import { SearchableColumn, TableState } from '../../data/DDTable'
import {
  handleFilterChange,
  handleThresholdChange,
  searchAndFilter,
} from '../../components/FilterSearch'

interface CustomerFilterProps {
  title: string
  filter: (filter: any[]) => void
  employees: any
  searchableColumns: SearchableColumn[]
  categories: CategoryWithGroup[]
}

export default function CustomerFilter({
  title,
  filter,
  employees,
  searchableColumns,
}: CustomerFilterProps) {
  const allRows = employees as { rowData: any[] }[]

  const initialState: TableState = {
    filters: [
      {
        name: 'MOTIVATION',
        values: [],
        threshold: 3,
        placeholder: 'Filtrer på Motivasjon...',
        datafetch: useCategories,
      },
    ],
    searchTerm: '',
  }

  const [state, setState] = useState<TableState>(initialState)
  //const filteredRows = searchAndFilter(allRows, searchableColumns, state)

  useEffect(
    () => filter(searchAndFilter(allRows, searchableColumns, state)),
    [state]
  )

  return (
    <>
      <GridItemHeader title={title} green>
        {state.filters.map(({ values, placeholder, datafetch }, index) => (
          <FilterInput
            key={placeholder}
            filterList={values}
            placeholder={placeholder}
            onSelect={(value) =>
              setState((prevState) =>
                handleFilterChange(prevState, value, index)
              )
            }
            fetchFilterCategories={datafetch}
          />
        ))}
        <SearchInput
          placeholder={'Søk konsulent, kunde, etc...'}
          onSearch={(searchTerm) =>
            setState((prevState) => ({ ...prevState, searchTerm }))
          }
          onClear={() =>
            setState((prevState) => ({ ...prevState, searchTerm: '' }))
          }
        />
      </GridItemHeader>
      {state.filters.map(
        ({ values, threshold, name }, index) =>
          values.length > 0 && (
            <FilterHeader
              title={name}
              type={name}
              filterList={values}
              filterThreshold={threshold}
              onThresholdUpdate={(value) =>
                setState((prevState) =>
                  handleThresholdChange(prevState, value, index)
                )
              }
              onSkillClick={(value) =>
                setState((prevState) =>
                  handleFilterChange(prevState, value, index)
                )
              }
            />
          )
      )}
    </>
  )
}
