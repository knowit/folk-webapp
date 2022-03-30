import { PieSvgProps, ResponsivePie } from '@nivo/pie'
import React from 'react'
import { chartColors } from './common'

type PieType = Pick<
  PieSvgProps<any>,
  | 'legends'
  | 'fill'
  | 'id'
  | 'value'
  | 'data'
  | 'onClick'
  | 'onMouseMove'
  | 'onMouseEnter'
  | 'onMouseLeave'
  | 'borderWidth'
  | 'isInteractive'
  | 'tooltip'
  | 'borderColor'
  | 'defs'
  | 'valueFormat'
  | 'colors'
  | 'margin'
  | 'sortByValue'
  | 'innerRadius'
  | 'padAngle'
  | 'cornerRadius'
  | 'startAngle'
  | 'endAngle'
  | 'fit'
  | 'theme'
  | 'enableRadialLabels'
  | 'radialLabel'
  | 'radialLabelsSkipAngle'
  | 'radialLabelsTextXOffset'
  | 'radialLabelsTextColor'
  | 'radialLabelsLinkOffset'
  | 'radialLabelsLinkDiagonalLength'
  | 'radialLabelsLinkHorizontalLength'
  | 'radialLabelsLinkStrokeWidth'
  | 'radialLabelsLinkColor'
  | 'enableSliceLabels'
  | 'sliceLabel'
  | 'sliceLabelsRadiusOffset'
  | 'sliceLabelsSkipAngle'
  | 'sliceLabelsTextColor'
  | 'role'
  | 'layers'
>

const PieChart: React.FC<PieType> = (props) => (
  <div style={{ width: '100%', height: '300px' }}>
    <ResponsivePie
      margin={{ top: 40, right: 20, bottom: 65, left: 30 }}
      innerRadius={0.5}
      padAngle={5}
      cornerRadius={10}
      colors={chartColors}
      borderWidth={1}
      sliceLabelsSkipAngle={10}
      radialLabel={(e) => `${e.label} (${e.value})`}
      {...props}
    />
  </div>
)

export default PieChart
