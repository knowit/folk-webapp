import React from 'react'
import { NativeSelect } from "@material-ui/core";

type ValueType = {displayValue: any, value: any} | any

interface DropdownPickerProps {
    values: ValueType[]
}


export default function DropdownPicker({
    values
} : DropdownPickerProps) {
    return (
        <NativeSelect>
            {values.map((x : ValueType) => (
                <option value={x.value || x}>{x.displayValue || x}</option>
            ))}
        </NativeSelect>
    )
}