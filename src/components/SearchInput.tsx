import React from 'react'
import { 
    Input,
    InputAdornment
 } from '@material-ui/core';
 import SearchIcon from '@material-ui/icons/Search';

export default function SearchInput() {
    return (
        <Input 
            endAdornment={(
                <InputAdornment position="end">
                    <SearchIcon />
                </InputAdornment>
            )}
        />
    )
}