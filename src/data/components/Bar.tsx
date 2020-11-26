import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

type BarChartsData = { [chartLabel: string]: number | string } & {
  x: number | string;
};

interface BarChartsProps {
  yLabels: string[];
  dataKey: string;
  data: BarChartsData[];
  big?: boolean;
}

const colors = ['#a3a1fb', '#56d9fe', '#74e2b7', '#f2efa0'];

export default function Bar({
  data,
  yLabels,
  dataKey = 'x',
  big,
}: BarChartsProps) {
  const height = big ? '400px' : '300px';
  return (
    <div style={{ height: height, width: '100%' }}>
      <ResponsiveBar
        data={data}
        keys={yLabels}
        indexBy={dataKey}
        margin={{ top: 0, right: 20, bottom: 20, left: 40 }}
        padding={0.1}
        valueScale={{ type: 'linear' }}
        colors={colors}
        axisTop={null}
        axisRight={null}
        borderRadius={3}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        enableLabel={false}
        tooltip={({ indexValue, value }) => (
          <div>
            {indexValue}: <b>{value}</b>
          </div>
        )}
      />
    </div>
  );
}
