import React, { useState } from 'react';
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
import {
  ChartDisplayOptions,
  ChartVariantToggle,
} from '../components/ChartDisplayOptions';
import { ToggleFullscreenButton } from '../components/ToggleFullscreenButton';

export type ChartVariant =
  | 'Line'
  | 'Bar'
  | 'Pie'
  | 'Radar'
  | 'Sunburst'
  | 'PercentArea';

export interface ChartDetails {
  type: ChartVariant;
  props: DDPassProps;
}

const chartComponents: {
  [key in ChartVariant]: (props: any) => JSX.Element;
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
  const [chartVariantIdx, setChartVariantIdx] = useState<number>(0);

  const chartVariants = props.chartVariants as Array<ChartDetails>;
  const { type: chartVariantToRender, props: chartProps } = chartVariants[
    chartVariantIdx
  ];
  const ChartComponent = chartComponents[chartVariantToRender];

  const setNamesLength = payload.setNames ? payload.setNames.length : 0;

  const handleSetChange = (setName: string) => {
    setSet(setName);
  };

  const ChartGridItem = () => {
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
            <ChartDisplayOptions>
              {chartVariants.length > 1 ? (
                <ChartVariantToggle
                  chartVariants={chartVariants}
                  selected={chartVariantIdx}
                  onChange={setChartVariantIdx}
                />
              ) : null}
              <ToggleFullscreenButton
                isFullscreen={big}
                onChange={() => setBig(!big)}
              />
            </ChartDisplayOptions>
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
      <ChartGridItem />
      <BigChart open={big} onClose={() => setBig(false)}>
        <ChartGridItem />
      </BigChart>
    </>
  );
}
