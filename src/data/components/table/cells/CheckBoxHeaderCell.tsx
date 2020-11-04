import React from 'react';
import { FormControlLabel } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';

const BlackCheckBox = withStyles({
  root: {
    color: '#333333',
    '&$checked': {
      color: '#333333',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  checked: {},
})((props: CheckboxProps) => (
  <Checkbox color="default" disableRipple {...props} />
));

const useCheckBoxStyles = makeStyles({
  label: {
    marginRight: 0,
  },
  position: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default function CheckBoxHeaderCell({
  title,
  checkBoxLabel,
  checkBoxChangeHandler,
}: {
  title: string;
  checkBoxLabel: string;
  checkBoxChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const classes = useCheckBoxStyles();

  return (
    <div className={classes.position}>
      {title}
      <FormControlLabel
        className={classes.label}
        control={<BlackCheckBox onChange={checkBoxChangeHandler} disabled />}
        label={checkBoxLabel}
      />
    </div>
  );
}
