import React from 'react'
import { NetworkData } from 'server/routers/chartTypes'
import { Network } from '../../../components/charts/nivo/Network'

interface Props {
  employeeStructureData: NetworkData
}

const OrganizationStructureTree = ({ employeeStructureData }: Props) => {
  return (
    <>
      {employeeStructureData ? Network({ data: employeeStructureData }) : <></>}
    </>
  )
}

export default OrganizationStructureTree
