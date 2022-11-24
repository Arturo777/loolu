// third-party
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// project imports
import { STYRK_API, STYRK_TOKEN } from 'config';

// types
import { DefaultRootStateProps } from 'types';
import { BrandType } from 'types/cataogue';

const initialState: DefaultRootStateProps['catalogue'] = {
    loading: true,
    updating: false,
    error: null,
    brands: []
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
