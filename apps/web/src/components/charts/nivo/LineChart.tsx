import { LineSvgProps, ResponsiveLine } from '@nivo/line'
import React, { useEffect, useState } from 'react'
import { chartColors, IsBigProps } from './common'
import TooltipContainer from './TooltipContainer'
import { useTheme } from '@mui/material'

const truncate = (string: string, length: number) => {
  if (string.length > length) {
    return `${string.slice(0, length - 1)}...`
  }
  return string
}

const LineChart: React.FC<LineSvgProps & IsBigProps> = ({
  isBig = false,
  legendWidth,
  ...props
}) => {
  const [colorMap, setColorMap] = useState({})
  const theme = useTheme()
  const darkMode = theme.palette.mode === 'dark'
  const highlightColor = darkMode ? '#ddd' : '#444'

  const mapTicks = () => {
    if (!props.data || !props.data[0]) {
      return null
    }

    const data = props.data[0].data
    const tickInterval = Math.round(data.length / 7)
    return data
      .filter((point) => data.indexOf(point) % tickInterval === 0)
      .map((point) => point.x)
  }

  const legendOptions = {
    anchor: 'bottom-left',
    direction: 'row',
    itemDirection: 'left-to-right',
    translateX: -30,
    itemWidth: legendWidth || 200,
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
  }
  const perRow = legendWidth ? 500 / legendWidth : 4
  const series = props.data

  const getNextColor = () => {
    const rotations = Object.values(colorMap).filter(
      (c) => c === chartColors.at(-1)
    ).length
    return chartColors.find(
      (c) =>
        Object.values(colorMap).filter((cmv) => cmv === c).length === rotations
    )
  }

  useEffect(() => {
    series.forEach((s) => {
      if (!colorMap[s.id]) {
        const c = getNextColor()
        setColorMap({ ...colorMap, [s.id]: c })
      }
    })
  }, [series, colorMap])

  const rows = Math.ceil(series.length / perRow)
  const legendRows = []
  for (let i = 0; i < rows; i++) {
    const end = Math.min(i * perRow + perRow, series.length)
    const rowSeries = series.slice(i * perRow, end)
    legendRows.push({
      ...legendOptions,
      translateY: 50 + i * 15,
      data: rowSeries.map((cur) => ({
        id: cur.id,
        label: truncate(String(cur.id), Math.max(34, legendWidth / 6 || 0)),
        color: colorMap[cur.id],
      })),
    })
  }
  return (
    <div style={{ width: '100%', height: isBig ? '400px' : '280px' }}>
      <ResponsiveLine
        {...props}
        theme={{
          axis: {
            ticks: {
              line: {
                stroke: '#444444',
              },
              text: {
                fill: highlightColor,
              },
            },
          },
          legends: {
            text: {
              fill: highlightColor,
            },
          },
          grid: {
            line: {
              stroke: darkMode ? '#444' : '#ddd',
            },
          },
        }}
        margin={{ top: 0, right: 40, bottom: 90, left: 40 }}
        animate={false}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 0,
          max: 'auto',
          stacked: false,
          reverse: false,
        }}
        axisBottom={{ tickValues: mapTicks() }}
        colors={chartColors}
        curve="monotoneX"
        enableArea={true}
        enableSlices="x"
        sliceTooltip={({ slice }) => (
          <TooltipContainer>
            <strong>{slice.points[0].data.xFormatted}</strong>
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
                  <strong>{truncate(String(value.serieId), 34)}</strong>
                </div>
                <div style={{ margin: '5px' }}>{value.data.yFormatted}</div>
              </div>
            ))}
          </TooltipContainer>
        )}
        pointColor={{ theme: 'background' }}
        legends={legendRows}
      />
    </div>
  )
}

export default LineChart
