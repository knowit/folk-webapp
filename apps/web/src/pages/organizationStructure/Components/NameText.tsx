import { useTheme } from '@mui/material'
import { ReactNode } from 'react'
import { EmployeeProfileInformation } from 'server/routers/employees/employeesTypes'

interface Props {
  children: ReactNode
  employee: EmployeeProfileInformation
  searchTerm: string
  [k: string]: any
}
const NameText = ({ children, employee, searchTerm, ...rest }: Props) => {
  const theme = useTheme()
  const halo = theme.palette.background.paper // Stroke around the labels in case they overlap with a link
  const haloWidth = 0.2

  return (
    <text
      onClick={() =>
        window.open(
          `${window.location.origin}/ansatt/${employee.email}`,
          `employee_${employee.email}`
        )
      }
      style={{ cursor: 'hand' }}
      stroke={halo}
      strokeWidth={haloWidth}
      paintOrder="stroke"
      fill={theme.palette.text.primary}
      opacity={
        searchTerm.length < 0
          ? 1
          : employee.name.toLowerCase().includes(searchTerm)
          ? 1
          : 0.3
      }
      {...rest}
    >
      {children}
    </text>
  )
}

export default NameText
