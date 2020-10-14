import React from 'react';
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

export default function Bar({ yLabels, data, dataKey = 'x' }: BarChartsProps) {
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
            key={i}
            dataKey={key}
            stackId={'a'}
            stroke={colors[i]}
            fill={colors[i]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
