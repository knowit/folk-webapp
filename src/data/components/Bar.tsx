import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { colors } from './common';

type BarChartsData = { [chartLabel: string]: number | string } & {
  x: number | string;
};

interface BarChartsProps {
  yLabels: string[];
  dataKey: string;
  data: BarChartsData[];
  big?: boolean;
  maxValue: number | 'auto';
  tooltipValues: string[];
}

const splitText = (longText: string | number) => {
  const maxLength = 10;
  const text = longText.toString();
  const textList: string[] = [];
  let start = 0;
  while (start + maxLength < text.length) {
    let index = text.lastIndexOf(' ', start + maxLength);
    if (index < start) {
      index = text.indexOf(' ', start + maxLength);
      if (index < start) break;
    }
    textList.push(text.substring(start, index));
    start = index + 1;
  }
  textList.push(text.substring(start));
  return textList;
};

const CustomTick = (tick: any) => {
  const y = tick.tickIndex % 2 === 0 ? 10 : -15;
  const values = splitText(tick.value);
  return (
    <g transform={`translate(${tick.x},${tick.y + 22})`}>
      <line stroke="rgb(119,119,119)" strokeWidth={1.5} y1={-22} y2={y} />
      <text
        y={y + 5}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fill: '#333',
          fontSize: 10,
        }}
      >
        {values.map((value: string, index: number) => {
          return (
            <tspan key={value + index} y={y + 5 + index * 8} x={0}>
              {value}
            </tspan>
          );
        })}
      </text>
    </g>
  );
};

export default function Bar({
  data,
  yLabels,
  dataKey,
  big,
  maxValue,
  tooltipValues,
}: BarChartsProps) {
  const height = big ? '400px' : '300px';
  return (
    <div style={{ height, width: '100%' }}>
      <ResponsiveBar
        data={data}
        keys={yLabels}
        indexBy={dataKey}
        margin={{ top: 40, right: 20, bottom: 65, left: 30 }}
        padding={0.1}
        valueScale={{ type: 'linear' }}
        maxValue={maxValue}
        colors={colors}
        axisTop={null}
        axisRight={null}
        borderRadius={3}
        axisBottom={{
          renderTick: CustomTick,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        groupMode="grouped"
        enableLabel={false}
        tooltip={tooltipValues ? 
          ({ indexValue, value, id }) => {
            const motOrComp = id.toString().includes("motivasjon")? "motivasjon":"kompetanse"
            const numberId = motOrComp === "motivasjon"? tooltipValues[1]:tooltipValues[0]
            const thisData = data.find(i => (i.kategori === indexValue))
            const numberValue = thisData? thisData[numberId] : 0
            return(<div>
              <b>{indexValue}:</b>
              <br /> <b>{motOrComp}</b>
              <br /> Antall ansatte: {numberValue}
              <br /> Andel: {value.toFixed(1)}% 
            </div>
          )}
        :
        ({ indexValue, value, id }) => (
          <div>
            <b>{indexValue}:</b>
            <br /> {id}: {value.toFixed(1)}
          </div>
        )}
        legends={
          yLabels.length > 1
            ? [
                {
                  dataFrom: 'keys',
                  anchor: 'top',
                  direction: 'row',
                  justify: false,
                  translateX: 0,
                  translateY: -15,
                  itemWidth: 110,
                  itemHeight: 10,
                  itemsSpacing: 0,
                  symbolSize: 10,
                  itemDirection: 'left-to-right',
                },
              ]
            : undefined
        }
      />
    </div>
  );
}
