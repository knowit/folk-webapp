import React from 'react'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { makeStyles } from '@material-ui/core/styles'
import {
  createStyles,
  FormControlLabel,
  Theme,
  withStyles,
} from '@material-ui/core'
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox'
import { CheckBoxHeader } from '../DataTable'
import { Column, ColumnSort } from '../tableTypes'

const useSortableHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      marginRight: 0,
    },
    position: {
      display: 'flex',
      alignItems: 'center',
      fontWeight: 'bold',
      fontSize: '16px',
      height: '100%',
      width: '100%',
      borderBottom: `1px solid ${theme.palette.background.paper}`,
      borderLeft: `1px solid ${theme.palette.background.paper}`,
      padding: 0,
      paddingLeft: '15px',
      cursor: 'pointer',
    },
    positionChild: {
      justifyContent: 'space-between',
      display: 'flex',
      width: '100%',
      paddingRight: '15px',
    },
    checkBox: {
      width: '60%',
    },
  })
)

const BlackCheckBox = withStyles({
  root: {
    color: '#333333',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
})((props: CheckboxProps) => (
  <Checkbox color="default" disableRipple {...props} />
))

interface SortableHeaderCellProps {
  title: string
  onOrderChange: (newOrder: ColumnSort) => void
  columnIndex: number
  column: Column
  currentOrder: string
  checkBox: CheckBoxHeader
}

export default function SortableHeaderCell({
  title,
  currentOrder,
  onOrderChange,
  columnIndex,
  column,
  checkBox,
}: SortableHeaderCellProps) {
  const classes = useSortableHeaderStyles()

  const sortClick = () => {
    const newOrder = currentOrder === 'ASC' ? 'DESC' : 'ASC'
    onOrderChange({
      sortOrder: newOrder,
      columnIndex: columnIndex,
      getSortValue: column.getValue,
    })
  }

  const sortIcon = () => {
    switch (currentOrder) {
      case 'DESC':
        return <ArrowUpward />
      case 'ASC':
        return <ArrowDownward />
      case 'NONE':
      default:
        return null
    }
  }

  return (
    <div className={classes.position}>
      <div className={classes.positionChild} onClick={sortClick}>
        {title}
        {sortIcon()}
      </div>
      {columnIndex == 0 ? (
        <div className={classes.checkBox}>
          <FormControlLabel
            className={classes.label}
            control={<BlackCheckBox onChange={checkBox.changeHandler} />}
            label={checkBox.label}
            checked={checkBox.checked}
          />
        </div>
      ) : null}
    </div>
  )
}
