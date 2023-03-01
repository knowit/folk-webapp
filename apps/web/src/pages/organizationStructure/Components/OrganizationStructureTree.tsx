import React from 'react'
import { NetworkData } from 'server/routers/chartTypes'
import { Network } from '../../../components/charts/nivo/Network'

interface Props {
  employeeStructureData: NetworkData
}

const OrganizationStructureTree = ({ employeeStructureData }: Props) => {
  return (
    <div>
      {employeeStructureData ? (
        <Network data={employeeStructureData} />
      ) : (
        <div>Ingen data funnet</div>
      )}
    </div>
  )
}

export default OrganizationStructureTree
