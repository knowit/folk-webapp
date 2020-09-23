import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type PercentAreaChartsData = { [chartLabel: string]: number | string } & {
  x: number | string;
};

interface PercentAreaChartsProps {
  yLabels: string[];
  data: PercentAreaChartsData[];
}

const toPercent = (decimal: number, fixed: number = 0) =>
  `${(decimal * 100).toFixed(fixed)}%`;
const getPercent = (value: number, total: number) =>
  toPercent(total > 0 ? value / total : 0, 2);

const renderTooltipContent = ({
  payload,
  label,
}: {
  payload: any[];
  label: string;
}) => {
  const total = payload.reduce((result, entry) => result + entry.value, 0);

  return (
    <div>
      <p>{`${label} (Total: ${total})`}</p>
      <ul>
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

const colors = ['#a3a1fb', '#56d9fe', '#74e2b7', '#f2efa0'];

export default function PercentArea({ yLabels, data }: PercentAreaChartsProps) {
  return (
    <ResponsiveContainer height={280}>
      <AreaChart data={data} stackOffset="expand" margin={{ right: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" />
        <YAxis tickFormatter={toPercent} />
        <Tooltip content={renderTooltipContent} />

        {yLabels.map((key, i) => (
          <Area
            key={i}
            dataKey={key}
            stackId="1"
            stroke={colors[i]}
            fill={colors[i]}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
