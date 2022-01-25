import React, { useState } from 'react'
import {
  GridItemHeader,
  GridItemContent,
  GridItem,
} from '../components/GridItem'
import DropdownPicker from '../components/DropdownPicker'
import Line from './components/Line'
import Bar from './components/Bar'
import Pie from './components/Pie'
import BigChart from '../components/BigChart'
import { ErrorText } from '../components/ErrorText'
import Sunburst from './components/Sunburst'
import Radar from './components/Radar'
import { DDChartProps } from './types'
import {
  ChartDisplayOptions,
  ChartVariantToggle,
} from '../components/ChartDisplayOptions'
import { ToggleBigChartButton } from '../components/ToggleBigChartButton'

export type ChartVariant = 'Line' | 'Bar' | 'Pie' | 'Radar' | 'Sunburst'

export interface ChartComponentInfo {
  type: ChartVariant
  props: DDChartProps
}

const chartComponents: {
  [key in ChartVariant]: (props: any) => JSX.Element
} = {
  Line: Line,
  Bar: Bar,
  Pie: Pie,
  Radar: Radar,
  Sunburst: Sunburst,
}

export default function DDChart({
  payload,
  fullsize,
  title,
  description,
  props,
}: DDChartProps) {
  const { setNames, sets } = payload as {
    setNames: string[]
    sets: { [key: string]: any }
  }
  const [set, setSet] = useState<string>(
    setNames && setNames.length > 0 ? setNames[0] : ''
  )
  const [bigChartOpen, setBigChartOpen] = useState<boolean>(false)
  const [chartVariantIdx, setChartVariantIdx] = useState<number>(0)

  const chartVariants = props.chartVariants as Array<ChartComponentInfo>
  const { type: chartVariantToRender, props: chartProps } =
    chartVariants[chartVariantIdx]
  const ChartComponent = chartComponents[chartVariantToRender]

  const setNamesLength = payload.setNames ? payload.setNames.length : 0

  const handleSetChange = (setName: string) => {
    setSet(setName)
  }

  const ChartGridItem = ({ isBig = false }: { isBig?: boolean }) => (
    <>
      <GridItemHeader title={title} description={description} big={isBig}>
        {setNamesLength > 1 ? (
          <DropdownPicker
            values={setNames}
            onChange={handleSetChange}
            selected={set}
            big={isBig}
          />
        ) : null}
      </GridItemHeader>
      {sets ? (
        <GridItemContent>
          <ChartDisplayOptions>
            {chartVariants.length > 1 ? (
              <ChartVariantToggle
                chartVariants={chartVariants}
                selected={chartVariantIdx}
                onChange={setChartVariantIdx}
                big={isBig}
              />
            ) : null}
            <ToggleBigChartButton
              big={isBig}
              onChange={() => setBigChartOpen(!bigChartOpen)}
            />
          </ChartDisplayOptions>
          <ChartComponent big={isBig} data={sets[set]} {...chartProps} />
        </GridItemContent>
      ) : (
        <ErrorText />
      )}
    </>
  )

  return (
    <GridItem fullSize={fullsize}>
      <ChartGridItem />
      <BigChart open={bigChartOpen} onClose={() => setBigChartOpen(false)}>
        <ChartGridItem isBig />
      </BigChart>
    </GridItem>
  )
}
