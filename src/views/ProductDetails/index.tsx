import { useEffect, useState, SyntheticEvent, FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';

// material-ui
import { Box, Grid, Stack, Tab, Tabs, Typography, CircularProgress, Fade, Card, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
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
import { Products } from 'types/e-commerce';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { getProduct, getCategories, getTradePolicies, saveProduct } from 'store/slices/product';
import { openSnackbar } from 'store/slices/snackbar';
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
    const [valueSku, setValueSku] = useState('');
    const [active, setActive] = useState(false);
    const [productInfo, setProductInfo] = useState<Products>();
    const [originalData, setOriginalData] = useState<Products>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { id } = useParams();

    const dispatch = useDispatch();
    const cart = useSelector((state: DefaultRootStateProps) => state.cart);

    // product description tabs
    const [value, setValue] = useState(0);
    const { product, skus, categories, tradePolicies } = useSelector((state) => state.product);
    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    /*  useEffect(() => {
         dispatch(getSku(valueSku));
     }, [dispatch, valueSku]); */
    useEffect(() => {
        // getProduct();
        setIsLoading(true);
        dispatch(getProduct(id));
        dispatch(getCategories());
        dispatch(getTradePolicies());
        // clear cart if complete order
        /*  if (valueSku === 0) setValueSku(product?.skus[0]?.sku?.skuID); */
        if (cart.checkout.step > 2) {
            dispatch(resetCart());
        }
    }, [cart.checkout.step, dispatch, id]);

    useEffect(() => {
        if (product !== null) {
            setOriginalData(product);
            setProductInfo(product);
            setIsLoading(false);
        }
    }, [product]);

    const handleSave = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (productInfo) {
            dispatch(saveProduct(productInfo))
                .then(({ payload }) => {
                    console.log(payload.response);
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: `Producto actualizado correctamente`,
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            },
                            close: false
                        })
                    );
                    /* dispatch(getCategoriesService({ idMerchant: 1 })); */
                })
                .catch(() => {
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: 'Error al guardar el producto',
                            variant: 'alert',
                            alert: {
                                color: 'error'
                            },
                            close: false
                        })
                    );
                });
        }
    };
    /* console.log('primer prod', productInfo); */
    return (
        <Grid container component="form" onSubmit={handleSave} alignItems="center" justifyContent="center" spacing={gridSpacing}>
            {isLoading && (
                <Fade in={isLoading}>
                    <Box component={Typography} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingY: 10 }}>
                        <CircularProgress />
                    </Box>
                </Fade>
            )}
            {!isLoading && (
                <>
                    <Grid item xs={12} lg={10}>
                        <MainCard>
                            {originalData && originalData?.productID?.toString() === id && (
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={12} md={6}>
                                        <ProductImages
                                            skus={skus}
                                            valueSku={valueSku}
                                            product={product}
                                            setActive={setActive}
                                            active={active}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <ProductInfo
                                            product={originalData}
                                            setValueSku={setValueSku}
                                            valueSku={valueSku}
                                            setActive={setActive}
                                            active={active}
                                            setProductInfo={setProductInfo}
                                            productInfo={productInfo}
                                            categories={categories}
                                            tradePolicies={tradePolicies}
                                        />
                                        <Grid item xs={12}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={6}>
                                                    <Button
                                                        fullWidth
                                                        color="primary"
                                                        variant="contained"
                                                        size="large"
                                                        startIcon={<EditIcon />}
                                                        onClick={() => setActive(true)}
                                                        disabled={valueSku === ''}
                                                    >
                                                        Edit Product
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Button type="submit" fullWidth color="secondary" variant="contained" size="large">
                                                        Save Product
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
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
                                                            label={String(product?.salePrice)}
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
                                                product={originalData}
                                                active={active}
                                                setProductInfo={setProductInfo}
                                                productInfo={productInfo}
                                            />
                                        </TabPanel>
                                        <TabPanel value={value} index={1}>
                                            <ProductReview product={originalData} />
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
                </>
            )}
        </Grid>
    );
};

export default ProductDetails;

/* const createNewProduct = (newData: NewCategoryType, originalData: CategoryType) => ({
    productID: originalData.productID,
    departmentId: originalData.departmentId,
    categoryId: originalData.categoryId,
    productGlobalCategoryID: originalData.productGlobalCategoryID,
    nameComplete: originalData.nameComplete,
    merchantId: originalData.merchantId,
    releaseDate: originalData.releaseDate,
    lastDateUpdate: originalData.lastDateUpdate,
    brandId: originalData.brandId,
    productDescription: originalData.productDescription,
    productStatus: originalData.productStatus,
    syncStatusVTEX: originalData.syncStatusVTEX,
    isActive: originalData.isActive,
    skuName: originalData.skuName,
    cscIdentification: originalData.cscIdentification,
    informationSource: originalData.informationSource,
    kit: originalData.kit,
    transported: originalData.transported,
    inventoried: originalData.inventoried,
    giftCardRecharge: originalData.giftCardRecharge,
    sku: originalData.sku,
    hiddenTradePolicies: originalData.hiddenTradePolicies,
    productName: originalData.productName,
    title: originalData.title,
    linkId: originalData.linkId,
    provider: originalData.provider,
    productRefID: originalData.productRefID,
    taxCode: originalData.taxCode,
    categoryName: originalData.categoryName,
    brandName: originalData.brandName,
    descriptionShort: originalData.descriptionShort,
    description: originalData.description,
    metaTagDescription: originalData.metaTagDescription,
    keyWords: originalData.keyWords,
    isEcommerce: originalData.isEcommerce,
    isVisible: originalData.isVisible,
    showWithoutStock: originalData.showWithoutStock,
    preventa: originalData.preventa,
    sobrePedido: originalData.sobrePedido,
    variants: originalData.variants
}); */
