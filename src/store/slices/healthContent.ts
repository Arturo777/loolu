// third-party
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// project imports
import { axiosServicesHC as axios } from 'utils/axios';

import { STYRK_API_HEALTH_CONTENT } from 'config';

// types
import { DefaultRootStateProps } from 'types';

const initialState: DefaultRootStateProps['healthContent'] = {
    loading: true,
    updating: false,
    error: null,
    firstLevel: [],
    secondLevelProducts: [],
    secondLevelImages: [],
    secondLevelFacets: [],
    thirdLevelProducts: [],
    thirdLevelImages: [],
    thirdLevelFacets: []
};

const slice = createSlice({
    name: 'health-content',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getFirstLevel.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFirstLevel.fulfilled, (state, action) => {
                state.loading = false;
                state.firstLevel = action.payload.response;
            });
        builder
            .addCase(getSecondLevelProducts.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getSecondLevelProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.secondLevelProducts = action.payload.response;
            });
        builder
            .addCase(getSecondLevelImages.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getSecondLevelImages.fulfilled, (state, action) => {
                state.loading = false;
                state.secondLevelImages = action.payload.response;
            });
        builder
            .addCase(getSecondLevelFacets.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getSecondLevelFacets.fulfilled, (state, action) => {
                state.loading = false;
                state.secondLevelFacets = action.payload.response;
            });
        builder
            .addCase(getThirdLevelProducts.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getThirdLevelProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.thirdLevelProducts = action.payload.response;
            });
        builder
            .addCase(getThirdLevelImages.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getThirdLevelImages.fulfilled, (state, action) => {
                state.loading = false;
                state.thirdLevelImages = action.payload.response;
            });
        builder
            .addCase(getThirdLevelFacets.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getThirdLevelFacets.fulfilled, (state, action) => {
                state.loading = false;
                state.thirdLevelFacets = action.payload.response;
            });
    }
});
export default slice.reducer;

export const getFirstLevel = createAsyncThunk(`${slice.name}/fisrt-level`, async () => {
    const response = await axios.get(`styrk/api/health-content/metrics/first-level`, { baseURL: STYRK_API_HEALTH_CONTENT });
    return response.data;
});

export const getSecondLevelProducts = createAsyncThunk(`${slice.name}/second-level/products`, async () => {
    const response = await axios.get(`styrk/api/health-content/metrics/products/second-level`, { baseURL: STYRK_API_HEALTH_CONTENT });
    return response.data;
});

export const getSecondLevelImages = createAsyncThunk(`${slice.name}/second-level/img`, async () => {
    const response = await axios.get(`styrk/api/health-content/metrics/images/second-level`, { baseURL: STYRK_API_HEALTH_CONTENT });
    return response.data;
});

export const getSecondLevelFacets = createAsyncThunk(`${slice.name}/second-level/facets`, async () => {
    const response = await axios.get(`styrk/api/health-content/metrics/specifications/second-level`, { baseURL: STYRK_API_HEALTH_CONTENT });
    return response.data;
});

export const getThirdLevelProducts = createAsyncThunk(`${slice.name}/third-level/products`, async (id: number | null) => {
    const response = await axios.get(`styrk/api/health-content/metrics/products/third-level`, {
        baseURL: STYRK_API_HEALTH_CONTENT,
        params: { productId: id }
    });
    return response.data;
});

export const getThirdLevelImages = createAsyncThunk(`${slice.name}/third-level/images`, async (id: number | null) => {
    const response = await axios.get(`styrk/api/health-content/metrics/images/third-level`, {
        baseURL: STYRK_API_HEALTH_CONTENT,
        params: { productId: id }
    });
    return response.data;
});

export const getThirdLevelFacets = createAsyncThunk(`${slice.name}/third-level/facets`, async (id: number | null) => {
    const response = await axios.get(`styrk/api/health-content/metrics/specifications/third-level`, {
        baseURL: STYRK_API_HEALTH_CONTENT,
        params: { productId: id }
    });
    return response.data;
});
