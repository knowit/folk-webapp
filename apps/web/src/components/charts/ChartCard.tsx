import { ChartData, SingularChartData } from '@folk/common/types/chartTypes'
import React from 'react'
import { FallbackMessage } from '../../pages/employee/components/FallbackMessage'
import { GridItem } from '../gridItem/GridItem'
import { GridItemContent } from '../gridItem/GridItemContent'
import { GridItemHeader } from '../gridItem/GridItemHeader'
import { ChartSkeleton } from '../skeletons/ChartSkeleton'
import BarChart from './nivo/BarChart'
import { IsBigProps } from './nivo/common'
import LineChart from './nivo/LineChart'
import PieChart from './nivo/PieChart'
import RadarChart from './nivo/RadarChart'
import SunburstChart from './nivo/SunburstChart'
import MultipleChartCard from './MultipleChartCard'
import SingularChartCard from './SingularChartCard'
import { SliceTooltip } from '@nivo/line'

interface SingularChartProps {
  chartData: SingularChartData
}

/**
 * The chart to be rendered.
 */
export const SingularChart = ({
  isBig,
  chartData,
  ...props
}: SingularChartProps & IsBigProps): React.ReactNode => {
  switch (chartData.type) {
    case 'BarChart':
      return <BarChart isBig={isBig} {...chartData} />
    case 'TProfileChart':
      return <BarChart isBig={isBig} {...chartData} />
    case 'RadarChart':
      return <RadarChart isBig={isBig} {...chartData} />
    case 'LineChart':
      return <LineChart isBig={isBig} {...chartData} {...props} />
    case 'PieChart':
      return <PieChart isBig={isBig} {...chartData} />
    case 'SunburstChart':
      return <SunburstChart isBig={isBig} {...chartData} />
  }
}

interface ChartCardProps {
  title: string
  description?: string
  fullSize?: boolean
  data: ChartData | undefined
  error: any
  sliceTooltip?: SliceTooltip
  extraHeaderContent?: React.ReactNode
  noDataText?: string
  legendWidth?: number
  maxValue?: number
}

const ChartCard = ({
  fullSize = false,
  data,
  error,
  title,
  legendWidth,
  ...props
}: ChartCardProps): React.ReactNode => {
  if (error)
    return (
      <GridItem>
        <GridItemHeader title={title} />
        <GridItemContent>
          <FallbackMessage error={error} />
        </GridItemContent>
      </GridItem>
    )
  if (!data) {
    return (
      <GridItem fullSize={fullSize}>
        <ChartSkeleton />
      </GridItem>
    )
  }

  return data.type === 'MultipleChart' ? (
    <MultipleChartCard
      fullSize={fullSize}
      title={title}
      data={data}
      {...props}
    />
  ) : (
    <SingularChartCard
      fullSize={fullSize}
      title={title}
      data={data}
      legendWidth={legendWidth}
      {...props}
    />
  )
}

export default ChartCard
