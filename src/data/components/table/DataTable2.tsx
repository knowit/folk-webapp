import React, {useState } from 'react';
import { createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {TableCell}    from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, Table, TableCellRenderer} from 'react-virtualized';
import CharacterLimitBox from '../../../components/CharacterLimitBox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

interface DataTableProps {
    columns: DataTableColumn[];
    rows: Omit<DataTableRow, 'columns'>[];
}

interface DataTableColumn {
    title: string;
    expandable?: boolean;
    renderCell?: (props: { data: any; rowData: any[] }) => JSX.Element;
    renderExpanded?: (props: { data: any; rowData: any[] }) => JSX.Element;
    headerRenderCell?: () => JSX.Element;
}

interface DataTableRow {
    rowData: any[];
    columns: DataTableColumn[];
}

const useStyles = makeStyles((theme:Theme)=>
    createStyles({
        flexContainer: {
            display: 'flex',
            paddingTop: '0',
            paddingBottom: '0',
        },
        cell: {
            backgroundColor: theme.palette.background.default,
            width:'100%',
           // height: '100%',
            borderBottom: '1px solid '+theme.palette.background.paper,
            borderLeft: '2px solid '+theme.palette.background.paper,
        },
        tableHead: {
            fontWeight: 'bold',
            fontSize: '16px',
            borderBottom: '2px solid '+theme.palette.background.paper,
            display: 'flex',
            alignItems: 'center',
            minHeight: '70px',
        },
        cellExpandable: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: '70px',
        },
        bolderText: {
            fontWeight: 'bold',
        },
        column:{
            flexDirection:'column',
        },
        standardSize:{
            width:'100%',
            height: '70px',
            display: 'flex',
            alignItems: 'center',
        },
        emptyTable:{
            width: '1155px'
        },
        invisible:{
            display:'none',
        },
    })
)
type createCellFunction = ((props: { data: any; rowData: any[] }) => JSX.Element)

function ExtendableCell(
    {renderCell, cellData, renderExpanded, open,  id, onChange,}:
    {
        renderCell:createCellFunction,
        cellData:any,
        renderExpanded:createCellFunction
        open:boolean,
        onChange: (rowIndex: number, open: boolean) => void,
        id:number
    }):JSX.Element{
    const classes = useStyles();
    const openStyle = open ? classes.bolderText : '';
    return(
        <TableCell
            component="div"
            className={[classes.flexContainer, classes.cell, classes.column].join(' ')}
            align={'left'}
        >        
            <div className={[classes.cellExpandable, openStyle, classes.standardSize].join(' ')} onClick={() => onChange(id, open)}>
                {renderCell(cellData)}
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            <div className = {open? '' : classes.invisible}>
                {renderExpanded(cellData)}
            </div>
        </TableCell>
    );
}

interface MuiVirtualizedTableProps{
    columns: DataTableColumn[];
    rowCount: number;
    rowGetter: (row: {index:number}) => any;
}

function GetCell ({renderCell, expandable, cellData, renderExpanded, id, onChange, open}
                :{renderCell:createCellFunction|undefined,
                    expandable: boolean|undefined,
                    cellData:any,
                    renderExpanded:createCellFunction|undefined,
                    open:boolean,
                    onChange: (rowIndex: number, open: boolean) => void,
                    id:number
                }):JSX.Element{
    const classes = useStyles();
    const data = cellData !== null ? cellData: "-"
    if(expandable && renderCell && renderExpanded){
        return <ExtendableCell renderCell={renderCell} cellData={cellData} renderExpanded ={renderExpanded} open = {open} onChange = {onChange} id = {id} />
    }else{
        return(
            <TableCell
                component="div"
                className={[classes.flexContainer, classes.cell].join(' ')}
                align={'left'}
            >
                <div className = {classes.standardSize}>{renderCell !== undefined ? renderCell(data) : <CharacterLimitBox text = {data}/>}</div>
            </TableCell> 
        )
    }
}

const cellWidth = (index:number) => {
    switch(index){
        case 0: 
            return 380
        case 1: 
            return 380
        default:
            return 200
    }
}

function MuiVirtualizedTable ({columns, rowCount, rowGetter}:MuiVirtualizedTableProps){
    const classes = useStyles();
    const [opens, setOpens] = useState< boolean[]>([]);
    const defaultHeights = Array(rowCount).fill(70)
    const [heights, setHeigts] = useState<number[]>(defaultHeights);
    
    
    const handleOpenChange = (rowIndex:number, open:boolean) => {
        if (open){
            setOpens({ ...opens, [rowIndex]: false })
            setHeigts({...heights, [rowIndex]: 70});
        }
        else {
            setOpens({ ...opens, [rowIndex]: true });
            setHeigts({...heights, [rowIndex]: 380});
        }
    };

    const cellRenderer: TableCellRenderer = ({ cellData, columnIndex, rowIndex}) => {
        return(
            <GetCell renderCell = {columns[columnIndex].renderCell} expandable = {columns[columnIndex].expandable} cellData={cellData} renderExpanded = {columns[columnIndex].renderExpanded} id = {rowIndex} onChange = {handleOpenChange} open = {opens[rowIndex]}/>
        ); 
    };

    function headerRenderer(title:string){
        return (
            <TableCell
                component="div"
                className={[classes.cell, classes.tableHead].join(" ")}
                variant="head"
                align={'left'}
            >
                {title}
            </TableCell>
        );
    }; 

    const getRowHeight = ({ index }:{index:number}) => (
        heights[index]   
    );

    function emptyRow() {
        return (
            <TableCell  className = {[classes.cell, classes.emptyTable].join(' ')} component="div" align="center" colSpan={4}>
                'Ingen resultater'
            </TableCell>
        )
    }
    
    return (
        <AutoSizer>
            {({ height, width }) => (
            <Table
                height = {height}
                width = {width}
                rowHeight = {getRowHeight}
                headerHeight = {70}
                rowCount = {rowCount}
                rowGetter = {rowGetter}
                rowClassName = {classes.flexContainer}
                noRowsRenderer = {emptyRow}
            >
                {columns.map(({title}, index) => {
                return (
                    <Column
                        key={title}
                        headerRenderer={() => headerRenderer(title)}
                        className={classes.flexContainer}
                        cellRenderer={cellRenderer}
                        dataKey={String(index)}
                        width = {cellWidth(index)}
                    />
                );
                })}
            </Table>
            )}
        </AutoSizer>
    );
}

export default function DataTable2({ columns, rows }: DataTableProps){
 
        
    return (
        <Paper style={{ height: 780, width: '100%' }}>
            <MuiVirtualizedTable
                rowCount={rows.length}
                rowGetter={({ index }) => rows[index].rowData}
                columns = {columns}
            />
        </Paper>
    );
}