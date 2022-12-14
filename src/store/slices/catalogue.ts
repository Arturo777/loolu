// third-party
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// project imports
import { STYRK_API, STYRK_TOKEN, STYRK_API_ALTERNATIVE } from 'config';
import { getCategoriesFlat } from 'utils/helpers';

// types
import { DefaultRootStateProps } from 'types';
import { BrandType, NewBrandType } from 'types/catalogue';

const initialState: DefaultRootStateProps['catalogue'] = {
    loading: true,
    updating: false,
    error: null,
    brands: [],
    suppliers: [],
    facetsInfo: {
        facets: [],
        maxPage: 1
    },
    categories: [],
    flatCategories: []
};

const slice = createSlice({
    name: 'catalogue',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        }
    },
    extraReducers(builder) {
        // BRANDS
        builder
            .addCase(getBrands.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBrands.fulfilled, (state, action) => {
                state.loading = false;
                state.brands = action.payload.response.map((item: BrandType) => ({ ...item, id: item.idBrand }));
            })
            .addCase(createBrand.pending, (state) => {
                state.loading = true;
            })
            .addCase(createBrand.fulfilled, (state) => {
                state.loading = false;
            });
        // SUPPLIERS
        builder
            .addCase(getSuppliers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSuppliers.fulfilled, (state, action) => {
                state.loading = false;
                state.suppliers = action.payload.response;
            })
            .addCase(createSupplier.pending, (state) => {
                state.updating = true;
            })
            .addCase(createSupplier.fulfilled, (state) => {
                state.updating = false;
            })
            .addCase(editSupplier.pending, (state) => {
                state.updating = true;
            })
            .addCase(editSupplier.fulfilled, (state) => {
                state.updating = false;
            });
        // FACETS
        builder
            .addCase(getFacetsService.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFacetsService.fulfilled, (state, action) => {
                state.loading = false;
                state.facetsInfo = {
                    facets: action.payload.response,
                    maxPage: action.payload.totalPages
                };
            });
        // CATEGORIES
        builder
            .addCase(getCategoriesService.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCategoriesService.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload.response;

                state.flatCategories = getCategoriesFlat(action.payload.response);
            })
            .addCase(createCategoryService.pending, (state) => {
                state.updating = true;
            })
            .addCase(createCategoryService.fulfilled, (state) => {
                state.updating = false;
            });
    }
});

export default slice.reducer;

/* ---- BRANDS ---- */

export const getBrands = createAsyncThunk(`${slice.name}/getBrands`, async (idMerchant?: number) => {
    const response = await axios.post(
        `styrk/api/brand/search`,
        {},
        {
            baseURL: STYRK_API,
            params: {
                idMerchant: idMerchant || 1
            },
            headers: {
                authorization: `Bearer ${STYRK_TOKEN}`
            }
        }
    );
    return response.data;
});

type editBrandParams = {
    dataBrand: BrandType;
    idMerchant?: number;
};

export const editBrand = createAsyncThunk(`${slice.name}/editBrand`, async (params: editBrandParams) => {
    const { dataBrand, idMerchant } = params;
    const response = await axios.post(`styrk/api/brand/create`, dataBrand, {
        baseURL: STYRK_API,
        params: {
            idMerchant: idMerchant || 1
        },
        headers: {
            authorization: `Bearer ${STYRK_TOKEN}`
        }
    });
    return response.data;
});

type createBrandParams = {
    dataBrand: NewBrandType;
    idMerchant?: number;
};

export const createBrand = createAsyncThunk(`${slice.name}/editBrand`, async (params: createBrandParams) => {
    const { dataBrand, idMerchant } = params;
    const response = await axios.post(`styrk/api/brand/create`, dataBrand, {
        baseURL: STYRK_API,
        params: {
            idMerchant: idMerchant || 1
        },
        headers: {
            authorization: `Bearer ${STYRK_TOKEN}`
        }
    });
    return response.data;
});

/* ---- SUPPLIERS ---- */

export const getSuppliers = createAsyncThunk(`${slice.name}/getSuppliers`, async (idMerchant?: number) => {
    const response = await axios.get(`styrk/api/supplier/search`, {
        baseURL: STYRK_API,
        params: {
            idMerchant: idMerchant || 1
        },
        headers: {
            authorization: `Bearer ${STYRK_TOKEN}`
        }
    });
    return response.data;
});

type createSupplierProps = {
    idMerchant?: number;
    data: {
        name: string;
        country: string;
    };
};

export const createSupplier = createAsyncThunk(`${slice.name}/createSupplier`, async ({ idMerchant, data }: createSupplierProps) => {
    const response = await axios.post(`styrk/api/supplier/create`, data, {
        baseURL: STYRK_API,
        params: {
            idMerchant: idMerchant || 1
        },
        headers: {
            authorization: `Bearer ${STYRK_TOKEN}`
        }
    });
    return response.data;
});

type editSupplierProps = {
    idMerchant?: number;
    data: {
        name: string;
        country: string;
        idProvider?: number;
    };
};

export const editSupplier = createAsyncThunk(`${slice.name}/editSupplier`, async ({ idMerchant, data }: editSupplierProps) => {
    const response = await axios.post(`styrk/api/supplier/create`, data, {
        baseURL: STYRK_API,
        params: {
            idMerchant: idMerchant || 1
        },
        headers: {
            authorization: `Bearer ${STYRK_TOKEN}`
        }
    });
    return response.data;
});

