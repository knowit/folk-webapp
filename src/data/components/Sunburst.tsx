import React from 'react';
import { ResponsiveSunburst } from '@nivo/sunburst';

type SunburstChartsData = {
  [key: string]: string | number | Array<SunburstChartsData>;
};

interface SunburstChartsProps {
  data: SunburstChartsData[];
  groupKey?: string;
  valueKey?: string;
}

const colors = ['#a3a1fb', '#56d9fe', '#74e2b7', '#f2efa0']; // TODO: need more colors

export default function Sunburst({
  data,
  groupKey = 'kategori',
  valueKey = 'verdi',
}: SunburstChartsProps) {
  return (
    <div style={{ height: '300px', width: '100%' }}>
      <ResponsiveSunburst
        data={data}
        margin={{ top: 40, right: 20, bottom: 20, left: 20 }}
        identity={groupKey}
        value={valueKey}
        cornerRadius={2}
        borderWidth={1}
        borderColor="white"
        colors={{ scheme: 'paired' }}
        animate
        motionStiffness={90}
        motionDamping={15}
        isInteractive
      />
    </div>
  );
}
