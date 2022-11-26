// third-party
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// project imports
import { STYRK_API, STYRK_TOKEN } from 'config';

// types
import { DefaultRootStateProps } from 'types';
import { BrandType, NewBrandType } from 'types/catalogue';

const initialState: DefaultRootStateProps['catalogue'] = {
    loading: true,
    updating: false,
    error: null,
    brands: [],
    suppliers: []
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
                // console.log(action.payload);
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
            });
    }
});

export default slice.reducer;

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
