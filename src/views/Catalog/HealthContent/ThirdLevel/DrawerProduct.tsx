/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Box, Drawer, Grid, Typography } from '@mui/material';
import { getThirdLevelFacets, getThirdLevelImages, getThirdLevelProducts } from 'store/slices/healthContent';
import { dispatch, useSelector } from 'store';
import { ThirdLevel } from 'types/health-content';
import SpectsProduct from './SpectsProduct';
import SpectsImages from './SpectsImages';
import SpectsFacets from './SpectsFacets';

const DrawerProduct = ({
    handledClickProduct,
    openModal,
    idProd,
    typeReq
}: {
    handledClickProduct: any;
    openModal: any;
    idProd: number | null;
    typeReq: string;
}) => {
    const [product, setProduct] = useState<ThirdLevel[]>();
    const { thirdLevelProducts } = useSelector((state) => state.healthContent);
    const { thirdLevelImages } = useSelector((state) => state.healthContent);
    const { thirdLevelFacets } = useSelector((state) => state.healthContent);
    useEffect(() => {
        console.log({ idProd });
        if (!idProd) return;
        if (typeReq === 'products') {
            dispatch(getThirdLevelProducts(idProd));
        }
        if (typeReq === 'images') {
            dispatch(getThirdLevelImages(idProd));
        }
        if (typeReq === 'facets') {
            dispatch(getThirdLevelFacets(idProd));
        }
    }, [idProd, typeReq]);

    useEffect(() => {
        if (typeReq === 'products') {
            setProduct(thirdLevelProducts);
        }
        if (typeReq === 'images') {
            setProduct(thirdLevelImages);
        }
        if (typeReq === 'facets') {
            setProduct(thirdLevelFacets);
        }
    }, [thirdLevelFacets, thirdLevelImages, thirdLevelProducts, typeReq]);

    return (
        <>
            {product ? (
                <Drawer anchor="right" open={openModal} onClose={handledClickProduct(false)}>
                    <Box>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="h2" sx={{ paddingLeft: 5, paddingTop: 5 }}>
                                    Information to Complete
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 5, paddingTop: 3 }}>
                                    IdProduct : {idProd}
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                {typeReq === 'products' ? (
                                    <SpectsProduct product={product} />
                                ) : typeReq === 'images' ? (
                                    <SpectsImages product={product} />
                                ) : typeReq === 'facets' ? (
                                    <SpectsFacets product={product} />
                                ) : (
                                    <></>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </Drawer>
            ) : (
                <></>
            )}
        </>
    );
};

export default DrawerProduct;
