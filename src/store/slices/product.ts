// third-party
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
import { STYRK_API } from 'config';

// types
import { DefaultRootStateProps } from 'types';
import { ProductsFilter, Products, skuImageType } from 'types/e-commerce';
import { ProductCardProps } from 'types/cart';
import { getSearchParamsFromObject } from 'utils/helpers';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['product'] = {
    error: null,
    products: [],
    product: null,
    relatedProducts: [],
    skus: [],
    categories: [],
    tradePolicies: [],
    approvalStatus: [],
    getRejectedStatus: [],
    approvalHistorial: [],
    reviews: [],
    addresses: [],
    loadingProduct: true,
    merchantProducts: [],
    productFacet: [],
    createProductFacet: [],
    werehouses: [],
    loadingProducts: true,
    loadingMedia: false
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
        /* getProductsSuccess(state, action) {
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
        }, */

        // FILTER PRODUCTS
        filterProductsSuccess(state, action) {
            state.products = action.payload;
        },

        // GET PRODUCT
        getProductSuccess(state, action) {
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
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loadingProducts = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loadingProducts = false;

                const products = action.payload.response.map((item: ProductCardProps) => ({
                    ...item,
                    date: item.releaseDate,
                    image: item.imageUrl,
                    name: item.productName || item.skuName || '',
                    offerPrice: 1000,
                    salePrice: 1300
                }));

                state.products = products;
            });

        builder
            .addCase(getProduct.pending, (state) => {
                state.loadingProducts = true;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.loadingProducts = false;

                action.payload.response.departmentId = action.payload.response.categoryId;

                state.product = action.payload.response[0] /* .detailProduct */;
            });

        builder
            .addCase(saveProduct.pending, (state) => {
                state.loadingProducts = true;
            })
            .addCase(saveProduct.fulfilled, (state, action) => {
                state.loadingProducts = false;
            });

        builder
            .addCase(approvalStatus.pending, (state) => {
                state.loadingProducts = true;
            })
            .addCase(approvalStatus.fulfilled, (state, action) => {
                state.loadingProducts = false;
                state.approvalStatus = action.payload.response.skuApprovalStatus;
            });

        builder
            .addCase(getRejectedStatus.pending, (state) => {
                state.loadingProducts = true;
            })
            .addCase(getRejectedStatus.fulfilled, (state, action) => {
                state.loadingProducts = false;
                state.getRejectedStatus = action.payload.response;
            });
        builder
            .addCase(getApprovalHistorial.pending, (state) => {
                state.loadingProducts = true;
            })
            .addCase(getApprovalHistorial.fulfilled, (state, action) => {
                state.loadingProducts = false;
                state.approvalHistorial = action.payload.response;
            });
        /* ------------------------------------------- */
        /* --------- MULTI MERCHANT SERVICES --------- */
        /* ------------------------------------------- */
        builder
            // PRODUCT
            .addCase(getProductDetails.pending, (state) => {
                state.loadingProduct = true;
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.loadingProduct = false;
                state.merchantProducts = action.payload;
            });
        // SKUs
        builder.addCase(getProductSkuList.pending, (state) => {
            state.loadingProduct = true;
        });
        // builder.addCase(getProductSkuList.pending, (state) => {
        //     state.loadingProduct = true;
        // });
        builder
            .addCase(productFacetService.pending, (state) => {
                state.loadingProducts = true;
            })
            .addCase(productFacetService.fulfilled, (state, action) => {
                state.loadingProducts = false;
                state.productFacet = action.payload.response.detail;
            });
        builder
            .addCase(facetsToProduct.pending, (state) => {
                state.loadingProducts = true;
            })
            .addCase(facetsToProduct.fulfilled, (state, action) => {
                state.loadingProducts = false;
                state.createProductFacet = action.payload.response;
            });
        builder
            .addCase(getWerehouses.pending, (state) => {
                state.loadingProducts = true;
            })
            .addCase(getWerehouses.fulfilled, (state, action) => {
                state.loadingProducts = false;
                state.werehouses = action.payload.response;
            });
        // MEDIA
        builder
            .addCase(uploadImageToSku.pending, (state) => {
                state.loadingMedia = true;
            })
            .addCase(uploadImageToSku.fulfilled, (state) => {
                state.loadingMedia = false;
            });
        builder
            .addCase(deleteImageToSku.pending, (state) => {
                state.loadingMedia = true;
            })
            .addCase(deleteImageToSku.fulfilled, (state) => {
                state.loadingMedia = false;
            });
    }
    // extraReducers(builder) {}
});