/* ---- SUPPLIERS ---- */

type getFacetsServiceProps = {
    idMerchant: number;
    page: number;
    term: string;
};

export const getFacetsService = createAsyncThunk(`${slice.name}/getFacets`, async ({ idMerchant, term, page }: getFacetsServiceProps) => {
    const response = await axios.get(`facets/raw/merchant/${idMerchant}/search/${term}`, {
        baseURL: STYRK_API_ALTERNATIVE,
        params: {
            pageNum: page
        },
        headers: {
            authorization: `Bearer ${STYRK_TOKEN}`
        }
    });
    return response.data;
});

// styrk/api/facets/raw/{id}?merchantId=1

type getFacetServiceProps = {
    merchantId: number;
    facetId: number;
};

export const getFacetService = createAsyncThunk(`${slice.name}/getFacet`, async ({ merchantId, facetId }: getFacetServiceProps) => {
    const response = await axios.get(`styrk/api/facets/raw/${facetId}`, {
        baseURL: STYRK_API,
        params: {
            merchantId: merchantId ?? 1,
            id: facetId
        },
        headers: {
            authorization: `Bearer ${STYRK_TOKEN}`
        }
    });
    return response.data;
});

type createFacetServiceProps = {
    idMerchant: number;
    data: {
        name: string;
        nameSap: string;
    };
};

export const createFacetService = createAsyncThunk(`${slice.name}/createFacet`, async ({ idMerchant, data }: createFacetServiceProps) => {
    try {
        const response = await axios.post(`facets/fv/merchant/${idMerchant}`, data, {
            baseURL: STYRK_API_ALTERNATIVE,
            headers: {
                authorization: `Bearer ${STYRK_TOKEN}`
            }
        });
        return response.data;
    } catch (e: any) {
        return e.response;
    }
});

type editFacetServiceProps = {
    merchantId: number;
    data: {
        name: string;
        nameSap: string;
        id: number;
    }[];
};

export const editFacetService = createAsyncThunk(`${slice.name}/editFacet`, async ({ merchantId, data }: editFacetServiceProps) => {
    try {
        const response = await axios.put(`/facets/raw/merchant/${merchantId}`, data, {
            baseURL: STYRK_API_ALTERNATIVE,
            headers: {
                authorization: `Bearer ${STYRK_TOKEN}`
            }
        });
        return response.data;
    } catch (e: any) {
        return e.response;
    }
});

// `${process.env.BASE_API_URL}/category/search?idMerchant=${merchantId}`

/* ---- CATEGORIES ---- */

type getCategoriesServiceProps = {
    idMerchant: 1;
};

export const getCategoriesService = createAsyncThunk(`${slice.name}/getCategories`, async ({ idMerchant }: getCategoriesServiceProps) => {
    const response = await axios.get(`styrk/api/category/search`, {
        baseURL: STYRK_API,
        params: {
            idMerchant
        },
        headers: {
            authorization: `Bearer ${STYRK_TOKEN}`
        }
    });
    return response.data;
});

type createCategoryProps = {
    idMerchant: number;
    data: { name: string; fatherCategoryId: number };
};

export const createCategoryService = createAsyncThunk(`${slice.name}/createCategory`, async ({ idMerchant, data }: createCategoryProps) => {
    const response = await axios.post(
        `styrk/api/category/create?idMerchant=${idMerchant}`,
        { ...data, isActive: true },
        {
            baseURL: STYRK_API,
            headers: {
                authorization: `Bearer ${STYRK_TOKEN}`
            }
        }
    );
    return response.data;
});

type getCategoryInfoServiceProps = {
    idMerchant: number;
    categoryId: number;
};

export const getCategoryInfoService = createAsyncThunk(
    `${slice.name}/getCategory`,
    async ({ idMerchant, categoryId }: getCategoryInfoServiceProps) => {
        const response = await axios.get(`styrk/api/category/get`, {
            baseURL: STYRK_API,
            params: {
                idMerchant: idMerchant || 1,
                categoryId
            },
            headers: {
                authorization: `Bearer ${STYRK_TOKEN}`
            }
        });
        return response.data;
    }
);

type editCategoryServiceProps = {
    idMerchant: number;
    category: {
        activeStoreFrontLink: boolean;
        adWordsRemarketingCode: boolean | null;
        description: string;
        fatherCategoryId: number | null;
        hasChildren: boolean;
        id: number;
        isActive: boolean;
        name: string;
        numberChildren: number | string;
        score: number | string;
        showBrandFilter: boolean;
        showInStoreFront: boolean;
        stockKeepingUnitSelectionMode: string;
        title: string;
    };
};

export const editCategoryService = createAsyncThunk(
    `${slice.name}/getCategory`,
    async ({ idMerchant, category }: editCategoryServiceProps) => {
        const response = await axios.post(`styrk/api/category/update`, category, {
            baseURL: STYRK_API,
            params: {
                idMerchant: idMerchant || 1
            },
            headers: {
                authorization: `Bearer ${STYRK_TOKEN}`
            }
        });
        return response.data;
    }
);
