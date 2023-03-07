import { SingularChartData } from '../../../../../packages/folk-common/types/chartTypes'
import React, { useState } from 'react'
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
import { SliceTooltip } from '@nivo/line'

interface SingularChartCardProps {
  title: string
  description?: string
  fullSize: boolean
  data: SingularChartData
  showFilter?: boolean
  filterType?: ChartFilterType
  sliceTooltip?: SliceTooltip
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
  ...props
}: SingularChartCardProps) => {
  const [isBig, setIsBig] = useState(false)
  const { filterOptions, getFilteredData, setSelectedFilter, selectedFilter } =
    useFilteredData(filterType, data)
  const chartData = showFilter ? getFilteredData() : data

  return (
    <GridItem fullSize={fullSize}>
      <GridItemHeader title={title} description={description}>
        {showFilter && (
          <DropdownPicker
            values={filterOptions}
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
        <SingularChart isBig={false} chartData={chartData} {...props} />

        {/* The big chart */}
        <BigChart open={isBig} onClose={() => setIsBig(false)}>
          <SingularChart isBig={isBig} chartData={chartData} {...props} />
        </BigChart>
      </GridItemContent>
    </GridItem>
  )
}

export default SingularChartCard
