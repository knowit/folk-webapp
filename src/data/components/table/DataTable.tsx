import React, { useEffect, useRef, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TableCell, withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, Table, TableCellRenderer } from 'react-virtualized';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CharacterLimitBox from '../../../components/CharacterLimitBox';

interface DataTableProps {
  columns: DataTableColumn[];
  rows: Omit<DataTableRow, 'columns'>[];
}

interface DataTableColumn {
  title: string;
  expandable?: boolean;
  renderCell?: (props: { data: any; rowData: any[] }) => JSX.Element;
  renderExpanded?: ( data: any ) => JSX.Element;
  headerRenderCell?: () => JSX.Element;
  checkBoxChangeHandler?: (event:React.ChangeEvent<HTMLInputElement>) => void;
}

interface DataTableRow {
  rowData: any[];
  columns: DataTableColumn[];
}

const TableCellNoBorders = withStyles({
  root: {
    borderBottom:'1px solid #F1F0ED'
  },
})(TableCell);


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
      borderBottom: 'none',
      borderRight: `1px solid ${theme.palette.background.paper}`,
      padding: 0,
      paddingRight: '15px',
      paddingLeft: '15px',
    },
    cellExpandable: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: 'none',
      
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
    borders:{
      borderRight: `1px solid ${theme.palette.background.paper}`,
      borderTop: `1px solid ${theme.palette.background.paper}`,
    },
    emptyTable: {
      borderBottom: `1px solid ${theme.palette.background.paper}`,
      borderRight: `1px solid ${theme.palette.background.paper}`,
      width: '1155px',
    },
    cell: {
      width: '100%',
    },
    noFocus:{
      outline:0,
      '&:hover, &:focus, &:active':{
        outline:0,
      },
    }
  })
);

type createCellFunction = (props: { data: any; rowData: any[] }) => JSX.Element;
type renderExpandedCell = ( data: any ) => JSX.Element;

function ExtendableCell({
  RenderCell,
  cellData,
  RenderExpanded,
  open,
  id,
  onChange,
  heightChange,
}: {
  RenderCell: createCellFunction;
  cellData: any;
  RenderExpanded: renderExpandedCell;
  open: boolean;
  onChange: (rowIndex: number, open: boolean) => void;
  id: number;
  heightChange: (rowIndex: number, height: number) => void;
}): JSX.Element {
  const classes = useStyles();
  const openStyle = open ? classes.bolderText: '';
  const targetRef = useRef();

  const getOffsetHeigh = (thisTargetRef: any) => thisTargetRef.offsetHeight;

  const openClick = () => {
    onChange(id, open);
    if (targetRef.current) {
      heightChange(id, getOffsetHeigh(targetRef.current));
    }
  };
  return (
    <TableCellNoBorders
      component="div"
      className={[classes.flexContainer, classes.column, classes.borders].join(' ')}
      align="left"
      ref={targetRef}
    >
      <div
        role="button"
        className={[
          classes.cellExpandable,
          openStyle,
          classes.standardSize,
          classes.flexContainer,
        ].join(' ')}
        onClick={() => openClick()}
      >
        <RenderCell data={cellData} rowData={[]} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </div>
      <div>
        <RenderExpanded data={cellData} />
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
  onChange,
  open,
  rowData,
  heightChange,
}: {
  RenderCell: createCellFunction | undefined;
  expandable: boolean | undefined;
  cellData: any;
  RenderExpanded: createCellFunction | undefined;
  open: boolean;
  onChange: (rowIndex: number, open: boolean) => void;
  id: number;
  rowData: any[];
  heightChange: (rowIndex: number, height: number) => void;
}): JSX.Element {
  const classes = useStyles();
  const data = cellData !== null ? cellData : '-';
  if (expandable && RenderCell && RenderExpanded) {
    return (
      <ExtendableCell
        RenderCell={RenderCell}
        cellData={cellData}
        RenderExpanded={RenderExpanded}
        open={open}
        onChange={onChange}
        id={id}
        heightChange={heightChange}
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
          <RenderCell data={data} rowData={rowData}/>
        ) : (
          <CharacterLimitBox text={data} />
        )}
      </div>
    </TableCellNoBorders>
  );
}

const cellWidth = (index: number) => {
  switch (index) {
    case 0:
      return 380;
    case 1:
      return 230;
    case 2:
      return 150;
    case 4:
      return 60;
    default:
      return 360;
  }
};

function MuiVirtualizedTable({
  columns,
  rowCount,
  rowGetter,
  rows,
}: MuiVirtualizedTableProps) {
  const classes = useStyles();
  const [opens, setOpens] = useState<boolean[]>([]);
  const [heights, setHeights] = useState<number[]>([]);

  const handleOpenChange = (rowIndex: number, open: boolean) => {
    setOpens({
      ...opens,
      [rowIndex]: !open,
    });
  };
  const heightChange = (rowIndex: number, height: number) => {
    setHeights({
      ...heights,
      [rowIndex]: height,
    });
  };

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
          id={rowIndex}
          onChange={handleOpenChange}
          open={opens[rowIndex]}
          rowData={rows[rowIndex]}
          heightChange={heightChange}
        />
      </div>
    );
  };

  function headerRenderer(title: string, HeaderRenderCell:any | null, checkBoxChangeHandler:((event: React.ChangeEvent<HTMLInputElement>) => void)|undefined) {
    return (
      HeaderRenderCell
      ?(
        <HeaderRenderCell title={title} checkBoxLabel={"Se kun ledige"} checkBoxChangeHandler={checkBoxChangeHandler}/>
      ):(
        <TableCell
          component="div"
          className={classes.tableHead}
          variant="head"
          align="left"
        >
          {title}
        </TableCell>
      )
    );
  }

  const getRowHeight = ({ index }: { index: number }) =>
    opens[index] ? heights[index] : 70;

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

  let ArrayRef: any;
  function setRef(ref: any) {
    ArrayRef = ref;
  }

  useEffect(() => {
    ArrayRef.recomputeRowHeights();
    ArrayRef.forceUpdate();
  }, [ArrayRef, heights]);

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
          {columns.map(({ title, headerRenderCell, checkBoxChangeHandler}, index) => {
            return (
              <Column
                key={title}
                headerRenderer={() => headerRenderer(title, headerRenderCell, checkBoxChangeHandler)}
                className={classes.flexContainer}
                cellRenderer={cellRenderer}
                dataKey={String(index)}
                width={cellWidth(index)}
              />
            );
          })}
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
        padding: '10px',
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