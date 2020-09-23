import React, { useState } from 'react';
import { GridItemHeader, GridItemContent } from '../components/GridItem';
import DropdownPicker from '../components/DropdownPicker';
import Line from './components/Line';
import Bar from './components/Bar';
import PercentArea from './components/PercentArea';
import Pie from './components/Pie';
import { DDComponentProps } from './DDItem'

const getChartComponent = (name: string) => {
  switch (name) {
    case 'Line':
      return Line;
    case 'Bar':
      return Bar;
    case 'PercentArea':
      return PercentArea;
    case 'Pie':
      return Pie;
  }
};

export default function DDChart({ payload, title, props }: DDComponentProps) {
  const { componentType, setNames, sets } = payload as {
    componentType: string;
    setNames: string[];
    sets: { [key: string]: any };
  };
  const [set, setSet] = useState(setNames[0]);
  const ChartComponent = getChartComponent(componentType) as (
    props: any
  ) => JSX.Element;

  return (
    <>
      <GridItemHeader title={title}>
        <DropdownPicker
          values={setNames}
          onChange={(newValue) => setSet(newValue)}
        />
      </GridItemHeader>
      <GridItemContent>
        <ChartComponent data={sets[set]} {...props} />
      </GridItemContent>
    </>
  );
}