import * as React from 'react'
import { FC, useEffect, useRef, useState } from 'react'
import { createStyles, makeStyles } from '@mui/styles'
import { Paper, TableCell } from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  AutoSizer as _AutoSizer,
  AutoSizerProps,
  Column as _VirtualizedColumn,
  ColumnProps,
  Index,
  Table as _Table,
  TableProps,
  TableRowProps,
} from 'react-virtualized'
import CharacterLimitBox from './components/CharacterLimitBox'
import { Column, ColumnSort } from './tableTypes'
import { EmployeeTableRow } from '../../api/data/employee/employeeApiTypes'
import { EmployeeForCustomerList } from '../../api/data/customer/customerApiTypes'
import { SortColumnInTable } from './util/sort-column-in-table'

// Hack to allow upgrade to React 18
// https://github.com/bvaughn/react-virtualized/issues/1739#issuecomment-1264276522
// TODO Not maintained. Consider swapping to https://github.com/bvaughn/react-window
const AutoSizer = _AutoSizer as unknown as FC<AutoSizerProps>
const Table = _Table as unknown as FC<TableProps>
const VirtualizedColumn = _VirtualizedColumn as unknown as FC<ColumnProps>

interface DataTableProps {
  columns: Column[]
  rows: EmployeeTableRow[] | EmployeeForCustomerList[]
  setColumnSort?: (CurrentSort: ColumnSort) => void
  checkBox?: CheckBoxHeader
  currentColumnSort?: ColumnSort
}

type CellTypeProps = (props: {
  data: any
  email?: string
  id?: string
  name?: string
  isExpandable?: boolean
  toggleExpand?: (id: string) => void
  isExpanded?: boolean
}) => JSX.Element

interface CellProps {
  CellType?: CellTypeProps
  isExpandable?: boolean
  toggleExpand?: (id: string) => void
  cellData: any[]
  rowId: string
  name: string
}

export interface CheckBoxHeader {
  label: string
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
  checked: boolean
}

const CellTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.background.paper}`,
  display: 'flex',
  padding: 0,
}))
const CellTableCellChild = styled('div')(({ theme }) => ({
  width: '100%',
  height: 70,
  display: 'flex',
  alignItems: 'center',
  paddingRight: 15,
  paddingLeft: 15,
  borderLeft: `1px solid ${theme.palette.background.paper}`,
  borderTop: `1px solid ${theme.palette.background.paper}`,
}))
const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: 16,
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  borderBottom: `1px solid ${theme.palette.background.paper}`,
  borderLeft: `1px solid ${theme.palette.background.paper}`,
  padding: 0,
  paddingRight: 15,
  paddingLeft: 15,
}))
const RowRoot = styled('div')(() => ({
  flexDirection: 'column',
  display: 'flex',
  padding: 0,
}))
const RowTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.background.paper}`,
  borderLeft: `1px solid ${theme.palette.background.paper}`,
  width: 1155,
}))
const RowRootChild = styled('div')(() => ({
  display: 'flex',
  padding: 0,
}))

const tableStyles = makeStyles(() =>
  createStyles({
    flexContainer: {
      display: 'flex',
      padding: 0,
    },
  })
)

const DEFAULT_CELL_HEIGHT = 70
const EXPANDED_CELL_HEIGHT = 522

