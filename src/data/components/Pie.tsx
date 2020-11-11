import React, { useState } from 'react';
import { ResponsivePie } from '@nivo/pie';
import {
  PieChart,
  Pie as ChartPie,
  Sector,
  ResponsiveContainer,
  PieLabelRenderProps,
} from 'recharts';

type PieChartsData = {
  [key: string]: string | number;
};

interface PieChartsProps {
  data: PieChartsData[];
  groupKey?: string;
  valueKey?: string;
}

const shapeRenderer = ({ groupKey }: { groupKey: string }) => ({
  cx,
  cy,
  midAngle = 0,
  innerRadius,
  outerRadius = 0,
  startAngle,
  endAngle,
  fill,
  payload,
  percent = 0,
  value,
}: {
  cy: number;
  cx: number;
  outerRadius: number;
  innerRadius: number;
} & PieLabelRenderProps) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload[groupKey]}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const colors = ['#a3a1fb', '#56d9fe', '#74e2b7', '#f2efa0'];

export const MyResponsivePie = ({
  data,
  groupKey,
  valueKey,
}: PieChartsProps) => (
  <div style={{ height: '300px', width: '100%' }}>
    <ResponsivePie
      data={data}
      value={valueKey}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      innerRadius={0.3}
      padAngle={0.7}
      cornerRadius={3}
      colors={colors}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      radialLabelsTextColor="#333333"
      sliceLabelsSkipAngle={10}
      sliceLabelsTextColor="#333333"
      id={groupKey}
      radialLabel={(e) => `${e.label} (${e.value})`}
      legends={[]}
    />
  </div>
);

export default function Pie({
  data,
  groupKey = 'group',
  valueKey = 'value',
}: PieChartsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // eslint-disable-next-line no-constant-condition
  if (true) {
    return MyResponsivePie({ data, groupKey, valueKey });
  }
  return (
    <ResponsiveContainer height={280}>
      <PieChart>
        <ChartPie
          activeIndex={activeIndex}
          activeShape={shapeRenderer({ groupKey })}
          data={data}
          cx={265}
          cy={140}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey={valueKey}
          onMouseEnter={(_, index) => setActiveIndex(index)}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
