import { PieSvgProps, ResponsivePie } from '@nivo/pie'
import React from 'react'
import { chartColors, IsBigProps } from './common'

type Props = Omit<PieSvgProps<any>, 'width' | 'height'> &
  IsBigProps & {
    sliceLabelsSkipAngle?: number
    radialLabel?: (e: any) => string
  }

const PieChart: React.FC<Props> = ({ isBig = false, ...props }) => (
  <div style={{ width: '100%', height: isBig ? '400px' : '300px' }}>
    <ResponsivePie
      margin={{ top: 40, right: 20, bottom: 65, left: 30 }}
      animate={false}
      innerRadius={0.5}
      padAngle={5}
      cornerRadius={10}
      colors={chartColors}
      borderWidth={1}
      sliceLabelsSkipAngle={10}
      radialLabel={(e: any) => `${e.label} (${e.value})`}
      {...props}
    />
  </div>
)

export default PieChart
