import { makeStyles, createStyles, Grid } from '@material-ui/core'
import React from 'react'
import Info from './Info'

const useStyles = makeStyles(() =>
  createStyles({
    gridHeaderRoot: {
      height: '65px',
      backgroundColor: '#E4E1DB',
      paddingLeft: '15px',
      paddingRight: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    bigGridHeaderRoot: {
      height: '102.7px',
    },
    gridHeaderTitle: {
      fontSize: '18px',
      fontWeight: 'normal',
    },
    BigGridHeaderTitle: {
      fontSize: '30px',
      fontWeight: 'normal',
      paddingLeft: '11px',
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

interface GridItemHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode | React.ReactNode[]
  big?: boolean
  green?: boolean
}

export function GridItemHeader({
  title,
  description,
  children = null,
  big,
  green = false,
}: GridItemHeaderProps) {
  const classes = useStyles()
  const headerHeight = big ? classes.bigGridHeaderRoot : null
  const fontSize = big ? classes.BigGridHeaderTitle : null
  const knowitGreen = green ? classes.knowitGreen : null

  return (
    <div
      className={[classes.gridHeaderRoot, headerHeight, knowitGreen].join(' ')}
    >
      <Grid container direction="row" alignItems="center">
        <h3 className={[classes.gridHeaderTitle, fontSize].join(' ')}>
          {title}
          {big}
        </h3>
        <Info description={description} />
      </Grid>
      {children}
    </div>
  )
}
