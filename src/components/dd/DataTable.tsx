import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { CheckBoxChangeHandlerProps } from '../DataTableCells';

interface DataTableColumn {
  title: string;
  expandable?: boolean;
  renderCell?: (props: { data: any; rowData: any[] }) => JSX.Element;
  headerRenderCell?: () => JSX.Element;
  checkBoxLabel?: string;
  checkBoxChangeHandler?: ({ event }: CheckBoxChangeHandlerProps) => void;
}

interface DataTableCell extends DataTableColumn {
  data: any;
}

interface DataTableRow {
  rowData: any[];
  columns: DataTableColumn[];
}

export type FilterFunctionArgument = Pick<DataTableRow, 'rowData'>;

interface DataTableProps {
  columns: DataTableColumn[];
  rows: Omit<DataTableRow, 'columns'>[];
}

interface DataTableHeaderRowProps {
  columns: DataTableColumn[];
}

type DataTableRowProps = DataTableRow;
type DataTableCellProps = DataTableCell;

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  row: {
    height: '70px',
    '& > :first-child': {
      borderLeft: 'unset',
    },
  },
  cell: {
    padding: '10px 15px',
    borderLeft: '1px solid',
    borderColor: '#EEEEEE',
    fontWeight: 'inherit',
    fontSize: 'inherit',
  },
  cellExpandable: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expansionCell: {
    borderColor: '#EEEEEE',
    paddingBottom: 0,
    paddingTop: 0,
  },
});

function Row({ rowData, columns }: DataTableRowProps) {
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  const DefaultCellComponent = ({ data }: DataTableCellProps) => <>{data}</>;

  const cells = columns.map((column, i) => ({
    data: rowData[i],
    CellComponent: column.renderCell ? column.renderCell : DefaultCellComponent,
    ...column,
  }));

  return (
    <>
      <TableRow className={`${classes.root} ${classes.row}`}>
        {cells.map((cell, i) =>
          cell.expandable ? (
            <TableCell
              key={i}
              className={`${classes.cell} ${classes.cellExpandable}`}
              onClick={() => setOpen(!open)}
            >
              <cell.CellComponent rowData={rowData} {...cell} />
              {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </TableCell>
          ) : (
            <TableCell key={i} className={classes.cell}>
              <cell.CellComponent rowData={rowData} {...cell} />
            </TableCell>
          )
        )}
      </TableRow>
      <TableRow>
        <TableCell className={classes.expansionCell} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <p>Mer innhold</p>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function HeaderRow({ columns }: DataTableHeaderRowProps) {
  const rowClasses = useRowStyles();

  const DefaultCellComponent = (column: DataTableColumn) => <>{column.title}</>;

  const cells = columns.map((column) => ({
    CellComponent: column.headerRenderCell
      ? column.headerRenderCell
      : DefaultCellComponent,
    ...column,
  }));

  return (
    <TableRow className={rowClasses.row}>
      {cells.map((cell, i) => (
        <TableCell className={rowClasses.cell} key={cell.title}>
          <cell.CellComponent {...cell} />
        </TableCell>
      ))}
    </TableRow>
  );
}

export const useTableStyles = makeStyles({
  root: {
    maxHeight: '780px',
  },
  table: {
    position: 'relative',
  },
  tableHead: {
    fontWeight: 'bold',
    fontSize: '16px',
    '& th:first-child': {
      width: '340px',
    },
    '& th:nth-child(3)': {
      width: '114px',
    },
    '& th:nth-child(2)': {
      width: '210px',
    },
  },
  tableBody: {
    '& > :last-child > *': {
      borderBottom: 'unset',
    },
    fontWeight: 'normal',
    fontSize: '14px',
  },
});

export default function DataTable({ columns, rows }: DataTableProps) {
  const tableClasses = useTableStyles();

  return (
    <TableContainer className={tableClasses.root}>
      <Table className={tableClasses.table} stickyHeader>
        <TableHead className={tableClasses.tableHead}>
          <HeaderRow columns={columns} />
        </TableHead>
        <TableBody className={tableClasses.tableBody}>
          {rows.map((row, i) => (
            <Row key={i} {...row} columns={columns} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
