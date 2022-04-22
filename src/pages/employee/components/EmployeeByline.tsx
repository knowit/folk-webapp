import * as React from 'react'
import { makeStyles } from '@material-ui/core'
import { EmployeeProfileResponse } from '../../../api/data/employee/employeeApiTypes'
import { LineSkeleton } from '../../../components/skeletons/LineSkeleton'
import { MultiLineSkeleton } from '../../../components/skeletons/MultiLineSkeleton'

const useStyles = makeStyles((theme) => ({
  name: {
    fontSize: '2rem',
    margin: '15px 0',
  },
  jobTitle: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    margin: '0',
  },
  contactInfo: {
    margin: '0',
    marginTop: '10px',
    lineHeight: '1.5rem',
    '& dt, dd': { display: 'inline', margin: 0 },
  },
  link: {
    color: theme.palette.text.primary,
  },
}))

interface Props {
  employee?: EmployeeProfileResponse
  isLoading?: boolean
}

export function EmployeeByline({ employee, isLoading }: Props) {
  const classes = useStyles()

  const EmployeeName = () => {
    if (isLoading) {
      return <LineSkeleton width="50%" height="3em" />
    }
    return <h1 className={classes.name}>{employee?.name}</h1>
  }

  const EmployeeJobTitle = () => {
    if (isLoading) {
      return <LineSkeleton width="40%" height="1.5em" />
    }
    if (employee?.title) {
      return <p className={classes.jobTitle}>{employee?.title}</p>
    }
    return null
  }

  const EmployeeContactInfo = () => {
    if (isLoading) {
      return <MultiLineSkeleton lines={2} maxWidth="45%" lineHeight="1.5em" />
    }
    return (
      <dl className={classes.contactInfo}>
        <div>
          <dt>E-post:&nbsp;</dt>
          <dd>
            <a className={classes.link} href={`mailto:${employee?.email}`}>
              {employee?.email}
            </a>
          </dd>
        </div>
        {employee?.phone ? (
          <div>
            <dt>Telefon:&nbsp;</dt>
            <dd>{employee?.phone}</dd>
          </div>
        ) : null}
      </dl>
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
