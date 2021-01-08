// @ts-nocheck
import React from 'react';
import { colors } from './common';
import { ResponsiveSunburst } from '@nivo/sunburst';

type SunburstChartsData = {
  [key: string]: string | number | Array<SunburstChartsData>;
};

interface SunburstChartsProps {
  data: SunburstChartsData[];
  groupKey?: string;
  valueKey?: string;
  big?: boolean;
}

const CustomTooltip = ({ id, value }: NormalizedDatum<unknown>) => (
  <p>
    {id}: <b>{value.toFixed(2)}</b>
  </p>
);

const GetCorrectValue=(node:NormalizedDatum<unknown>)=>{
  if(node.children && node["kategori"] !== "kompetansekartlegging"){
    var sumValue = 0
    node.children.forEach((child) => {
      sumValue += child["verdi"]
    })
    return node["verdi"] - sumValue
  }else{
    console.log(node)
  }
  return node["verdi"]
}

export default function Sunburst({
  data,
  groupKey = 'kategori',
  valueKey = 'verdi',
  big,
}: SunburstChartsProps) {
  const height = big ? '400px' : '300px';
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
