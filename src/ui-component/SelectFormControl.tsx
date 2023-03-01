import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface Option {
    value: string;
    label: string;
}

interface SelectFormControlProps {
    label: string;
    value: string;
    onChange: any;
    options: Option[];
}

const SelectFormControl: React.FC<SelectFormControlProps> = ({ label, value, onChange, options }) => (
    <FormControl>
        <InputLabel>{label}</InputLabel>
        <Select value={value} onChange={onChange}>
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);
export default SelectFormControl;
