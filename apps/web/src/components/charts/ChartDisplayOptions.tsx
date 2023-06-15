import React from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { BarChart, PieChart, ShowChart, DonutLarge } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { SvgIcon } from '@mui/material'
import { ReactComponent as RadarLogo } from '../../assets/RadarChart.svg'

import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { ChartType, ChartVariant } from '../sortableTable/tableTypes'

const chartVariantInfo: {
  [key in ChartType]: {
    label: string
    icon: React.ReactNode
  }
} = {
  LineChart: { label: 'linjediagram', icon: <ShowChart /> },
  BarChart: { label: 'stolpediagram', icon: <BarChart /> },
  PieChart: { label: 'kakediagram', icon: <PieChart /> },
  RadarChart: {
    label: 'radardiagram',
    icon: (
      <SvgIcon>
        {' '}
        <RadarLogo />{' '}
      </SvgIcon>
    ),
  },
  SunburstChart: { label: 'sunburst-diagram', icon: <DonutLarge /> },
}

interface ChartVariantToggleProps {
  chartVariants: ChartVariant[]
  selected: number
  onChange: (value: number) => void
  big?: boolean
}

export function ChartVariantToggle({
  chartVariants,
  selected,
  onChange,
  big = false,
}: ChartVariantToggleProps) {
  const { trackEvent } = useMatomo()

  const handleChartVariantChange = (
    event: React.MouseEvent,
    newChartIndex: number | null
  ) => {
    trackEvent({ category: 'graf-type', action: 'click-event' })
    if (typeof newChartIndex === 'number') {
      onChange(newChartIndex)
    }
  }

  return (
    <ToggleButtonGroup
      exclusive
      value={selected}
      onChange={handleChartVariantChange}
      size={big ? 'medium' : 'small'}
    >
      {chartVariants.map((chartVariant, chartIndex) => {
        const { label, icon: ChartIcon } = chartVariantInfo[chartVariant.type]
        const buttonLabel = `Vis som ${label}`

        return (
          <ToggleButton
            key={label}
            value={chartIndex}
            disableRipple
            aria-label={buttonLabel}
            title={buttonLabel}
          >
            {ChartIcon}
          </ToggleButton>
        )
      })}
    </ToggleButtonGroup>
  )
}

const ChartDisplayOptionsStyled = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'flex-start',
  alignItems: 'flex-start',
}))

interface ChartDisplayOptionsProps {
  children: React.ReactNode | React.ReactNode[]
}

export function ChartDisplayOptions({ children }: ChartDisplayOptionsProps) {
  return <ChartDisplayOptionsStyled>{children}</ChartDisplayOptionsStyled>
}
