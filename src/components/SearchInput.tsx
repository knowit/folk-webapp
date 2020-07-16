import React from 'react'
import { 
    InputBase,
    InputAdornment
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles'


interface SearchInputProps {
    onChange?: (newValue: string) => void 
}

const useStyles = makeStyles({
    root: {
        backgroundColor: 'white',
        height: 43,
        minWidth: 303,
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 16
    }
})


export default function SearchInput({
    onChange = () => null 
} : SearchInputProps) {
    const classes = useStyles()

    return (
        <InputBase
            className={classes.root}
            onChange={({ target: { value }}) => onChange(value)}
            endAdornment={(
                <InputAdornment position="end">
                    <SearchIcon />
                </InputAdornment>
            )}
        />
    )
}