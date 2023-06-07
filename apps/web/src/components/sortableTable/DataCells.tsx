import React from 'react'

import ConsultantCell from './cells/ConsultantCell'
import ProjectStatusCell from './cells/ProjectStatusCell'
import CharacterLimitBox from './components/CharacterLimitBox'
import CvCell from './cells/CvCell'
import CustomerStatusCell from './cells/CustomerStatusCell'

const EducationCell = ({ data }: { data: string | null }) => (
  <CharacterLimitBox text={data || '-'} />
)

export {
  ConsultantCell,
  EducationCell,
  CvCell,
  ProjectStatusCell,
  CustomerStatusCell,
}
