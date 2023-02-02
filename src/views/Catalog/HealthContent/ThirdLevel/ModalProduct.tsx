import React, { useEffect, useState } from 'react';
import { Drawer } from '@mui/material';
import { getThirdLevelProducts } from 'store/slices/healthContent';
import { dispatch, useSelector } from 'store';

const ModalProducts = ({ productId, handledClickProduct, openModal }: { productId: number; handledClickProduct: any; openModal: any }) => {
    const [product, setProduct] = useState({});
    const { thirdLevelProducts } = useSelector((state) => state.healthContent);
    useEffect(() => {
        if (productId !== 0) {
            dispatch(getThirdLevelProducts(productId));
            setProduct(thirdLevelProducts);
        }
    }, [productId, thirdLevelProducts]);

    return (
        <>
            <Drawer anchor="right" open={openModal.right} onClose={handledClickProduct('right', false)}>
                {product}
            </Drawer>
        </>
    );
};

export default ModalProducts;
