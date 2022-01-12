import React, { useState, useEffect } from 'react'
import FilterInput, {
  CategoryWithGroup,
  useCategories,
} from '../../components/FilterInput'
import { FilterHeader } from '../../components/FilterHeader'
import { GridItemHeader } from '../../components/GridItem'
import SearchInput from '../../components/SearchInput'
import { SearchableColumn } from '../../data/DDTable'
import {
  FilterObject,
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
  const initialFilters: FilterObject[] = [
    {
      name: 'MOTIVATION',
      values: [],
      threshold: 3,
      placeholder: 'Filtrer på Motivasjon...',
      datafetch: useCategories,
    },
  ]

  const [filters, setFilters] = useState<FilterObject[]>(initialFilters)
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(
    () =>
      filter(searchAndFilter(allRows, searchableColumns, filters, searchTerm)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters, searchTerm]
  )

  return (
    <>
      <GridItemHeader title={title} green>
        {filters.map(({ values, placeholder, datafetch }, index) => (
          <FilterInput
            key={placeholder}
            filterList={values}
            placeholder={placeholder}
            onSelect={(value) =>
              setFilters((prevFilters) =>
                handleFilterChange(prevFilters, value, index)
              )
            }
            fetchFilterCategories={datafetch}
          />
        ))}
        <SearchInput
          placeholder={'Søk konsulent, kunde, etc...'}
          onSearch={(searchTerm) => setSearchTerm(searchTerm)}
          onClear={() => setSearchTerm('')}
        />
      </GridItemHeader>
      {filters.map(
        ({ values, threshold, name }, index) =>
          values.length > 0 && (
            <FilterHeader
              title={name}
              type={name}
              filterList={values}
              filterThreshold={threshold}
              onThresholdUpdate={(value) =>
                setFilters((prevFilters) =>
                  handleThresholdChange(prevFilters, value, index)
                )
              }
              onSkillClick={(value) =>
                setFilters((prevFilters) =>
                  handleFilterChange(prevFilters, value, index)
                )
              }
            />
          )
      )}
    </>
  )
}
