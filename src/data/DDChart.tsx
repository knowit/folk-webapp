import React, { useState } from 'react';
import { GridItemHeader, GridItemContent} from '../components/GridItem';
import DropdownPicker from '../components/DropdownPicker';
import Line from './components/Line';
import Bar from './components/Bar';
import PercentArea from './components/PercentArea';
import Pie from './components/Pie';
import { DDComponentProps } from './DDItem'
import {Fullscreen, FullscreenExit} from '@material-ui/icons';
import {BigChart} from '../components/BigChart';
import { ErrorText } from '../components/ErrorText';
import { withStyles } from '@material-ui/core';
import {theme} from '../index';

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

const LargerIcon = withStyles(() => ({
  root: {
    height: '35px',
    width: '35px',
    position:'relative',
    left:'495px',
    bottom: '10px',
    color: theme.palette.primary.main,
  },
}))(Fullscreen)

const SmallerIcon = withStyles(() => ({
  root: {
    height: '45px',
    width: '45px',
    position:'relative',
    bottom: '15px',
    left: '880px',
    color: theme.palette.primary.main,
  },
}))(FullscreenExit)

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
      {sets[set]
      ? <GridItemContent>
          {big
            ? <span title= "Exit stor størrelse."> <SmallerIcon  onClick={() => setBig(false)}/> </span>
            : <span title = "Utvid til stor størrelse."><LargerIcon onClick = {() => setBig(true)}/></span>
          }
          <ChartComponent data={sets[set]} {...props} />
        </GridItemContent>
      :<ErrorText/>
      }
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