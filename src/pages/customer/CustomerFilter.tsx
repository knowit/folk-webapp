import * as React from 'react'
import SearchInput from '../../components/SearchInput'
import { GridItemHeader } from '../../components/gridItem/GridItemHeader'

interface CustomerFilterProps {
  onSearch: (searchTerm: string) => void
}

export function CustomerFilter({ onSearch }: CustomerFilterProps) {
  return (
    <GridItemHeader title="Filtre" green>
      <SearchInput
        placeholder={'Søk på konsulentnavn eller kunde'}
        onSearch={onSearch}
        onClear={() => onSearch('')}
      />
    </GridItemHeader>
  )
}
