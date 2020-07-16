import React from 'react'
import { 
    NativeSelect,
    InputBase
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'

type ValueType = {displayValue: any, value: any} | any

interface DropdownPickerProps {
    values: ValueType[],
    onChange?: (newValue: ValueType) => void 
}

const useStyles = makeStyles({
    root: {
        backgroundColor: '#F1F0ED',
        fontSize: 16,
        height: 43,
        border: '1px solid white',
        '& > svg': {
            right: 10
        },
        '& $select': {
            backgroundColor: '#F1F0ED !important',
        }
    },
    input: {
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 12,
        paddingRight: '34px !important',
        height: 'inherit'
    }
})


export default function DropdownPicker({
    values,
    onChange = () => null 
} : DropdownPickerProps) {
    const classes = useStyles()

    return (
        <NativeSelect
            className={classes.root}
            variant='standard'
            // eslint-disable-next-line
            onChange={({ target: { value } }) => onChange( values.find(x => x.value === value || x == value) )}
            input={<InputBase/>}
            inputProps={{
                className: classes.input
            }}>
            
            {values.map((x : ValueType) => (
                <option value={x.value || x}>{x.displayValue || x}</option>
            ))}
        </NativeSelect>
    )
}