import { makeStyles, createStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(() =>
  createStyles({
    gridContentRoot: {
      width: '100%',
      padding: '15px',
      fontSize: '16px',
      backgroundColor: 'white',
      borderLeft: '1px solid #E4E1DB',
      borderBottom: '1px solid #E4E1DB',
      borderRight: '1px solid #E4E1DB',
      borderRadius: '0px 0px 6px 6px',
    },
    knowitGreen: {
      backgroundColor: '#00897B',
      width: '100%',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '0px',
    },
  })
)

interface GridItemContentProps {
  children: React.ReactNode | React.ReactNode[]
}

export function GridItemContent({ children }: GridItemContentProps) {
  const classes = useStyles()
  return <div className={classes.gridContentRoot}>{children}</div>
}
