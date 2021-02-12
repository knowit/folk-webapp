// @ts-nocheck
import React from 'react';
import { colors } from './common';
import { ResponsiveSunburst, NormalizedDatum } from '@nivo/sunburst';

type SunburstChartsData = {
  [key: string]: string | number | Array<SunburstChartsData>;
};

interface SunburstChartsProps {
  data: SunburstChartsData[];
  groupKey: string;
  big?: boolean;
}

const GetCorrectValue = (node: NormalizedDatum<unknown>) => {
  if (node.children) {
    const sumValue = node.children.reduce(getParentSize, 0);
    return node['verdi'] - sumValue;
  }
  return node['size'];
};
function getParentSize(total, child) {
  return total + child['size'];
}

export default function Sunburst({ data, groupKey, big }: SunburstChartsProps) {
  const height = big ? '400px' : '300px';

  const CustomTooltip = ({
    id,
    value,
    ancestor,
    depth,
  }: NormalizedDatum<unknown>) => {
    const childValue =
      depth === 1
        ? value
        : data.children
            .find((kategori) => kategori.kategori === ancestor.id)
            .children.find((kategori) => kategori.kategori === id).verdi;

    return (
      <p>
        {id}: <b>{childValue.toFixed(2)}</b>
      </p>
    );
  };

  return (
    <div style={{ height, width: '100%' }}>
      <ResponsiveSunburst
        data={data}
        margin={{ top: 10, right: 10, bottom: 30, left: 10 }}
        identity={groupKey}
        cornerRadius={2}
        borderWidth={1}
        borderColor="white"
        colors={colors}
        animate
        motionStiffness={90}
        motionDamping={15}
        isInteractive
        value={GetCorrectValue}
        tooltip={CustomTooltip}
      />
    </div>
  );
}
