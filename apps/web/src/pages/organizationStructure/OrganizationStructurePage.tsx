import React from 'react'
import { useEmployeeStructure } from '../../api/data/employee/employeeQueries'
import OrganizationStructureTree from './Components/OrganizationStructureTree'

export default function OrganizationStructurePage() {
  const { data: employeeData } = useEmployeeStructure()
  return (
    <div>
      <OrganizationStructureTree employeeStructureData={employeeData} />
    </div>
  )
}
