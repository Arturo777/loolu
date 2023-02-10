/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Box, Button, Card, CardContent, CircularProgress, Fade, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Brightness1Icon from '@mui/icons-material/Brightness1';
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

import { getFirstLevel } from 'store/slices/healthContent';
import { useDispatch, useSelector } from 'store';
import TableUpdates from './TableUpdates';

const FirstLevel = () => {
    const [firstLev, setFirstLevel] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const theme = useTheme();
    const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();
    const { firstLevel } = useSelector((state) => state.healthContent);

    const optionsBars = (metric: any) => {
        const newOpt: ApexOptions = {
            ...options,
            // eslint-disable-next-line no-nested-ternary
            colors: metric?.percentage <= 34 ? ['#F44336'] : metric.percentage >= 35 && metric.percentage <= 80 ? ['#f17502'] : ['#02f13a'],
            labels: [metric.description]
        };
        return newOpt;
    };
    /*  const formatearFecha = (fh: string) => {
         let hora = ''
         let fecha = []
         let fechaTotal = ''
         fecha = fh?.split('T')
         hora = fecha[1]
         fechaTotal = `${fecha[0].split('-').reverse().join('/')} ${hora}`
         return fechaTotal
     } */
    useEffect(() => {
        setIsLoading(true)
        dispatch(getFirstLevel());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setFirstLevel(firstLevel);
        setIsLoading(false)
    }, [firstLevel]);

    const blockSX = {
        p: 2.5,
        borderLeft: '1px solid ',
        borderBottom: '1px solid ',
        borderLeftColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200],
        borderBottomColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200]
    };

    return (
        <>
            {isLoading ? (
                <Fade in={isLoading}>
                    <Box component={Typography} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingY: 10 }}>
                        <CircularProgress />
                    </Box>
                </Fade>
            ) : (
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
                                                        Total Images
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
                                                        Total Products
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
                                                        Total Skus
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
                                                        {firstLev?.executionDate}
                                                    </Typography>
                                                    <Typography variant="subtitle1" align="center">
                                                        Last Update
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </MainCard>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container alignItems="flex-start" justifyContent="space-between">
                                    <Grid item xs={4} display="flex" flexDirection="column" justifyContent="space-between" spacing={2}>
                                        {firstLev?.metricRange?.map((metric: any) => (

                                            <Card sx={{ mb: 1 }}>
                                                <CardContent
                                                    sx={{
                                                        padding: '0px !important',
                                                        '& svg': {
                                                            width: 180,
                                                            height: 150
                                                        }
                                                    }}
                                                >
                                                    <Grid container alignItems="center" spacing={0}>
                                                        <Grid item xs={6} sx={{ p: 3 }}>
                                                            <Grid container justifyContent="space-between" direction="column" alignItems="center">
                                                                <Grid item sm={12}>
                                                                    <Typography variant="h3" color="inherit">
                                                                        {metric.typeDescription}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item sm={11}>
                                                                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ my: 1.75, mx: 'auto' }}>
                                                                        <Typography sx={{
                                                                            textAlign: 'center',
                                                                            // eslint-disable-next-line no-nested-ternary
                                                                            color: metric?.percentage <= 34 ? '#F44336' : metric.percentage >= 35 && metric.percentage <= 80 ? '#ffe923' : '#02f13a',
                                                                            '& > svg': {
                                                                                width: 30,
                                                                                height: 30
                                                                            }
                                                                        }}>
                                                                            {
                                                                                // eslint-disable-next-line no-nested-ternary
                                                                                metric?.percentage <= 34 ? <ArrowDownwardIcon /> : metric.percentage >= 35 && metric.percentage <= 80 ? <Brightness1Icon /> : <ArrowUpwardIcon />
                                                                            }
                                                                        </Typography>
                                                                        <Typography variant="h3">{`${metric.percentage.toFixed(2)} %`}</Typography>
                                                                    </Stack>
                                                                </Grid>
                                                                <Grid item sm={12}>
                                                                    <Link to={metric?.typeDescription?.toLowerCase()}><Button variant="outlined">Details</Button></Link>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={4} sx={{ bgcolor: 'light', p: 1 }}>
                                                            <ReactApexChart
                                                                options={optionsBars(metric)}
                                                                series={[metric?.percentage.toFixed(1)]}
                                                                type="radialBar"
                                                                height={170}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </Grid>
                                    <Grid item xs={7.9}>
                                        <Card>
                                            <CardContent >
                                                <Typography gutterBottom variant="h3" component="div" sx={{ pb: 2, pl: 2 }}>
                                                    Ultimas Actualizaciones
                                                </Typography>
                                                <TableUpdates updates={firstLev?.skuCatalog} />
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </>
            )
            }

        </>
    );
};

export default FirstLevel;
