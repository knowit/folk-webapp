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

interface DataTableProps {
  columns: DataTableColumn[]
  rows: Omit<DataTableRow, 'columns'>[]
}

export interface DataTableColumn {
  title: string
  expandable?: boolean
  searchable?: boolean
  renderCell?: (props: { data: any }) => JSX.Element
  renderExpanded?: (data: any) => JSX.Element
  headerRenderCell?: JSX.Element
  checkBoxChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

interface DataTableRow {
  rowData: any[]
  columns: DataTableColumn[]
}

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

type CellTypeProps = (props: {
  data: any
  email?: string
  id?: string
  rowData: any[]
  toggleExpand?: (id: string) => void
  isExpanded?: boolean
}) => JSX.Element

interface MuiVirtualizedTableProps {
  columns: DataTableColumn[]
  rowCount: number
  rowGetter: (row: { index: number }) => any
  rows: any[]
}

interface CellProps {
  CellType?: CellTypeProps
  isExpandable?: boolean
  toggleExpand: (id: string) => void
  data: any[]
  id: string
  index: number
}

interface ExpandedRows {
  id: string
  height: number
}

interface SortedColumn {
  sortBy: string
  sortDirection: 'ASC' | 'DESC'
}

function MuiVirtualizedTable({
  columns,
  rowCount,
  rowGetter,
  rows,
}: MuiVirtualizedTableProps) {
  const classes = tableStyles()
  const [expandedRows, setExpandedRows] = useState<string[]>([])
  const [expandedRowsHeights, setExpandedRowsHeights] = useState<
    ExpandedRows[]
  >([])

  let ArrayRef: any
  function setRef(ref: any) {
    ArrayRef = ref
  }

  function toggleExpand(id: string) {
    const isActive = expandedRows.find((expandedId) => expandedId === id)
    if (isActive) {
      setExpandedRows([
        ...expandedRows.filter((expandedRow) => expandedRow !== id),
      ])
      setExpandedRowsHeights([
        ...expandedRowsHeights.filter((expandedRow) => expandedRow.id !== id),
      ])
    } else {
      setExpandedRows([...expandedRows, id])
    }
  }

  function setExpandedRowHeight(id: string, newHeight: number) {
    const isActive = expandedRows.find((expandedRowId) => expandedRowId === id)
    if (isActive) {
      setExpandedRowsHeights([
        ...expandedRowsHeights,
        { id: id, height: newHeight },
      ])
    }
  }

  useEffect(() => {
    ArrayRef.recomputeRowHeights()
    ArrayRef.forceUpdate()
  }, [ArrayRef, expandedRowsHeights])

  const widthList = [385, 222, 143, 337, 53]

  function GetCell({
    isExpandable,
    data,
    id,
    toggleExpand,
    index,
    CellType,
  }: CellProps): JSX.Element {
    const classes = tableStyles()
    const cellData = data[index]
    const isExpanded =
      expandedRows.filter((expandedRow) => expandedRow === id).length > 0

    if (isExpandable && CellType) {
      return (
        <CellType
          data={cellData}
          rowData={[]}
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
            <CellType data={cellData} rowData={data} />
          ) : (
            <CharacterLimitBox text={cellData ?? '-'} />
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
          {columns.map((column, i) => {
            return (
              <div key={i} style={{ width: widthList[i] }}>
                <GetCell
                  CellType={column.renderCell}
                  isExpandable={column.expandable}
                  id={id}
                  data={rowData}
                  index={i}
                  toggleExpand={toggleExpand}
                />
              </div>
            )
          })}
        </div>
        {expandedRows.find((expandedRow) => expandedRow === id) &&
          RenderExpanded && (
            <RenderExpanded
              data={rowData[0]}
              setHeight={setExpandedRowHeight}
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

  function headerCellRenderer(title: string, HeaderRenderCell?: any) {
    return HeaderRenderCell ? (
      HeaderRenderCell
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

  const getRowHeight = ({ index }: { index: number }) => {
    const id = rows[index].rowId
    return (
      expandedRowsHeights.find((expandedRow) => expandedRow.id === id)
        ?.height ?? 70
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

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Table
          rowRenderer={PerRowRender}
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
          //sort={(info) => setSortedColumn(info) }
        >
          {columns.map(({ title, headerRenderCell }, index) => {
            return (
              <Column
                key={title}
                headerRenderer={() =>
                  headerCellRenderer(title, headerRenderCell)
                }
                className={classes.flexContainer}
                dataKey={String(index)}
                width={widthList[index]}
              />
            )
          })}
        </Table>
      )}
    </AutoSizer>
  )
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
  )
}
