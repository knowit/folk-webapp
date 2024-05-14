import React, { useState } from 'react'
import { GridItem } from '../gridItem/GridItem'
import { GridItemHeader } from '../gridItem/GridItemHeader'
import DropdownPicker from './DropdownPicker'
import { GridItemContent } from '../gridItem/GridItemContent'
import { ChartDisplayOptions, ChartVariantToggle } from './ChartDisplayOptions'
import { ToggleBigChartButton } from './ToggleBigChartButton'
import BigChart from './BigChart'
import {
  MultipleChartData,
  SingularChartData,
} from '../../../../../packages/folk-common/types/chartTypes'
import { SingularChart } from './ChartCard'
import { styled } from '@mui/material/styles'

interface MultipleChartCardProps {
  title: string
  description?: string
  fullSize: boolean
  data: MultipleChartData<SingularChartData[]>
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

const MultipleChartCard = ({
  title,
  description,
  fullSize,
  data: { groups },
  noDataText,
}: MultipleChartCardProps) => {
  const [selectedGroupName, setSelectedGroupName] = useState(groups[0].name)
  const [selectedChartIndex, setSelectedChartIndex] = useState(0)
  const [isBig, setIsBig] = useState(false)

  const selectedGroup = groups.find((group) => group.name === selectedGroupName)

  return (
    <GridItem fullSize={fullSize}>
      {/* Header containing dropdown picker */}
      <GridItemHeader title={title} description={description}>
        <DropdownPicker
          values={groups.map((group) => group.name)}
          selected={selectedGroupName}
          onChange={setSelectedGroupName}
          title={title}
        />
      </GridItemHeader>

      <div style={{ position: 'relative' }}>
        <GridItemContent>
          {/* Sub header containing toggle of charts as well as increase size button */}
          <ChartDisplayOptions>
            {selectedGroup && selectedGroup.charts.length > 1 && (
              <ChartVariantToggle
                chartVariants={selectedGroup.charts.map((chart) => ({
                  type: chart.type,
                }))}
                selected={selectedChartIndex}
                onChange={setSelectedChartIndex}
                title={title}
              />
            )}

            <ToggleBigChartButton
              big={isBig}
              title={title}
              onChange={() => setIsBig(!isBig)}
            />
          </ChartDisplayOptions>
          {selectedGroup.charts[selectedChartIndex].data.length === 0 &&
            noDataText && <NoDataTextWrapper>{noDataText}</NoDataTextWrapper>}

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
      </div>
    </GridItem>
  )
}

export default MultipleChartCard
