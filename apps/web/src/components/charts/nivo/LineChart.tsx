import { LineSvgProps, ResponsiveLine } from '@nivo/line'
import React from 'react'
import { chartColors, IsBigProps } from './common'
import TooltipContainer from './TooltipContainer'
import { useTheme } from '@mui/material'

const LineChart: React.FC<LineSvgProps & IsBigProps> = ({
  isBig = false,
  data,
  ...props
}) => {
  const theme = useTheme()
  const chartTheme = {
    textColor: theme.palette.mode === 'light' ? '#444' : '#ddd',
    grid: {
      line: {
        stroke: theme.palette.mode === 'light' ? '#ddd' : '#444',
      },
    },
  }

  const maxLength = data.reduce((previous, current) => {
    return previous > current.id.toString().length + 2
      ? previous
      : current.id.toString().length + 2
  }, 0)

  return (
    <div style={{ width: '100%', height: isBig ? '400px' : '280px' }}>
      <ResponsiveLine
        theme={chartTheme}
        data={data}
        margin={{ top: 10, right: 40, bottom: 70, left: 40 }}
        animate={false}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: false,
          reverse: false,
        }}
        axisTop={null}
        axisBottom={isBig ? {} : null}
        axisRight={null}
        colors={chartColors}
        curve="monotoneX"
        enableArea={true}
        enableSlices="x"
        sliceTooltip={({ slice }) => (
          <TooltipContainer>
            {slice.points.map((value) => (
              <div style={{ alignItems: 'center', display: 'flex' }}>
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: value.serieColor,
                    display: 'inline-block',
                    margin: '2px',
                  }}
                ></div>
                <div style={{ margin: '5px' }}>
                  <strong>{value.serieId}</strong>
                </div>
                <div style={{ margin: '5px' }}>{value.data.yFormatted}</div>
              </div>
            ))}
          </TooltipContainer>
        )}
        pointLabelYOffset={10}
        pointColor={{ theme: 'background' }}
        legends={
          data && data.length <= 4
            ? [
                {
                  anchor: 'bottom',
                  direction: 'row',
                  justify: false,
                  itemWidth: maxLength * 6,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1,
                      },
                    },
                  ],
                  translateY: 25,
                },
              ]
            : [
                {
                  anchor: 'bottom',
                  direction: 'row',
                  justify: false,
                  itemWidth: maxLength * 6,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1,
                      },
                    },
                  ],
                  translateY: 30,
                  data: data
                    .slice(0, Math.floor(data.length / 2))
                    .map((cur, index) => ({
                      id: cur.id,
                      label: cur.id,
                      color: chartColors.slice(0, Math.floor(data.length / 2))[
                        index
                      ],
                    })),
                },
                {
                  anchor: 'bottom',
                  direction: 'row',
                  justify: false,
                  itemWidth: maxLength * 6,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1,
                      },
                    },
                  ],
                  translateY: 50,
                  data: data
                    .slice(Math.floor(data.length / 2))
                    .map((cur, index) => ({
                      id: cur.id,
                      label: cur.id,
                      color: chartColors.slice(Math.floor(data.length / 2))[
                        index
                      ],
                    })),
                },
              ]
        }
        {...props}
      />
    </div>
  )
}

export default LineChart
