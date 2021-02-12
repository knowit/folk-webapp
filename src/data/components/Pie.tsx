import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { colors } from './common';

type PieChartsData = {
  [key: string]: string | number;
};

interface PieChartsProps {
  data: PieChartsData[];
  groupKey: string;
  valueKey: string;
  big?: boolean;
}

export default function Pie({ data, groupKey, valueKey, big }: PieChartsProps) {
  const height = big ? '400px' : '300px';
  return (
    <div style={{ height, width: '100%' }}>
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
