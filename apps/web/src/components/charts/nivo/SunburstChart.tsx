import { chartColors, IsBigProps } from './common'
import React from 'react'
import { DatumId, ResponsiveSunburst, SunburstSvgProps } from '@nivo/sunburst'
import { BasicTooltip } from '@nivo/tooltip'

/**
 * Nivo Bar Chart with custom styling.
 * Allows for overloading of all props for more detailed customization.
 */

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
  const idKey = (props.id ?? 'id') as string

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

  const GetParentId = (path: Array<string | undefined>): string => {
    for (let i = path.length - 1; i >= 0 - 1; i--) {
      if (path[i] !== undefined) {
        return path[i] as string
      }
    }
    return ''
  }

  const CustomTooltip = ({ id, value, path, depth, color }: any) => {
    let displayValue = 0
    const parentId = GetParentId(path)

    if (depth === 1) displayValue = value
    else {
      try {
        displayValue = data.children
          .find(
            (main: { [x: string]: DatumId | undefined }) =>
              main[idKey] === parentId
          )
          .children.find(
            (child: { [x: string]: DatumId }) => child[idKey] === id
          )[valueKey]
      } catch (error) {
        console.log('error', error)
      }
    }

    return (
      <BasicTooltip
        id={id}
        value={displayValue?.toFixed(2)}
        enableChip={true}
        color={color}
      />
    )
  }

  return (
    <div style={{ width: '100%', height: isBig ? '400px' : '300px' }}>
      <ResponsiveSunburst
        colors={chartColors}
        margin={{ top: 10, right: 10, bottom: 30, left: 10 }}
        animate={false}
        cornerRadius={2}
        value={GetCorrectValue}
        tooltip={CustomTooltip}
        data={data}
        {...props}
      />
    </div>
  )
}

export default SunburstChart
