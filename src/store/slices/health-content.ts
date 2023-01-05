// third-party
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { STYRK_API_HEALTH_CONTENT } from 'config';
import { categoriesFlat, getCategoriesFlat } from 'utils/helpers';

// types
import { DefaultRootStateProps } from 'types';
import { BrandType, NewBrandType } from 'types/catalog';

const initialState: DefaultRootStateProps['healthContent'] = {
    loading: true,
    updating: false,
    error: null
};

const slice = createSlice({
    name: 'health-content',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        }
    }
});
export default slice.reducer;

export const getFirstLevel = createAsyncThunk(`${slice.name}/fisrt-level`, async (idMerchant?: number) => {
    const response = await axios.post(
        `styrk/api/health-content/metrics/first-level`,
        {},
        {
            baseURL: STYRK_API_HEALTH_CONTENT,
            params: {
                idMerchant: idMerchant || 1
            }
        }
    );
    return response.data;
});
