import React from 'react';
import {
  LineChart,
  Line as ChartLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type LineChartsData = { [chartLabel: string]: number | string } & {
  x: number | string;
};

interface LineChartsProps {
  yLabels: string[];
  dataKey: string;
  data: LineChartsData[];
  big?: boolean;
}

const strokeColors = ['#a3a1fb', '#56d9fe', '#74e2b7', '#f2efa0'];

export default function Line({
  yLabels,
  data,
  dataKey = 'x',
  big,
}: LineChartsProps) {
  const height = big ? 400 : 280;
  return (
    <ResponsiveContainer height={height}>
      <LineChart data={data} margin={{ right: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKey} />
        <YAxis />
        <Tooltip />
        <Legend />

        {yLabels.map((key, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <ChartLine key={i} dataKey={key} stroke={strokeColors[i]} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
