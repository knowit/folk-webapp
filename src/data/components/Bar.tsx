import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { colors } from './common';

type BarChartsData = { [chartLabel: string]: number | string } & {
  x: number | string;
};

interface BarChartsProps {
  yLabels: string[];
  dataKey: string;
  data: BarChartsData[];
  big?: boolean;
}

export default function Bar({ data, yLabels, dataKey, big }: BarChartsProps) {
  const height = big ? '400px' : '300px';
  return (
    <div style={{ height, width: '100%' }}>
      <ResponsiveBar
        data={data}
        keys={yLabels}
        indexBy={dataKey}
        margin={{ top: 10, right: 20, bottom: 25, left: 40 }}
        padding={0.1}
        valueScale={{ type: 'linear' }}
        colors={colors}
        axisTop={null}
        axisRight={null}
        borderRadius={3}
        axisBottom={
          big || data.length < 10
            ? {
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
              }
            : null
        }
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        groupMode="grouped"
        enableLabel={false}
        tooltip={({ indexValue, value }) => (
          <div>
            <b>{indexValue}:</b>
            <br /> {value}
          </div>
        )}
        legends={
          yLabels.length > 1
            ? [
                {
                  dataFrom: yLabels.length > 1 ? 'keys' : 'indexes',
                  anchor: 'top',
                  direction: 'row',
                  justify: false,
                  translateX: 0,
                  translateY: -15,
                  itemWidth: 100,
                  itemHeight: 10,
                  itemsSpacing: 0,
                  symbolSize: 10,
                  itemDirection: 'left-to-right',
                },
              ]
            : undefined
        }
      />
    </div>
  );
}
