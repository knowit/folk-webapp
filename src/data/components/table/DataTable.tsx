import React, { useEffect, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { TableCell, withStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import {
  AutoSizer,
  Column,
  Table,
  TableRowProps,
  TableRowRenderer,
} from 'react-virtualized'
import CharacterLimitBox from '../../../components/CharacterLimitBox'
import { ColumnSort } from '../../DDTable'
import { Columns } from '../../types'

interface DataTableProps {
  columns: Columns[]
  rows: any //Omit<DataTableRow, 'columns'>[]
  setColumnSort?: (CurrentSort: ColumnSort) => void
  checkBoxChangeHandler?: () => void
  currentColumnSort?: ColumnSort
  columnsWidth?: number[]
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
  id: string
  name: string
}

interface ExpandedRows {
  id: string
  height: number
}

type RowHeight = { index: number }

const TableCellNoBorders = withStyles({
  root: {
    borderBottom: '1px solid #F1F0ED',
  },
})(TableCell)

export const tableStyles = makeStyles((theme: Theme) =>
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
)

export default function DataTable({
  columns,
  rows,
  setColumnSort,
  checkBoxChangeHandler,
  currentColumnSort,
  columnsWidth = [385, 222, 143, 337, 53],
}: DataTableProps) {
  const classes = tableStyles()
  const [expandedRows, setExpandedRowsHeights] = useState<ExpandedRows[]>([])

  const DEFAULT_CELL_HEIGHT = 70
  const EXPANDED_CELL_HEIGHT = 522

  let ArrayRef: any
  function setRef(ref: any) {
    ArrayRef = ref
  }

  function toggleExpand(id: string) {
    const isActive = expandedRows.find((expandedRow) => expandedRow.id === id)
    if (isActive) {
      setExpandedRowsHeights([
        ...expandedRows.filter((expandedRow) => expandedRow.id !== id),
      ])
    } else {
      setExpandedRowsHeights([
        ...expandedRows,
        { id: id, height: EXPANDED_CELL_HEIGHT }, //TODO: FETCH HEIGHT FROM COLUMN
      ])
    }
  }

  useEffect(() => {
    ArrayRef.recomputeRowHeights()
    ArrayRef.forceUpdate()
  }, [ArrayRef])

  function prepareCell({
    cellData,
    id,
    toggleExpand,
    isExpandable,
    name,
    CellType,
  }: CellProps): JSX.Element {
    const isExpanded =
      expandedRows.filter((expandedRow) => expandedRow.id === id).length > 0
    if (isExpandable && CellType) {
      return (
        <CellType
          data={cellData}
          id={id}
          toggleExpand={toggleExpand}
          isExpanded={isExpanded}
        />
      )
    }
    return (
      <TableCellNoBorders
        component="div"
        className={classes.flexContainer}
        align="left"
      >
        <div className={[classes.standardSize, classes.borders].join(' ')}>
          {CellType ? (
            <CellType data={cellData} name={name} />
          ) : (
            <CharacterLimitBox text={`${cellData}` ?? '-'} />
          )}
        </div>
      </TableCellNoBorders>
    )
  }

  const PerRowRender: TableRowRenderer = ({
    className,
    index,
    key,
    rowData,
    style,
  }: TableRowProps) => {
    const id = rows[index].rowId
    const RenderExpanded = columns[0]?.renderExpanded
    return (
      <div key={key} className={classes.column} style={style}>
        <div className={className}>
          {columns.map((column, columnIndex) => {
            return (
              <div
                key={columnIndex}
                style={{ width: columnsWidth[columnIndex] }}
              >
                {prepareCell({
                  CellType: column.renderCell,
                  id: id,
                  cellData: rowData[columnIndex],
                  name: rowData[0].value,
                  isExpandable: column.isExpandable,
                  toggleExpand: toggleExpand,
                })}
              </div>
            )
          })}
        </div>
        {expandedRows.find((expandedRow) => expandedRow.id === id) &&
          RenderExpanded && (
            <RenderExpanded
              data={rowData[0]}
              callBack={() => {
                ArrayRef.recomputeRowHeights()
                ArrayRef.forceUpdate()
              }}
              id={id}
            />
          )}
      </div>
    )
  }

  function onSortChange(columnSort: ColumnSort) {
    if (setColumnSort) {
      setColumnSort(columnSort)
    }
  }

  function headerCellRenderer(
    title: string,
    index: number,
    currentOrder?: ColumnSort,
    HeaderCell?: (props: any) => JSX.Element,
    checkBoxChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void
  ) {
    return HeaderCell ? (
      <HeaderCell
        title={title}
        checkBoxLabel="Se kun ledige"
        checkBoxChangeHandler={checkBoxChangeHandler}
        columnIndex={index}
        onOrderChange={onSortChange}
        currentOrder={
          currentOrder?.columnIndex === index ? currentOrder.sortOrder : 'NONE'
        }
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
    )
  }

  const getRowHeight = ({ index }: RowHeight) => {
    const rowIndex = index
    const id = rows[rowIndex].rowId
    return (
      expandedRows.find((expandedRow) => expandedRow.id === id)?.height ??
      DEFAULT_CELL_HEIGHT
    )
  }

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
    )
  }

  const VirtualizedTable = () => (
    <AutoSizer>
      {({ height, width }) => (
        <Table
          rowRenderer={PerRowRender}
          ref={setRef}
          height={height}
          width={width}
          rowHeight={getRowHeight}
          headerHeight={DEFAULT_CELL_HEIGHT}
          rowCount={rows.length}
          rowGetter={({ index }) => rows[index].rowData}
          rowClassName={classes.flexContainer}
          noRowsRenderer={emptyRow}
          gridClassName={classes.noFocus}
        >
          {columns.map(({ title, headerCell }, index) => {
            return (
              <Column
                key={title}
                headerRenderer={() =>
                  headerCellRenderer(
                    title,
                    index,
                    currentColumnSort,
                    headerCell,
                    checkBoxChangeHandler
                  )
                }
                className={classes.flexContainer}
                dataKey={String(index)}
                width={columnsWidth[index]}
              />
            )
          })}
        </Table>
      )}
    </AutoSizer>
  )

  return (
    <Paper
      style={{
        height: 780,
        width: '100%',
        backgroundColor: 'white',
      }}
    >
      <VirtualizedTable />
    </Paper>
  )
}
