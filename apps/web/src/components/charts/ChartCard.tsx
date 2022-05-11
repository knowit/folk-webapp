import {
  ChartData,
  MultipleChartData,
  SingularChartData,
} from '@folk/common/types/chartTypes'
import React, { useEffect, useState } from 'react'
import { FallbackMessage } from '../../pages/employee/components/FallbackMessage'
import { GridItem } from '../gridItem/GridItem'
import { GridItemContent } from '../gridItem/GridItemContent'
import { GridItemHeader } from '../gridItem/GridItemHeader'
import { MultiLineSkeleton } from '../skeletons/MultiLineSkeleton'
import BigChart from './BigChart'
import { ChartDisplayOptions, ChartVariantToggle } from './ChartDisplayOptions'
import DropdownPicker from './DropdownPicker'
import BarChart from './nivo/BarChart'
import { IsBigProps } from './nivo/common'
import LineChart from './nivo/LineChart'
import PieChart from './nivo/PieChart'
import RadarChart from './nivo/RadarChart'
import SunburstChart from './nivo/SunburstChart'
import { ToggleBigChartButton } from './ToggleBigChartButton'

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
  fullSize: boolean
  data: SingularChartData
  showFilter?: boolean
}

/**
 * A card for rendering a single card.
 */
const SingularChartCard = ({
  title,
  description,
  fullSize = false,
  showFilter,
  data,
}: SingularChartCardProps) => {
  const [isBig, setIsBig] = useState(false)
  const filterValues = ['Siste måned', 'Siste kvartal', 'Hittil i år', 'Totalt']
  const [selectedFilter, setSelectedFilter] = useState(filterValues[0])

  useEffect(() => {
    console.log(data)
  })
  function getFilterData(filter: string): SingularChartData {
    //Depending on the different filters, this function will return correct info to display in chart
    if (data.type === 'LineChart' || data.type === 'BarChart') {
      switch (filter) {
        case 'Siste måned':
          return findLastMonthData()
        case 'Siste kvartal':
          return data
        case 'Hittil i år':
          return data
        case 'Totalt':
          return data
        default:
          return data
      }
    } else {
      return data
    }
  }

  //Function to show chart data for only in the current week (reg_period). Is static atm, must be updated to calculate current week and month automatically
  function findLastMonthData(): SingularChartData {
    if (data && data.type === 'LineChart') {
      const monthData = data.data.map((customer) => {
        return {
          ...customer,
          data: customer.data.filter((week) =>
            Object.keys(week).reduce((acc) => {
              return (
                acc ||
                (typeof week.x === 'string' &&
                  (week.x.includes('202143') ||
                    week.x.includes('202144') ||
                    week.x.includes('202145') ||
                    week.x.includes('202146')))
              )
            }, false)
          ),
        }
      })
      const weekChartObject: SingularChartData = { ...data, data: monthData }
      console.log(monthData)
      return weekChartObject
    }
    if (data && data.type === 'BarChart') {
      //Det er ikke mulig å telle timer per måned, kvartal, år. Det er fordi timene kommer summert
      return data
    } else {
      return data
    }
  }

  return (
    <GridItem fullSize={fullSize}>
      <GridItemHeader title={title} description={description}>
        {showFilter && (
          //Finne en måte å filtrere data ift periode og valgt filter
          <DropdownPicker
            values={filterValues}
            selected={selectedFilter}
            onChange={setSelectedFilter}
          />
        )}
      </GridItemHeader>
      <GridItemContent>
        {/* Sub header containing only the increase size-button */}
        <ChartDisplayOptions>
          <ToggleBigChartButton big={isBig} onChange={() => setIsBig(!isBig)} />
        </ChartDisplayOptions>

        {/* The small chart */}
        <SingularChart
          isBig={false}
          chartData={showFilter ? getFilterData(selectedFilter) : data}
        />

        {/* The big chart */}
        <BigChart open={isBig} onClose={() => setIsBig(false)}>
          <SingularChart
            isBig={isBig}
            chartData={showFilter ? getFilterData(selectedFilter) : data}
          />
        </BigChart>
      </GridItemContent>
    </GridItem>
  )
}

interface MultipleChartCardProps {
  title: string
  description?: string
  fullSize: boolean
  data: MultipleChartData<SingularChartData[]>
}

const MultipleChartCard = ({
  title,
  description,
  fullSize,
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
    <GridItem fullSize={fullSize}>
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
  fullSize?: boolean
  data: ChartData | undefined
  error: any
  showFilter?: boolean
}

const ChartCard = ({
  fullSize = false,
  data,
  error,
  title,
  showFilter = false,
  ...props
}: ChartCardProps) => {
  if (error)
    return (
      <GridItem>
        <GridItemHeader title={title} />
        <GridItemContent>
          <FallbackMessage message="Noe gikk galt ved henting av data." />
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
      {...props}
    />
  )
}

export default ChartCard
