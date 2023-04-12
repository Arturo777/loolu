/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Box, Button, Card, CardContent, CircularProgress, Fade, Grid, Stack, Tab, TablePagination, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material';
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
import MultiCatalog from './MultiCatalog';

import MultiMerchant from 'ui-component/MultiMerchantButton';
import { MerchantType } from 'types/security';
import { TabsProps } from '../../../../types/index';
import { HCHealthContent } from '../../../../types/health-content'
import { FormattedMessage } from 'react-intl';

import { gridSpacing } from 'store/constant';

function TabPanel({ children, value, index, ...other }: TabsProps) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <>{children}</>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const FirstLevel = () => {
    const [firstLev, setFirstLevel] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [value, setValue] = React.useState<number>(0);
    const [page, setPage] = React.useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(2);
    const [selectedMerchant, setSelectedMerchant] = React.useState<any>();
    const [multiHealth, setMultiHealth] = React.useState<any>();
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const theme = useTheme();
    const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();
    const { firstLevel, loading } = useSelector((state) => state.healthContent);

    useEffect(() => {
        if(firstLev){
            if(typeof firstLev === 'object' ){
                setMultiHealth([firstLev]); 
                return;
            }
            const filteredMerchants = firstLev?.filter((merchant: any) => 
                selectedMerchant?.some((filter : any) => filter.merchantId === merchant.merchantId)
              );          
            console.log('filtered xd', filteredMerchants)
            setMultiHealth(filteredMerchants)
        }
    }, [selectedMerchant, firstLev])
    

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
        setFirstLevel(firstLevel);
        setIsLoading(false)
    }, [firstLevel]);
    
    useEffect(() => {
        setIsLoading(true)
        dispatch(getFirstLevel());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    


    const blockSX = {
        p: 2.5,
        pt: 0,
        borderLeft: '1px solid ',
        borderBottom: '1px solid ',
        borderLeftColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200],
        borderBottomColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200]
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        if (event?.target.value) setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
      };

    return (
        <>
            <MainCard
                sx={{
                    overflow: 'initial'
                }}
                title={
                    <Grid container alignItems="center" justifyContent="start" spacing={gridSpacing}>
                        <Grid item display="flex" alignItems="center">
                            <Typography variant="h3" sx={{ mr: 1 }}> <FormattedMessage id='health-content' /> </Typography>
                            { value === 1 &&(
                                <MultiMerchant
                                    // justOne
                                    // readOnly
                                    onChange={(merchants) => {
                                        setSelectedMerchant(merchants)
                                    }}
                                    maxShow={3}
                                    blockDefaults={false}
                                    // defaultSelected={[]}
                                    defaultSelected={[
                                        {
                                            name: 'Vinneren',
                                            merchantId: 1,
                                            isFather: false
                                        },
                                        {
                                            name: 'Elektra',
                                            merchantId: 2,
                                            isFather: false
                                        }
                                    ]}
                                />
                            ) }

                            { value === 0 &&(
                                <MultiMerchant
                                    justOne
                                    onChange={(merchants) => {
                                        setSelectedMerchant(merchants)
                                    }}
                                    maxShow={3}
                                    blockDefaults={false}
                                    defaultSelected={[]}
                                />
                            ) }
                        </Grid>
                        <Grid item xs={12}>
                            <Tabs
                                value={value}
                                variant="scrollable"
                                onChange={handleChange}
                                textColor="secondary"
                                indicatorColor="secondary"
                                sx={{
                                    mb: 3,
                                    '& a': {
                                        minHeight: 'auto',
                                        minWidth: 10,
                                        py: 1.5,
                                        px: 1,
                                        mr: 2.2,
                                        color: theme.palette.grey[600],
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    },
                                    '& a.Mui-selected': {
                                        color: theme.palette.primary.main
                                    },
                                    '& a > svg': {
                                        mb: '0px !important',
                                        mr: 1.1
                                    }
                                }}
                            >
                                <Tab component={Link} to="#" label={<FormattedMessage id="general" />} {...a11yProps(0)} />
                                <Tab component={Link} to="#" label={<FormattedMessage id="multi-catalogue" />} {...a11yProps(1)} />
                            </Tabs>
                        </Grid>
                    </Grid>
                }
                content={false}
            >

                {isLoading ? (
                    <Fade in={isLoading}>
                        <Box component={Typography} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingY: 10 }}>
                            <CircularProgress />
                        </Box>
                    </Fade>
                ) : (
                    <>
                        {multiHealth && 
                        multiHealth.map((first:any) => 
                        ( 
                            <>
                                <Box sx={{m: 2}}>
                                    <TabPanel value={value} index={0}>
                                        <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <SideIconCard
                                                        iconPrimary={AccountCircleTwoTone}
                                                        primary="2,672"
                                                        secondary="Last week"
                                                        secondarySub="users"
                                                        color={
                                                            // eslint-disable-next-line no-nested-ternary
                                                            first?.overallScore <= 34
                                                                ? theme.palette.secondary.main
                                                                : first.overallScore >= 35 && first.overallScore <= 80
                                                                    ? theme.palette.warning.main
                                                                    : theme.palette.success.main
                                                        }
                                                        metrics={first}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} >
                                                    <MainCard
                                                        content={false}
                                                        sx={{
                                                            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                                            border: '1px solid',
                                                            borderColor: theme.palette.mode === 'dark' ? 'transparent' : theme.palette.grey[100],
                                                            '&:hover': {
                                                                border: `1px solid${theme.palette.primary.main}`
                                                            },
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
                                                            <Grid item xs={12} sm={6} sx={{...blockSX, pt: 2.5}}>
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
                                                                            {first.totalImages}
                                                                        </Typography>
                                                                        <Typography variant="subtitle1" align="center">
                                                                            <FormattedMessage id='total-images'/>
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} sx={{...blockSX, pt: 2.5}}>
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
                                                                            {first.totalProducts}
                                                                        </Typography>
                                                                        <Typography variant="subtitle1" align="center">
                                                                            <FormattedMessage id='total-products'/>
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container alignItems="center" spacing={0}>
                                                            <Grid item xs={12} sm={6} sx={{...blockSX, pt: 2.5}}>
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
                                                                            {first.totalSkus}
                                                                        </Typography>
                                                                        <Typography variant="subtitle1" align="center">
                                                                            <FormattedMessage id='total-skus'/>
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} sx={{...blockSX, pt: 2.5}}>
                                                                <Grid container alignItems="center" spacing={1} justifyContent="space-between">
                                                                    <Grid item>
                                                                        <CalendarMonthIcon />
                                                                    </Grid>
                                                                    <Grid item sm zeroMinWidth>
                                                                        <Typography variant="h3" align="center">
                                                                            {first?.executionDate}
                                                                        </Typography>
                                                                        <Typography variant="subtitle1" align="center">
                                                                            <FormattedMessage id='last-update'/>
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </MainCard>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container alignItems="flex-start" justifyContent="space-between">
                                                        <Grid item xs={4} display="flex" flexDirection="column" justifyContent="space-between">
                                                            {first?.metricRange?.map((metric: any, i: number) => (

                                                                <MainCard key={i} sx={{
                                                                    mb: 1,
                                                                    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                                                    border: '1px solid',
                                                                    borderColor: theme.palette.mode === 'dark' ? 'transparent' : theme.palette.grey[100],
                                                                    '&:hover': {
                                                                        border: `1px solid${theme.palette.primary.main}`
                                                                    }
                                                                }}>
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
                                                                                        <Link to={metric?.typeDescription?.toLowerCase()}><Button variant="outlined"> <FormattedMessage id='details'/> </Button></Link>
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
                                                                </MainCard>
                                                            ))}
                                                        </Grid>
                                                        <Grid item xs={7.9}>
                                                            <MainCard sx={{
                                                                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                                                border: '1px solid',
                                                                borderColor: theme.palette.mode === 'dark' ? 'transparent' : theme.palette.grey[100],
                                                                '&:hover': {
                                                                    border: `1px solid${theme.palette.primary.main}`
                                                                }
                                                            }}>
                                                                <CardContent >
                                                                    <Typography gutterBottom variant="h3" component="div" sx={{ pb: 2, pl: 2 }}>
                                                                        <FormattedMessage id='latest-updates' />
                                                                    </Typography>
                                                                    <TableUpdates updates={first?.skuCatalog} />
                                                                </CardContent>
                                                            </MainCard>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                    </TabPanel>
                                </Box>
                                <TabPanel value={value} index={1}>
                                    <Grid container sx={{mb: 2, pt: 0}}>
                                        {multiHealth
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((merchant : any) => (
                                                <Grid item xs={12} sm={6} sx={blockSX} key={merchant.merchantId}>
                                                    <MultiCatalog merchant={merchant}/> 
                                                </Grid>
                                            ))}
                                    </Grid>
                                    <TablePagination
                                        rowsPerPageOptions={[2, 4]}
                                        component="div"
                                        count={firstLev?.length ?? 1}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </TabPanel>
                            
                        </>
                        )
                        )}

                    </>
                )
                }

            </MainCard>
        </>

    );
};

export default FirstLevel;
