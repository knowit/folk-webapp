import { chartColors } from './common'
import { BarSvgProps, ResponsiveBar } from '@nivo/bar'
import React from 'react'

/**
 * Nivo Bar Chart with custom styling.
 * Allows for overloading of all props for more detailed customization.
 */
const BarChart: React.FC<BarSvgProps> = ({ ...props }) => {
  return (
    <div style={{ width: '100%', height: '50vh' }}>
      <ResponsiveBar
        margin={{ top: 40, right: 20, bottom: 65, left: 30 }}
        enableLabel={false}
        colors={chartColors}
        borderRadius={3}
        groupMode="grouped"
        tooltip={({ indexValue, value }) => (
          <div>{`${indexValue}: ${value}`}</div>
        )}
        {...props}
      />
    </div>
  )
}

export default BarChart
