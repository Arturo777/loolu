import React from 'react';

import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent,
    Switch,
    TextField
} from '@mui/material';

export type AddOptionsProps<T, U, K extends string> = U extends Record<K, any> ? T & U : T & { [P in K]?: never };

export enum InputType {
    textField = 'textField',
    textarea = 'textarea',
    radio = 'radio',
    checkbox = 'checkbox',
    switch = 'switch',
    select = 'select'
}

export type SelectOptionType = {
    label: string;
    value: string | number;
};

type RenderInputComponentProps = {
    type: InputType;
    label: string;
    value: any;
    updateValue: (e: any) => void;
    options?: null | SelectOptionType[];
};

const RenderInputComponent = ({ label, value, updateValue, type, options }: RenderInputComponentProps) => {
    if (type === InputType.select && !options) {
        throw new Error(
            '"options" property is required when "type" is set to "InputType.select". Please provide the "options" property to continue.'
        );
    }

    if (type === InputType.textField) {
        return (
            <TextField
                label={label}
                fullWidth
                value={value}
                onChange={(e) => {
                    updateValue(e.target.value);
                }}
            />
        );
    }

    if (type === InputType.textarea) {
        return (
            <TextField
                multiline
                label={label}
                rows={4}
                fullWidth
                value={value}
                onChange={(e) => {
                    updateValue(e.target.value);
                }}
            />
        );
    }

    if (type === InputType.switch) {
        return (
            <FormControlLabel
                checked={value}
                control={
                    <Switch
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            updateValue(e.target.checked);
                        }}
                    />
                }
                label={label}
            />
        );
    }

    if (type === InputType.select) {
        return (
            <FormControl fullWidth>
                <InputLabel id="form-drawer-select-label">{label}</InputLabel>
                <Select
                    labelId="form-drawer-select-label"
                    id="demo-simple-select"
                    value={value?.toString() ?? ''}
                    label={label}
                    onChange={(event: SelectChangeEvent) => {
                        // setAge(event.target.value as string);
                        updateValue(event.target.value);
                    }}
                >
                    {options?.map((item) => (
                        <MenuItem key={`form-drawer-option-${item.label}-${item.value}`} value={item.value}>
                            {item.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }

    if (type === InputType.checkbox) {
        return <FormControlLabel value={value} label={label} control={<Checkbox checked={value} />} />;
    }

    if (type === InputType.radio) {
        return (
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
                <RadioGroup
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        updateValue((event.target as HTMLInputElement).value);
                    }}
                    value={value}
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                >
                    <Grid container>
                        {options?.map((item) => (
                            <Grid item xs={12} sm={6} key={`form-drawer-radio-${item.label}-${item.value}`}>
                                <FormControlLabel value={item.value} control={<Radio />} label={item.label} />
                            </Grid>
                        ))}
                    </Grid>
                </RadioGroup>
            </FormControl>
        );
    }

    return <Box />;
};

export default RenderInputComponent;

// type BaseRenderInputComponentProps<T> = {
//     type: T;
//     label: string;
//     options?: null | SelectOptionType[];
// };

// type TextFieldProps = BaseRenderInputComponentProps<InputType.textField> & {
//     value: string;
//     updateValue: (value: string) => void;
// };

// type TextAreaProps = BaseRenderInputComponentProps<InputType.textarea> & {
//     value: string;
//     updateValue: (value: string) => void;
// };

// type RadioProps = BaseRenderInputComponentProps<InputType.radio> & {
//     value: string;
//     updateValue: (value: string) => void;
// };

// type CheckboxProps = BaseRenderInputComponentProps<InputType.checkbox> & {
//     value: boolean;
//     updateValue: (value: boolean) => void;
// };

// type SwitchProps = BaseRenderInputComponentProps<InputType.switch> & {
//     value: boolean;
//     updateValue: (value: boolean) => void;
// };

// type SelectProps = BaseRenderInputComponentProps<InputType.select> & {
//     value: string | number;
//     updateValue: (value: string | number) => void;
// };

// type RenderInputComponentProps = TextFieldProps | TextAreaProps | RadioProps | CheckboxProps | SwitchProps | SelectProps;
