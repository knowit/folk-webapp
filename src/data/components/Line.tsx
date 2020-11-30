import React from 'react';

import { ResponsiveLine } from '@nivo/line';

interface LineChartsProps {
  yLabels?: string[];
  dataKey?: string;
  data: any;
  big?: boolean;
}

const strokeColors = ['#a3a1fb', '#56d9fe', '#74e2b7', '#f2efa0'];

export default function Line({ data, big }: LineChartsProps) {
  const height = big ? '400px' : '280px';
  return (
    <div style={{ height, width: '100%' }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 10, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        colors={strokeColors}
        enableArea={true}
        enableSlices="x"
        pointSize={5}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
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
      />
    </div>
  );
}
