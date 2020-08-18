import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { HeaderCellWithCheckBox } from '../DataTableCells';
import { DataTableRow, DataTableColumn, useTableStyles, useRowStyles, Row } from '../dd/DataTable';

interface DataTableWithFilterProps {
    columns: DataTableColumn[];
    rows: Omit<DataTableRow, 'columns'>[];
    filterFunction: (rows: Pick<DataTableRow, "rowData">) => Pick<DataTableRow, "rowData">;
    checkBoxColumnTitle: string;
    checkBoxLabel: string;
  }

export default function DataTableWithFilter({ columns, rows, filterFunction, checkBoxColumnTitle, checkBoxLabel}: DataTableWithFilterProps) {
    const tableClasses = useTableStyles();
    const rowClasses = useRowStyles();

    const [filterFreeResources, setFilterFreeResources] = useState(false);

    const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterFreeResources(event.target.checked);
    };

    let showRows = rows
    if (filterFreeResources){
        showRows = showRows.filter(row => filterFunction(row)) 
    }

    return (
        <TableContainer className={tableClasses.root}>
        <Table>
            <TableHead className={tableClasses.tableHead}>
            <TableRow className={rowClasses.row}>
                {columns.map((x) => {
                if (x.title===checkBoxColumnTitle){
                return (
                    <TableCell className={rowClasses.cell} key={x.title}>
                    <HeaderCellWithCheckBox columnTitle={x.title} label={checkBoxLabel} changeHandler={handleCheckBoxChange}/>
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
