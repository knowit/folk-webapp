import React, { useState } from 'react';
import { Fullscreen, FullscreenExit } from '@material-ui/icons';
import { Theme, withStyles, createStyles, makeStyles } from '@material-ui/core';
import { GridItemHeader, GridItemContent } from '../components/GridItem';
import DropdownPicker from '../components/DropdownPicker';
import Line from './components/Line';
import Bar from './components/Bar';
import PercentArea from './components/PercentArea';
import Pie from './components/Pie';
import { DDComponentProps } from './types';
import BigChart from '../components/BigChart';
import { ErrorText } from '../components/ErrorText';
import Sunburst from './components/Sunburst';

const usePlaceholderStyle = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleText: {
      fontSize: '18px',
      fontWeight: 'bold',
      lineHeight: 1.28,
    },
    text: {
      fontSize: '16px',
      lineHeight: 1.5,
    },
  })
);

const Placeholder = (props:{big:boolean}) => {
  
  const classes = usePlaceholderStyle();
  const height = props.big? '400px': '280px';
  return (
    <div className={classes.root} style={{height}}>
      <div className={classes.titleText}>Oida</div>
      <div className={classes.text}>Data kan ikke vises for dette valget</div>
    </div>
  );
};

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
    case 'Sunburst':
      return Sunburst;
    default:
      return Placeholder;
  }
};

const LargerIcon = withStyles((theme: Theme) => ({
  root: {
    height: '41.17px',
    width: '41.17px',
    position: 'relative',
    left: '491px',
    bottom: '10px',
    cursor: 'pointer',
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
}))(Fullscreen);

const SmallerIcon = withStyles((theme: Theme) => ({
  root: {
    height: '60px',
    width: '60px',
    position: 'relative',
    bottom: '15px',
    left: '861px',
    cursor: 'pointer',
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
}))(FullscreenExit);

export default function DDChart({ payload, title, props }: DDComponentProps) {
  const { componentType, setNames, sets } = payload as {
    componentType: string;
    setNames: string[];
    sets: { [key: string]: any };
  };
  const [set, setSet] = useState(setNames.length > 0 ? setNames[0] : '');
  const [big, setBig] = useState(false);
  const ChartComponent = getChartComponent(componentType) as (
    props: any
  ) => JSX.Element;

  const onChange = (value: any) => {
    setSet(value as string);
  };

  const setNamesLength = payload.setNames.length;

  const GridItem = () => {
    const altText = big ? 'Exit stor størrelse' : 'Utvid til stor størrelse';
    return (
      <>
        <GridItemHeader title={title} big={big}>
          {setNamesLength > 1 ? (
            <DropdownPicker
              values={setNames}
              onChange={onChange}
              selected={set}
              big={big}
            />
          ) : null}
        </GridItemHeader>
        {sets ? (
          <GridItemContent>
            <span title={altText}>
              {big ? (
                <SmallerIcon onClick={() => setBig(false)} />
              ) : (
                <LargerIcon onClick={() => setBig(true)} />
              )}
            </span>
            <ChartComponent big={big} data={sets[set]} {...props} />
          </GridItemContent>
        ) : (
          <ErrorText />
        )}
      </>
    );
  };

  return (
    <>
      <GridItem />
      <BigChart open={big} onClose={() => setBig(false)}>
        <GridItem />
      </BigChart>
    </>
  );
}
