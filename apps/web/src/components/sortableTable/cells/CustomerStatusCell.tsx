import React from 'react'
import { styled } from '@mui/material/styles'
import { Customer } from '../../../api/data/employee/employeeApiTypes'

const ComponentRoot = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
}))

interface Props {
  data: Customer | null
}

export default function CustomerStatusCell(customerData: Props) {
  const { data } = customerData

  return (
    <ComponentRoot>
      {data?.customer && data.workOrderDescription
        ? `${data.customer}: ${data.workOrderDescription}`
        : 'Ikke i prosjekt'}
    </ComponentRoot>
  )
}
