import { SingularChartData } from '../../../../../packages/folk-common/types/chartTypes'
import React, { useState } from 'react'
import { GridItem } from '../gridItem/GridItem'
import { GridItemHeader } from '../gridItem/GridItemHeader'
import { GridItemContent } from '../gridItem/GridItemContent'
import { ChartDisplayOptions } from './ChartDisplayOptions'
import { ToggleBigChartButton } from './ToggleBigChartButton'
import BigChart from './BigChart'
import { SingularChart } from './ChartCard'
import { SliceTooltip } from '@nivo/line'

interface SingularChartCardProps {
  title: string
  description?: string
  fullSize: boolean
  data: SingularChartData
  sliceTooltip?: SliceTooltip
  extraHeaderContent?: React.ReactNode
}

/**
 * A card for rendering a single card.
 */
const SingularChartCard = ({
  title,
  description,
  fullSize = false,
  data,
  extraHeaderContent,
  ...props
}: SingularChartCardProps) => {
  const [isBig, setIsBig] = useState(false)

  return (
    <GridItem fullSize={fullSize}>
      <GridItemHeader title={title} description={description}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {extraHeaderContent && extraHeaderContent}
        </div>
      </GridItemHeader>
      <GridItemContent>
        {/* Sub header containing only the increase size-button */}
        <ChartDisplayOptions>
          <ToggleBigChartButton big={isBig} onChange={() => setIsBig(!isBig)} />
        </ChartDisplayOptions>

        {/* The small chart */}
        <SingularChart isBig={false} chartData={data} {...props} />

        {/* The big chart */}
        <BigChart open={isBig} onClose={() => setIsBig(false)}>
          <SingularChart isBig={isBig} chartData={data} {...props} />
        </BigChart>
      </GridItemContent>
    </GridItem>
  )
}

export default SingularChartCard
