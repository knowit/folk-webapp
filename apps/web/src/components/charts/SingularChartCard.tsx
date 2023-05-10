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
import { styled } from '@mui/material/styles'

interface SingularChartCardProps {
  title: string
  description?: string
  fullSize: boolean
  data: SingularChartData
  sliceTooltip?: SliceTooltip
  extraHeaderContent?: React.ReactNode
  noDataText?: string
}

const NoDataTextWrapper = styled('div')({
  position: 'absolute',
  textAlign: 'center',
  width: '100%',
  top: '50%',
  fontSize: '1.5em',
  transform: 'translateY(-50%)',
})

/**
 * A card for rendering a single card.
 */
const SingularChartCard = ({
  title,
  description,
  fullSize = false,
  data,
  extraHeaderContent,
  noDataText,
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
      <div style={{ position: 'relative' }}>
        <GridItemContent>
          {/* Sub header containing only the increase size-button */}
          <ChartDisplayOptions>
            <ToggleBigChartButton
              big={isBig}
              onChange={() => setIsBig(!isBig)}
            />
          </ChartDisplayOptions>
          {data.data.length === 0 && noDataText && (
            <NoDataTextWrapper>{noDataText}</NoDataTextWrapper>
          )}

          {/* The small chart */}
          <SingularChart isBig={false} chartData={data} {...props} />

          {/* The big chart */}
          <BigChart open={isBig} onClose={() => setIsBig(false)}>
            <SingularChart isBig={isBig} chartData={data} {...props} />
          </BigChart>
        </GridItemContent>
      </div>
    </GridItem>
  )
}

export default SingularChartCard
