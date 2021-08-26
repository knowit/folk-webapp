import React from 'react';
import { colors } from './common';
import { ResponsiveSunburst, NormalizedDatum } from '@nivo/sunburst';
import { BasicTooltip } from '@nivo/tooltip';

type SunburstChartsData = {
  category?: string;
  value?: number;
  size?: number;
  children?: SunburstChartsData[];
};

interface SunburstChartsProps {
  data: SunburstChartsData[];
  groupKey: string;
  big?: boolean;
}

function GetCorrectValue(node: SunburstChartsData): number {
  if (node.children) {
    const sumValue = node.children.reduce(getParentSize, 0);
    return (node.value as number) - sumValue;
  }
  return node.size || 0;
}

function getParentSize(total: number, child: SunburstChartsData): number {
  return total + (child.size || 0);
}

export default function Sunburst({ data, groupKey, big }: SunburstChartsProps) {
  const height = big ? '400px' : '300px';
  const formattedData = {
    children: data,
  };


  const CustomTooltip = ({
    id,
    value,
    parent,
    depth,
    color,
  }: NormalizedDatum<SunburstChartsData>) => {
    const displayValue =
      depth === 1
        ? value
        : formattedData.children
            ?.find((node) => node.category === parent?.data.id)
            ?.children?.find((node) => node.category === id)?.value;

    return (
      <BasicTooltip
        id={id}
        value={displayValue?.toFixed(2)}
        enableChip={true}
        color={color}
      />
    );
  };

  return (
    <div style={{ height, width: '100%' }}>
      <ResponsiveSunburst
        data={formattedData}
        margin={{ top: 10, right: 10, bottom: 30, left: 10 }}
        id={groupKey}
        cornerRadius={2}
        borderWidth={1}
        borderColor="white"
        colors={colors}
        animate
        isInteractive
        value={GetCorrectValue}
        tooltip={CustomTooltip}
      />
    </div>
  );
}
