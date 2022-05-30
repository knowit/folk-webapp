import { BarDatum, BarSvgProps, ResponsiveBar } from '@nivo/bar'
import React from 'react'
import { Translation } from '../../../utils/translation'
import { chartColors, IsBigProps } from './common'

const splitText = (longText: string | number) => {
  const maxLength = 10
  const text = longText.toString()
  const textList: string[] = []
  let start = 0
  while (start + maxLength < text.length) {
    let index = text.lastIndexOf(' ', start + maxLength)
    if (index < start) {
      index = text.indexOf(' ', start + maxLength)
      if (index < start) break
    }
    textList.push(text.substring(start, index))
    start = index + 1
  }
  textList.push(text.substring(start))
  return textList
}

const CustomTick = (tick: any) => {
  const y = tick.tickIndex % 2 === 0 ? 10 : -15
  const values = splitText(tick.value)
  return (
    <g transform={`translate(${tick.x},${tick.y + 22})`}>
      <line stroke="rgb(119,119,119)" strokeWidth={1.5} y1={-22} y2={y} />
      <text
        y={y + 5}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fill: '#333',
          fontSize: 10,
        }}
      >
        {values.map((value: string, index: number) => (
          <tspan key={value + index} y={y + 5 + index * 8} x={0}>
            {value}
          </tspan>
        ))}
      </text>
    </g>
  )
}

/**
 * Nivo Bar Chart with custom styling.
 * Allows for overloading of all props for more detailed customization.
 */

type Props<RawDatum extends BarDatum> = Omit<
  BarSvgProps<RawDatum>,
  'height' | 'width'
> &
  IsBigProps

const BarChart: React.FC<Props<BarDatum>> = ({ isBig = false, ...props }) => {
  const findMaxValue = (): number => {
    if (props && props.data.length > 0) {
      const maxValue = props?.data?.reduce(function (prev, current) {
        return prev.hours > current.hours ? prev : current
      })
      return Number(maxValue) + 5
    } else {
      return Number(props.maxValue)
    }
  }

  return (
    <div style={{ width: '100%', height: isBig ? '400px' : '300px' }}>
      <ResponsiveBar
        margin={{ top: 40, right: 20, bottom: 65, left: 30 }}
        enableLabel={false}
        colors={chartColors}
        borderRadius={3}
        groupMode="grouped"
        key={props.data.length}
        legendLabel={(data) => {
          if (data) {
            const label = Translation[data.id] ?? data.id
            return label as string
          }
          return ''
        }}
        maxValue={findMaxValue()} //Need extra space for bars to stay under max value in xAxis
        tooltip={({ indexValue, value, id }) => {
          // Har coded to fit competenceAmount/Proportion. Should be updated some day.
          if (id.toString().includes('Proportion' || 'Amount')) {
            const dataSet: any = props.data.find(
              (i: any) => i.category === indexValue
            )

            const key = id.toString().includes('motivation')
              ? 'motivation'
              : 'competence'

            const objectKey =
              key === 'motivation' ? 'motivationAmount' : 'competenceAmount'

            const totalEmployees = dataSet ? dataSet[objectKey] : 0

            return (
              <div
                style={{
                  padding: '6px',
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  boxShadow:
                    '1px 1px rgba(0,0,0,0.1), -1px 0px 1px rgba(0,0,0,0.1)',
                }}
              >
                <b>{indexValue}:</b>
                <br /> <b>{Translation[key] ?? key}</b>
                <br /> Antall ansatte: {totalEmployees}
                <br /> Andel: {value.toFixed(1)}%
              </div>
            )
          } else {
            return (
              <div
                style={{
                  padding: '6px',
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  boxShadow:
                    '1px 1px rgba(0,0,0,0.1), -1px 0px 1px rgba(0,0,0,0.1)',
                }}
              >
                <b>{indexValue}:</b>
                <br /> {Translation[id] ?? id}: {value.toFixed(1)}
              </div>
            )
          }
        }}
        axisBottom={{
          renderTick: CustomTick,
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'top',
            direction: 'row',
            itemHeight: 10,
            itemWidth: 130,
            translateY: -25,
            itemsSpacing: 15,
          },
        ]}
        {...props}
      />
    </div>
  )
}

export default BarChart
