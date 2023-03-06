import { SingularChartData } from '../../../../../packages/folk-common/types/chartTypes'
import React, { useEffect, useState } from 'react'
import { GridItem } from '../gridItem/GridItem'
import { GridItemHeader } from '../gridItem/GridItemHeader'
import DropdownPicker from './DropdownPicker'
import { GridItemContent } from '../gridItem/GridItemContent'
import { ChartDisplayOptions } from './ChartDisplayOptions'
import { ToggleBigChartButton } from './ToggleBigChartButton'
import BigChart from './BigChart'
import { SingularChart } from './ChartCard'
import useFilteredData, {
  ChartFilterType,
} from './chartFilters/useFilteredData'

interface SingularChartCardProps {
  title: string
  description?: string
  fullSize: boolean
  data: SingularChartData
  showFilter?: boolean
  filterType?: ChartFilterType
  isHorizontal?: boolean
}

/**
 * A card for rendering a single card.
 */
const SingularChartCard = ({
  title,
  description,
  fullSize = false,
  showFilter,
  filterType,
  data,
  isHorizontal = false,
}: SingularChartCardProps) => {
  const [isBig, setIsBig] = useState(false)
  const { filterOptions, getFilteredData, setSelectedFilter, selectedFilter } =
    useFilteredData(filterType, data)
  const chartData = showFilter ? getFilteredData() : data
  const [customerFilter, setCustomerFilter] = useState<string[]>([])
  useEffect(() => {
    if (
      chartData !== undefined &&
      chartData.data !== undefined &&
      chartData.data.length > 0
    ) {
      console.log('Setting values..')
      const allCustomers = chartData.data.map((item) => {
        if (item.id !== undefined) return item.id
      })
      setCustomerFilter(allCustomers)
      console.log('Values are now: ', allCustomers)
    }
  }, [])
  console.log('Data: ', customerFilter)
  return (
    <GridItem fullSize={fullSize}>
      <GridItemHeader title={title} description={description}>
        {showFilter && (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <DropdownPicker
              values={filterOptions}
              selected={selectedFilter}
              onChange={setSelectedFilter}
            />
            <DropdownPicker selected={''} values={['customerFilter']} />
          </div>
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
          chartData={{
            data: chartData.data.sort((a, b) => a.hours - b.hours),
            ...chartData,
          }}
          isHorizontal={isHorizontal}
        />

        {/* The big chart */}
        <BigChart open={isBig} onClose={() => setIsBig(false)}>
          <SingularChart
            isBig={isBig}
            chartData={chartData}
            isHorizontal={isHorizontal}
          />
        </BigChart>
      </GridItemContent>
    </GridItem>
  )
}

export default SingularChartCard
