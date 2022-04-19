import { Alert, AlertTitle, Skeleton } from '@material-ui/lab'
import React, { useState } from 'react'
import {
  ChartData,
  MultipleChartData,
  SingularChartData,
} from '../../api/data/chartTypes'
import {
  ChartDisplayOptions,
  ChartVariantToggle,
} from '../../data/components/chart/components/ChartDisplayOptions'
import DropdownPicker from '../../data/components/chart/components/DropdownPicker'
import { GridItem } from '../gridItem/GridItem'
import { GridItemContent } from '../gridItem/GridItemContent'
import { GridItemHeader } from '../gridItem/GridItemHeader'
import BarChart from './BarChart'
import LineChart from './LineChart'
import PieChart from './PieChart'
import RadarChart from './RadarChart'
import SunburstChart from './SunburstChart'

interface SingularChartProps {
  chartData: SingularChartData
}

const SingularChart = ({ chartData }: SingularChartProps) => {
  switch (chartData.type) {
    case 'BarChart':
      return <BarChart {...chartData} />
    case 'RadarChart':
      return <RadarChart {...chartData} />
    case 'LineChart':
      return <LineChart {...chartData} />
    case 'PieChart':
      return <PieChart {...chartData} />
    case 'SunburstChart':
      return <SunburstChart {...chartData} />
  }
}

interface SingularChartCardProps {
  title: string
  description?: string
  data: SingularChartData
}

const SingularChartCard = ({
  title,
  description,
  data,
}: SingularChartCardProps) => {
  return (
    <GridItem>
      <GridItemHeader title={title} description={description} />
      <GridItemContent>
        <SingularChart chartData={data} />
      </GridItemContent>
    </GridItem>
  )
}

interface MultipleChartCardProps {
  title: string
  description?: string
  data: MultipleChartData<SingularChartData[]>
}

const MultipleChartCard = ({
  title,
  description,
  data: { groups },
}: MultipleChartCardProps) => {
  const [selectedGroupName, setSelectedGroupName] = useState(groups[0].name)
  const [selectedChartIndex, setSelectedChartIndex] = useState(0)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const selectedGroup = groups.find(
    (group) => group.name === selectedGroupName
  )!

  return (
    <GridItem>
      <GridItemHeader title={title} description={description}>
        <DropdownPicker
          values={groups.map((group) => group.name)}
          selected={selectedGroupName}
          onChange={setSelectedGroupName}
        />
      </GridItemHeader>
      <GridItemContent>
        <ChartDisplayOptions>
          {selectedGroup.charts.length > 1 && (
            <ChartVariantToggle
              chartVariants={selectedGroup.charts.map((chart) => ({
                type: chart.type,
              }))}
              selected={selectedChartIndex}
              onChange={setSelectedChartIndex}
            />
          )}
        </ChartDisplayOptions>
        <SingularChart
          key={selectedGroupName}
          chartData={selectedGroup.charts[selectedChartIndex]}
        />
      </GridItemContent>
    </GridItem>
  )
}

interface ChartCardProps {
  title: string
  description?: string
  data: ChartData | undefined
  error: any
}

const ChartCard = ({ data, error, ...props }: ChartCardProps) => {
  if (error)
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        <strong>Kunne ikke hente data!</strong>
      </Alert>
    )

  if (!data) return <Skeleton variant="rect" width={210} height={118} />

  return data.type === 'MultipleChart' ? (
    <MultipleChartCard data={data} {...props} />
  ) : (
    <SingularChartCard data={data} {...props} />
  )
}

export default ChartCard
