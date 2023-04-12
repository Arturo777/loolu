import React, { useEffect, useMemo, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Box, Stack, Typography, Chip, Button, Fade, CircularProgress, Collapse } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { Link } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';

// project imports
import { useDispatch, useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import { getSuppliers, getSuppliersMulticatalogo } from 'store/slices/catalog';

// types

import { SupplierType } from 'types/catalog';
import { MerchantType } from 'types/security';
// assets

// flags
import flagMX from 'assets/images/countries/mx.png';
import flagUS from 'assets/images/countries/us.png';

type ProvidersListProps = {
    filterText: string;
    selectedMerchants: MerchantType[];
};

const ProvidersList = ({ selectedMerchants, filterText }: ProvidersListProps) => {
    // hooks
    const theme = useTheme();
    const dispatch = useDispatch();
    const intl = useIntl();

    // store
    const { suppliers, loading, suppliersMulticatalogo } = useSelector((state) => state.catalogue);

    // vars
    const [filteredSuppliers, setFilteredSuppliers] = useState<SupplierType[]>([]);
    useEffect(() => {
        const merchantId = selectedMerchants[0]?.merchantId;
        console.log({ merchantId });
        dispatch(getSuppliersMulticatalogo(merchantId || 1));
        console.log({ suppliersMulticatalogo });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMerchants]);
    const provider = useMemo(() => {
        if (selectedMerchants.length) {
            const providers = suppliersMulticatalogo.filter((item: any) => item?.idMerchant === selectedMerchants[0]?.merchantId);
            return providers;
        }
        return [];
    }, [suppliersMulticatalogo, selectedMerchants]);
    useEffect(() => {
        if (filterText?.length === 0) {
            if (provider.length > 0) {
                setFilteredSuppliers(provider[0]?.suppliers);
            } else {
                setFilteredSuppliers([]);
            }
        } else {
            const filtered = provider[0].suppliers.filter(
                (profile: SupplierType) =>
                    JSON.stringify(profile)
                        .toLowerCase()
                        .indexOf(filterText?.toLowerCase() ?? '') > -1
            );

            setFilteredSuppliers(filtered);
        }
    }, [filterText, suppliers, selectedMerchants, provider]);

    return (
        <>
            <Collapse in={!loading}>
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
                                                        {intl.formatMessage({ id: 'edit' })}
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                            ))}
                    </Grid>
                </Box>
            </Collapse>

            <Fade in={loading}>
                <Stack justifyContent="center" alignItems="center" p={5} sx={{ width: 1 }}>
                    <CircularProgress />
                </Stack>
            </Fade>
        </>
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
