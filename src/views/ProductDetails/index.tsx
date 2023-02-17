import { useEffect, useState, SyntheticEvent, FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';

// material-ui
import { Box, Grid, Stack, Tab, Tabs, Typography, CircularProgress, Fade, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// project imports
import ProductImages from './ProductImages';
import ProductInfo from './ProductInfo';
import ProductDescription from './ProductDescription';
import ProductReview from './ProductReview';
import RelatedProducts from './RelatedProducts';
import MainCard from 'ui-component/cards/MainCard';
import Chip from 'ui-component/extended/Chip';
import { TabsProps } from 'types';
import { Products, Skus } from 'types/e-commerce';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { getProduct, getCategories, getTradePolicies, saveProduct } from 'store/slices/product';
import { createBrand, getBrands } from 'store/slices/catalog';
import { openSnackbar } from 'store/slices/snackbar';
import { resetCart } from 'store/slices/cart';
import { BrandType, CategoryType, NewBrandType } from 'types/catalog';
import { useIntl } from 'react-intl';

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
    const intl = useIntl();
    const { id } = useParams();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    // information product and sku
    const [productInfo, setProductInfo] = useState<Products>();
    const [originalData, setOriginalData] = useState<Products>();
    const [skuInfo, setSkuInfo] = useState<Skus>();
    const [valueSku, setValueSku] = useState('');

    // actice mode edit product
    const [active, setActive] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // product description tabs
    const [value, setValue] = useState(0);
    const [brandsInfo, setBrandsInfo] = useState<BrandType[]>([]);

    // info new Brands and Categories
    const [newBrandSku, setNewBrandSku] = useState<NewBrandType>();
    const [newCategorySku, setNewCategorySku] = useState<CategoryType>();

    // flags brands and categories
    const [flagBrand, setFlagBrand] = useState(false);
    const [flagCategory, setFlagCategory] = useState(false);

    const { product, skus, tradePolicies } = useSelector((state) => state.product);
    const { brands } = useSelector((state) => state.catalogue);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        // getProduct();
        setIsLoading(true);
        dispatch(getProduct(id));
        dispatch(getBrands());
        dispatch(getCategories());
        dispatch(getTradePolicies());
        // clear cart if complete order
        /*  if (valueSku === 0) setValueSku(product?.skus[0]?.sku?.skuID); */
        if (cart.checkout.step > 2) {
            dispatch(resetCart());
        }
    }, [cart.checkout.step, dispatch, id]);

    useEffect(() => {
        if (brands?.length) {
            setBrandsInfo(brands);
        }
    }, [brands]);

    useEffect(() => {
        if (product !== null) {
            setOriginalData(product);
            setProductInfo(product);
            setIsLoading(false);
        }
        if (!active && product !== null) {
            setOriginalData(product);
        }
    }, [product, active]);

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (flagBrand) {
            const dataBrand: any = {
                ...newBrandSku
            };
            await dispatch(createBrand({ dataBrand }))
                .then(async ({ payload }) => {
                    setNewBrandSku(payload.response);
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: `Successfully created brand`,
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            },
                            close: false
                        })
                    );
                })
                .catch(() => {
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: 'Failed to create brand',
                            variant: 'alert',
                            alert: {
                                color: 'error'
                            },
                            close: false
                        })
                    );
                });
            if (productInfo) {
                const prodsku = newBrandSku?.Id
                    ? { ...productInfo, sku: skuInfo, brandName: newBrandSku?.Name, brandId: newBrandSku?.Id }
                    : { ...productInfo, sku: skuInfo };
                // console.log('prod new', prodsku);
                await dispatch(saveProduct(prodsku))
                    .then(({ payload }) => {
                        // console.log(payload.response);
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: `Successfully updated product`,
                                variant: 'alert',
                                alert: {
                                    color: 'success'
                                },
                                close: false
                            })
                        );
                    })
                    .catch(() => {
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: 'Failed to save product',
                                variant: 'alert',
                                alert: {
                                    color: 'error'
                                },
                                close: false
                            })
                        );
                    });
            }
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
                                            setSkuInfo={setSkuInfo}
                                            skuInfo={skuInfo}
                                            brandsInfo={brandsInfo}
                                            setFlagBrand={setFlagBrand}
                                            flagBrand={flagBrand}
                                            setNewBrandSku={setNewBrandSku}
                                            setFlagCategory={setFlagCategory}
                                            flagCategory={flagCategory}
                                            setNewCategorySku={setNewCategorySku}
                                            tradePolicies={tradePolicies}
                                        />
                                        <Grid item xs={12}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={6}>
                                                    {active ? (
                                                        <Button
                                                            fullWidth
                                                            variant="outlined"
                                                            color="error"
                                                            size="large"
                                                            startIcon={<DeleteIcon />}
                                                            onClick={() => setActive(false)}
                                                            disabled={valueSku === ''}
                                                        >
                                                            {intl.formatMessage({ id: 'cancel' })}
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            fullWidth
                                                            color="primary"
                                                            variant="contained"
                                                            size="large"
                                                            startIcon={<EditIcon />}
                                                            onClick={() => setActive(true)}
                                                            disabled={valueSku === ''}
                                                        >
                                                            {intl.formatMessage({ id: 'edit' })}
                                                        </Button>
                                                    )}
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Button type="submit" fullWidth color="secondary" variant="contained" size="large">
                                                        {intl.formatMessage({ id: 'save' })}
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
                                            <Tab
                                                component={Link}
                                                to="#"
                                                label={intl.formatMessage({ id: 'description' })}
                                                {...a11yProps(0)}
                                            />
                                            <Tab
                                                component={Link}
                                                to="#"
                                                label={
                                                    <Stack direction="row" alignItems="center">
                                                        {intl.formatMessage({ id: 'reviews' })}
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
                        <Typography variant="h2">{intl.formatMessage({ id: 'related_products' })}</Typography>
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
