import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STYRK_API } from 'config';
import { DefaultRootStateProps } from 'types';
import axios from 'utils/axios';
import { createMerchantList } from 'utils/helpers';

const initialState: DefaultRootStateProps['auth'] = {
    userName: undefined,
    error: null,
    loading: true,
    user: null,
    merchants: null
};

const slice = createSlice({
    name: 'auth',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.user = action.payload.response;
                state.loading = false;
            })
            .addCase(getMerchantsList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMerchantsList.fulfilled, (state, action) => {
                const newMerchants = createMerchantList(action.payload.response.merchant);
                state.merchants = newMerchants;
            });
    },
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },
        setAuthData(state, action) {
            state.userName = action.payload;
        }
    }
});

export const getUserProfile = createAsyncThunk(`${slice.name}/getUserProfile`, async (user: string) => {
    const response = await axios.get(`styrk/api/profile/user`, {
        baseURL: STYRK_API,

        params: {
            user
        }
    });
    return response.data;
});

export const getMerchantsList = createAsyncThunk(`${slice.name}/getMerchants`, async (user: string) => {
    // api/profile/user-multicatalog?user=ohuitron
    const response = await axios.get(`styrk/api/profile/user-multicatalog`, {
        // TODO: set base url from config.js
        baseURL: STYRK_API,
        params: {
            user
        }
    });
    return response.data;
});
export const { setAuthData } = slice.actions;

// Reducer
export default slice.reducer;
