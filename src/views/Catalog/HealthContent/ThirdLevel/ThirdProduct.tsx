import React, { useEffect, useState } from 'react';
import { Box, Drawer, Grid, Button, Typography } from '@mui/material';
import { getThirdLevelProducts } from 'store/slices/healthContent';
import { dispatch, useSelector } from 'store';
import { ThirdLevel } from 'types/health-content';
import SpectsProduct from './SpectsProduct';

const DrawerProduct = ({ handledClickProduct, openModal, idProd }: { handledClickProduct: any; openModal: any; idProd: number | null }) => {
    const [product, setProduct] = useState<any>();
    const { thirdLevelProducts } = useSelector((state) => state.healthContent);
    useEffect(() => {
        if (idProd !== null) {
            dispatch(getThirdLevelProducts(idProd));
            setProduct(thirdLevelProducts);
        }
    }, [idProd]);
    console.log(product);
    return (
        <>
            {product ? (
                <Drawer anchor="right" open={openModal} onClose={handledClickProduct(false, null)}>
                    <Box>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="h2" sx={{ paddingLeft: 5, paddingTop: 5 }}>
                                    Información por Completar
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>Id Producto : {product?.productId}</Box>
                            </Grid>
                            <Grid item xs={12}>
                                <SpectsProduct product={product} />
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

const ThirdProducts = ({ productId }: { productId: number | null }) => {
    const [openModal, setOpenModal] = useState(false);
    const [idProd, setIdProd] = useState<number | null>(null);
    const handledClickProduct = (open: boolean, prod: number | null) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (prod !== null) {
            setOpenModal(open);
            setIdProd(prod);
        }
    };

    return (
        <>
            <Button variant="contained" color="secondary" onClick={handledClickProduct(true, productId)}>
                Ver más
            </Button>
            <DrawerProduct handledClickProduct={() => handledClickProduct(false, null)} openModal={openModal} idProd={idProd} />
        </>
    );
};

export default ThirdProducts;
