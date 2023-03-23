import React, { useEffect, useState } from 'react';

import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, CircularProgress, Fade, Grid, Typography } from '@mui/material';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { getSecondLevelProducts } from 'store/slices/healthContent';
import { DefaultRootStateProps } from 'types';
import { ResumenProducts } from 'types/health-content';
import CardRatings from './CardRatings';
import TableProducts from '../TableProducts';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.secondary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background:
            theme.palette.mode === 'dark'
                ? `linear-gradient(210.04deg, ${theme.palette.secondary.dark} -50.94%, rgba(144, 202, 249, 0) 95.49%)`
                : theme.palette.secondary[800],
        borderRadius: '50%',
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background:
            theme.palette.mode === 'dark'
                ? `linear-gradient(140.9deg, ${theme.palette.secondary.dark} -14.02%, rgba(144, 202, 249, 0) 85.50%)`
                : theme.palette.secondary[800],
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

const Products = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [secondLevel, setSecondLevel] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [typeScore, setTypeScore] = useState('');
    const [products, setProducts] = useState([]);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    // const { secondLevelProducts } = useSelector((state: DefaultRootStateProps) => state.healthContent);

    const secondLevelProducts = {
        metricsGood: [
            {
                productId: 1,
                completeness: 84,
                metricConfigRangeId: 1,
                categoryId: 11502005,
                categoryName: 'Health & Beauty',
                productName: 'Speed Stick Regular Deodorant',
                eanUpc: ['23022021', '2302202301'],
                productReferenceCode: 'SPD02',
                brandName: 'Speed Stick',
                __typename: 'metricsGoodProducts'
            },
            {
                productId: 3,
                completeness: 84,
                metricConfigRangeId: 1,
                categoryId: 11502005,
                categoryName: 'Health & Beauty',
                productName: 'Dove Nourishing Secrets Shampoo and Conditioner Coconut & Hydration',
                eanUpc: ['200223230101'],
                productReferenceCode: 'PDD0101',
                brandName: 'Dove',
                __typename: 'metricsGoodProducts'
            },
            {
                productId: 4,
                completeness: 84,
                metricConfigRangeId: 1,
                categoryId: 11502006,
                categoryName: 'Health & Beauty',
                productName: 'OGX Thick & Full + Biotin & Collagen Conditioner',
                eanUpc: ['24022023010'],
                productReferenceCode: 'OGX001',
                brandName: 'Dove',
                __typename: 'metricsGoodProducts'
            },
            {
                productId: 5,
                completeness: 84,
                metricConfigRangeId: 1,
                categoryId: 11502006,
                categoryName: 'Health & Beauty',
                productName: 'Garnier Fructis Sleek & Shine Smoothing Shampoo',
                eanUpc: ['24022023338'],
                productReferenceCode: 'GFSS0001',
                brandName: 'Speed Stick',
                __typename: 'metricsGoodProducts'
            }
        ],
        metricsPoor: [],
        metricsFair: [],
        resumeProducts: [
            {
                metricConfigRangeId: 1,
                description: 'Good',
                productReferenceCodeScorePercentage: 100,
                pageTitleScorePercentage: 100,
                brandNameScorePercentage: 100,
                categoryScorePercentage: 100,
                textLinkScorePercentage: 100,
                skuReferenceCodeScorePercentage: 100,
                eanUpcScorePercentage: 100,
                dimensionHeightScorePercentage: 0,
                dimensionWidthScorePercentage: 0,
                dimensionLargeScorePercentage: 0,
                dimensionWeightScorePercentage: 0,
                totalProducts: 4,
                totalProductsPercentage: 100,
                totalScore: 84,
                __typename: 'resumeProducts'
            },
            {
                metricConfigRangeId: 3,
                description: 'Poor',
                productReferenceCodeScorePercentage: 0,
                pageTitleScorePercentage: 0,
                brandNameScorePercentage: 0,
                categoryScorePercentage: 0,
                textLinkScorePercentage: 0,
                skuReferenceCodeScorePercentage: 0,
                eanUpcScorePercentage: 0,
                dimensionHeightScorePercentage: 0,
                dimensionWidthScorePercentage: 0,
                dimensionLargeScorePercentage: 0,
                dimensionWeightScorePercentage: 0,
                totalProducts: 0,
                totalProductsPercentage: 0,
                totalScore: 0,
                __typename: 'resumeProducts'
            },
            {
                metricConfigRangeId: 2,
                description: 'Fair',
                productReferenceCodeScorePercentage: 0,
                pageTitleScorePercentage: 0,
                brandNameScorePercentage: 0,
                categoryScorePercentage: 0,
                textLinkScorePercentage: 0,
                skuReferenceCodeScorePercentage: 0,
                eanUpcScorePercentage: 0,
                dimensionHeightScorePercentage: 0,
                dimensionWidthScorePercentage: 0,
                dimensionLargeScorePercentage: 0,
                dimensionWeightScorePercentage: 0,
                totalProducts: 0,
                totalProductsPercentage: 0,
                totalScore: 0,
                __typename: 'resumeProducts'
            }
        ],
        __typename: 'dashboardProducts'
    };

    useEffect(() => {
        setIsLoading(true);
        dispatch(getSecondLevelProducts());
    }, [dispatch]);

    useEffect(() => {
        setSecondLevel(secondLevelProducts);
        setIsLoading(false);
    }, [secondLevelProducts]);
    useEffect(() => {
        setIsLoading(true);
        if (typeScore === 'Good') {
            setProducts(secondLevel?.metricsGood);
            setIsLoading(false);
        } else if (typeScore === 'Fair') {
            setProducts(secondLevel?.metricsFair);
            setIsLoading(false);
        } else if (typeScore === 'Poor') {
            setProducts(secondLevel?.metricsPoor);
            setIsLoading(false);
        } else {
            setProducts(secondLevel?.metricsGood);
            setIsLoading(false);
        }
    }, [secondLevel?.metricsFair, secondLevel?.metricsGood, secondLevel?.metricsPoor, typeScore]);

    const sumaValores = () => {
        let suma = 0;
        suma =
            secondLevel.resumeProducts[0].totalProducts +
            secondLevel.resumeProducts[1].totalProducts +
            secondLevel.resumeProducts[2].totalProducts;
        return suma;
    };
    return (
        <>
            <CardWrapper border={false} content={false} sx={{ mb: 2 }}>
                <Box sx={{ p: 2.25 }}>
                    <Grid container direction="column">
                        <Grid item>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                        Products
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Avatar
                                        sx={{
                                            cursor: 'pointer',
                                            ...theme.typography.smallAvatar,
                                            backgroundColor: theme.palette.secondary[400],
                                            color: theme.palette.secondary.dark
                                        }}
                                    >
                                        <ArrowUpwardIcon fontSize="inherit" />
                                    </Avatar>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sx={{ mb: 1.25 }}>
                            <Typography
                                sx={{
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : theme.palette.secondary[200]
                                }}
                            >
                                Total
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </CardWrapper>
            {isLoading ? (
                <Fade in={isLoading}>
                    <Box component={Typography} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingY: 10 }}>
                        <CircularProgress />
                    </Box>
                </Fade>
            ) : (
                <Grid container direction="row" xs={12}>
                    <Grid item xs={3.5}>
                        <Grid container direction="column" spacing={1} xs={12}>
                            {secondLevel?.resumeProducts?.map((resume: ResumenProducts) => (
                                <Grid item xs={3}>
                                    <CardRatings resume={resume} sumaValores={sumaValores} setTypeScore={setTypeScore} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={8.5}>
                        {products?.length === 0 ? (
                            <Typography variant="h3">No Have Products</Typography>
                        ) : (
                            <TableProducts products={products} typeReq="products" />
                        )}
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default Products;
