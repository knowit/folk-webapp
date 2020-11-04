import React, { useState } from 'react';
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

export default function Pie({
  data,
  groupKey = 'group',
  valueKey = 'value',
}: PieChartsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

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
