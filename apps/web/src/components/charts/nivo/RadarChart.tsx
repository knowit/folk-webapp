import { RadarSvgProps, ResponsiveRadar } from '@nivo/radar'
import React from 'react'
import { Translation } from '../../../utils/translation'
import { chartColors, IsBigProps } from './common'
import TooltipContainer from './TooltipContainer'

type Props<D extends Record<string, unknown>> = Omit<
  RadarSvgProps<D>,
  'height' | 'width'
> &
  IsBigProps & { tooltipFormat?: (v: any) => string }

const RadarChart: React.FC<Props<any>> = ({ isBig = false, ...props }) => {
  const chartTheme = {
    textColor: '#888',
  }

  return (
    <div
      style={{
        width: '100%',
        height: isBig ? '400px' : '300px',
        fill: '#888',
      }}
    >
      <ResponsiveRadar
        theme={chartTheme}
        maxValue={5}
        margin={{ top: 50, right: 10, bottom: 50, left: 10 }}
        animate={false}
        gridLabelOffset={16}
        dotBorderWidth={2}
        dotColor={{ theme: 'background' }}
        colors={chartColors}
        blendMode="normal"
        valueFormat={(v: any) => v?.toFixed(2)}
        sliceTooltip={(data) => {
          // This is to make
          return (
            <TooltipContainer>
              <strong>{data.index}</strong>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {data.data.map((dataRow, index) => {
                    return (
                      <tr key={data.index + ' ' + index}>
                        <td style={{ padding: '3px 5px' }}>
                          <span
                            style={{
                              display: 'block',
                              width: '12px',
                              height: '12px',
                              backgroundColor: dataRow.color,
                            }}
                          ></span>
                        </td>
                        <td style={{ padding: '3px 5px' }}>
                          {Translation[dataRow.id] ?? dataRow.id}
                        </td>
                        <td style={{ padding: '3px 5px' }}>
                          {dataRow.formattedValue}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </TooltipContainer>
          )
        }}
        legends={[
          {
            data: props.keys.map((k, i) => {
              return {
                id: i,
                color: chartColors[i],
                label: Translation[k] ?? k,
              }
            }),
            anchor: 'bottom',
            direction: 'row',
            translateY: -48,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: '#888',
            symbolSize: 12,
            symbolShape: 'circle',
          },
        ]}
        {...props}
      />
    </div>
  )
}

export default RadarChart
