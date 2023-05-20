import { PieSvgProps, ResponsivePie } from '@nivo/pie'
import React from 'react'
import { chartColors, IsBigProps } from './common'
import TooltipContainer from './TooltipContainer'

type Props = Omit<PieSvgProps<any>, 'width' | 'height'> &
  IsBigProps & {
    sliceLabelsSkipAngle?: number
    radialLabel?: (e: any) => string
  }

const PieChart: React.FC<Props> = ({ isBig = false, ...props }) => {
  const chartTheme = {
    axis: {
      ticks: {
        line: {
          stroke: '#888',
          strokeWidth: 1,
        },
      },
    },
  }
  return (
    <div
      style={{
        width: '100%',
        height: isBig ? '400px' : '300px',
        color: '#888',
      }}
    >
      <ResponsivePie
        theme={chartTheme}
        margin={{ top: 40, right: 20, bottom: 65, left: 30 }}
        animate={false}
        innerRadius={0.5}
        padAngle={5}
        cornerRadius={10}
        colors={chartColors}
        borderWidth={1}
        sliceLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#888"
        tooltip={({ datum }) => (
          <TooltipContainer>
            <div style={{ alignItems: 'center', display: 'flex' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: datum.color,
                  display: 'inline-block',
                  margin: '5px',
                }}
              ></div>
              <div style={{ margin: '5px' }}>{datum.label}</div>
              <div style={{ margin: '5px' }}>
                <strong>{datum.value}</strong>
              </div>
            </div>
          </TooltipContainer>
        )}
        radialLabel={(e: any) => `${e.label} (${e.value})`}
        {...props}
      />
    </div>
  )
}

export default PieChart
