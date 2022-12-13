import { createSlice } from '@reduxjs/toolkit';
import { DefaultRootStateProps } from 'types';

const initialState: DefaultRootStateProps['auth'] = {
    userName: undefined,
    error: null
};

const slice = createSlice({
    name: 'calendar',
    initialState,
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

export const { setAuthData } = slice.actions;

// Reducer
export default slice.reducer;
