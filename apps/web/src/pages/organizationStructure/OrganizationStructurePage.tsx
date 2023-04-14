import { useEmployeeStructure } from '../../api/data/employee/employeeQueries'
import OrganizationStructureTree from './Components/OrganizationStructureTree'
import { BaseSkeleton } from '../../components/skeletons/BaseSkeleton'
import { FallbackMessage } from '../employee/components/FallbackMessage'
import { pageTitle } from '../../utils/pagetitle'

export default function OrganizationStructurePage() {
  const { data, isLoading, error } = useEmployeeStructure()

  pageTitle('Organisasjonsstruktur')

  if (isLoading) {
    return <BaseSkeleton variant="rect" width={'100%'} height={'100vh'} />
  }

  if (error) {
    return <FallbackMessage error={error} />
  }

  return (
    <OrganizationStructureTree
      data={data}
      width={1215}
      height={1200}
      margin={140}
    />
  )
}
