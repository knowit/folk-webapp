import { useEmployeeStructure } from '../../api/data/employee/employeeQueries'
import OrganizationStructureTree from './Components/OrganizationStructureTree'
import { BaseSkeleton } from '../../components/skeletons/BaseSkeleton'
import { FallbackMessage } from '../employee/components/FallbackMessage'
import { useEffect, useState } from 'react'
import Filter from './Components/Filter/Filter'
import styled from '@emotion/styled'
import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { pageTitle } from '../../utils/pagetitle'

export default function OrganizationStructurePage() {
  const { trackPageView } = useMatomo()
  const { data, isLoading, error } = useEmployeeStructure()
  const [hideChildNodes, setHideChildNodes] = useState(false)

  useEffect(() => {
    trackPageView({
      documentTitle: 'Organisasjonsstruktur',
    })
    pageTitle('Organisasjonsstruktur')
  }, [trackPageView])

  function toggleEmployees() {
    setHideChildNodes(!hideChildNodes)
  }

  if (isLoading) {
    return (
      <BaseSkeleton variant="rectangular" width={'100%'} height={'100vh'} />
    )
  }

  if (error) {
    return <FallbackMessage error={error} />
  }

  return (
    <RelativePositionedBox>
      <Filter toggleEmployees={toggleEmployees} />
      <OrganizationStructureTree
        hideChildNodes={hideChildNodes}
        data={data}
        width={1215}
        height={1200}
        margin={140}
      />
    </RelativePositionedBox>
  )
}

const RelativePositionedBox = styled('div')({
  position: 'relative',
  height: '1140px',
})
