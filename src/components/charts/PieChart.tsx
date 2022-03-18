import { ResponsivePie } from '@nivo/pie'
import React from 'react'
import { PieChartData } from '../../api/data/chartResponses'
import { chartColors } from './common'

const PieChart = ({ id, value, data }: PieChartData) => (
  <div style={{ width: '100%', height: '300px' }}>
    <ResponsivePie
      id={id}
      value={value}
      data={data}
      margin={{ top: 40, right: 20, bottom: 65, left: 30 }}
      innerRadius={0.5}
      padAngle={5}
      cornerRadius={10}
      colors={chartColors}
      borderWidth={1}
      sliceLabelsSkipAngle={10}
      radialLabel={(e) => `${e.label} (${e.value})`}
    />
  </div>
)

export default PieChart
