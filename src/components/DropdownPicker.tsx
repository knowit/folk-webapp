import React, { useRef } from 'react';
import { Select, InputBase, MenuItem, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

type ValueType = { displayValue: string; value: any } | string;

interface DropdownPickerProps {
  values: ValueType[];
  onChange?: (newValue: any) => void;
  selected?: any;
  big?: boolean;
}

const useStyles = makeStyles({
  root: ({ width }: { width: number }) => ({
    backgroundColor: '#F1F0ED',
    fontSize: 16,
    border: '1px solid white',
    width,
  }),
  input: {
    paddingLeft: 12,
    paddingTop: 0,
    paddingBottom: 0,
    lineHeight: '43px',
    height: 'inherit',
    display: 'flex',
    alignItems: 'center',
  },
  menu: {},
  menuPaper: ({ width }: { width: number }) => ({
    borderRadius: 0,
    width,
    backgroundColor: '#F1F0ED',
    marginLeft: -1,
  }),
  menuList: {
    borderLeft: '1px solid white',
    borderRight: '1px solid white',
    borderTop: '1px solid white',
  },
  menuItem: {
    fontSize: 14,
    borderBottom: '1px solid white',
    paddingLeft: 12,
  },
});

const useBigStyles = makeStyles({
  root: ({ width }: { width: number }) => ({
    backgroundColor: '#F1F0ED',
    fontSize: 25,
    border: '1px solid white',
    width,
    marginRight: 10,
  }),
  input: {
    height: 77,
    paddingLeft: 12,
    paddingTop: 0,
    paddingBottom: 0,
    lineHeight: '43px',
    display: 'flex',
    alignItems: 'center',
  },
  menu: {},
  menuPaper: ({ width }: { width: number }) => ({
    borderRadius: 0,
    width,
    backgroundColor: '#F1F0ED',
    marginLeft: -1,
  }),
  menuList: {
    borderLeft: '1px solid white',
    borderRight: '1px solid white',
    borderTop: '1px solid white',
  },
  menuItem: {
    fontSize: 25,
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

const useMuiOverrideStylesBig = makeStyles({
  icon: {
    color: '#333333',
    right: 10,
    height: '45.2px',
    width: '45.2px',
    top: 15,
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

  if (!context) {
    return 0;
  }

  context.font = font;
  return context.measureText(text).width;
}

export default function DropdownPicker({
  values,
  onChange = () => null,
  selected = '',
  big,
}: DropdownPickerProps) {
  const width =
    measureTextWidth(
      values
        .map((x) => getDisplayValue(x))
        .reduce((prev, next) => (prev.length > next.length ? prev : next), ''),
      big ? '25pt arial' : '16pt arial'
    ) + 46;
  const smallClasses = useStyles({ width });
  const bigClasses = useBigStyles({ width });
  const classes = big ? bigClasses : smallClasses;
  const overrideClasses = useMuiOverrideStyles();
  const overrideClassesBig = useMuiOverrideStylesBig();
  const sizeOverrideClasses = big ? overrideClassesBig : overrideClasses;
  const selectRef = useRef<HTMLElement | null>();

  const defaultValue = selected || values.length > 0 ? values[0] : '';
  return (
    <Select
      className={classes.root}
      classes={sizeOverrideClasses}
      variant="standard"
      inputRef={selectRef}
      autoWidth
      onChange={({ target: { value } }) => onChange(value)}
      input={<InputBase />}
      defaultValue={defaultValue}
      inputProps={{
        className: classes.input,
      }}
      value={selected}
      MenuProps={{
        TransitionComponent: Fade,
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
      {values.map((value: ValueType) => (
        <MenuItem
          key={`${getValue(value)}`}
          className={classes.menuItem}
          value={getValue(value)}
        >
          {getDisplayValue(value)}
        </MenuItem>
      ))}
    </Select>
  );
}
