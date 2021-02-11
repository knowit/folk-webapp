import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { ChartDetails, ChartVariant } from '../data/DDChart';
import { BarChart, Error, PieChart, ShowChart } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/core';

const chartVariantInfo: {
  [key in ChartVariant]: {
    label: string;
    icon: React.ReactNode;
  };
} = {
  Line: { label: 'linjediagram', icon: <ShowChart /> },
  Bar: { label: 'stolpediagram', icon: <BarChart /> },
  Pie: { label: 'kakediagram', icon: <PieChart /> },
  Radar: { label: 'radardiagram', icon: <Error /> },
  Sunburst: { label: 'sunburst-diagram', icon: <Error /> },
};

interface ChartVariantToggleProps {
  chartVariants: Array<ChartDetails>;
  selected: number;
  onChange: (value: number) => void;
  big?: boolean;
}

export function ChartVariantToggle({
  chartVariants,
  selected,
  onChange,
  big = false, // TODO: resize on fullscreen?
}: ChartVariantToggleProps) {
  const handleChartVariantChange = (
    event: React.MouseEvent,
    newChartIndex: number | null
  ) => {
    if (typeof newChartIndex === 'number') {
      onChange(newChartIndex);
    }
  };

  return (
    <ToggleButtonGroup
      exclusive
      value={selected}
      onChange={handleChartVariantChange}
      size="small"
    >
      {chartVariants.map((chartVariant, chartIndex) => {
        const { label, icon: ChartIcon } = chartVariantInfo[chartVariant.type];
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

const useStyles = makeStyles(() =>
  createStyles({
    chartDisplayOptions: {
      display: 'flex',
      justifyContent: 'space-between',
      alignContent: 'flex-start',
      alignItems: 'flex-start',
    },
  })
);

interface ChartDisplayOptionsProps {
  children: React.ReactNode | React.ReactNode[];
}

export function ChartDisplayOptions({ children }: ChartDisplayOptionsProps) {
  const classes = useStyles();

  return <div className={classes.chartDisplayOptions}>{children}</div>;
}
