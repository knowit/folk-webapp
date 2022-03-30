import { ResponsiveSunburst } from '@nivo/sunburst'
import React from 'react'
import { SunburstChartData } from '../../api/data/chartResponses'

const SunburstChart = ({ id, value, data }: SunburstChartData) => (
  <div style={{ width: '100%', height: '300px' }}>
    <ResponsiveSunburst
      id={id}
      data={data}
      margin={{ top: 10, right: 10, bottom: 30, left: 10 }}
    />
  </div>
)

export default SunburstChart
