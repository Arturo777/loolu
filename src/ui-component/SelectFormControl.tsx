import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SxProps } from '@mui/system';

interface Option {
    value: string;
    label: string;
}

interface SelectFormControlProps {
    label: string;
    value: string;
    onChange: any;
    options: Option[];
    sx?: SxProps;
}

const SelectFormControl: React.FC<SelectFormControlProps> = ({ label, value, onChange, options, sx }) => (
    <FormControl sx={sx}>
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
