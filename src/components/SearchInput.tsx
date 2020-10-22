import React from 'react';
import { InputBase, InputAdornment, Theme } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

interface SearchInputProps {
  onChange?: (newValue: string) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: 'white',
    height: 43,
    minWidth: 303,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 16,
  },
  icon: {
    color: theme.palette.primary.main,
    borderRadius: 0,
    transition: 'none',
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));

export default function SearchInput({
  onChange = () => null,
}: SearchInputProps) {
  const classes = useStyles();
  const [val, setVal] = React.useState('');

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setValueAndChange(event.target.value);
  };

  const setValueAndChange = (value: string) => {
    setVal(value);
    onChange(value);
  };

  return (
    <>
      <InputBase
        className={classes.root}
        onChange={changeValue}
        value={val}
        type="text"
        name="search"
        placeholder="Søk konsulent, kunde..."
        endAdornment={
          <InputAdornment position="end">
            {val === '' ? (
              <SearchIcon className={classes.icon} />
            ) : (
              <IconButton
                color="inherit"
                className={classes.icon}
                aria-label="Tøm"
                onClick={() => setValueAndChange('')}
              >
                <CloseIcon />
              </IconButton>
            )}
          </InputAdornment>
        }
      />
    </>
  );
}
