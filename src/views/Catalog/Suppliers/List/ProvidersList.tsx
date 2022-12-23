import React, { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Box, Stack, Typography, Chip, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

// project imports
import { useDispatch, useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import { getSuppliers } from 'store/slices/catalog';

// types

import { SupplierType } from 'types/catalog';
// assets

// flags
import flagMX from 'assets/images/countries/mx.png';
import flagUS from 'assets/images/countries/us.png';

type ProvidersListProps = {
    filterText: string;
};

const ProvidersList = ({ filterText }: ProvidersListProps) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [filteredSuppliers, setFilteredSuppliers] = useState<SupplierType[]>([]);
    const { suppliers } = useSelector((state) => state.catalogue);

    useEffect(() => {
        dispatch(getSuppliers());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (filterText?.length === 0) {
            setFilteredSuppliers(suppliers);
        } else {
            const filtered = suppliers.filter(
                (profile: SupplierType) =>
                    JSON.stringify(profile)
                        .toLowerCase()
                        .indexOf(filterText?.toLowerCase() ?? '') > -1
            );

            setFilteredSuppliers(filtered);
        }
    }, [filterText, suppliers]);

    return (
        <Box p={gridSpacing}>
            <Grid container spacing={gridSpacing}>
                {filteredSuppliers &&
                    filteredSuppliers.map((item: SupplierType) => (
                        <Grid item xs={6} sm={6} md={4} lg={3} key={`profile-card-${item.idProvider}`}>
                            <Card
                                key={`card-profile-${item.idProvider}`}
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
                                <CountryBall country={item.countryId} />

                                <Stack direction="row" spacing={1} justifyContent="space-between">
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="caption">
                                            <FormattedMessage id="name" />
                                        </Typography>
                                        <Typography variant="h6">{item.name}</Typography>
                                    </Box>
                                    <Chip
                                        label={item.countryId}
                                        size="small"
                                        // color={item.idStatus ? 'success' : 'error'}
                                        sx={{
                                            bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : 'success.light',
                                            color: 'success.dark'
                                        }}
                                    />
                                </Stack>

                                <Grid item xs={12}>
                                    <Grid container spacing={1} justifyContent="flex-end">
                                        <Grid item xs={6}>
                                            <Button
                                                component={Link}
                                                to={`${item.idProvider}/edit`}
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
};

export default ProvidersList;

type CountryBallProps = {
    country: string;
};

const CountryBall = ({ country }: CountryBallProps) => (
    <Box
        component="img"
        alt={country}
        src={flagsImg[country]}
        sx={{
            width: 50,
            height: 50,
            borderRadius: '50%'
        }}
    />
);

const flagsImg: { [key: string]: any } = {
    MX: flagMX,
    US: flagUS
};
