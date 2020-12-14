// @ts-nocheck
import React from 'react';
import { colors } from './common';
import { ResponsiveRadar } from '@nivo/radar';

type RadarChartsData = {
  [key: string]: string | number;
};

interface RadarChartsProps {
  data: RadarChartsData[];
  groupKey?: string;
  valueKey?: string[];
  big?: boolean;
}

export default function Radar({
  data,
  groupKey = 'kategori',
  valueKey = [],
  big,
}: RadarChartsProps) {
  const height = big ? '400px' : '300px';
  return (
    <div style={{ height, width: '100%' }}>
      <ResponsiveRadar
        data={data}
        keys={valueKey}
        indexBy={groupKey}
        maxValue="auto"
        margin={{ top: 50, right: 10, bottom: 50, left: 10 }}
        curve="linearClosed"
        borderWidth={2}
        borderColor={colors}
        gridLevels={5}
        gridShape="circular"
        gridLabelOffset={36}
        enableDots={true}
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        dotBorderColor={colors}
        enableDotLabel={true}
        dotLabel="value"
        dotLabelYOffset={-12}
        colors={colors}
        fillOpacity={0.25}
        blendMode="multiply"
        animate={true}
        motionConfig="wobbly"
        isInteractive={true}
      />
    </div>
  );
}
