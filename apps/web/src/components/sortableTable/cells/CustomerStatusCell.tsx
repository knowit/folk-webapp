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
  role: string
}

export default function CustomerStatusCell(props: Props) {
  const { data, role } = props

  const getRoleTitleForEmployee = (role: string) => {
    switch (role) {
      case 'Administration':
        return 'Administrasjon'
      case 'Sales':
        return 'Salg'
      default:
        return role
    }
  }
  return (
    <ComponentRoot>
      {role === 'Consultant'
        ? data?.customer && data.workOrderDescription
          ? `${data.customer}: ${data.workOrderDescription}`
          : 'Ikke i prosjekt'
        : getRoleTitleForEmployee(role)}
    </ComponentRoot>
  )
}
