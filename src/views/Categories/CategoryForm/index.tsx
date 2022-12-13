import React, { FormEvent, useState } from 'react';

// mui imports
import { Grid, TextField, Divider, Button, Box } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

// third party
import { useIntl } from 'react-intl';
import { useSelector } from 'store';

// project imports
import { gridSpacing } from 'store/constant';

type newCategoryForm = {
    name: string;
    title: string;
    description: string;
};

const defaultData: newCategoryForm = {
    name: '',
    title: '',
    description: ''
};

type CategoryFormProps = {
    handleSave: (data: any) => void;
};

export default function CategoryFormComponent({ handleSave }: CategoryFormProps) {
    // hooks
    const intl = useIntl();

    // store
    const { updating } = useSelector((state) => state.catalogue);

    // vars
    const [newData, setNewData] = useState<newCategoryForm>(defaultData);

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
            <Grid item xs={12} sm={6} md={3} lg={3}>
                <TextField
                    value={newData.name}
                    fullWidth
                    label={intl.formatMessage({
                        id: 'supplier_name'
                    })}
                    name="name"
                    onChange={onchangeText}
                    required
                />
            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={3}>
                <TextField
                    value={newData.name}
                    fullWidth
                    label={`${intl.formatMessage({
                        id: 'supplier_name'
                    })} SAP`}
                    name="nameSap"
                    onChange={onchangeText}
                />
            </Grid>
            <Grid item xs={12} pt={4} pl={3}>
                <Divider />
            </Grid>

            <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button disabled={updating} variant="outlined" startIcon={<SaveIcon />} type="submit">
                        Guardar
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
}
