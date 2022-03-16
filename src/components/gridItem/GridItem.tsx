import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    boxShadow: '0px 4px 10px #00000012',
    borderRadius: '0px 0px 6px 6px',
    overflow: 'hidden',
  },
})

interface GridItemProps {
  fullSize?: boolean
  children: React.ReactNode | React.ReactNode[]
}

export function GridItem({ children, fullSize = false }: GridItemProps) {
  const classes = useStyles()

  return (
    <Grid item xs={fullSize ? 12 : 6}>
      <div className={classes.root}>{children}</div>
    </Grid>
  )
}
