import { useEmployeeStructure } from '../../api/data/employee/employeeQueries'
import OrganizationStructureTree from './Components/OrganizationStructureTree'
import { BaseSkeleton } from '../../components/skeletons/BaseSkeleton'
import { FallbackMessage } from '../employee/components/FallbackMessage'
import { pageTitle } from '../../utils/pagetitle'
import { useState } from 'react'
import Filter from './Components/Filter/Filter'
import SearchInput from '../../components/SearchInput'
import { styled } from '@mui/material/styles'

const FilterWrapper = styled('div')(() => ({
  display: 'flex',
  float: 'right',
}))

export default function OrganizationStructurePage() {
  const { data, isLoading, error } = useEmployeeStructure()
  const [hideEmployeesWithoutChildren, setHideEmployeesWithoutChildren] =
    useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  function toggleEmployees() {
    setHideEmployeesWithoutChildren(!hideEmployeesWithoutChildren)
  }

  pageTitle('Organisasjonsstruktur')

  if (isLoading) {
    return (
      <BaseSkeleton variant="rectangular" width={'100%'} height={'100vh'} />
    )
  }

  if (error) {
    return <FallbackMessage error={error} />
  }

  return (
    <>
      <FilterWrapper>
        <SearchInput
          placeholder={'Søk i ansatte'}
          onSearch={(searchTerm) => {
            setSearchTerm(searchTerm)
          }}
          onClear={() => setSearchTerm('')}
        />
      </FilterWrapper>
      <Filter
        hideEmployeesWithoutChildren={hideEmployeesWithoutChildren}
        toggleEmployees={toggleEmployees}
      />
      <OrganizationStructureTree
        hideEmployeesWithoutChildren={hideEmployeesWithoutChildren}
        data={data}
        width={1215}
        height={1200}
        margin={140}
        searchTerm={searchTerm}
      />
    </>
  )
}