export function VirtualizedTable({
  columns,
  rows,
  setColumnSort,
  currentColumnSort,
  checkBox,
}: DataTableProps) {
  const classes = tableStyles()
  const tableRef = useRef<_Table>(null)
  const [expandedRowIds, setExpandedRowIds] = useState<string[]>([])
  const [sortOrderUnchanged, setSortOrderUnchanged] = useState(true)

  useEffect(() => {
    // We need to alert the react-virtualized table that the height of a
    // row has changed, so that it can recalculate total height and reposition
    // rows. This runs when a row is expanded/collapsed or when the sort order is changed:
    tableRef.current?.recomputeRowHeights()
  }, [tableRef, expandedRowIds, currentColumnSort])

  function rowIsExpanded(rowId: string) {
    return expandedRowIds.includes(rowId)
  }
  function toggleExpand(rowId: string) {
    if (rowIsExpanded(rowId)) {
      setExpandedRowIds((prevState) => [
        ...prevState.filter((expandedRowId) => expandedRowId !== rowId),
      ])
    } else {
      setExpandedRowIds((prevState) => [...prevState, rowId])
    }
  }

  function getRowHeight({ index }: Index) {
    const rowId = rows[index].rowId
    return rowIsExpanded(rowId) ? EXPANDED_CELL_HEIGHT : DEFAULT_CELL_HEIGHT
  }

  function getRowData({ index }: Index) {
    return rows[index].rowData
  }

  function onSortChange(columnSort: ColumnSort) {
    if (setColumnSort) {
      setColumnSort(columnSort)
    }
    if (sortOrderUnchanged) {
      setSortOrderUnchanged(false)
    }
  }

  function Cell({
    cellData,
    rowId,
    toggleExpand,
    isExpandable,
    name,
    CellType,
  }: CellProps) {
    if (isExpandable && CellType) {
      return (
        <CellType
          data={cellData}
          id={rowId}
          toggleExpand={toggleExpand}
          isExpanded={rowIsExpanded(rowId)}
        />
      )
    }
    return (
      <CellTableCell component="div" align="left">
        <CellTableCellChild>
          {CellType ? (
            <CellType data={cellData} name={name} />
          ) : (
            <CharacterLimitBox text={`${cellData}` ?? '-'} />
          )}
        </CellTableCellChild>
      </CellTableCell>
    )
  }

  function Row({ index, key, rowData, style }: TableRowProps) {
    const rowId = rows[index].rowId
    const ExpandedRowComponent = columns[0]?.renderExpanded
    return (
      <RowRoot key={key} style={style}>
        <RowRootChild>
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} style={{ width: column.width }}>
              <Cell
                CellType={column.renderCell}
                rowId={rowId}
                cellData={rowData[columnIndex]}
                name={rowData[0].value}
                isExpandable={column.isExpandable}
                toggleExpand={toggleExpand}
              />
            </div>
          ))}
        </RowRootChild>
        {rowIsExpanded(rowId) && ExpandedRowComponent ? (
          <ExpandedRowComponent data={rowData[0]} id={rowId} />
        ) : null}
      </RowRoot>
    )
  }

  function renderHeaderCell(
    title: string,
    index: number,
    currentOrder?: ColumnSort,
    HeaderCell?: (props: any) => JSX.Element,
    checkBox?: CheckBoxHeader
  ) {
    if (HeaderCell) {
      return (
        <HeaderCell
          title={title}
          checkBox={checkBox}
          columnIndex={index}
          column={columns[index]}
          onOrderChange={onSortChange}
          currentOrder={
            currentOrder?.columnIndex === index
              ? currentOrder.sortOrder
              : 'NONE'
          }
          sortOrderUnchanged={sortOrderUnchanged}
        />
      )
    }

    return (
      <HeaderTableCell component="div" variant="head" align="left">
        {title}
      </HeaderTableCell>
    )
  }

  function EmptyRow() {
    return (
      <RowTableCell component="div" align="center" colSpan={4}>
        Ingen resultater
      </RowTableCell>
    )
  }

  function getTableHeight() {
    let currHeight = 0
    rows.forEach((item, index) => {
      const currIndex: Index = { index: index }
      currHeight += getRowHeight(currIndex)
    })
    return currHeight + 70 //Adding 70 to make room for header
  }

  return (
    <Paper
      elevation={0}
      style={{
        height: getTableHeight(),
        width: '100%',
      }}
      sx={{ background: 'background.default' }}
    >
      <AutoSizer>
        {({ height, width }) => (
          <Table
            rowRenderer={Row}
            ref={tableRef}
            height={height}
            width={width}
            rowHeight={getRowHeight}
            headerHeight={DEFAULT_CELL_HEIGHT}
            rowCount={rows.length}
            rowGetter={getRowData}
            rowClassName={classes.flexContainer}
            noRowsRenderer={EmptyRow}
          >
            {columns.map((column, index) => (
              <VirtualizedColumn
                key={column.title}
                headerRenderer={() =>
                  renderHeaderCell(
                    column.title,
                    index,
                    currentColumnSort,
                    column.headerCell,
                    checkBox
                  )
                }
                dataKey={String(index)}
                width={column.width}
              />
            ))}
          </Table>
        )}
      </AutoSizer>
    </Paper>
  )
}

export default function DataTable(props: DataTableProps) {
  const [currentColumnSort, setColumnSort] = useState<ColumnSort>({
    columnIndex: 0,
    sortOrder: 'NONE',
  })

  const sortedRows = SortColumnInTable(props.rows, currentColumnSort)

  return (
    <Paper
      elevation={0}
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <VirtualizedTable
        {...props}
        rows={sortedRows}
        setColumnSort={setColumnSort}
        currentColumnSort={currentColumnSort}
      />
    </Paper>
  )
}
