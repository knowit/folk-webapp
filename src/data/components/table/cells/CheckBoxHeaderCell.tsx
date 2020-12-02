import React from 'react';
import { createStyles, FormControlLabel, Theme } from '@material-ui/core';
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

const useCheckBoxStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      marginRight: 0,
    },
    position: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontWeight: 'bold',
      fontSize: '16px',
      height: '100%',
      width: '100%',
      borderBottom: `1px solid ${theme.palette.background.paper}`,
      padding: 0,
      paddingRight: '15px',
      paddingLeft: '15px',
    },
  })
);

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
        control={<BlackCheckBox onChange={checkBoxChangeHandler} />}
        label={checkBoxLabel}
      />
    </div>
  );
}
