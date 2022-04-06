import * as React from 'react'
import { Grid } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { InfoTooltip } from '../InfoTooltip'

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
    bigGridHeaderTitle: {
      fontSize: '30px',
      fontWeight: 'normal',
      paddingLeft: '11px',
    },
    knowitGreen: {
      backgroundColor: '#00897B',
      color: '#FFFFFF',
      width: '100%',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '0px',
    },
    knowitGreenTitle: {
      color: '#FFFFFF',
      fontWeight: 'bold',
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
  const fontSize = big ? classes.bigGridHeaderTitle : null
  const knowitGreen = green ? classes.knowitGreen : null
  const knowitGreenTitle = green ? classes.knowitGreenTitle : null

  return (
    <div
      className={[classes.gridHeaderRoot, headerHeight, knowitGreen].join(' ')}
    >
      <Grid container direction="row" alignItems="center">
        <h3
          className={[classes.gridHeaderTitle, fontSize, knowitGreenTitle].join(
            ' '
          )}
        >
          {title}
        </h3>
        {description ? (
          <InfoTooltip description={description} placement="right" />
        ) : null}
      </Grid>
      {children}
    </div>
  )
}
