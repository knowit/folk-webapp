import React from 'react';
import { ResponsivePie } from '@nivo/pie';

type PieChartsData = {
  [key: string]: string | number;
};

interface PieChartsProps {
  data: PieChartsData[];
  groupKey?: string;
  valueKey?: string;
  big?: boolean;
}

const colors = ['#a3a1fb', '#56d9fe', '#74e2b7', '#f2efa0'];

export default function Pie({
  data,
  groupKey = 'group',
  valueKey = 'value',
  big,
}: PieChartsProps) {
  return (
    <div
      style={
        big
          ? { height: '400px', width: '100%' }
          : { height: '300px', width: '100%' }
      }
    >
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
}
