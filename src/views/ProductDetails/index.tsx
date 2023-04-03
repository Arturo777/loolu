import { useEffect, useState, SyntheticEvent, FormEvent } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Grid, Stack, Tab, Tabs, Typography, CircularProgress, Fade, Button, Drawer, useMediaQuery } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// project imports
import PerfectScrollbar from 'react-perfect-scrollbar';
import ProductImages from './ProductImages';
import ProductInfo from './ProductInfo';
import ProductDescription from './ProductDescription';
import ProductReview from './ProductReview';
import RelatedProducts from './RelatedProducts';
import Chip from 'ui-component/extended/Chip';
import useConfig from 'hooks/useConfig';
import { TabsProps } from 'types';
import { Products, Skus } from 'types/e-commerce';
import { appDrawerWidth, appDrawerWidthHistorial, gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { getCategories, getTradePolicies, saveProduct, getProductDetails } from 'store/slices/product';
import { createBrand, getBrands } from 'store/slices/catalog';
import { openSnackbar } from 'store/slices/snackbar';
// import { resetCart } from 'store/slices/cart';
import { BrandType, CategoryType, NewBrandType } from 'types/catalog';
import { useIntl } from 'react-intl';
import FloatingApprovalButton from 'ui-component/cards/FloatingApprovalButton';
import ApprovalCard from 'widget/Data/ApprovalCard';
import FloatingHistorialApproval from 'ui-component/cards/FloatingHistorialApproval';
import ApprovalHistorialCard from 'widget/Data/ApprovalHistorialCard';
// import DragAndDrop from 'ui-component/DragAndDrop';

import { MerchantProductType } from 'types/product';
import MultiMerchantForm, { MultiMerchantFormProps } from 'ui-component/MultiMerchant/MerchantsForm';
import { InputType, SelectOptionType } from 'ui-component/MultiMerchant/MerchantsForm/InputComponent';

// interface Image {
//     file: File;
//     src: string;
// }

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

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{ open?: boolean }>(({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter
    }),
    marginRight: -appDrawerWidth,
    [theme.breakpoints.down('xl')]: {
        paddingRight: 0,
        marginRight: 0
    },
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.shorter
        }),
        marginRight: 0
    })
}));

const defaultMerchantProps: MultiMerchantFormProps = {
    isOpen: false,
    data: [],
    accessor: '',
    // data: { [key: string]: any }[];
    inputLabel: 'label',
    toggleDrawer: (e) => {
        console.log(e);
    },
    onSave: (data: any) => console.log(data),
    type: InputType.textField
    // options?: null | SelectOptionType[];
};

