import { chartColors, IsBigProps } from './common'
import React from 'react'
import { ResponsiveSunburst, SunburstSvgProps } from '@nivo/sunburst'
import { styled } from '@mui/material/styles'

/**
 * Nivo Bar Chart with custom styling.
 * Allows for overloading of all props for more detailed customization.
 */
const TooltipRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.text.primary}`,
  borderRadius: 5,
  color: theme.palette.text.primary,
  padding: 5,
}))

type Props<RawDatum> = Partial<
  Omit<SunburstSvgProps<RawDatum>, 'data' | 'width' | 'height'>
> &
  Pick<SunburstSvgProps<RawDatum>, 'data'> &
  IsBigProps

const SunburstChart: React.FC<Props<any>> = ({
  isBig = false,
  value,
  data,
  ...props
}) => {
  data = { children: data }
  const valueKey = (value ?? 'value') as string

  function GetCorrectValue(node: any): number {
    if (node.children) {
      const sumValue = node.children.reduce(getParentSize, 0)
      return ((node[valueKey] || 0) as number) - sumValue
    }
    return node.size || 0
  }

  function getParentSize(total: number, child: any): number {
    return total + (child.size || 0)
  }

  return (
    <div
      style={{
        width: '100%',
        height: isBig ? '400px' : '300px',
        color: '#666',
      }}
    >
      <ResponsiveSunburst
        colors={chartColors}
        margin={{ top: 10, right: 10, bottom: 30, left: 10 }}
        animate={false}
        cornerRadius={2}
        value={GetCorrectValue}
        tooltip={({ id, value, color }) => (
          <TooltipRoot style={{ alignItems: 'center', display: 'flex' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: color,
                display: 'inline-block',
                margin: '5px',
              }}
            ></div>
            <div style={{ margin: '5px' }}>{id}</div>
            <div style={{ margin: '5px' }}>
              <strong>{value.toFixed(2)}</strong>
            </div>
          </TooltipRoot>
        )}
        data={data}
        {...props}
      />
    </div>
  )
}

export default SunburstChart
