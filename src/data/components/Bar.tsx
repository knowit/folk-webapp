import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import {
  BarChart,
  Bar as BarColumn,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type BarChartsData = { [chartLabel: string]: number | string } & {
  x: number | string;
};

interface BarChartsProps {
  yLabels: string[];
  dataKey: string;
  data: BarChartsData[];
}

const colors = ['#a3a1fb', '#56d9fe', '#74e2b7', '#f2efa0'];

export const MyResponsiveBar = ({ data, yLabels, dataKey }: BarChartsProps) => (
  <div style={{ height: '300px', width: '100%' }}>
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

export default function Bar({ yLabels, data, dataKey = 'x' }: BarChartsProps) {
  // eslint-disable-next-line no-constant-condition
  if (true || data.length < 30) {
    return MyResponsiveBar({ data, yLabels, dataKey });
  }

  return (
    <ResponsiveContainer height={280}>
      <BarChart data={data} margin={{ right: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKey} />
        <YAxis />
        <Tooltip />
        <Legend />

        {yLabels.map((key, i) => (
          <BarColumn
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            dataKey={key}
            stackId="a"
            stroke={colors[i]}
            fill={colors[i]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
