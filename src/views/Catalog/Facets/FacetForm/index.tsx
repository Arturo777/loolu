import React, { FormEvent, useEffect, useState } from 'react';

// mui imports
import { Grid, TextField, Divider, Button, Box, useTheme } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

// third-party imports
import { useIntl } from 'react-intl';

// project imports
import { gridSpacing } from 'store/constant';
import { useSelector } from 'store';

// types
import { FacetType } from 'types/catalog';

type newFacetType = {
    name: string;
    nameSap: string;
};

const defaultData: newFacetType = {
    name: '',
    nameSap: ''
};

type FacetFormProps = {
    handleSave: (data: any) => void;
    handleCancel: () => void;
    editingData?: FacetType;
};

export default function FacetFormComponent({ handleSave, handleCancel, editingData }: FacetFormProps) {
    // hooks
    const intl = useIntl();
    const theme = useTheme();

    // store
    const { updating } = useSelector((state) => state.catalogue);

    // vars
    const [newData, setNewData] = useState<newFacetType>(defaultData);

    useEffect(() => {
        if (editingData) {
            setNewData({
                name: editingData.name,
                nameSap: editingData.nameSap ?? ''
            });
        }
    }, [editingData]);

    const onchangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setNewData({ ...newData, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        handleSave(newData);
    };

    return (
        <Grid container component="form" spacing={gridSpacing} onSubmit={handleSubmit}>
            <Grid item xs={12} sm={6} md={6} lg={4}>
                <TextField
                    value={newData.name}
                    fullWidth
                    label={intl.formatMessage({
                        id: 'facet_name'
                    })}
                    name="name"
                    onChange={onchangeText}
                    required
                />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={4}>
                <TextField
                    value={newData.nameSap}
                    fullWidth
                    label={intl.formatMessage({
                        id: 'facet_sap_name'
                    })}
                    name="nameSap"
                    onChange={onchangeText}
                />
            </Grid>
            <Grid item xs={12} pt={4} pl={3}>
                <Divider />
            </Grid>

            <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        onClick={handleCancel}
                        disabled={updating}
                        variant="outlined"
                        color="error"
                        sx={{ mr: 2 }}
                        startIcon={<CloseIcon />}
                    >
                        {intl.formatMessage({ id: 'cancel' })}
                    </Button>
                    <Button disabled={updating} variant="outlined" startIcon={<SaveIcon />} type="submit">
                        {intl.formatMessage({ id: 'save' })}
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
}
