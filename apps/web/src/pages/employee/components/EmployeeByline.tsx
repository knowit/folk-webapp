import * as React from 'react'
import { styled } from '@mui/material/styles'
import { EmployeeProfileResponse } from '../../../api/data/employee/employeeApiTypes'
import { LineSkeleton } from '../../../components/skeletons/LineSkeleton'
import { MultiLineSkeleton } from '../../../components/skeletons/MultiLineSkeleton'
import { pageTitle } from '../../../utils/pagetitle'

const EmployeeNameStyled = styled('h1')(() => ({
  fontSize: '2rem',
  margin: '15px 0',
}))
const EmployeeJobTitleStyled = styled('p')(() => ({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  margin: 0,
}))
const EmployeeContactInfoStyled = styled('dl')(() => ({
  margin: 0,
  marginTop: 10,
  lineHeight: '1.5rem',
  '& dt, dd': { display: 'inline', margin: 0 },
}))
const LinkStyled = styled('a')(({ theme }) => ({
  color: theme.palette.text.primary,
}))

interface Props {
  employee?: EmployeeProfileResponse
  isLoading?: boolean
}

export function EmployeeByline({ employee, isLoading }: Props) {
  employee && pageTitle(employee?.name)

  const EmployeeName = () => {
    if (isLoading) {
      return <LineSkeleton width="50%" height="3em" />
    }
    return <EmployeeNameStyled>{employee?.name}</EmployeeNameStyled>
  }

  const EmployeeJobTitle = () => {
    if (isLoading) {
      return <LineSkeleton width="40%" height="1.5em" />
    }
    if (employee?.title) {
      return <EmployeeJobTitleStyled>{employee?.title}</EmployeeJobTitleStyled>
    }
    return null
  }

  const EmployeeContactInfo = () => {
    if (isLoading) {
      return <MultiLineSkeleton lines={2} maxWidth="45%" lineHeight="1.5em" />
    }
    return (
      <EmployeeContactInfoStyled>
        <div>
          <dt>E-post:&nbsp;</dt>
          <dd>
            <LinkStyled href={`mailto:${employee?.email}`}>
              {employee?.email}
            </LinkStyled>
          </dd>
        </div>
        {employee?.phone ? (
          <div>
            <dt>Telefon:&nbsp;</dt>
            <dd>{employee?.phone}</dd>
          </div>
        ) : null}
      </EmployeeContactInfoStyled>
    )
  }

  return (
    <div>
      <EmployeeName />
      <EmployeeJobTitle />
      <EmployeeContactInfo />
    </div>
  )
}
