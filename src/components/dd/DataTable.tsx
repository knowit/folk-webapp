import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControlLabel,
} from '@material-ui/core';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

interface DataTableColumn {
  title: string;
  expandable?: boolean;
  renderCell?: (props: { data: any; rowData: any[] }) => JSX.Element;
}

interface DataTableCell extends DataTableColumn {
  data: any;
}

interface DataTableRow {
  rowData: any[];
  columns: DataTableColumn[];
}

interface DataTableProps {
  columns: DataTableColumn[];
  rows: Omit<DataTableRow, 'columns'>[];
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
    padding: '10px 15px 10px 15px',
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
    <React.Fragment>
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
    </React.Fragment>
  );
}

const BlackCheckBox = withStyles({
  root: {
    color: '#333333',
    '&$checked': {
      color: '#333333',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" disableRipple {...props} />);

const useCheckBoxStyles = makeStyles({
  label: {
    marginRight: 0,
  },
  position: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

interface ConsultantHeaderCellProps {
  column: DataTableColumn,
  label: string
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function HeaderCellWithCheckBox({ column, label, changeHandler }: ConsultantHeaderCellProps) {
  const classes = useCheckBoxStyles();

  return (
    <div className={classes.position}>
      {column.title} 
      <FormControlLabel className={classes.label}
        control={<BlackCheckBox onChange={changeHandler}/>}
        label={label}
      />
    </div>
  );
}

const useTableStyles = makeStyles({
  root: {},
  tableHead: {
    fontWeight: 'bold',
    fontSize: '16px',
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
  const rowClasses = useRowStyles();

  const [filterFreeResources, setFilterFreeResources] = useState(false);

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterFreeResources(event.target.checked);
  };

  let showRows = rows
  if (filterFreeResources){
    showRows = showRows.filter(row => row.rowData[3].status === 'green') // TODO: Update filter to reflect structure of actual data from backend
  }

  return (
    <TableContainer className={tableClasses.root}>
      <Table>
        <TableHead className={tableClasses.tableHead}>
          <TableRow className={rowClasses.row}>
            {columns.map((x) => {
            if (x.title==="Konsulent"){
              return (
                <TableCell className={rowClasses.cell} key={x.title}>
                  <HeaderCellWithCheckBox column={x} label={"Vis kun ledige"} changeHandler={handleCheckBoxChange}/>
                </TableCell>
              )
            }
            else{ 
              return (
              <TableCell className={rowClasses.cell} key={x.title}>
                {x.title}
              </TableCell>
              )
            }})}
          </TableRow>
        </TableHead>
        <TableBody className={tableClasses.tableBody}>
          {showRows.map((row, i) => (
            <Row key={i} {...row} columns={columns} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
