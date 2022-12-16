// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { dispatch } from '../index';
import { STYRK_API, STYRK_TOKEN } from 'config';

// types
import { DefaultRootStateProps } from 'types';
import { ProductsFilter, Address } from 'types/e-commerce';
import { ProductCardProps } from 'types/cart';

// ----------------------------------------------------------------------
const baseURL = process.env.STYRK_API_URL;

const initialState: DefaultRootStateProps['product'] = {
    error: null,
    products: [],
    product: null,
    relatedProducts: [],
    skus: [],
    categories: [],
    tradePolicies: [],
    reviews: [],
    addresses: [],
    loadingProducts: true
};

const slice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        getProductsPending(state) {
            state.loadingProducts = true;
        },

        // GET PRODUCTS
        getProductsSuccess(state, action) {
            const products = action.payload.map((item: ProductCardProps) => ({
                ...item,
                date: item.releaseDate,
                image: item.imageUrl,
                name: item.productName || item.skuName || '',
                offerPrice: 1000,
                salePrice: 1300
            }));

            state.products = products;
            state.loadingProducts = false;
        },

        // FILTER PRODUCTS
        filterProductsSuccess(state, action) {
            state.products = action.payload;
        },

        // GET PRODUCT
        getProductSuccess(state, action) {
            /* console.log(action); */
            /* const productOneProd = action.payload.map((item: ProductItem) => ({
                ...item,
                date: item.releaseDate,
                image: item.imageUrl,
                name: item.productName || item.skuName || '',
                offerPrice: 1000,
                salePrice: 1300
            }));

            console.log(productOneProd); */
            state.product = action.payload;
        },
        // GET SKUS
        getSkuSuccess(state, action) {
            state.skus = action.payload;
        },
        getCategoriesSuccess(state, action) {
            state.categories = action.payload;
        },
        getTradePoliciesSucces(state, action) {
            state.tradePolicies = action.payload;
        },
        // GET RELATED PRODUCTS
        getRelatedProductsSuccess(state, action) {
            state.relatedProducts = action.payload;
        },

        // GET PRODUCT REVIEWS
        getProductReviewsSuccess(state, action) {
            state.reviews = action.payload;
        },

        // GET ADDRESSES
        getAddressesSuccess(state, action) {
            state.addresses = action.payload;
        },

        // ADD ADDRESS
        addAddressSuccess(state, action) {
            state.addresses = action.payload;
        },

        // EDIT ADDRESS
        editAddressSuccess(state, action) {
            state.addresses = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

export interface SearchProductType {
    idMerchant?: number;
    page?: number;
    productName?: string;
    ean?: string;
    idSKU?: number;
    productRefID?: number;
    idProd?: number;
    idApprovalStatus?: number;
}

// ----------------------------------------------------------------------

export function getProducts(searchParams: SearchProductType) {
    return async () => {
        dispatch(slice.actions.getProductsPending());

        const hasParams = Boolean(
            searchParams.productName ||
                searchParams.ean ||
                searchParams.idSKU ||
                searchParams.productRefID ||
                searchParams.idProd ||
                searchParams.idApprovalStatus
        );

        try {
            const response = await axios.get(`styrk/api/product/search`, {
                baseURL: STYRK_API,
                params: {
                    idMerchant: searchParams.idMerchant || 1,
                    page: searchParams.page || hasParams ? 0 : 1,
                    productName: searchParams.productName || null,
                    idSKU: searchParams.idSKU,
                    idProd: searchParams.idProd
                },
                headers: {
                    authorization: `Bearer ${STYRK_TOKEN}`
                }
            });
            dispatch(slice.actions.getProductsSuccess(response.data.response));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function filterProducts(filter: ProductsFilter) {
    return async () => {
        try {
            const response = await axios.post('/api/products/filter', { filter });
            dispatch(slice.actions.filterProductsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getProduct(id: string | undefined) {
    return async () => {
        try {
            const response = await axios.get('styrk/api/product/detail/productSkus', {
                baseURL,
                params: {
                    idMerchant: 1,
                    idProd: id,
                    page: 0
                },
                headers: {
                    authorization: `Bearer ${STYRK_TOKEN}`
                }
            });
            dispatch(slice.actions.getProductSuccess(response.data.response));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getSku(id: string | undefined) {
    return async () => {
        try {
            const response = await axios.get('styrk/api/product/detail/sku', {
                baseURL: STYRK_API,
                params: {
                    idMerchant: 1,
                    idSKU: id
                },
                headers: {
                    authorization: `Bearer ${STYRK_TOKEN}`
                }
            });
            dispatch(slice.actions.getSkuSuccess(response.data.response));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
export function getCategories() {
    return async () => {
        try {
            const response = await axios.get('styrk/api/category/search', {
                baseURL: STYRK_API,
                params: {
                    idMerchant: 1
                },
                headers: {
                    authorization: `Bearer ${STYRK_TOKEN}`
                }
            });
            dispatch(slice.actions.getCategoriesSuccess(response.data.response));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
export function getTradePolicies() {
    return async () => {
        try {
            const response = await axios.get('styrk/api/tradepolicies', {
                baseURL: STYRK_API,
                params: {
                    idMerchant: 1
                },
                headers: {
                    authorization: `Bearer ${STYRK_TOKEN}`
                }
            });
            dispatch(slice.actions.getTradePoliciesSucces(response.data.response));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
export function getRelatedProducts(id: string | undefined) {
    return async () => {
        try {
            const response = await axios.post('/api/product/related', { id });
            dispatch(slice.actions.getRelatedProductsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getProductReviews() {
    return async () => {
        try {
            const response = await axios.get('/api/review/list');
            dispatch(slice.actions.getProductReviewsSuccess(response.data.productReviews));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getAddresses() {
    return async () => {
        try {
            const response = await axios.get('/api/address/list');
            dispatch(slice.actions.getAddressesSuccess(response.data.address));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function addAddress(address: Address) {
    return async () => {
        try {
            const response = await axios.post('/api/address/new', address);
            dispatch(slice.actions.addAddressSuccess(response.data.address));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function editAddress(address: Address) {
    return async () => {
        try {
            const response = await axios.post('/api/address/edit', address);
            dispatch(slice.actions.editAddressSuccess(response.data.address));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
