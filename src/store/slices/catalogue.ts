import { createSlice } from '@reduxjs/toolkit';
import { DefaultRootStateProps } from 'types';

const initialState: DefaultRootStateProps['catalogue'] = {
    loading: true,
    updating: false,
    brands: []
};

const slice = createSlice({
    name: 'catalogue',
    initialState,
    reducers: {}
});

export default slice.reducer;
