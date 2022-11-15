import React from 'react';

// material-ui
import { Grid, TextField, Divider, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

// project imports
import { gridSpacing } from 'store/constant';
import { Box } from '@mui/system';
import { useIntl } from 'react-intl';

export default function ProfileForm() {
    const intl = useIntl();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, value);
    };

    const handleSubmit = () => {};

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <TextField
                        fullWidth
                        label={intl.formatMessage({
                            id: 'type'
                        })}
                        name="type"
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <TextField
                        fullWidth
                        label={intl.formatMessage({
                            id: 'description'
                        })}
                        name="description"
                        onChange={handleChange}
                    />
                </Grid>

                {/* <Grid item xs={12} sm={6} md={3} lg={2}>
                    <TextField fullWidth label="Teléfono" value={user?.phoneNumber ?? ''} name="phoneNumber" onChange={handleChange} />
                </Grid> */}

                <Grid item xs={12} pt={4} pl={3}>
                    <Divider />
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button disabled={false} variant="outlined" startIcon={<SaveIcon />} type="submit">
                            Guardar
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
}
