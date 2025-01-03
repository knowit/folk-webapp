import React, { useRef } from 'react'
import { Fade, InputBase, MenuItem, Select } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useMatomo } from '@jonkoops/matomo-tracker-react'

type ValueType = { displayValue: string; value: any } | string

interface DropdownPickerProps {
  values: ValueType[]
  onChange?: (newValue: any) => void
  selected?: any
  big?: boolean
  title?: string
}

const ComponentRoot = styled(Select, {
  shouldForwardProp: (prop) => prop !== 'width' && prop !== 'big',
})<{ width: number; big: boolean }>(({ theme, width, big }) => ({
  backgroundColor: theme.palette.background.default,
  fontSize: big ? 25 : 16,
  border: '1px solid white',
  width,
  marginRight: big && 10,
  '& .MuiSelect-icon': {
    right: 5,
    height: big && 45.2,
    width: big && 45.2,
    top: big && 15,
  },
  '& .MuiSelect-select': {
    paddingLeft: 12,
  },
}))
const InputBaseStyled = styled(InputBase)(() => ({
  padding: 0,
  alignItems: 'center',
  display: 'flex',
  lineHeight: 2,
}))

const MenuItemStyled = styled(MenuItem, {
  shouldForwardProp: (prop) => prop !== 'big',
})<{ big: boolean }>(({ theme, big }) => ({
  borderBottom: `1px solid ${theme.palette.background.default}`,
  paddingLeft: 12,
  fontSize: big ? 25 : 14,
}))

const getDisplayValue = (value: ValueType): string =>
  typeof value === 'string' ? value : value.displayValue
const getValue = (value: ValueType): any =>
  typeof value === 'string' ? value : value.value

function measureTextWidth(text: string, font: string): number {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    return 0
  }

  context.font = font
  return context.measureText(text).width
}

export default function DropdownPicker({
  values,
  onChange = () => null,
  selected = '',
  title,
  big,
}: DropdownPickerProps): React.ReactNode {
  const width =
    measureTextWidth(
      values
        .map((x) => getDisplayValue(x))
        .reduce((prev, next) => (prev.length > next.length ? prev : next), ''),
      big ? '25pt arial' : '19pt arial'
    ) + 46
  const selectRef = useRef<HTMLElement | null>()
  const { trackEvent } = useMatomo()
  const defaultValue = selected || values.length > 0 ? values[0] : ''
  return (
    <ComponentRoot
      width={width}
      big={big}
      variant="standard"
      inputRef={selectRef}
      autoWidth
      onChange={({ target: { value } }) => {
        trackEvent({
          category: 'Graph category',
          action: 'Dropdown category changed',
          name: `Dropdown category changed to ${value} for ${title}`,
        })
        return onChange(value)
      }}
      input={<InputBaseStyled />}
      defaultValue={defaultValue}
      value={selected}
      MenuProps={{
        TransitionComponent: Fade,
        MenuListProps: {
          disablePadding: true,
        },
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
        elevation: 0,
      }}
    >
      {values.map((value: ValueType) => (
        <MenuItemStyled
          big={big}
          key={`${getValue(value)}`}
          value={getValue(value)}
        >
          {getDisplayValue(value)}
        </MenuItemStyled>
      ))}
    </ComponentRoot>
  )
}
