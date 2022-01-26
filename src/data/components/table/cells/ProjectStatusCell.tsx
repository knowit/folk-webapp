import {
  makeStyles,
  Tooltip,
  TooltipProps,
  withStyles,
} from '@material-ui/core'
import React from 'react'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

const StatusCircle = ({ color }: { color: string }) => {
  const Circle = withStyles(() => ({
    colorPrimary: { color },
    root: {
      width: '30px',
      height: '30px',
    },
  }))(FiberManualRecordIcon)

  return <Circle color="primary" />
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
})

interface ColorMap {
  [index: string]: string
}

const toolTipStyles = makeStyles((theme) => ({
  arrow: {
    color: '#F2F2F2',
  },
  tooltip: {
    backgroundColor: '#F2F2F2',
    color: '#333333',
    fontSize: theme.typography.pxToRem(13),
    border: '1px solid #E4E1DB',
  },
}))

function StatusTooltip(props: TooltipProps) {
  const classes = toolTipStyles()
  return <Tooltip arrow classes={classes} {...props} />
}

const applyTitle = (status?: { data: string }): string => {
  switch (status?.data) {
    case 'orange':
      return 'Er åpen for å bytte prosjekt'
    case 'yellow':
      return 'Ønsker å bytte prosjekt'
    case 'green':
      return 'Jeg er opptatt i prosjekt'
    case 'red':
      return 'Jeg er ikke i prosjekt'
  }

  return ''
}

interface ProjectStatusCellProps {
  data: string
}

export default function ProjectStatusCell(props?: ProjectStatusCellProps) {
  const classes = useStyles()
  const colors: ColorMap = {
    green: '#4C8E00',
    yellow: '#ffd500',
    orange: '#ff8800',
    red: '#D10000',
  }
  const color = props ? colors[props.data] : '#777777'
  const toolTipTitle: string = applyTitle(props)

  return (
    <div className={classes.root}>
      <StatusTooltip arrow placement="bottom" title={toolTipTitle}>
        <div>
          <StatusCircle color={color} />
        </div>
      </StatusTooltip>
    </div>
  )
}
