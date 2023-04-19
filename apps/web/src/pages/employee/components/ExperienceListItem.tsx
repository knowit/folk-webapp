import * as React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  listItem: {
    paddingBottom: '0.25em',
  },
})

interface Props {
  children: React.ReactNode
}

export function ExperienceListItem({ children }: Props) {
  const classes = useStyles()

  return <li className={classes.listItem}>{children}</li>
}
