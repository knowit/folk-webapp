import React, { useEffect, useState } from 'react'
import { ArrowDownward, ArrowUpward } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { createStyles, Theme } from '@material-ui/core'
import { ColumnSort } from '../../../DDTable'

export type SortOrder = 'NONE' | 'ASC' | 'DESC'

const useSortableHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    position: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontWeight: 'bold',
      fontSize: '16px',
      height: '100%',
      width: '100%',
      borderBottom: `1px solid ${theme.palette.background.paper}`,
      borderLeft: `1px solid ${theme.palette.background.paper}`,
      padding: 0,
      paddingRight: '15px',
      paddingLeft: '15px',
      cursor: 'pointer',
    },
  })
)

interface SortableHeaderCellProps {
  title: string
  onOrderChange: (newOrder: ColumnSort) => void
  columnIndex: number
}

export default function SortableHeaderCell({
  title,
  onOrderChange,
  columnIndex,
}: SortableHeaderCellProps) {
  const [currentOrder, setCurrentOrder] = useState<SortOrder>('NONE')
  const classes = useSortableHeaderStyles()

  const sortClick = () => {
    setCurrentOrder(currentOrder === 'ASC' ? 'DESC' : 'ASC')
  }

  useEffect(() => {
    onOrderChange({ sortOrder: currentOrder, columnIndex: columnIndex })
  })

  const sortIcon = () => {
    switch (currentOrder) {
      case 'ASC':
        return <ArrowUpward />
      case 'DESC':
        return <ArrowDownward />
      case 'NONE':
      default:
        return null
    }
  }

  return (
    <div
      className={classes.position}
      onClick={() => {
        sortClick()
      }}
    >
      {title}
      {sortIcon()}
    </div>
  )
}
