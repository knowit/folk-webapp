import React, { useRef } from 'react';
import { Select, InputBase, MenuItem, Grow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

type ValueType = { displayValue: string; value: any } | string;

interface DropdownPickerProps {
  values: ValueType[];
  onChange?: (newValue: any) => void;
}

const useStyles = makeStyles({
  root: ({ width }: { width: number }) => ({
    backgroundColor: '#F1F0ED',
    fontSize: 16,
    border: '1px solid white',
    width: width,
  }),
  input: {
    paddingLeft: 12,
    paddingTop: 0,
    paddingBottom: 0,
    lineHeight: '43px',
    height: 'inherit',
  },
  menu: {},
  menuPaper: ({ width }: { width: number }) => ({
    borderRadius: 0,
    width: width,
    backgroundColor: '#F1F0ED',
    marginLeft: -1,
  }),
  menuList: {
    borderLeft: '1px solid white',
    borderRight: '1px solid white',
  },
  menuItem: {
    fontSize: 14,
    borderBottom: '1px solid white',
    paddingLeft: 12,
  },
});

const useMuiOverrideStyles = makeStyles({
  icon: {
    color: '#333333',
    right: 10,
  },
  select: {
    backgroundColor: '#F1F0ED !important',
  },
});

const getDisplayValue = (value: ValueType): string =>
  typeof value === 'string' ? value : value.displayValue;
const getValue = (value: ValueType): any =>
  typeof value === 'string' ? value : value.value;

function measureTextWidth(text: string, font: string): number {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return 0;

  context.font = font;
  return context.measureText(text).width;
}

export default function DropdownPicker({
  values,
  onChange = () => null,
}: DropdownPickerProps) {
  const width =
    measureTextWidth(
      values
        .map((x) => getDisplayValue(x))
        .reduce((prev, next) => (prev.length > next.length ? prev : next)),
      '16pt arial'
    ) + 46;
  const classes = useStyles({ width });
  const overrideClasses = useMuiOverrideStyles();
  const selectRef = useRef<HTMLElement | null>();

  return (
    <Select
      className={classes.root}
      classes={overrideClasses}
      variant="standard"
      inputRef={selectRef}
      autoWidth={true}
      onChange={({ target: { value } }) => onChange(value)}
      input={<InputBase />}
      defaultValue={getDisplayValue(values[0])}
      inputProps={{
        className: classes.input,
      }}
      MenuProps={{
        TransitionComponent: Grow,
        className: classes.menu,
        MenuListProps: {
          disablePadding: true,
          className: classes.menuList,
        },
        PaperProps: {
          className: classes.menuPaper,
        },
        getContentAnchorEl: null,
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
      {values.map((x: ValueType, i: number) => (
        <MenuItem key={i} className={classes.menuItem} value={getValue(x)}>
          {getDisplayValue(x)}
        </MenuItem>
      ))}
    </Select>
  );
}
