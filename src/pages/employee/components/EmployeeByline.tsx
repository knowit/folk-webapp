import * as React from 'react'
import { makeStyles } from '@material-ui/core'
import { LineSkeleton } from '../../../components/skeletons/LineSkeleton'

const useStyles = makeStyles({
  name: {
    fontSize: '2rem',
    margin: '15px 0',
  },
  jobTitle: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    margin: '15px 0',
  },
})

interface Props {
  employeeName?: string
  jobTitle?: string
  isLoading?: boolean
}

export function EmployeeByline({ employeeName, jobTitle, isLoading }: Props) {
  const classes = useStyles()

  const EmployeeName = () =>
    isLoading ? (
      <LineSkeleton width="50%" height="3em" />
    ) : (
      <h1 className={classes.name}>{employeeName}</h1>
    )

  const EmployeeJobTitle = () =>
    isLoading ? (
      <LineSkeleton width="40%" height="2em" />
    ) : (
      <p className={classes.jobTitle}>{jobTitle}</p>
    )

  return (
    <div>
      <EmployeeName />
      <EmployeeJobTitle />
    </div>
  )
}
