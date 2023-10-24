import * as React from 'react'
import { Tooltip, TooltipProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { ProjectStatus } from '../../../api/data/employee/employeeApiTypes'

const ComponentRoot = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
}))
const TooltipStyled = styled(Tooltip)(({ theme }) => ({
  backgroundColor: 'none',
  fontSize: theme.typography.pxToRem(13),
  border: 'none',
}))
const StatusCircle = ({ color }: { color: string }) => {
  const Circle = styled(FiberManualRecordIcon)(() => ({
    backgroundColor: 'transparent',
    color: color,
    width: 30,
    height: 30,
  }))
  return <Circle />
}

function StatusTooltip(props: TooltipProps) {
  return <TooltipStyled arrow {...props} />
}

type StatusDisplayDetails = Record<
  ProjectStatus,
  {
    color: string
    label: string
  }
>

export const statusDisplayDetails: StatusDisplayDetails = {
  [ProjectStatus.ExternalProject]: {
    color: '#4C8E00',
    label: 'Opptatt i ekstern prosjekt',
  },
  [ProjectStatus.OpenForChange]: {
    color: '#4C8E00',
    label: 'Opptatt i eksternt prosjekt',
  },
  [ProjectStatus.WantChange]: {
    color: '#4C8E00',
    label: 'Opptatt i eksternt prosjekt',
  },
  [ProjectStatus.NoProject]: {
    color: '#D10000',
    label: 'Ikke i prosjekt',
  },
  [ProjectStatus.InternalProject]: {
    color: '#004C8E',
    label: 'Opptatt i intern prosjekt',
  },
  [ProjectStatus.NotBillable]: {
    color: '#F7DC30',
    label: 'Salg, administrasjon og ledelse',
  },
}

interface ProjectStatusCellProps {
  data: ProjectStatus
}

export default function ProjectStatusCell(props: ProjectStatusCellProps) {
  const statusDisplay = statusDisplayDetails[props.data]

  return (
    <ComponentRoot>
      <StatusTooltip arrow placement="bottom" title={statusDisplay.label}>
        <div>
          <StatusCircle color={statusDisplay.color} />
        </div>
      </StatusTooltip>
    </ComponentRoot>
  )
}
