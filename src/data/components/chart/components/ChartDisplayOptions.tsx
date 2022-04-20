import React from 'react'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { BarChart, PieChart, ShowChart, DonutLarge } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { createStyles, SvgIcon } from '@material-ui/core'
import { ReactComponent as RadarLogo } from '../../../../assets/RadarChart.svg'
import { ChartType, ChartVariant } from '../../../types'

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
  const handleChartVariantChange = (
    event: React.MouseEvent,
    newChartIndex: number | null
  ) => {
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

const useStyles = makeStyles(() =>
  createStyles({
    chartDisplayOptions: {
      display: 'flex',
      justifyContent: 'space-between',
      alignContent: 'flex-start',
      alignItems: 'flex-start',
    },
  })
)

interface ChartDisplayOptionsProps {
  children: React.ReactNode | React.ReactNode[]
}

export function ChartDisplayOptions({ children }: ChartDisplayOptionsProps) {
  const classes = useStyles()

  return <div className={classes.chartDisplayOptions}>{children}</div>
}