const ProductDetails = () => {
    // hooks
    const intl = useIntl();
    const theme = useTheme();
    const dispatch = useDispatch();
    const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));
    const { borderRadius } = useConfig();
    const { id } = useParams();
    const [searchParams] = useSearchParams();

    // const cart = useSelector((state) => state.cart);
    // information product and sku
    // product info according to selected merchant
    const [originalData, setOriginalData] = useState<Products>();
    const [productInfo, setProductInfo] = useState<Products>();

    const [skuInfo, setSkuInfo] = useState<Skus>();
    const [valueSku, setValueSku] = useState('');
    const [open, setOpen] = useState(false);
    const [openTwo, setOpenTwo] = useState(false);
    /* const [loading, setLoading] = useState(true); */
    // actice mode edit product
    const [active, setActive] = useState(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // product description tabs
    const [value, setValue] = useState(0);
    const [brandsInfo, setBrandsInfo] = useState<BrandType[]>([]);

    // info new Brands and Categories
    const [newBrandSku, setNewBrandSku] = useState<NewBrandType>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [newCategorySku, setNewCategorySku] = useState<CategoryType>();

    // flags brands and categories
    const [flagBrand, setFlagBrand] = useState(false);
    const [flagCategory, setFlagCategory] = useState(false);

    const { product, skus, tradePolicies } = useSelector((state) => state.product);

    const { brands } = useSelector((state) => state.catalogue);

    // params
    const idMerchant = searchParams.get('idMerchant');
    // const idMerchant = useMemo(() => searchParams.get('idMerchant'), []);
    // const isFather = searchParams.get('isFather');

    // const [images, setImages] = useState<Image[]>([]);
    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [allMerchantsProductData, setAllMerchantsProductData] = useState<{ [key: string]: any }[]>([]);
    const [multiFormProps, setMultiFormProps] = useState<MultiMerchantFormProps>(defaultMerchantProps);

    useEffect(() => {
        // update product info on merchants array
        setAllMerchantsProductData((prev) => [
            ...prev.map((item) => {
                if (item.merchantId === Number(idMerchant)) {
                    return { ...item, detailProduct: productInfo };
                }
                return item;
            })
        ]);
    }, [idMerchant, productInfo]);

    useEffect(() => {
        // getProduct();
        setIsLoading(true);

        if (id && idMerchant) {
            dispatch(
                getProductDetails({
                    idProd: id,
                    idMerchant
                })
            ).then(({ payload }) => {
                const merchantProduct = payload.find((item: MerchantProductType) => Number(item.merchantId) === Number(idMerchant));

                setAllMerchantsProductData(payload);

                if (merchantProduct) {
                    setOriginalData(merchantProduct.detailProduct);
                    setProductInfo(merchantProduct.detailProduct);
                    setIsLoading(false);
                }
            });
            dispatch(getBrands());
            dispatch(getCategories());
            dispatch(getTradePolicies());
        }
    }, [dispatch, id, idMerchant, product]);

    useEffect(() => {
        if (brands?.length) {
            setBrandsInfo(brands);
        }
    }, [brands]);

    useEffect(() => {
        setOpen(false);
    }, []);

    // useEffect(() => {
    //     if (product !== null) {
    //         console.log('SET PRO');
    //         setOriginalData(product);
    //         setProductInfo(product);
    //         setIsLoading(false);
    //     }
    //     if (!active && product !== null) {
    //         setOriginalData(product);
    //     }
    // }, [product, active]);

    const handleDrawerOpen = () => {
        setOpen((prevState) => !prevState);
        setOpenTwo(false);
    };
    const handleDrawerOpenHistorial = () => {
        setOpenTwo((prevState) => !prevState);
        setOpen(false);
    };

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
                await dispatch(saveProduct(prodsku))
                    .then(({ payload }) => {
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

    const saveMultiChange = (data: { [key: string]: any }[]) => {
        setAllMerchantsProductData(data);

        const updateCurrentProductInfo = data.find((item: { [key: string]: any }) => item.merchantId === Number(idMerchant));

        if (updateCurrentProductInfo) {
            const newInfo = updateCurrentProductInfo.detailProduct;
            setProductInfo(newInfo);
        }
    };

    const handleDrawerMultiEdit = ({
        accessor,
        intlLabel,
        data = undefined,
        options = null,
        type
    }: {
        accessor: string;
        intlLabel: string;
        data?: { [key: string]: any }[];
        options?: null | SelectOptionType[];
        type: InputType;
    }) => {
        const newMultiFormProps: MultiMerchantFormProps = {
            accessor,
            data: data || allMerchantsProductData,
            isOpen: true,
            inputLabel: intlLabel,
            options,
            toggleDrawer: (e) => {
                // console.log('TOGLLE');
                setMultiFormProps({ ...defaultMerchantProps, isOpen: e });
                // resetDrawer();
            },
            onSave: (newData) => {
                setMultiFormProps({ ...defaultMerchantProps, isOpen: false });
                saveMultiChange(newData);
            },
            type
        };

        setMultiFormProps(newMultiFormProps);
    };

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
                    <MultiMerchantForm {...multiFormProps} />
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex' }}>
                            <Main
                                sx={
                                    open || openTwo
                                        ? { marginRight: '0', transition: 'margin 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms' }
                                        : { marginRight: '-420px', transition: 'margin 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms' }
                                }
                            >
                                {originalData && originalData?.productID?.toString() === id && (
                                    <Grid container sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <Grid item xs={12} md={6}>
                                            {Boolean(skus && skus.length) && (
                                                <ProductImages
                                                    skus={skus}
                                                    valueSku={valueSku}
                                                    product={productInfo}
                                                    setActive={setActive}
                                                    active={active}
                                                />
                                            )}
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            {productInfo && (
                                                <ProductInfo
                                                    handleDrawer={handleDrawerMultiEdit}
                                                    active={active}
                                                    allMerchantsProductData={allMerchantsProductData}
                                                    brandsInfo={brandsInfo}
                                                    flagBrand={flagBrand}
                                                    flagCategory={flagCategory}
                                                    product={originalData}
                                                    productInfo={productInfo}
                                                    saveMultiChange={saveMultiChange}
                                                    setActive={setActive}
                                                    setFlagBrand={setFlagBrand}
                                                    setFlagCategory={setFlagCategory}
                                                    setNewBrandSku={setNewBrandSku}
                                                    setNewCategorySku={setNewCategorySku}
                                                    setProductInfo={setProductInfo}
                                                    setSkuInfo={setSkuInfo}
                                                    setValueSku={setValueSku}
                                                    skuInfo={skuInfo}
                                                    tradePolicies={tradePolicies}
                                                    valueSku={valueSku}
                                                />
                                            )}
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
                                                    handleDrawer={handleDrawerMultiEdit}
                                                    product={originalData}
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
                            </Main>
                            {open ? (
                                <Drawer
                                    sx={{
                                        ml: open ? 3 : 0,
                                        height: matchDownLG ? '100vh' : 'auto',
                                        flexShrink: 0,
                                        zIndex: { xs: 1200, lg: open ? 0 : -1 },
                                        overflowX: 'hidden',
                                        width: appDrawerWidth,
                                        '& .MuiDrawer-paper': {
                                            height: 'auto',
                                            width: appDrawerWidth,
                                            position: matchDownLG ? 'fixed' : 'relative',
                                            border: 'none',
                                            borderRadius: matchDownLG ? 0 : `${borderRadius}px`
                                        }
                                    }}
                                    variant={matchDownLG ? 'temporary' : 'persistent'}
                                    anchor="right"
                                    open={open}
                                    ModalProps={{ keepMounted: true }}
                                    onClose={handleDrawerOpen}
                                >
                                    {open && (
                                        <PerfectScrollbar component="div">
                                            <ApprovalCard product={product} valueSku={valueSku} />
                                        </PerfectScrollbar>
                                    )}
                                </Drawer>
                            ) : (
                                <Drawer
                                    sx={{
                                        ml: openTwo ? 3 : 0,
                                        height: matchDownLG ? '100vh' : 'auto',
                                        flexShrink: 0,
                                        zIndex: { xs: 1200, lg: openTwo ? 0 : -1 },
                                        overflowX: 'hidden',
                                        width: appDrawerWidthHistorial,
                                        '& .MuiDrawer-paper': {
                                            height: 'auto',
                                            width: appDrawerWidthHistorial,
                                            position: matchDownLG ? 'fixed' : 'relative',
                                            border: 'none',
                                            borderRadius: matchDownLG ? 0 : `${borderRadius}px`
                                        }
                                    }}
                                    variant={matchDownLG ? 'temporary' : 'persistent'}
                                    anchor="right"
                                    open={openTwo}
                                    ModalProps={{ keepMounted: true }}
                                    onClose={handleDrawerOpenHistorial}
                                >
                                    {openTwo && (
                                        <PerfectScrollbar component="div">
                                            {/* <ApprovalCard product={product} valueSku={valueSku} /> */}
                                            <ApprovalHistorialCard product={product} valueSku={valueSku} />
                                        </PerfectScrollbar>
                                    )}
                                </Drawer>
                            )}
                        </Box>
                    </Grid>

                    {/* <DragAndDrop images={images} setImages={setImages} /> */}

                    {/* {images.map((image, index) => (
                        <img key={index} src={image.src} alt={`id${index}`} />
                    ))} */}

                    <Grid item xs={12} sx={{ mt: 3 }}>
                        <Typography variant="h2">{intl.formatMessage({ id: 'related_products' })}</Typography>
                    </Grid>
                    <Grid item xs={11}>
                        <RelatedProducts id={id} />
                    </Grid>
                </>
            )}
            <FloatingApprovalButton handleDrawerOpen={handleDrawerOpen} />
            <FloatingHistorialApproval handleDrawerOpenHistorial={handleDrawerOpenHistorial} />
        </Grid>
    );
};

export default ProductDetails;
