import React, { useState } from 'react';
import { GridItemHeader, GridItemContent} from '../components/GridItem';
import DropdownPicker from '../components/DropdownPicker';
import Line from './components/Line';
import Bar from './components/Bar';
import PercentArea from './components/PercentArea';
import Pie from './components/Pie';
import { DDComponentProps } from './DDItem'
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import {BigChart} from '../components/BigChart';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';

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
  const [big, setBig] = useState(false);
  const ChartComponent = getChartComponent(componentType) as (
    props: any
  ) => JSX.Element;

  const GridItem = () => {
    return (
    <>
      <GridItemHeader title={title}>
        <DropdownPicker
          values={setNames}
          onChange={(newValue) => setSet(newValue)}
        />
      </GridItemHeader>
      <GridItemContent>
        {big? <FullscreenExitIcon onClick={() => setBig(false)}  style={{position:'relative', left:'890px'}}/> :  <FullscreenIcon onClick = {() => setBig(true)} style={{position:'relative', left:'495px'}}/>}
        <ChartComponent data={sets[set]} {...props} />
      </GridItemContent>
    </>
    );
  }

  return (
    <>
    <GridItem />
    <BigChart open = {big} onClose={()=>setBig(false)}>
      <GridItem />
    </BigChart>
    </>
  );
}