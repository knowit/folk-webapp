import React, { Dispatch, useEffect, useReducer} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TableCell, withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, Table, TableCellRenderer } from 'react-virtualized';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Button from '@material-ui/core/Button';
import CharacterLimitBox from '../../../components/CharacterLimitBox';

interface DataTableProps {
  columns: DataTableColumn[];
  rows: Omit<DataTableRow, 'columns'>[];
}

type Experience = {
  employer: string;
  month_from: number;
  year_from: number;
};

type CompetenceMap = {
  [key: string]: { competence: number; motivation: number };
};

interface EmployeeInfoData {
  competence: CompetenceMap;
  tags: {
    languages: string[];
    skills: string[];
    roles: string[];
  };
  workExperience: Experience[];
}

interface DataTableColumn {
  title: string;
  expandable?: boolean;
  renderCell?: (props: { data: any; rowData: any[] }) => JSX.Element;
  renderExpanded?: (data: any) => JSX.Element;
  headerRenderCell?: () => JSX.Element;
  checkBoxChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface DataTableRow {
  rowData: any[];
  columns: DataTableColumn[];
}

const TableCellNoBorders = withStyles({
  root: {
    borderBottom: '1px solid #F1F0ED',
  },
})(TableCell);

const ExpandMoreIconWithStyles = withStyles({
  root: {
    color: '#707070',
    cursor: 'pointer',
    '&:hover': {
      color: '#333333',
    },
  },
})(ExpandMoreIcon);

const ExpandLessIconWithStyles = withStyles({
  root: {
    color: '#707070',
    cursor: 'pointer',
    '&:hover': {
      color: '#333333',
    },
  },
})(ExpandLessIcon);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flexContainer: {
      display: 'flex',
      padding: 0,
    },
    tableHead: {
      fontWeight: 'bold',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      borderBottom: `1px solid ${theme.palette.background.paper}`,
      borderLeft: `1px solid ${theme.palette.background.paper}`,
      padding: 0,
      paddingRight: '15px',
      paddingLeft: '15px',
    },
    cellExpandable: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: 'none',
      textDecoration: 'none',
      textTransform: 'inherit',
    },
    bolderText: {
      fontWeight: 'bold',
    },
    column: {
      flexDirection: 'column',
    },
    standardSize: {
      width: '100%',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      paddingRight: '15px',
      paddingLeft: '15px',
    },
    borders: {
      borderLeft: `1px solid ${theme.palette.background.paper}`,
      borderTop: `1px solid ${theme.palette.background.paper}`,
    },
    emptyTable: {
      borderBottom: `1px solid ${theme.palette.background.paper}`,
      borderLeft: `1px solid ${theme.palette.background.paper}`,
      width: '1155px',
    },
    cell: {
      width: '100%',
    },
    noFocus: {
      outline: 0,
      '&:hover, &:focus, &:active': {
        outline: 0,
      },
    },
  })
);

type createCellFunction = (props: { data: any; rowData: any[] }) => JSX.Element;
type renderExpandedCell = (data: any, callBack: () => void) => JSX.Element;

function ExtendableCell({
  RenderCell,
  cellData,
  RenderExpanded,
  id,
  heightChange,
  rowStates,
  dispatch,
}: {
  RenderCell: createCellFunction;
  cellData: any;
  RenderExpanded: renderExpandedCell;
  id: string;
  heightChange: (rowKey: string, height: number) => void;
  rowStates: RowStates;
  dispatch: Dispatch<Action>;
}): JSX.Element {
  const classes = useStyles();
  const openClick = () => {
    if (rowStates[id] && rowStates[id].height !== 70) {
      dispatch({ type: 'CHANGE_HEIGHT', id, height: 70 });
    } else {
      dispatch({ type: 'CHANGE_HEIGHT',id, height: 280 });
    }
  };
  const openStyle = (rowStates[id] && rowStates[id].height !== 70) ? classes.bolderText : '';

  return (
    <TableCellNoBorders
      component="div"
      className={[classes.flexContainer, classes.column, classes.borders].join(
        ' '
      )}
      align="left"
    >
      <Button
        role="button"
        disableRipple
        className={[
          classes.cellExpandable,
          openStyle,
          classes.standardSize,
          classes.flexContainer,
        ].join(' ')}
        onClick={() => openClick()}
      >
        <RenderCell data={cellData} rowData={[]} />
        {(rowStates[id] && rowStates[id].height !== 70) ? <ExpandLessIconWithStyles /> : <ExpandMoreIconWithStyles />}
      </Button>
      <div>
        {(rowStates[id] && rowStates[id].height !== 70) && (
          <RenderExpanded
            data={cellData}
            callBack={heightChange}
            id={id}
            dispatch={dispatch}
            rowStates={rowStates}
          />
        )}
      </div>
    </TableCellNoBorders>
  );
}

interface MuiVirtualizedTableProps {
  columns: DataTableColumn[];
  rowCount: number;
  rowGetter: (row: { index: number }) => any;
  rows: any[];
}

