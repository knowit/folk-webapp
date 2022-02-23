import React, { useState } from 'react'
import DropdownPicker from './components/DropdownPicker'
import { Line, Bar, Pie, Sunburst, Radar } from './charts'
import BigChart from './components/BigChart'
import { ErrorText } from '../../../components/ErrorText'
import { ChartType, ChartVariant, DDChartProps } from '../../types'
import { ToggleBigChartButton } from './components/ToggleBigChartButton'
import { GridItemContent } from '../../../components/gridItem/GridItemContent'
import { GridItemHeader } from '../../../components/gridItem/GridItemHeader'
import {
  ChartDisplayOptions,
  ChartVariantToggle,
} from './components/ChartDisplayOptions'
import { GridItem } from '../../../components/gridItem/GridItem'

interface ChartGridItemProps {
  isBig?: boolean
  chartVariants: ChartVariant[]
}

const chartComponents: {
  [key in ChartType]: (props: any) => JSX.Element
} = {
  Line: Line,
  Bar: Bar,
  Pie: Pie,
  Radar: Radar,
  Sunburst: Sunburst,
}

interface ChartProps {
  setNames: string[]
  sets: { [key: string]: number }
}

export default function Chart({
  payload,
  fullsize,
  title,
  description,
  props,
}: DDChartProps) {
  const { setNames, sets }: ChartProps = payload

  const [set, setSet] = useState<string>(setNames?.[0] ?? '')
  const [bigChartOpen, setBigChartOpen] = useState<boolean>(false)
  const [chartVariantIdx, setChartVariantIdx] = useState<number>(0)

  const { type: chartVariantToRender, props: chartProps } =
    props.chartVariants[chartVariantIdx]

  const ChartComponent = chartComponents[chartVariantToRender]

  const setNamesLength = payload.setNames.length ?? 0

  const handleSetChange = (setName: string) => {
    setSet(setName)
  }

  const ChartGridItem = ({
    isBig = false,
    chartVariants,
  }: ChartGridItemProps) => (
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
      <ChartGridItem chartVariants={props.chartVariants} />
      <BigChart open={bigChartOpen} onClose={() => setBigChartOpen(false)}>
        <ChartGridItem isBig chartVariants={props.chartVariants} />
      </BigChart>
    </GridItem>
  )
}
