import React, { useEffect, useState, SyntheticEvent } from 'react';
import { Grid, Fade, Typography, CircularProgress, Button, Tabs, Tab, Stack, Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { id } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';

// ========= store =========
import { gridSpacing } from 'store/constant';
import product, { getCategories, getTradePolicies } from 'store/slices/product';
import { getBrands } from 'store/slices/catalog';
import { useDispatch, useSelector } from 'store';

// ========= components =========
import MainCard from 'ui-component/cards/MainCard';
import ProductReview from 'ui-component/cards/ProductReview';
import Chip from 'ui-component/extended/Chip';

// ========= types =========
import { TabsProps } from 'types';

// ========= pages =========
/* import Main from 'views/Catalog/Facets/Main'; */
import ProductDescription from 'views/ProductDetails/ProductDescription';
import ProductImages from 'views/ProductDetails/ProductImages';
import ProductInfoCreate from './ProductInfoCreate';
import RelatedProducts from 'views/ProductDetails/RelatedProducts';
import { BrandType, CategoryType, NewBrandType } from 'types/catalog';

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

/* const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{ open?: boolean }>(({ theme, open }) => ({
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
})); */

const CreateProduct = () => {
    const intl = useIntl();
    const theme = useTheme();
    const dispatch = useDispatch();
    const { skus, tradePolicies } = useSelector((state) => state.product);
    const { brands } = useSelector((state) => state.catalogue);

    // ========= states =========
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [value, setValue] = useState(0);
    // info new Brands and Categories
    const [brandsInfo, setBrandsInfo] = useState<BrandType[]>([]);
    const [newBrandSku, setNewBrandSku] = useState<NewBrandType>();
    const [newCategorySku, setNewCategorySku] = useState<CategoryType>();
    // flags brands and categories
    const [flagBrand, setFlagBrand] = useState(false);
    const [flagCategory, setFlagCategory] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        dispatch(getBrands());
        dispatch(getCategories());
        dispatch(getTradePolicies());
    }, [dispatch]);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
            {isLoading && (
                <Fade in={isLoading}>
                    <Box component={Typography} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingY: 10 }}>
                        <CircularProgress />
                    </Box>
                </Fade>
            )}
            {!isLoading && (
                <>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex' }}>
                            <MainCard>
                                <Grid container sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                    <Grid item xs={12} md={6}>
                                        {/* <ProductImages
                                            skus={skus}
                                            valueSku={valueSku}
                                            product={product}
                                            setActive={setActive}
                                            active={active}
                                        /> */}
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <ProductInfoCreate
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
                                                        {/* <Chip
                                                            label={String(product?.salePrice)}
                                                            size="small"
                                                            chipcolor="secondary"
                                                            sx={{ ml: 1.5 }}
                                                        /> */}
                                                    </Stack>
                                                }
                                                {...a11yProps(1)}
                                            />
                                        </Tabs>
                                        <TabPanel value={value} index={0}>
                                            {/* <ProductDescription
                                                product={originalData}
                                                active={active}
                                                setProductInfo={setProductInfo}
                                                productInfo={productInfo}
                                            /> */}
                                        </TabPanel>
                                        <TabPanel value={value} index={1}>
                                            {/* <ProductReview product={product} /> */}
                                        </TabPanel>
                                    </Grid>
                                </Grid>
                            </MainCard>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 3 }}>
                        <Typography variant="h2">{intl.formatMessage({ id: 'related_products' })}</Typography>
                    </Grid>
                    <Grid item xs={11}>
                        <RelatedProducts id="1" />
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default CreateProduct;
