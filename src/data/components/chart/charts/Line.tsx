import React from 'react'

import { ResponsiveLine } from '@nivo/line'
import { colors } from './common'
interface LineChartsProps {
  data: any
  big?: boolean
}

const lineChartColors = colors.filter((_: any, k: number) => k !== 1)
console.log(lineChartColors)

export default function Line({ data, big }: LineChartsProps) {
  const height = big ? '400px' : '280px'
  const legendTranslateY = big ? 50 : 30
  if (data !== undefined) {
    console.log(data)
    return (
      <div style={{ height, width: '100%' }}>
        <ResponsiveLine
          data={data}
          margin={{ top: 10, right: 20, bottom: 70, left: 40 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false,
          }}
          axisTop={null}
          axisBottom={big ? {} : null}
          axisRight={null}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          colors={lineChartColors}
          curve="monotoneX"
          enableArea={true}
          enableSlices="x"
          pointSize={5}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 20,
              translateY: legendTranslateY,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    )
  } else {
    return <></>
  }
}
