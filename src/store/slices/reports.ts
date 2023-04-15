import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';

// consts
import { STYRK_API } from 'config';

// types
import { DefaultRootStateProps } from 'types';

const initialState: DefaultRootStateProps['reports'] = {
    error: null,
    loading: false,
    changeLog: []
};

const reports = createSlice({
    name: 'reports',
    initialState,
    reducers: {},
    extraReducers(builder) {
        // CHANGE LOG
        builder
            .addCase(getChangeLogList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getChangeLogList.fulfilled, (state, action) => {
                state.loading = false;
                state.changeLog = action.payload.response;
            });
    }
});

export default reports.reducer;

export const getChangeLogList = createAsyncThunk(`${reports.name}/getChangeLogList`, async (idMerchant: number | null) => {
    const response = await axios.post(
        `styrk/api/multicatalog/product/changelog`,
        {},
        {
            baseURL: STYRK_API,
            params: {
                idMerchant: idMerchant || 1
            }
        }
    );
    return response.data;
});
