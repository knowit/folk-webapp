import { LineSvgProps, ResponsiveLine } from '@nivo/line'
import React from 'react'
import { chartColors } from './common'

const LineChart: React.FC<LineSvgProps> = ({ ...props }) => (
  <div style={{ width: '100%', height: '280px' }}>
    <ResponsiveLine
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
      axisBottom={null}
      axisRight={null}
      colors={chartColors}
      curve="monotoneX"
      enableArea={true}
      enableSlices="x"
      pointColor={{ theme: 'background' }}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          translateY: 50,
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
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
      {...props}
    />
  </div>
)

export default LineChart