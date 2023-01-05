import React, { useState } from 'react';
import { Card, CardHeader, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import FilterIcon from '@mui/icons-material/Filter';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GaugeChart from 'react-gauge-chart';
import MainCard from 'ui-component/cards/MainCard';
import { ApexOptions } from 'apexcharts';
import AccountCircleTwoTone from '@mui/icons-material/AccountCircleTwoTone';
import SideIconCard from 'ui-component/cards/SideIconCard';
import ReactApexChart from 'react-apexcharts';
import { options } from 'widget/Chart/revenue-chart';

const FirstLevel = () => {
    const l = 30;
    const newOpt: ApexOptions = {
        ...options,
        colors: l > 49 ? ['#F44336'] : ['#02f13a'],
        labels: ['HOLA']
    };
    const [first, setfirst] = useState('');
    const theme = useTheme();
    const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

    const blockSX = {
        p: 2.5,
        borderLeft: '1px solid ',
        borderBottom: '1px solid ',
        borderLeftColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200],
        borderBottomColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200]
    };
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <SideIconCard
                        iconPrimary={AccountCircleTwoTone}
                        primary="2,672"
                        secondary="Last week"
                        secondarySub="users"
                        color={theme.palette.success.main}
                    />
                </Grid>
                <Grid item xs={6}>
                    <MainCard
                        content={false}
                        sx={{
                            '& svg': {
                                width: 50,
                                height: 75,
                                color: theme.palette.secondary.main,
                                borderRadius: '14px',
                                p: 1.25,
                                bgcolor: theme.palette.mode === 'dark' ? theme.palette.background.default : 'primary.light'
                            }
                        }}
                    >
                        <Grid container alignItems="center" spacing={0}>
                            <Grid item xs={12} sm={6} sx={blockSX}>
                                <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'center'}>
                                    <Grid item>
                                        <FilterIcon />
                                    </Grid>
                                    <Grid item sm zeroMinWidth>
                                        <Typography variant="h3" align="center">
                                            1000
                                        </Typography>
                                        <Typography variant="subtitle1" align="center">
                                            Imagenes Totales
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={blockSX}>
                                <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'center'}>
                                    <Grid item>
                                        <LocalShippingIcon />
                                    </Grid>
                                    <Grid item sm zeroMinWidth>
                                        <Typography variant="h3" align="center">
                                            600
                                        </Typography>
                                        <Typography variant="subtitle1" align="center">
                                            Productos Totales
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" spacing={0}>
                            <Grid item xs={12} sm={6} sx={blockSX}>
                                <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'center'}>
                                    <Grid item>
                                        <InventoryIcon />
                                    </Grid>
                                    <Grid item sm zeroMinWidth>
                                        <Typography variant="h3" align="center">
                                            3550
                                        </Typography>
                                        <Typography variant="subtitle1" align="center">
                                            SKU Totales
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={blockSX}>
                                <Grid container alignItems="center" spacing={1} justifyContent="space-between">
                                    <Grid item>
                                        <CalendarMonthIcon />
                                    </Grid>
                                    <Grid item sm zeroMinWidth>
                                        <Typography variant="h3" align="center">
                                            100%
                                        </Typography>
                                        <Typography variant="subtitle1" align="center">
                                            Ultima Actualización
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>
                <Grid item xs={12}>
                    <Grid container alignItems="center">
                        <Grid item xs={12} display="flex" justifyContent="space-between" spacing={2}>
                            <Grid item justifyContent="center" xs={3.9}>
                                <Card sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <ReactApexChart options={newOpt} series={[70]} type="radialBar" height={350} />
                                </Card>
                            </Grid>
                            <Grid item justifyContent="center" xs={3.9}>
                                <Card sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <ReactApexChart options={newOpt} series={[70]} type="radialBar" height={350} />
                                </Card>
                            </Grid>
                            <Grid item justifyContent="center" xs={3.9}>
                                <Card sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <ReactApexChart options={newOpt} series={[70]} type="radialBar" height={350} />
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default FirstLevel;
