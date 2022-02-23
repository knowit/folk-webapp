import React from 'react'
import { Grid } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'

export const knowitGreen = {
  backgroundColor: '#00897B',
  width: '100%',
  height: '70px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '0px',
}

const useStyles = makeStyles(() =>
  createStyles({
    gridRoot: {
      boxShadow: '0px 4px 10px #00000012',
      borderRadius: '0px 0px 6px 6px',
      overflow: 'hidden',
    },
    knowitGreen: knowitGreen,
  })
)

interface GridItemProps {
  fullSize?: boolean
  children: React.ReactNode | React.ReactNode[]
}

export default function GridItem({
  children,
  fullSize = false,
}: GridItemProps) {
  const classes = useStyles()

  return (
    <Grid item xs={fullSize ? 12 : 6}>
      <div className={classes.gridRoot}>{children}</div>
    </Grid>
  )
}
