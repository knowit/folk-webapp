import React, { useState } from 'react';
import { useFetchedData } from '../hooks/service';
import { GridItem, GridItemHeader, GridItemContent } from './GridItem';
import { Skeleton } from '@material-ui/lab';
import DataTable from '../components/dd/DataTable';
import SearchInput from '../components/SearchInput';
import DropdownPicker from '../components/DropdownPicker';
import { FilterFunctionArgument } from './dd/DataTable';
import Line from '../components/dd/Line';
import Bar from '../components/dd/Bar';
import PercentArea from '../components/dd/PercentArea';
import Pie from '../components/dd/Pie';
import { CheckBoxHeaderCell } from './DataTableCells';

type DDPayload = { [key: string]: any };
type DDPassProps = { [key: string]: any };
type DDTableProps = {
  columns: { [key: string]: any };
  checkBoxFilterFunction?: (
    row: FilterFunctionArgument
  ) => FilterFunctionArgument;
  searchFilterFunction?: (
    row: FilterFunctionArgument,
    searchTerm: string
  ) => FilterFunctionArgument;
};

interface DDComponentProps {
  payload: DDPayload;
  title: string;
  props?: DDPassProps;
}

interface DDItemProps {
  url: string;
  fullSize?: boolean;
  title: string;
  dataComponentProps?: DDPassProps;
  Component: (props: DDComponentProps) => JSX.Element;
  SkeletonComponent: () => JSX.Element;
  HeaderSkeletonComponent?: () => JSX.Element;
}

interface DDErrorProps {
  error: Error;
}

function DDError({ error }: DDErrorProps) {
  console.log(error);
  return <p>Det oppstod en feil</p>;
}

export default function DDItem({
  url,
  title,
  Component,
  SkeletonComponent,
  HeaderSkeletonComponent = () => (
    <Skeleton variant="rect" height={43} width={120} animation="wave" />
  ),
  fullSize = false,
  dataComponentProps = {},
}: DDItemProps) {
  const [payload, pending, error] = useFetchedData<DDPayload>({ url });

  return (
    <GridItem fullSize={fullSize}>
      {pending || error || !payload ? (
        <>
          <GridItemHeader title={title}>
            {pending && !error ? <HeaderSkeletonComponent /> : null}
          </GridItemHeader>
          <GridItemContent>
            {error ? (
              <DDError error={error} />
            ) : pending ? (
              <SkeletonComponent />
            ) : null}
          </GridItemContent>
        </>
      ) : (
        <Component
          payload={payload as DDPayload}
          title={title}
          props={dataComponentProps}
        />
      )}
    </GridItem>
  );
}

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

export function DDChart({ payload, title, props }: DDComponentProps) {
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

export function DDTable({ payload, title, props }: DDComponentProps) {
  const rows = payload as { rowData: any[] }[];
  const [showRows, setshowRows] = useState(rows);

  const {
    checkBoxFilterFunction = (row: FilterFunctionArgument) => row,
    searchFilterFunction = (row: FilterFunctionArgument, searchTerm: string) =>
      row,
  } = props as DDTableProps;

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? setshowRows(
          rows.filter((row: FilterFunctionArgument) =>
            checkBoxFilterFunction(row)
          )
        )
      : setshowRows(rows);
  };

  const handleSearchInputChange = (searchTerm: string) => {
    searchTerm
      ? setshowRows(
          rows.filter((row: FilterFunctionArgument) =>
            searchFilterFunction(row, searchTerm)
          )
        )
      : setshowRows(rows);
  };

  if (props && props['columns']) {
    props['columns'] = props['columns'].map((column: any) => {
      if (column['headerRenderCell'] === CheckBoxHeaderCell) {
        return {
          checkBoxChangeHandler: handleCheckBoxChange,
          ...column,
        };
      } else {
        return { ...column };
      }
    });
  }
  return (
    <>
      <GridItemHeader title={title}>
        <SearchInput onChange={handleSearchInputChange} />
      </GridItemHeader>

      <div style={{ backgroundColor: '#fff', padding: '20px 0' }}>
        <DataTable rows={showRows} columns={[]} {...props} />
      </div>
    </>
  );
}
