import { RadarSvgProps, ResponsiveRadar } from '@nivo/radar'
import React from 'react'
import { Translation } from '../../../utils/translation'
import { chartColors, IsBigProps } from './common'

type Props<D extends Record<string, unknown>> = Omit<
  RadarSvgProps<D>,
  'height' | 'width'
> &
  IsBigProps & { tooltipFormat?: (v: any) => string }

const RadarChart: React.FC<Props<any>> = ({ isBig = false, ...props }) => (
  <div style={{ width: '100%', height: isBig ? '400px' : '300px' }}>
    <ResponsiveRadar
      maxValue={5}
      margin={{ top: 50, right: 10, bottom: 50, left: 10 }}
      gridLabelOffset={16}
      dotBorderWidth={2}
      dotColor={{ theme: 'background' }}
      colors={chartColors}
      blendMode="multiply"
      valueFormat={(v: any) => v.toFixed(2)}
      sliceTooltip={(data) => {
        // This is to make
        return (
          <div
            style={{
              padding: '5px 9px',
              backgroundColor: 'white',
              borderRadius: '2px',
              boxShadow: 'rgba(0,0,0,0.25) 0px 1px 2px',
            }}
          >
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
          </div>
        )
      }}
      legends={[
        {
          data: props.keys.map((k, i) => {
            return { id: i, color: chartColors[i], label: Translation[k] ?? k }
          }),
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
