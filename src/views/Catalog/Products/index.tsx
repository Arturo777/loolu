import { useEffect, useState, ReactElement } from 'react';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, Divider, Drawer, Grid, IconButton, Menu, MenuItem, Stack, Typography, useMediaQuery } from '@mui/material';

// third party
import { useLocation, Link } from 'react-router-dom';

// project imports
import ProductEmpty from './components/ProductEmpty';
import ProductFilter from './components/ProductFilter';
import ProductFilterView from './components/ProductFilterView';
import ProductCard from 'ui-component/cards/ProductCard';
import FloatingCart from 'ui-component/cards/FloatingCart';
import useConfig from 'hooks/useConfig';
import { resetCart } from 'store/slices/cart';
import { useDispatch, useSelector } from 'store';
import { appDrawerWidth, gridSpacing } from 'store/constant';
import { getProducts, filterProducts, SearchProductType } from 'store/slices/product';

// assets
// import SearchIcon from '@mui/icons-material/Search';

// types
import { Products as ProductsTypo, ProductsFilter } from 'types/e-commerce';
import Loader from 'ui-component/Loader';
import { queryToObject } from 'utils/helpers';
import { useIntl } from 'react-intl';
import { ProductList } from './List/ProductList';
import ProductMain from './Main';
import { initialState } from './utils/initialStateProductsFilter';
import { ProductHeader } from './components/ProductHeader';

// ==============================|| E-COMMERCE - PRODUCT GRID ||============================== //

