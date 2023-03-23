import React from 'react';

import { Box, Divider, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';

export enum InputType {
    textField = 'textField',
    textarea = 'textarea',
    radio = 'radio',
    checkbox = 'checkbox',
    switch = 'switch'
}

const RenderInputComponent = ({
    label,
    value,
    updateValue,
    type
}: {
    type: InputType;
    label: string;
    value: any;
    updateValue: (e: any) => void;
}) => {
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

    return <Box />;
};

export default RenderInputComponent;
