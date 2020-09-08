import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
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
import {
  CheckBoxChangeHandlerProps,
  CompetenceMapping,
} from '../DataTableCells';

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
    '& th': {
      padding: '10px 15px',
      verticalAlign: 'middle',
    },
  },
  cell: {
    padding: '24px 15px 0',
    borderLeft: '1px solid',
    borderColor: '#EEEEEE',
    fontWeight: 'inherit',
    fontSize: 'inherit',
    borderBottom: '1px solid #eee',
    verticalAlign: 'top',
  },
  cellExpandable: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
  },
  expansionCell: {
    borderColor: '#EEEEEE',
    padding: 0,
  },
  bolderText: {
    fontWeight: 'bold',
  },
  expandedBox: {
    lineHeight: '1.2em',
    whiteSpace: 'normal',
    marginTop: '10px',
    background:
      'transparent linear-gradient(180deg, #FFFFFF 0%, #F7F7F7 100%) 0% 0%',
    '& div.expandable-box-cell': {
      marginBottom: '12px',
      padding: '0 15px',
    },
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

  const openStyle = open ? classes.bolderText : null;

  return (
    <>
      <TableRow className={`${classes.root} ${classes.row}`}>
        {cells.map((cell, i) =>
          cell.expandable ? (
            <TableCell
              key={i}
              className={[classes.cell, classes.expansionCell].join(' ')}
              onClick={() => setOpen(!open)}
            >
              <div>
                <div className={[classes.cellExpandable, openStyle].join(' ')}>
                  <cell.CellComponent rowData={rowData} {...cell} />
                  {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </div>
                <Collapse
                  in={open}
                  timeout="auto"
                  unmountOnExit
                  className={classes.expandedBox}
                >
                  <div className="expandable-box-cell">
                    <b>Hovedkompetanse:</b> UX, GUI, UU, mobil, web,
                    prototyping.
                  </div>
                  <div className="expandable-box-cell">
                    <b>Roller:</b> Interaksjonsdesigner, grafisk designer, team
                    lead, kokk, trommeslager, tryllekunstner.
                  </div>
                  <div className="expandable-box-cell">
                    <b>Startet i Knowit:</b> 01.02 - 2018
                  </div>
                  <div className="expandable-box-cell">
                    <b>Total arbeidserfaring:</b> 7 år
                  </div>
                  <div className="expandable-box-cell">
                    <b>Språk:</b> Norsk (morsmål), engelsk, tysk, russisk,
                    flamsk.
                  </div>
                  <div>{CompetenceMapping()}</div>
                </Collapse>
              </div>
            </TableCell>
          ) : (
            <TableCell key={i} className={classes.cell}>
              <cell.CellComponent rowData={rowData} {...cell} />
            </TableCell>
          )
        )}
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
    width: '95%',
    margin: '0 auto',
  },
  tableHead: {
    fontWeight: 'bold',
    fontSize: '16px',
    '& th:first-child': {
      width: '380px',
    },
    '& th:last-child': {
      maxWidth: '280px',
    },
    '& th:nth-child(3)': {
      width: '115px',
    },
    '& th:nth-child(2)': {
      width: '210px',
    },
    '& th:nth-child(5)': {
      width: '55px',
    },
  },
  tableBody: {
    '& > :last-child > *': {
      borderBottom: 'unset',
    },
    '& td': {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
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
