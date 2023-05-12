import React from 'react';

// mui imports
import { Grid, TextField } from '@mui/material';

// third-party imports
import { useIntl } from 'react-intl';
import { AdditionalFieldType } from 'types/catalog';

const FormFieldComponent = ({
    data,
    handleChange
}: {
    data: AdditionalFieldToEditType;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    // hooks
    const intl = useIntl();

    return (
        <>
            <Grid item xs={12} md={6}>
                <TextField
                    value={data.field}
                    name="field"
                    fullWidth
                    size="small"
                    label={intl.formatMessage({
                        id: 'key'
                    })}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    value={data.value}
                    name="value"
                    fullWidth
                    size="small"
                    label={intl.formatMessage({
                        id: 'value'
                    })}
                    onChange={handleChange}
                />
            </Grid>
        </>
    );
};

export default FormFieldComponent;

export type AdditionalFieldToEditType = Omit<AdditionalFieldType, 'id'>;
