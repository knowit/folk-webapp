import * as React from 'react'
import { makeStyles } from '@mui/styles'
import { MultiLineSkeleton } from '../../../components/skeletons/MultiLineSkeleton'
import { FallbackMessage } from '../../employee/components/FallbackMessage'
import { ExperienceListItem } from '../../employee/components/ExperienceListItem'
import { ExperienceList } from '../../employee/components/ExperienceList'
import { EmployeeForCustomerList } from '../../../api/data/customer/customerApiTypes'

const useStyles = makeStyles({
  employeeName: {
    fontWeight: 'bold',
  },
})

interface Props {
  employees?: EmployeeForCustomerList[]
  isLoading?: boolean
  error?: object
}

export function EmployeesForCustomer({
  employees: employees,
  isLoading,
  error,
}: Props) {
  const classes = useStyles()

  if (error) {
    return <FallbackMessage error={error} />
  }

  if (isLoading) {
    return <MultiLineSkeleton />
  }

  if (!employees || employees.length === 0) {
    return <FallbackMessage message="Fant ingen ansatte å vise." />
  }

  return (
    <ExperienceList>
      {employees.map((employee) => (
        <ExperienceListItem key={employee.rowData[0].name}>
          <span className={classes.employeeName}>
            {employee.rowData[0].name}:{employee.rowData[1]}
          </span>
          <br />
          {employee.rowData[2]}
        </ExperienceListItem>
      ))}
    </ExperienceList>
  )
}
