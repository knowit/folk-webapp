import SearchInput from '../../../components/SearchInput'
import { GridItemHeader } from '../../../components/gridItem/GridItemHeader'

interface CustomerFilterProps {
  onSearch: (searchTerm: string) => void
  currentSearchTerm?: string
  onValueChange?: (searchTerm: string) => void
}

export function CustomerFilter({
  onSearch,
  currentSearchTerm = undefined,
  onValueChange = undefined,
}: CustomerFilterProps) {
  return (
    <GridItemHeader title="Filtre" green>
      <SearchInput
        placeholder={'Søk på konsulentnavn eller kunde'}
        onSearch={onSearch}
        currentSearchValue={currentSearchTerm}
        onValueChange={onValueChange}
        onClear={() => onSearch('')}
      />
    </GridItemHeader>
  )
}
