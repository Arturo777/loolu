import { useEffect, useState, SyntheticEvent } from 'react';
import { Link, useParams } from 'react-router-dom';

// material-ui
import { Box, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';

// project imports
import ProductImages from './ProductImages';
import ProductInfo from './ProductInfo';
import ProductDescription from './ProductDescription';
import ProductReview from './ProductReview';
import RelatedProducts from './RelatedProducts';
import MainCard from 'ui-component/cards/MainCard';
import FloatingCart from 'ui-component/cards/FloatingCart';
import Chip from 'ui-component/extended/Chip';
import { DefaultRootStateProps, TabsProps } from 'types';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { getProduct, getSku, getCategories } from 'store/slices/product';
import { resetCart } from 'store/slices/cart';

function TabPanel({ children, value, index, ...other }: TabsProps) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`product-details-tabpanel-${index}`}
            aria-labelledby={`product-details-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `product-details-tab-${index}`,
        'aria-controls': `product-details-tabpanel-${index}`
    };
}

const ProductDetails = () => {
    const [valueSku, setValueSku] = useState(0);
    const [active, setActive] = useState(false);
    const [productInfo, setProductInfo] = useState({});
    const { id } = useParams();

    const dispatch = useDispatch();
    const cart = useSelector((state: DefaultRootStateProps) => state.cart);

    // product description tabs
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    /*  useEffect(() => {
         dispatch(getSku(valueSku));
     }, [dispatch, valueSku]); */
    useEffect(() => {
        // getProduct();
        dispatch(getProduct(id));
        dispatch(getCategories());
        // clear cart if complete order
        /*  if (valueSku === 0) setValueSku(product?.skus[0]?.sku?.skuID); */
        if (cart.checkout.step > 2) {
            dispatch(resetCart());
        }
    }, []);

    const { product, skus, categories } = useSelector((state) => state.product);

    return (
        <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
            <Grid item xs={12} lg={10}>
                <MainCard>
                    {product && product?.productID.toString() === id && (
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={6}>
                                <ProductImages skus={skus} valueSku={valueSku} product={product} setActive={setActive} active={active} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ProductInfo
                                    product={product}
                                    setValueSku={setValueSku}
                                    valueSku={valueSku}
                                    setActive={setActive}
                                    active={active}
                                    setProductInfo={setProductInfo}
                                    productInfo={productInfo}
                                    categories={categories}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Tabs
                                    value={value}
                                    indicatorColor="primary"
                                    onChange={handleChange}
                                    sx={{}}
                                    aria-label="product description tabs example"
                                    variant="scrollable"
                                >
                                    <Tab component={Link} to="#" label="Description" {...a11yProps(0)} />
                                    <Tab
                                        component={Link}
                                        to="#"
                                        label={
                                            <Stack direction="row" alignItems="center">
                                                Reviews{' '}
                                                <Chip
                                                    label={String(product.salePrice)}
                                                    size="small"
                                                    chipcolor="secondary"
                                                    sx={{ ml: 1.5 }}
                                                />
                                            </Stack>
                                        }
                                        {...a11yProps(1)}
                                    />
                                </Tabs>
                                <TabPanel value={value} index={0}>
                                    <ProductDescription
                                        product={product}
                                        active={active}
                                        setProductInfo={setProductInfo}
                                        productInfo={productInfo}
                                    />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <ProductReview product={product} />
                                </TabPanel>
                            </Grid>
                        </Grid>
                    )}
                </MainCard>
            </Grid>
            <Grid item xs={12} lg={10} sx={{ mt: 3 }}>
                <Typography variant="h2">Related Products</Typography>
            </Grid>
            <Grid item xs={11} lg={10}>
                <RelatedProducts id={id} />
            </Grid>
            <FloatingCart />
        </Grid>
    );
};

export default ProductDetails;
