import { Avatar, styled, TableCell } from '@mui/material'
import { useEmployeeProfile } from '../../api/data/employee/employeeQueries'
import { EmployeeNotFound } from '../employee/components/EmployeeNotFound'
import { FallbackMessage } from '../employee/components/FallbackMessage'
import CharacterLimitBox from '../../components/sortableTable/components/CharacterLimitBox'
import { OpenInNewIcon } from '../../assets/Icons'
import { Link } from 'react-router-dom'

const EmployeeName = styled('span')(() => ({
  marginTop: 'auto',
  marginBottom: 'auto',
  marginLeft: 15,
}))
const AvatarStyled = styled(Avatar)(() => ({
  width: 50,
  height: 50,
}))

const ComponentRoot = styled(TableCell)(() => ({
  flexDirection: 'column',
  display: 'flex',
  padding: 5,
}))

const ButtonSubRoot = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}))

const GroupMember = ({ employeeId }) => {
  const { data: employee, error } = useEmployeeProfile(employeeId)
  const isLoading = !employee

  if (error && error.status === 404) {
    return <EmployeeNotFound employeeId={employeeId} />
  }

  if (error) {
    return <FallbackMessage error={error} />
  }

  if (isLoading) {
    return null
  }

  return (
    <ComponentRoot>
      <ButtonSubRoot>
        <AvatarStyled alt={employee?.name} src={employee?.image} />
        <EmployeeName>
          <CharacterLimitBox text={employee.name} />
        </EmployeeName>
        <Link to={`/ansatt/${employeeId}`} target={`employee_${employeeId}`}>
          <OpenInNewIcon />
        </Link>
      </ButtonSubRoot>
    </ComponentRoot>
  )
}

export default GroupMember
