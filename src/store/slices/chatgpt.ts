// third-party
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';

/* import { STYRK_API_CHATGPT } from 'config'; */

// types
import { DefaultRootStateProps } from 'types';

const initialState: DefaultRootStateProps['chatGpt'] = {
    loading: true,
    updating: false,
    error: null,
    messageChat: null
};

const slice = createSlice({
    name: 'chatGpt',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(sendMessage.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.loading = false;
                state.messageChat = action.payload.response;
            });
    }
});
export default slice.reducer;

/* type DataMessage = {
    message: string;
    id?: number;
};
 */
/* export const sendMessage = createAsyncThunk(`${slice.name}/send-message`, async (dataMessage: string) => {
    const response = await axios.post(`api/v1/bot/send`, dataMessage, { baseURL: STYRK_API_CHATGPT });
    return response.data;
}); */
export const sendMessage = createAsyncThunk(`${slice.name}/send-message`, async (params: string) => {
    const dataMessage = { message: params };
    const response = await axios.post(`https://2smbffpj5p.us-east-1.awsapprunner.com/api/v1/bot/send`, dataMessage);
    return response.data;
});
