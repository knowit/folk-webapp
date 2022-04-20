import { chartColors, IsBigProps } from './common'
import React from 'react'
import {
  DatumId,
  NormalizedDatum,
  ResponsiveSunburst,
  SvgProps,
} from '@nivo/sunburst'
import { BasicTooltip } from '@nivo/tooltip'

/**
 * Nivo Bar Chart with custom styling.
 * Allows for overloading of all props for more detailed customization.
 */

type SBType = Pick<
  SvgProps<any>,
  | 'fill'
  | 'data'
  | 'id'
  | 'value'
  | 'onClick'
  | 'onMouseEnter'
  | 'onMouseLeave'
  | 'onMouseMove'
  | 'borderWidth'
  | 'borderColor'
  | 'animate'
  | 'motionConfig'
  | 'layers'
  | 'margin'
  | 'cornerRadius'
  | 'colors'
  | 'childColor'
  | 'enableSliceLabels'
  | 'sliceLabel'
  | 'sliceLabelsSkipAngle'
  | 'sliceLabelsTextColor'
  | 'role'
  | 'theme'
  | 'isInteractive'
  | 'tooltip'
  | 'valueFormat'
  | 'defs'
>

const SunburstChart: React.FC<SBType & IsBigProps> = ({
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

  const CustomTooltip = ({
    id,
    value,
    parent,
    depth,
    color,
  }: NormalizedDatum<any>) => {
    let displayValue = 0
    if (depth === 1) displayValue = value
    else {
      try {
        displayValue = data.children
          .find(
            (main: { [x: string]: DatumId | undefined }) =>
              main[idKey] === parent?.data.id
          )
          .children.find(
            (child: { [x: string]: DatumId }) => child[idKey] === id
          )[valueKey]
      } catch {
        console.log('error')
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
