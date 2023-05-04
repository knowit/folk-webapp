import * as React from 'react'
import { CheckboxProps, FormControlLabel, Grid, Checkbox } from '@mui/material'
import { createStyles, makeStyles, styled, withStyles } from '@mui/styles'
import { InfoTooltip } from '../InfoTooltip'
import { CheckBoxHeader } from '../table/DataTable'

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
      fontSize: '24px',
      fontWeight: 700,
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

const CheckboxWrapper = styled('div')({
  height: '0px',
  position: 'relative',
  marginRight: '20px',
  marginTop: '5px',
  display: 'flex',
})

const BlackCheckBox = withStyles({
  root: {
    color: '#333333',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
})((props: CheckboxProps) => (
  <Checkbox color="default" disableRipple {...props} />
))

interface GridItemHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode | React.ReactNode[]
  big?: boolean
  green?: boolean
  checkBox?: CheckBoxHeader
}

export function GridItemHeader({
  title,
  description,
  children = null,
  big,
  green = false,
  checkBox,
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
        <h2
          className={[classes.gridHeaderTitle, fontSize, knowitGreenTitle].join(
            ' '
          )}
        >
          {title}
          {checkBox && (
            <CheckboxWrapper>
              <FormControlLabel
                label={checkBox.label}
                checked={checkBox.checked}
                control={<BlackCheckBox onChange={checkBox.changeHandler} />}
              />
            </CheckboxWrapper>
          )}
        </h2>
        {description ? (
          <InfoTooltip description={description} placement="right" />
        ) : null}
      </Grid>
      {children}
    </div>
  )
}
