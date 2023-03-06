import { ChartData, SingularChartData } from '@folk/common/types/chartTypes'
import React from 'react'
import { FallbackMessage } from '../../pages/employee/components/FallbackMessage'
import { GridItem } from '../gridItem/GridItem'
import { GridItemContent } from '../gridItem/GridItemContent'
import { GridItemHeader } from '../gridItem/GridItemHeader'
import { MultiLineSkeleton } from '../skeletons/MultiLineSkeleton'
import BarChart from './nivo/BarChart'
import { IsBigProps, IsHorizontalProps } from './nivo/common'
import LineChart from './nivo/LineChart'
import PieChart from './nivo/PieChart'
import RadarChart from './nivo/RadarChart'
import SunburstChart from './nivo/SunburstChart'
import MultipleChartCard from './MultipleChartCard'
import SingularChartCard from './SingularChartCard'
import { ChartFilterType } from './chartFilters/useFilteredData'

interface SingularChartProps {
  chartData: SingularChartData
}

/**
 * The chart to be rendered.
 */
export const SingularChart = ({
  isBig,
  chartData,
  isHorizontal,
}: SingularChartProps & IsBigProps & IsHorizontalProps) => {
  switch (chartData.type) {
    case 'BarChart':
      return (
        <BarChart isBig={isBig} {...chartData} isHorizontal={isHorizontal} />
      )
    case 'RadarChart':
      return <RadarChart isBig={isBig} {...chartData} />
    case 'LineChart':
      return <LineChart isBig={isBig} {...chartData} />
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
  showFilter?: boolean
  filterType?: ChartFilterType
  isHorizontal?: boolean
}

const ChartCard = ({
  fullSize = false,
  data,
  error,
  title,
  filterType,
  showFilter = false,
  isHorizontal = false,
  ...props
}: ChartCardProps) => {
  if (error)
    return (
      <GridItem>
        <GridItemHeader title={title} />
        <GridItemContent>
          <FallbackMessage error={error} />
        </GridItemContent>
      </GridItem>
    )
  if (!data) return <MultiLineSkeleton />

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
      showFilter={showFilter}
      filterType={filterType}
      isHorizontal={isHorizontal}
      {...props}
    />
  )
}

export default ChartCard
