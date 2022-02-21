import { makeStyles, createStyles } from '@material-ui/core/styles'
import React from 'react'
import { knowitGreen } from './GridItem'

interface GridItemContentProps {
  children: React.ReactNode | React.ReactNode[]
}

const useStyles = makeStyles(() =>
  createStyles({
    gridContentRoot: {
      width: '100%',
      padding: '15px',
      backgroundColor: 'white',
      borderLeft: '1px solid #E4E1DB',
      borderBottom: '1px solid #E4E1DB',
      borderRight: '1px solid #E4E1DB',
      borderRadius: '0px 0px 6px 6px',
    },
    knowitGreen: knowitGreen,
  })
)

export default function GridItemContent({ children }: GridItemContentProps) {
  const classes = useStyles()
  return <div className={classes.gridContentRoot}>{children}</div>
}
