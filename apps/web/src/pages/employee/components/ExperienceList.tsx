import * as React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
})

interface Props {
  children: React.ReactNode
}

export function ExperienceList({ children }: Props) {
  const classes = useStyles()

  return <ul className={classes.list}>{children}</ul>
}
