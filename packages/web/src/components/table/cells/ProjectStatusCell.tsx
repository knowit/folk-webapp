import * as React from 'react'
import {
  makeStyles,
  Tooltip,
  TooltipProps,
  withStyles,
} from '@material-ui/core'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import { ProjectStatus } from '../../../api/data/employee/employeeApiTypes'

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

type StatusDisplayDetails = Record<
  ProjectStatus,
  {
    color: string
    label: string
  }
>

const statusDisplayDetails: StatusDisplayDetails = {
  [ProjectStatus.ExternalProject]: {
    color: '#4C8E00',
    label: 'Opptatt i ekstern prosjekt',
  },
  [ProjectStatus.OpenForChange]: {
    color: '#FFD500',
    label: 'Åpen for å bytte prosjekt',
  },
  [ProjectStatus.WantChange]: {
    color: '#FF8800',
    label: 'Ønsker å bytte prosjekt',
  },
  [ProjectStatus.NoProject]: {
    color: '#D10000',
    label: 'Ikke i prosjekt',
  },
  [ProjectStatus.InternalProject]: {
    color: '#004C8E',
    label: 'Opptatt i intern prosjekt',
  },
}

interface ProjectStatusCellProps {
  data: ProjectStatus
}

export default function ProjectStatusCell(props: ProjectStatusCellProps) {
  const classes = useStyles()

  const statusDisplay = statusDisplayDetails[props.data]

  return (
    <div className={classes.root}>
      <StatusTooltip arrow placement="bottom" title={statusDisplay.label}>
        <div>
          <StatusCircle color={statusDisplay.color} />
        </div>
      </StatusTooltip>
    </div>
  )
}