const ProductsList = () => {
    const theme = useTheme();

    const { borderRadius } = useConfig();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const [multiForm, setMultiForm] = useState<boolean>(true);

    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
    const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));
    const location = useLocation();

    const [isLoading, setLoading] = useState(true);

    // useEffect(() => {
    //     setLoading(false);
    // }, []);

    // drawer
    const [open, setOpen] = useState(isLoading);

    const handleDrawerOpen = () => {
        setOpen((prevState) => !prevState);
    };

    // product data
    const [products, setProducts] = useState<ProductsTypo[]>([]);
    const productState = useSelector((state) => state.product);

    useEffect(() => {
        console.log('RESP', productState.products);

        setProducts(productState.products);
    }, [productState]);

    useEffect(() => {
        const queryObject: SearchProductType = queryToObject(location.search);
        dispatch(getProducts(queryObject));
    }, [location.search, dispatch]);

    useEffect(() => {
        // hide left drawer when email app opens
        // dispatch(openDrawer(false));

        // clear cart if complete order
        if (cart.checkout.step > 2) {
            dispatch(resetCart());
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // filter

    const [filter, setFilter] = useState(initialState);

    // // search filter
    // const handleSearch = async (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    //     const newString = event?.target.value;
    //     setFilter({ ...filter, search: newString! });
    // };

    // sort options

    const filterIsEqual = (a1: ProductsFilter, a2: ProductsFilter) =>
        a1 === a2 ||
        (a1.length === a2.length &&
            a1.search === a2.search &&
            a1.sort === a2.sort &&
            a1.price === a2.price &&
            a1.rating === a2.rating &&
            JSON.stringify(a1.gender) === JSON.stringify(a2.gender) &&
            JSON.stringify(a1.categories) === JSON.stringify(a2.categories) &&
            JSON.stringify(a1.colors) === JSON.stringify(a2.colors));

    const handelFilter = (type: string, params: string, rating?: number) => {
        setLoading(true);
        switch (type) {
            case 'gender':
                if (filter.gender.some((item) => item === params)) {
                    setFilter({ ...filter, gender: filter.gender.filter((item) => item !== params) });
                } else {
                    setFilter({ ...filter, gender: [...filter.gender, params] });
                }
                break;
            case 'categories':
                if (filter.categories.some((item) => item === params)) {
                    setFilter({ ...filter, categories: filter.categories.filter((item) => item !== params) });
                } else if (filter.categories.some((item) => item === 'all') || params === 'all') {
                    setFilter({ ...filter, categories: [params] });
                } else {
                    setFilter({ ...filter, categories: [...filter.categories, params] });
                }

                break;
            case 'colors':
                if (filter.colors.some((item) => item === params)) {
                    setFilter({ ...filter, colors: filter.colors.filter((item) => item !== params) });
                } else {
                    setFilter({ ...filter, colors: [...filter.colors, params] });
                }
                break;
            case 'price':
                setFilter({ ...filter, price: params });
                break;
            case 'search':
                setFilter({ ...filter, search: params });
                break;
            case 'sort':
                setFilter({ ...filter, sort: params });
                break;
            case 'rating':
                setFilter({ ...filter, rating: rating! });
                break;
            case 'reset':
                setFilter(initialState);
                break;
            default:
            // no options
        }
    };

    const filterData = async () => {
        await dispatch(filterProducts(filter));
        setLoading(false);
    };

    useEffect(() => {
        filterData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    useEffect(() => {
        setOpen(!matchDownLG);
    }, [matchDownLG]);

    // sort filter

    let productResult: ReactElement | ReactElement[] = <></>;
    if (products && products.length > 0) {
        productResult = products.map((product: ProductsTypo, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <ProductCard
                    id={product.id}
                    image={product.image}
                    name={product.name}
                    description={product.description}
                    offerPrice={product.offerPrice}
                    salePrice={product.salePrice}
                    rating={product.rating}
                    color={product.colors ? product.colors[0] : undefined}
                    brandName={product.brandName ?? ''}
                    brandId={product.brandId}
                    productID={product.productID}
                    skus={product.skus}
                />
            </Grid>
        ));
    } else {
        productResult = (
            <Grid item xs={12} sx={{ mt: 3 }}>
                <ProductEmpty />
            </Grid>
        );
    }

    const spacingMD = matchDownMD ? 1 : 1.5;

    if (productState.loadingProducts) return <Loader />;

    return (
        <Grid container spacing={2}>
            <ProductHeader
                matchDownMD={matchDownMD}
                filter={filter}
                setFilter={setFilter}
                matchDownSM={matchDownSM}
                spacingMD={spacingMD}
                handleDrawerOpen={handleDrawerOpen}
            />

            <Grid item xs={12}>
                <Divider sx={{ borderColor: 'grey.400' }} />
            </Grid>
            <ProductMain
                open={open}
                filter={filter}
                filterIsEqual={filterIsEqual}
                handelFilter={handelFilter}
                gridSpacing={gridSpacing}
                isLoading={isLoading}
                productResult={productResult}
                matchDownLG={matchDownLG}
                appDrawerWidth={appDrawerWidth}
                borderRadius={borderRadius}
                handleDrawerOpen={handleDrawerOpen}
            />
        </Grid>
    );
};

export default ProductsList;

const mockData = [
    {
        merchant: {
            name: 'Vinneren',
            merchantId: 1,
            isFather: true
        },
        data: {
            name: 'Nombre del producto',
            description: 'Descripción del producto en Vinneren',
            isActive: false,
            category: 10,
            combo: {
                visible: false,
                name: 'Nombre A',
                combo2: {
                    level: 'Vin',
                    combo3: {
                        level2: 22
                    }
                }
            },
            productId: 10
        }
    },
    {
        merchant: {
            name: 'Monstore',
            merchantId: 2,
            isFather: false
        },
        data: {
            name: '',
            description: '',
            isActive: false,
            category: 9,
            combo: {
                visible: false,
                name: '',
                combo2: {
                    level: 1,
                    combo3: {
                        level2: 2
                    }
                }
            },
            productId: 11
        }
    },
    {
        merchant: {
            name: 'Elektra',
            merchantId: 3,
            isFather: false
        },
        data: {
            name: 'Producto - Elektra',
            description: 'Sin descripción',
            isActive: true,
            category: 10,
            combo: {
                visible: false,
                name: '',
                combo2: {
                    level: 1,
                    combo3: {
                        level2: 2
                    }
                }
            },
            productId: 12
        }
    }
];
