import React, { useState } from 'react';

// material-ui
import { Grid, Typography, Card, TextField, IconButton, Button, SxProps } from '@mui/material';
import { Theme } from '@mui/system';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';

// third-party imports
import { useIntl } from 'react-intl';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

export default function TestAdditionalFields() {
    // hooks

    // consts
    const [showNew, setShowNew] = useState<boolean>(false);

    return (
        <MainCard
            sx={{
                overflow: 'initial'
            }}
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">FACETS</Typography>
                    </Grid>
                </Grid>
            }
        >
            <Grid
                container
                sx={{
                    maxWidth: {
                        xs: '100%',
                        md: 600
                    }
                }}
            >
                <Card elevation={2} sx={{ p: 2 }}>
                    <NewFieldComponent sx={{ mb: 3 }} />
                    <AdditionalFieldComponent sx={{ mb: 3 }} />
                    <AdditionalFieldComponent />
                </Card>
            </Grid>
        </MainCard>
    );
}

const NewFieldComponent = ({ sx }: { sx?: SxProps<Theme> | undefined }) => {
    // hooks
    const intl = useIntl();

    return (
        <Grid item xs={12} sx={sx}>
            <Grid container>
                <Grid item xs={4} sx={{ pr: 1 }}>
                    <TextField
                        size="small"
                        label={intl.formatMessage({
                            id: 'key'
                        })}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        size="small"
                        label={intl.formatMessage({
                            id: 'value'
                        })}
                    />
                </Grid>
                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Button variant="outlined" startIcon={<AddIcon />}>
                        {intl.formatMessage({
                            id: 'add'
                        })}
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

const AdditionalFieldComponent = ({ sx }: { sx?: SxProps<Theme> | undefined }) => {
    // hooks
    const intl = useIntl();

    return (
        <Grid item xs={12} sx={sx}>
            <Grid container>
                <Grid item xs={4} sx={{ pr: 1 }}>
                    <TextField
                        size="small"
                        label={intl.formatMessage({
                            id: 'key'
                        })}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        size="small"
                        label={intl.formatMessage({
                            id: 'value'
                        })}
                    />
                </Grid>
                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <IconButton
                        // variant="outlined"
                        title={intl.formatMessage({
                            id: 'delete'
                        })}
                        color="error"
                        sx={{
                            mr: 1,
                            opacity: 0.5,
                            transition: 'all 420ms linear',
                            '&:hover': {
                                opacity: 1,
                                transition: 'all 420ms linear'
                            }
                        }}
                    >
                        <DeleteForeverIcon />
                    </IconButton>
                    <Button variant="outlined" startIcon={<SaveIcon />}>
                        {intl.formatMessage({
                            id: 'save'
                        })}
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};
