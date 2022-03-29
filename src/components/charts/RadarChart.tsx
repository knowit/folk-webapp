import { RadarProps, ResponsiveRadar } from '@nivo/radar'
import React from 'react'
import { chartColors } from './common'

const RadarChart: React.FC<RadarProps> = ({ ...props }) => (
  <div style={{ width: '100%', height: '300px' }}>
    <ResponsiveRadar
      maxValue={5}
      margin={{ top: 50, right: 10, bottom: 50, left: 10 }}
      gridLabelOffset={16}
      dotBorderWidth={2}
      dotColor={{ theme: 'background' }}
      colors={chartColors}
      blendMode="multiply"
      tooltipFormat={(value) =>
        `${Number(value).toLocaleString('no-NO', {
          maximumFractionDigits: 2,
        })}`
      }
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          translateY: -48,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: '#999',
          symbolSize: 12,
          symbolShape: 'circle',
        },
      ]}
      {...props}
    />
  </div>
)

export default RadarChart
