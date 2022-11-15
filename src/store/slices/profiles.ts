import { createSlice } from '@reduxjs/toolkit';
import { DefaultRootStateProps } from 'types';

const initialState: DefaultRootStateProps['profile'] = {
    loading: true,
    fetching: false,
    error: null,
    profiles: []
};

const slice = createSlice({
    name: 'profile',
    initialState,
    reducers: {}
});

// Reducer
export default slice.reducer;
