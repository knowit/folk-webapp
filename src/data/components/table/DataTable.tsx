import React, { Dispatch, useEffect, useReducer } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TableCell, withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {
  AutoSizer,
  Column,
  Table,
} from 'react-virtualized';
import CharacterLimitBox from '../../../components/CharacterLimitBox';


interface DataTableProps {
  columns: DataTableColumn[];
  rows: Omit<DataTableRow, 'columns'>[];
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    flexContainer: {
      display: 'flex',
      padding: 0,
    },
    standardSize: {
      width: '100%',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      paddingRight: '15px',
      paddingLeft: '15px',
    },
    column: {
      flexDirection: 'column',
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
    noFocus: {
      outline: 0,
      '&:hover, &:focus, &:active': {
        outline: 0,
      },
    },
  })
);

type createCellFunction = (props: { data: any; rowData: any[]; email?:string; rowStates?:RowStates; dispatch?:Dispatch<Action>, id?: string }) => JSX.Element;
type renderExpandedCell = (data: any, callBack: () => void) => JSX.Element;


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
  id,
  rowData,
  rowStates,
  dispatch,
}: {
  RenderCell: createCellFunction | undefined;
  expandable: boolean | undefined;
  cellData: any;
  id: string;
  rowData: any[];
  rowStates: RowStates;
  dispatch: Dispatch<Action>;
}): JSX.Element {

  const classes = useStyles();
  const data = cellData !== null ? cellData : '-';
  if (expandable && RenderCell) {
    return (
      <RenderCell data={cellData} rowData={[]} email={cellData.email} rowStates={rowStates} dispatch={dispatch} id={id}/>
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

  const rowRenderer = (props: { className: string; index: number, key:string, rowData:any, style:any}) => {
    const { className, index, key, rowData, style } = props;
    const id = rows[index].rowId;
    const RenderExpanded:renderExpandedCell|undefined = columns[0].renderExpanded
    return (
      <div key={key} className={classes.column} style={style}>
        <div className={className} >
          {columns.map((column, i) => {
            return (
              <div key={i} style={{ width: cellWidth(i) }}>
                <GetCell
                  RenderCell={column.renderCell}
                  expandable={column.expandable}
                  cellData={rowData[i]}
                  id={id}
                  rowData={rowData}
                  rowStates={state}
                  dispatch={dispatch}
                />
              </div>
            );
          })}
        </div>
        {state[id] && state[id].height !== 70 && RenderExpanded &&
          <div>
            <RenderExpanded
              data={rowData[0]}
              callBack={() => {
                ArrayRef.recomputeRowHeights();
                ArrayRef.forceUpdate();
              }}
              id={id}
              dispatch={dispatch}
              rowStates={state}
            /> 
          </div>
        }
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
          rowRenderer={rowRenderer}
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
