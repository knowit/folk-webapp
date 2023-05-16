import React from 'react'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  IconBaseStyle,
} from '../../../assets/Icons'
import { styled } from '@mui/material/styles'
import { Checkbox, FormControlLabel } from '@mui/material'
import { CheckBoxHeader } from '../DataTable'
import { Column, ColumnSort } from '../tableTypes'

const ComponentRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontWeight: 'bold',
  fontSize: 16,
  height: '100%',
  width: '100%',
  borderBottom: `1px solid ${theme.palette.background.paper}`,
  borderLeft: `1px solid ${theme.palette.background.paper}`,
  padding: 0,
  paddingLeft: 15,
  cursor: 'pointer',
}))

const HeaderTitle = styled('div')(() => ({
  justifyContent: 'space-between',
  display: 'flex',
  width: '100%',
  paddingRight: 15,
}))

const CheckboxContainer = styled('div')(() => ({
  width: '60%',
}))

const FormControlLabelStyled = styled(FormControlLabel)(() => ({
  marginRight: 0,
}))

const CheckboxStyled = styled(Checkbox)(() => IconBaseStyle)

interface SortableHeaderCellProps {
  title: string
  onOrderChange: (newOrder: ColumnSort) => void
  columnIndex: number
  column: Column
  currentOrder: string
  checkBox: CheckBoxHeader
  sortOrderUnchanged: boolean
}

export default function SortableHeaderCell({
  title,
  currentOrder,
  onOrderChange,
  columnIndex,
  column,
  checkBox,
  sortOrderUnchanged,
}: SortableHeaderCellProps) {
  const sortClick = () => {
    const newOrder =
      columnIndex == 0 && sortOrderUnchanged
        ? 'DESC'
        : currentOrder === 'ASC'
        ? 'DESC'
        : 'ASC'

    onOrderChange({
      sortOrder: newOrder,
      columnIndex: columnIndex,
      getSortValue: column.getValue,
    })
  }

  const sortIcon = () => {
    switch (currentOrder) {
      case 'DESC':
        return <ArrowUpIcon />
      case 'ASC':
        return <ArrowDownIcon />
      case 'NONE':
      default:
        if (columnIndex == 0 && sortOrderUnchanged) {
          return <ArrowDownIcon />
        } else return null
    }
  }

  return (
    <ComponentRoot>
      <HeaderTitle onClick={sortClick}>
        {title}
        {sortIcon()}
      </HeaderTitle>
      {columnIndex == 0 && checkBox ? (
        <CheckboxContainer>
          <FormControlLabelStyled
            control={
              <CheckboxStyled disableRipple onChange={checkBox.changeHandler} />
            }
            label={checkBox.label}
            checked={checkBox.checked}
          />
        </CheckboxContainer>
      ) : null}
    </ComponentRoot>
  )
}
