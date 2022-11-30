import React, { useEffect, useState } from 'react';

// mui imports
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Card, Stack, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

// third-party imports
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

// project imports
import { gridSpacing } from 'store/constant';
import { useSelector } from 'store';

// types imports
import { FacetType } from 'types/catalogue';

export default function FacetsListComponent() {
    // hooks
    const theme = useTheme();

    // variables
    const {
        facetsInfo: { facets }
    } = useSelector((state) => state.catalogue);

    return (
        <Box p={gridSpacing}>
            <Grid container spacing={gridSpacing}>
                {facets &&
                    facets.map((item: FacetType) => (
                        <Grid item xs={6} sm={6} md={4} lg={3} key={`facet-card-${item.id}`}>
                            <Card
                                sx={{
                                    p: 3,
                                    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                    border: '1px solid',
                                    borderColor: theme.palette.mode === 'dark' ? 'transparent' : theme.palette.grey[100],
                                    '&:hover': {
                                        border: `1px solid${theme.palette.primary.main}`
                                    }
                                }}
                            >
                                <Stack>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="caption">
                                            <FormattedMessage id="name" />
                                        </Typography>
                                        <Typography variant="h6">{item.name}</Typography>
                                    </Box>

                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="caption">
                                            <FormattedMessage id="name" /> sap
                                        </Typography>
                                        <Typography variant="h6">{item.nameSap}</Typography>
                                    </Box>
                                </Stack>

                                <Grid item xs={12}>
                                    <Grid container spacing={1} justifyContent="flex-end">
                                        <Grid item xs={6}>
                                            <Button
                                                component={Link}
                                                to={`${item.id}/edit`}
                                                variant="outlined"
                                                fullWidth
                                                startIcon={<EditIcon />}
                                            >
                                                Editar
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
}
