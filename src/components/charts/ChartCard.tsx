import { Alert, AlertTitle, Skeleton } from '@material-ui/lab'
import React, { useState } from 'react'
import {
  ChartData,
  MultipleChartData,
  SingularChartData,
} from '../../api/data/chartTypes'
import BigChart from '../../data/components/chart/components/BigChart'
import {
  ChartDisplayOptions,
  ChartVariantToggle,
} from '../../data/components/chart/components/ChartDisplayOptions'
import DropdownPicker from '../../data/components/chart/components/DropdownPicker'
import { ToggleBigChartButton } from '../../data/components/chart/components/ToggleBigChartButton'
import { GridItem } from '../gridItem/GridItem'
import { GridItemContent } from '../gridItem/GridItemContent'
import { GridItemHeader } from '../gridItem/GridItemHeader'
import BarChart from './BarChart'
import { IsBigProps } from './common'
import LineChart from './LineChart'
import PieChart from './PieChart'
import RadarChart from './RadarChart'
import SunburstChart from './SunburstChart'

interface SingularChartProps {
  chartData: SingularChartData
}

/**
 * The chart to be rendered.
 */
const SingularChart = ({
  isBig,
  chartData,
}: SingularChartProps & IsBigProps) => {
  switch (chartData.type) {
    case 'BarChart':
      return <BarChart isBig={isBig} {...chartData} />
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

interface SingularChartCardProps {
  title: string
  description?: string
  data: SingularChartData
}

/**
 * A card for rendering a single card.
 */
const SingularChartCard = ({
  title,
  description,
  data,
}: SingularChartCardProps) => {
  const [isBig, setIsBig] = useState(false)
  return (
    <GridItem>
      <GridItemHeader title={title} description={description} />
      <GridItemContent>
        {/* Sub header containing only the increase size-button */}
        <ChartDisplayOptions>
          <ToggleBigChartButton big={isBig} onChange={() => setIsBig(!isBig)} />
        </ChartDisplayOptions>

        {/* The small chart */}
        <SingularChart isBig={false} chartData={data} />

        {/* The big chart */}
        <BigChart open={isBig} onClose={() => setIsBig(false)}>
          <SingularChart isBig={isBig} chartData={data} />
        </BigChart>
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
  const [isBig, setIsBig] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const selectedGroup = groups.find(
    (group) => group.name === selectedGroupName
  )!

  return (
    <GridItem>
      {/* Header containing dropdown picker */}
      <GridItemHeader title={title} description={description}>
        <DropdownPicker
          values={groups.map((group) => group.name)}
          selected={selectedGroupName}
          onChange={setSelectedGroupName}
        />
      </GridItemHeader>

      <GridItemContent>
        {/* Sub header containing toggle of charts as well as increase size button */}
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

          <ToggleBigChartButton big={isBig} onChange={() => setIsBig(!isBig)} />
        </ChartDisplayOptions>

        {/* The small chart */}
        <SingularChart
          isBig={false}
          key={selectedGroupName}
          chartData={selectedGroup.charts[selectedChartIndex]}
        />

        {/* The big chart */}
        <BigChart open={isBig} onClose={() => setIsBig(false)}>
          <SingularChart
            isBig={isBig}
            key={selectedGroupName}
            chartData={selectedGroup.charts[selectedChartIndex]}
          />
        </BigChart>
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
