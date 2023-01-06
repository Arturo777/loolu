/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import FilterIcon from '@mui/icons-material/Filter';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MainCard from 'ui-component/cards/MainCard';
import { ApexOptions } from 'apexcharts';
import AccountCircleTwoTone from '@mui/icons-material/AccountCircleTwoTone';
import SideIconCard from 'ui-component/cards/SideIconCard';
import ReactApexChart from 'react-apexcharts';
import { options } from 'widget/Chart/revenue-chart';

import { getFirstLevel } from 'store/slices/health-content';
import { useDispatch, useSelector } from 'store';

const FirstLevel = () => {
    const [firstLev, setFirstLevel] = useState<any>();
    const theme = useTheme();
    const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();
    const { firstLevel } = useSelector((state) => state.healthContent);

    const optionsBars = (metric: any) => {
        const newOpt: ApexOptions = {
            ...options,
            // eslint-disable-next-line no-nested-ternary
            colors: metric?.percentage <= 34 ? ['#F44336'] : metric.percentage >= 35 && metric.percentage <= 80 ? ['#f17502'] : ['#02f13a'],
            labels: [metric.percentage.toFixed(2).toString()]
        };
        return newOpt;
    };
    useEffect(() => {
        dispatch(getFirstLevel());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setFirstLevel(firstLevel);
    }, [firstLevel]);

    const blockSX = {
        p: 2.5,
        borderLeft: '1px solid ',
        borderBottom: '1px solid ',
        borderLeftColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200],
        borderBottomColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200]
    };
    console.log(firstLev);
    return (
        <>
            {firstLev && (
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <SideIconCard
                            iconPrimary={AccountCircleTwoTone}
                            primary="2,672"
                            secondary="Last week"
                            secondarySub="users"
                            color={
                                // eslint-disable-next-line no-nested-ternary
                                firstLev?.overallScore <= 34
                                    ? theme.palette.secondary.main
                                    : firstLev.overallScore >= 35 && firstLev.overallScore <= 80
                                        ? theme.palette.warning.main
                                        : theme.palette.success.main
                            }
                            metrics={firstLev}
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
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >
                                        <Grid item>
                                            <FilterIcon />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h3" align="center">
                                                {firstLev.totalImages}
                                            </Typography>
                                            <Typography variant="subtitle1" align="center">
                                                Imagenes Totales
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={blockSX}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >
                                        <Grid item>
                                            <LocalShippingIcon />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h3" align="center">
                                                {firstLev.totalProducts}
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
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >
                                        <Grid item>
                                            <InventoryIcon />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h3" align="center">
                                                {firstLev.totalSkus}
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
                                                {firstLev.executionDate}
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
                                {firstLev?.metricRange?.map((metric: any) => (
                                    <Grid item justifyContent="center" xs={3.9}>
                                        <Card sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <CardContent>
                                                <Grid container justifyContent="center">
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {metric?.typeDescription}
                                                    </Typography>
                                                </Grid>
                                                <ReactApexChart
                                                    options={optionsBars(metric)}
                                                    series={[metric.percentage]}
                                                    type="radialBar"
                                                    height={350}
                                                />
                                                <CardActions>
                                                    <Grid container justifyContent="center">
                                                        <Button size="small">Learn More</Button>
                                                    </Grid>
                                                </CardActions>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default FirstLevel;