function GetCell({
  RenderCell,
  expandable,
  cellData,
  RenderExpanded,
  id,
  rowData,
  heightChange,
  rowStates,
  dispatch,
}: {
  RenderCell: createCellFunction | undefined;
  expandable: boolean | undefined;
  cellData: any;
  RenderExpanded: createCellFunction | undefined;
  id: string;
  rowData: any[];
  heightChange: (rowKey: string, height: number) => void;
  rowStates: RowStates;
  dispatch: Dispatch<Action>;
}): JSX.Element {
  const classes = useStyles();
  const data = cellData !== null ? cellData : '-';
  if (expandable && RenderCell && RenderExpanded) {
    return (
      <ExtendableCell
        RenderCell={RenderCell}
        cellData={cellData}
        RenderExpanded={RenderExpanded}
        id={id}
        heightChange={heightChange}
        rowStates={rowStates}
        dispatch={dispatch}
      />
    );
  }
  return (
    <TableCellNoBorders
      component="div"
      className={classes.flexContainer}
      align="left"
    >
      <div className={[classes.standardSize, classes.borders].join(' ')}>
        {RenderCell !== undefined ? (
          <RenderCell data={data} rowData={rowData} />
        ) : (
          <CharacterLimitBox text={data} />
        )}
      </div>
    </TableCellNoBorders>
  );
}

const initialState: RowStates = {};

export interface RowStates {
  [id: string]: {
    height: number;
    expandedData: null | any;
  };
}

export type Action =
  | { type: 'CHANGE_HEIGHT'; id: string; height: number }
  | { type: 'SET_EXPANDED_DATA'; id: string; expandedData: any };

function reducer(currentState: RowStates, action: Action) {
  switch (action.type) {
    case 'CHANGE_HEIGHT':
      return {
        ...currentState,
        [action.id]: {
          height: action.height,
          expandedData: currentState[action.id]
            ? currentState[action.id].expandedData
            : null,
        },
      };
    case 'SET_EXPANDED_DATA':
      return {
        ...currentState,
        [action.id]: {
          height: currentState[action.id] ? currentState[action.id].height : 70,
          expandedData: action.expandedData,
        },
      };
    default:
      return currentState;
  }
}
function MuiVirtualizedTable({
  columns,
  rowCount,
  rowGetter,
  rows,
}: MuiVirtualizedTableProps) {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  let ArrayRef: any;
  function setRef(ref: any) {
    ArrayRef = ref;
  }
  useEffect(() => {
    ArrayRef.recomputeRowHeights();
    ArrayRef.forceUpdate();
  }, [state, ArrayRef]);

  const widthList = [385, 222, 143, 390];
  const consultantTableWidths = [385, 222, 117, 363, 53];

  const cellWidth = (index: number) =>
    columns.length === 5 ? consultantTableWidths[index] : widthList[index];

  const cellRenderer: TableCellRenderer = ({
    cellData,
    columnIndex,
    rowIndex,
  }) => {
    return (
      <div className={classes.cell}>
        <GetCell
          RenderCell={columns[columnIndex].renderCell}
          expandable={columns[columnIndex].expandable}
          cellData={cellData}
          RenderExpanded={columns[columnIndex].renderExpanded}
          id={rows[rowIndex].rowId}
          rowData={rows[rowIndex]}
          heightChange={() => {
            ArrayRef.recomputeRowHeights();
            ArrayRef.forceUpdate();
          }}
          rowStates={state}
          dispatch={dispatch}
        />
      </div>
    );
  };

  function headerRenderer(
    title: string,
    HeaderRenderCell: any | null,
    checkBoxChangeHandler:
      | ((event: React.ChangeEvent<HTMLInputElement>) => void)
      | undefined
  ) {
    return HeaderRenderCell ? (
      <HeaderRenderCell
        title={title}
        checkBoxLabel="Se kun ledige"
        checkBoxChangeHandler={checkBoxChangeHandler}
      />
    ) : (
      <TableCell
        component="div"
        className={classes.tableHead}
        variant="head"
        align="left"
      >
        {title}
      </TableCell>
    );
  }

  const getRowHeight = ({ index }: { index: number }) => {
    return state[rows[index].rowId] ? state[rows[index].rowId].height : 70;
  };

  function emptyRow() {
    return (
      <TableCell
        className={classes.emptyTable}
        component="div"
        align="center"
        colSpan={4}
      >
        Ingen resultater
      </TableCell>
    );
  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Table
          ref={setRef}
          height={height}
          width={width}
          rowHeight={getRowHeight}
          headerHeight={70}
          rowCount={rowCount}
          rowGetter={rowGetter}
          rowClassName={classes.flexContainer}
          noRowsRenderer={emptyRow}
          gridClassName={classes.noFocus}
        >
          {columns.map(
            ({ title, headerRenderCell, checkBoxChangeHandler }, index) => {
              return (
                <Column
                  key={title}
                  headerRenderer={() =>
                    headerRenderer(
                      title,
                      headerRenderCell,
                      checkBoxChangeHandler
                    )
                  }
                  className={classes.flexContainer}
                  cellRenderer={cellRenderer}
                  dataKey={String(index)}
                  width={cellWidth(index)}
                />
              );
            }
          )}
        </Table>
      )}
    </AutoSizer>
  );
}

export default function DataTable({ columns, rows }: DataTableProps) {
  return (
    <Paper
      style={{
        height: 780,
        width: '100%',
        backgroundColor: 'white',
      }}
    >
      <MuiVirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index].rowData}
        columns={columns}
        rows={rows}
      />
    </Paper>
  );
}
