import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, CircularProgress, Fade, Grid, Typography } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { getSecondLevelImages } from 'store/slices/healthContent';
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

const Images = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [secondLevel, setSecondLevel] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [typeScore, setTypeScore] = useState('');
    const [products, setProducts] = useState([]);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { secondLevelImages } = useSelector((state: DefaultRootStateProps) => state.healthContent);

    useEffect(() => {
        setIsLoading(true);
        dispatch(getSecondLevelImages());
    }, [dispatch]);

    useEffect(() => {
        setSecondLevel(secondLevelImages);
        setIsLoading(false);
    }, [secondLevelImages]);
    useEffect(() => {
        setIsLoading(true);
        if (typeScore === 'Good') {
            setProducts(secondLevel?.metricGood);
            setIsLoading(false);
        } else if (typeScore === 'Fair') {
            setProducts(secondLevel?.metricFair);
            setIsLoading(false);
        } else if (typeScore === 'Poor') {
            setProducts(secondLevel?.metricPoor);
            setIsLoading(false);
        } else {
            setProducts(secondLevel?.metricGood);
            setIsLoading(false);
        }
    }, [secondLevel?.metricFair, secondLevel?.metricGood, secondLevel?.metricPoor, typeScore]);

    const sumaValores = () => {
        let suma = 0;
        suma = secondLevel.resume[0].totalProducts + secondLevel.resume[1].totalProducts + secondLevel.resume[2].totalProducts;
        return suma;
    };
    console.log(typeScore);
    return (
        <MainCard>
            <Grid item>
                <Avatar
                    sx={{
                        cursor: 'pointer',
                        ...theme.typography.smallAvatar,
                        backgroundColor: theme.palette.secondary[400],
                        color: theme.palette.secondary.dark,
                        mb: 2,
                        transform: 'scale(1.5)'
                    }}
                >
                    <Link to="/health-content/overall-score">
                        <ArrowBackIcon fontSize="inherit" />
                    </Link>
                </Avatar>
            </Grid>
            <CardWrapper
                border={false}
                content={false}
                sx={{
                    mb: 2,
                    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'dark' ? 'transparent' : theme.palette.grey[100],
                    '&:hover': {
                        border: `1px solid${theme.palette.primary.main}`
                    }
                }}
            >
                <Box sx={{ p: 2.25 }}>
                    <Grid container direction="column">
                        <Grid item>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                        Images
                                    </Typography>
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
                            {secondLevel?.resume?.map((resume: ResumenProducts) => (
                                <Grid item xs={3}>
                                    <CardRatings resume={resume} sumaValores={sumaValores} setTypeScore={setTypeScore} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={8.5}>
                        {products?.length === 0 ? (
                            <Typography variant="h3">No Images to show</Typography>
                        ) : (
                            <TableProducts products={products} typeReq="images" />
                        )}
                    </Grid>
                </Grid>
            )}
        </MainCard>
    );
};

export default Images;
