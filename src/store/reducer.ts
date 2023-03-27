// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project imports
import cartReducer from './slices/cart';
// loolu
import productReducer from './slices/product';
import snackbarReducer from './slices/snackbar';
import securityReducer from './slices/security';
import menuReducer from './slices/menu';
import authReducer from './slices/auth';
import profilesReducer from './slices/profiles';
import catalogueReducer from './slices/catalog';
import healthContentReducer from './slices/healthContent';
import reportsReducer from './slices/reports';
import chatGptReducer from './slices/chatgpt';
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    cart: persistReducer(
        {
            key: 'cart',
            storage,
            keyPrefix: 'loolu-'
        },
        cartReducer
    ),
    product: productReducer,
    healthContent: healthContentReducer,
    // loolu
    menu: menuReducer,
    user: securityReducer,
    auth: authReducer,
    snackbar: snackbarReducer,
    profile: profilesReducer,
    catalogue: catalogueReducer,
    reports: reportsReducer,
    chatGpt: chatGptReducer
});

export default reducer;
