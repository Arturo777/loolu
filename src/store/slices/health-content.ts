// third-party
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { STYRK_API_HEALTH_CONTENT } from 'config';

// types
import { DefaultRootStateProps } from 'types';

const initialState: DefaultRootStateProps['healthContent'] = {
    loading: true,
    updating: false,
    error: null,
    firstLevel: []
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
    }
});
export default slice.reducer;

export const getFirstLevel = createAsyncThunk(`${slice.name}/fisrt-level`, async () => {
    const response = await axios.get(`styrk/api/health-content/metrics/first-level`, { baseURL: STYRK_API_HEALTH_CONTENT });
    return response.data;
});
