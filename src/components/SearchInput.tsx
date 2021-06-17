import React, { useState } from 'react';
import { InputBase, InputAdornment, Theme, debounce } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: 'white',
    height: 43,
    minWidth: 220,
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 10,
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

interface SearchInputProps {
  placeholder: string;
  onSearch: (val: string) => void;
  onClear: () => void;
}
export default function SearchInput({
  placeholder,
  onSearch,
  onClear,
}: SearchInputProps) {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');

  const clearInput = () => {
    setSearchValue('');
    onClear();
  };

  // This function is debounced, so that we wait a bit (250ms) between each search
  const triggerSearch = debounce((searchTerm) => {
    onSearch(searchTerm);
  }, 250);

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchValue(event.target.value);
    triggerSearch(event.target.value);
  };

  return (
    <>
      <InputBase
        className={classes.root}
        onChange={changeValue}
        value={searchValue}
        type="text"
        name="search"
        placeholder={placeholder}
        endAdornment={
          <InputAdornment position="end">
            {searchValue === '' ? (
              <SearchIcon className={classes.icon} />
            ) : (
              <IconButton
                color="inherit"
                className={classes.icon}
                aria-label="Tøm"
                onClick={clearInput}
                title="Tøm"
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