// Reducer
export default slice.reducer;

export interface getProductsProps {
    idMerchant?: number;
    page?: number;
    productName: string;
    idSKU: string;
    idBrand: string;
    idCategory: string;
}

// ----------------------------------------------------------------------

export const getProductsThunk = createAsyncThunk(
    `${slice.name}/getProducts`,
    async ({ idMerchant, page, productName, idSKU, idBrand, idCategory }: getProductsProps) => {
        const currentPage = productName || idSKU || idBrand || idCategory ? 0 : page;

        const response = await axios.get(
            `styrk/api/massive/search${getSearchParamsFromObject({
                idMerchant,
                page: currentPage,
                productName,
                idSKU,
                idBrand,
                idCategory
            })}`,
            {
                baseURL: STYRK_API
            }
        );
        return response.data;
    }
);

export type SearchProductType = {
    idMerchant?: number;
    page?: number;
    productName?: string;
    ean?: string;
    idSKU?: number;
    productRefID?: number;
    idProd?: number;
    idApprovalStatus?: number;
};

export const getProducts = createAsyncThunk(`${slice.name}/getProducts`, async (searchParams: SearchProductType) => {
    const hasParams = Boolean(
        searchParams.productName ||
            searchParams.ean ||
            searchParams.idSKU ||
            searchParams.productRefID ||
            searchParams.idProd ||
            searchParams.idApprovalStatus
    );
    const response = await axios.get(`/styrk/api/product/search-multicatalog`, {
        baseURL: STYRK_API,
        params: {
            idMerchant: searchParams.idMerchant || 1,
            page: searchParams.page || !hasParams ? 0 : 1,
            productName: searchParams.productName || null,
            idSKU: searchParams.idSKU,
            idProd: searchParams.idProd
        }
    });

    return response.data;
});

