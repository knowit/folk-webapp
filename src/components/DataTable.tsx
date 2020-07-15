import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Box,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core'


interface DataTableCell {
    data: any
    expandable?: boolean
    renderCell?: (props: any) => React.ReactNode
}

interface DataTableColumn extends Omit<DataTableCell, 'data'> {
    title: string   
}

interface DataTableRow {
    rowData: any[]
    columns: DataTableColumn[]
}

interface DataTableProps {
    columns: DataTableColumn[]
    rows: Omit<DataTableRow, 'columns'>[]
}

type DataTableRowProps = DataTableRow

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
})

function Row({
    rowData,
    columns
} : DataTableRowProps) {
    const [open, setOpen] = useState(false)
    const classes = useRowStyles()

    const cells = columns.map((column, i) => ({
        data: rowData[i],
        ...column
    }))

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                {cells.map((x, i) => (
                    <TableCell key={i} onClick={() => x.expandable ? setOpen(!open) : null}>
                        {x.renderCell ? x.renderCell({data: x, rowData}) : x.data}
                    </TableCell>
                ))}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <p>Mer innhold</p>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export default function DataTable({
    columns, 
    rows
} : DataTableProps) {

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map(x => <TableCell key={x.title}>{x.title}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, i) => (
                        <Row key={i} {...row} columns={columns} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}