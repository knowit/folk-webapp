import React from 'react';
import { colors } from './common';
import { ResponsiveRadar } from '@nivo/radar';

type RadarChartsData = {
  [key: string]: string | number;
};

interface RadarChartsProps {
  data: RadarChartsData[];
  groupKey: string;
  valueKey: string[];
  big?: boolean;
}

const RadarChartColors = colors.filter((_, k) => k !== 1);

export default function Radar({
  data,
  groupKey,
  valueKey,
  big,
}: RadarChartsProps) {
  const height = big ? '400px' : '300px';
  return (
    <div style={{ height, width: '100%' }}>
      <ResponsiveRadar
        data={data}
        keys={valueKey}
        indexBy={groupKey}
        maxValue={5}
        margin={{ top: 50, right: 10, bottom: 50, left: 10 }}
        curve="linearClosed"
        borderWidth={2}
        gridLevels={5}
        gridShape="circular"
        gridLabelOffset={30}
        enableDots={true}
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        enableDotLabel={false}
        dotLabel={({ value }: { value: number }) => value.toFixed(1)}
        dotLabelYOffset={-12}
        colors={RadarChartColors}
        fillOpacity={0.25}
        blendMode="multiply"
        animate={true}
        isInteractive={true}
        tooltipFormat={(value) =>
          `${Number(value).toLocaleString('no-NO', {
            maximumFractionDigits: 2,
          })}`
        }
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            translateY: -48,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: '#999',
            symbolSize: 12,
            symbolShape: 'circle',
          },
        ]}
      />
    </div>
  );
}