export function filterProducts(filter: ProductsFilter) {
    return async () => {
        try {
            /* const response = await axios.post('/api/products/filter', { filter });
            dispatch(slice.actions.filterProductsSuccess(response.data)); */
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

interface ProductArgs {
    id: string | undefined;
    idMerchant: any;
}

export const getProduct = createAsyncThunk(`${slice.name}/getProduct`, async ({ id, idMerchant }: ProductArgs) => {
    const response = await axios.get('styrk/api/product/detail/product-multicatalog', {
        baseURL: STYRK_API,
        params: {
            idMerchant,
            idProd: id,
            page: 0
        }
    });
    // return mockProductResponse;
    return response.data;
});

export function getSku(id: string | undefined) {
    return async () => {
        try {
            const response = await axios.get('styrk/api/product/detail/sku', {
                baseURL: STYRK_API,
                params: {
                    idMerchant: 1,
                    idSKU: id
                }
            });
            dispatch(slice.actions.getSkuSuccess(response.data.response));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

type productBody = Products;

export const saveProduct = createAsyncThunk(`${slice.name}/saveProduct`, async (productBody: productBody) => {
    const response = await axios.post('styrk/api/product/save/product', productBody, {
        baseURL: STYRK_API
    });
    return response.data;
});
export function getCategories() {
    return async () => {
        try {
            const response = await axios.get('styrk/api/category/search', {
                baseURL: STYRK_API,
                params: {
                    idMerchant: 1
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
                }
            });
            dispatch(slice.actions.getTradePoliciesSucces(response.data.response));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

type FacetProduct = {
    merchantId: number | string;
    productID: number | string;
};
export const productFacetService = createAsyncThunk(`${slice.name}/facetProduct`, async ({ merchantId, productID }: FacetProduct) => {
    const response = await axios.get(`styrk/api/linkvariant/getProductFacetAsociation`, {
        baseURL: STYRK_API,
        params: {
            merchantId,
            productID
        }
    });
    return response.data;
});
type FacetToProduct = {
    merchantId: number | string;
    categoryId: number | string;
};
export const facetsToProduct = createAsyncThunk(`${slice.name}/facetsToProduct`, async ({ merchantId, categoryId }: FacetToProduct) => {
    const response = await axios.get(`styrk/api/linkvariant/getProductFacetAsociation`, {
        baseURL: STYRK_API,
        params: {
            merchantId,
            categoryId
        }
    });
    return response.data;
});

export const approvalStatus = createAsyncThunk(`${slice.name}/lifecycleapproval`, async () => {
    const response = await axios.get('/styrk/api/product/lifecycleapproval', {
        baseURL: STYRK_API,
        params: {
            idMerchant: 1
        }
    });
    return response.data;
});

export const getRejectedStatus = createAsyncThunk(`${slice.name}/rejectedstatus`, async () => {
    const response = await axios.get('/styrk/api/product/rejectcatalog', {
        baseURL: STYRK_API,
        params: {
            idMerchant: 1
        }
    });
    return response.data;
});

export const getApprovalHistorial = createAsyncThunk(
    `${slice.name}/approvalhistorial`,
    async ({ valueSku, prodId }: { valueSku: string | null; prodId: string | number | undefined }) => {
        const response = await axios.get('/styrk/api/product/approval', {
            baseURL: STYRK_API,
            params: {
                skuId: valueSku,
                prodId,
                idMerchant: 1
            }
        });
        return response.data;
    }
);

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

/* ------------------------------------------- */
/* --------- MULTI MERCHANT SERVICES --------- */
/* ------------------------------------------- */

export const getProductDetails = createAsyncThunk(
    `${slice.name}/getMultiMerchantProduct`,
    async ({ idProd, idMerchant }: { idProd: number | string; idMerchant: number | string }) => {
        // const response = await axios.get('/styrk/api/product/detail/sku-multicatalog', {
        const response = await axios.get('/styrk/api/product/detail/product-multicatalog', {
            baseURL: STYRK_API,
            params: {
                idProd,
                idMerchant
            }
        });

        return response.data.response;
    }
);

export const getProductSkuList = createAsyncThunk(
    `${slice.name}/getMultiMerchantProductSKUs`,
    async ({ idProd, merchantId }: { idProd: number | string; merchantId: number | string }) => {
        const response = await axios.get('/styrk/api/product/detail/productSkus', {
            baseURL: STYRK_API,
            params: {
                idProd,
                merchantId
            }
        });

        return response.data.response;
    }
);

export const getWerehouses = createAsyncThunk(
    `${slice.name}/getMultiMerchantWerehouses`,
    async ({ warehouses, idMerchant }: { warehouses?: number | string; idMerchant: number | string }) => {
        const response = await axios.get('/styrk/api/multicatalog/warehouses', {
            baseURL: STYRK_API,
            params: {
                idMerchant,
                warehouses
            }
        });

        return response.data;
    }
);
export const uploadImageToSku = createAsyncThunk(
    `${slice.name}/uploadImageToSku`,
    async ({
        skuId,
        idMerchant,
        files,
        isMain = false
    }: {
        skuId: number | string;
        idMerchant: number | string;
        files: File[];
        isMain?: boolean;
    }) => {
        const fileFormDataArray = files.map((file) => {
            const fileFormData = new FormData();

            fileFormData.append('isMain', `${isMain}`);
            fileFormData.append('skuId', `${skuId}`);
            fileFormData.append('file', file);
            fileFormData.append('idMerchant', `${idMerchant}`);
            fileFormData.append('imageName', file.name);
            fileFormData.append('label', new Date().toISOString());

            return axios.post('/styrk/api/images/save/file', fileFormData, {
                baseURL: STYRK_API
            });
        });

        const responseArray = await Promise.all(fileFormDataArray);

        return responseArray.map((response) => response.data.response);
    }
);

export const deleteImageToSku = createAsyncThunk(`${slice.name}/deleteImageToSku`, async ({ images }: { images: skuImageType[] }) => {
    const deleteRequests = images.map((image) =>
        axios.delete('/styrk/api/images/delete/file', {
            baseURL: STYRK_API,
            params: {
                idImage: image.IdImage,
                idMerchant: image.IdMerchant,
                idSKU: image.SkuID
            }
        })
    );

    const responseArray = await Promise.all(deleteRequests);

    return responseArray.map((response) => response.data.response);
});
