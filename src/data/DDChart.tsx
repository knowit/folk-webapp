import React, { useState } from 'react';
import {
  BarChart,
  Fullscreen,
  FullscreenExit,
  PieChart,
  ShowChart,
} from '@material-ui/icons';
import { Theme, withStyles } from '@material-ui/core';
import { GridItemHeader, GridItemContent } from '../components/GridItem';
import DropdownPicker from '../components/DropdownPicker';
import Line from './components/Line';
import Bar from './components/Bar';
import PercentArea from './components/PercentArea';
import Pie from './components/Pie';
import BigChart from '../components/BigChart';
import { ErrorText } from '../components/ErrorText';
import Sunburst from './components/Sunburst';
import Radar from './components/Radar';
import { DDComponentProps, DDPassProps } from './types';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';

export type ChartType =
  | 'Line'
  | 'Bar'
  | 'Pie'
  | 'Radar'
  | 'Sunburst'
  | 'PercentArea';

const ToggleFullscreenButton = withStyles((theme: Theme) => ({
  root: {
    marginLeft: 'auto',
    padding: 0,
    borderRadius: 0,
    cursor: 'pointer',
    '& svg': {
      color: theme.palette.primary.main,
      height: '40px',
      width: '40px',
      '&:hover': {
        color: theme.palette.text.primary,
      },
    },
  },
}))(IconButton);

const chartTypeInfo: {
  [key in ChartType]: {
    label: string;
    icon: React.ReactNode;
  };
} = {
  Line: { label: 'linjediagram', icon: <ShowChart /> },
  Bar: { label: 'stolpediagram', icon: <BarChart /> },
  Pie: { label: 'kakediagram', icon: <PieChart /> },
  Radar: { label: 'radardiagram', icon: <PieChart /> },
  Sunburst: { label: 'sunburst', icon: <PieChart /> },
  PercentArea: { label: 'prosent', icon: <PieChart /> },
};

function ChartVariantToggle({
  selectedVariant,
  onVariantChange,
  chartVariants,
}: {
  selectedVariant: number;
  onVariantChange: (value: number) => void;
  chartVariants: Array<{ type: ChartType; props: DDPassProps }>;
}) {
  const handleChartVariantChange = (
    event: React.MouseEvent,
    newChartIndex: number | null
  ) => {
    onVariantChange(Number(newChartIndex));
  };

  return (
    <ToggleButtonGroup
      exclusive
      value={selectedVariant}
      onChange={handleChartVariantChange}
      size="small"
    >
      {chartVariants.map((chartVariant, chartIndex) => {
        const { label, icon: ChartIcon } = chartTypeInfo[chartVariant.type];
        const buttonLabel = `Vis som ${label}`;

        return (
          <ToggleButton
            key={label}
            value={chartIndex}
            disableRipple
            aria-label={buttonLabel}
            title={buttonLabel}
          >
            {ChartIcon}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
}

const chartComponents: {
  [key in ChartType]: (props: any) => JSX.Element;
} = {
  Line: Line,
  Bar: Bar,
  Pie: Pie,
  Radar: Radar,
  Sunburst: Sunburst,
  PercentArea: PercentArea,
};

export default function DDChart({
  payload,
  title,
  description,
  props,
}: DDComponentProps) {
  const { setNames, sets } = payload as {
    setNames: string[];
    sets: { [key: string]: any };
  };
  const [set, setSet] = useState<string>(
    setNames && setNames.length > 0 ? setNames[0] : ''
  );
  const [big, setBig] = useState<boolean>(false);
  const [selectedChartType, setSelectedChartType] = useState<number>(0);

  const chartVariants = props.chartVariants as Array<{
    type: ChartType;
    props: DDPassProps;
  }>;
  const { type: chartTypeToRender, props: chartProps } = chartVariants[
    selectedChartType
  ];
  const ChartComponent = chartComponents[chartTypeToRender];

  const handleSetChange = (value: any) => {
    setSet(value as string);
  };

  const setNamesLength = payload.setNames ? payload.setNames.length : 0;
  const altText = big ? 'Exit stor størrelse' : 'Utvid til stor størrelse';

  const GridItem = () => {
    return (
      <>
        <GridItemHeader title={title} description={description} big={big}>
          {setNamesLength > 1 ? (
            <DropdownPicker
              values={setNames}
              onChange={handleSetChange}
              selected={set}
              big={big}
            />
          ) : null}
        </GridItemHeader>
        {sets ? (
          <GridItemContent>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              {chartVariants.length > 1 ? (
                <ChartVariantToggle
                  chartVariants={chartVariants}
                  selectedVariant={selectedChartType}
                  onVariantChange={setSelectedChartType}
                />
              ) : null}
              <ToggleFullscreenButton
                aria-label={altText}
                title={altText}
                onClick={() => setBig(!big)}
                disableRipple
                size="small"
              >
                {big ? <FullscreenExit /> : <Fullscreen />}
              </ToggleFullscreenButton>
            </div>
            <ChartComponent big={big} data={sets[set]} {...chartProps} />
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
