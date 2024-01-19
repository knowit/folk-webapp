import { LineSvgProps, ResponsiveLine } from '@nivo/line'
import React from 'react'
import { chartColors, IsBigProps } from './common'
import TooltipContainer from './TooltipContainer'
import { useTheme } from '@mui/material'

const LineChart: React.FC<LineSvgProps & IsBigProps> = ({
  isBig = false,
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
  const mapTicks = () => {
    if (!props.data || !props.data[0]) {
      return null
    }

    const data = props.data[0].data
    const tickInterval = Math.round(data.length / 6)
    return data
      .filter((point) => data.indexOf(point) % tickInterval === 0)
      .map((point) => point.x)
  }

  return (
    <div style={{ width: '100%', height: isBig ? '400px' : '280px' }}>
      <ResponsiveLine
        theme={chartTheme}
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
        axisBottom={{ tickValues: mapTicks() }}
        axisRight={null}
        colors={chartColors}
        curve="monotoneX"
        enableArea={true}
        enableSlices="x"
        sliceTooltip={({ slice }) => (
          <TooltipContainer>
            {slice.points.map((value, index) => (
              <div
                key={index}
                style={{ alignItems: 'center', display: 'flex' }}
              >
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: value.serieColor,
                    display: 'inline-block',
                    margin: '5px',
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
        pointColor={{ theme: 'background' }}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            translateY: 50,
            itemWidth: 80,
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
          },
        ]}
        {...props}
      />
    </div>
  )
}

export default LineChart
