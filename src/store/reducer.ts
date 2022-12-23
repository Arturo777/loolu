// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project imports
import customerReducer from './slices/customer';
import contactReducer from './slices/contact';
import chatReducer from './slices/chat';
import calendarReducer from './slices/calendar';
import mailReducer from './slices/mail';
import cartReducer from './slices/cart';
import kanbanReducer from './slices/kanban';
// loolu
import productReducer from './slices/product';
import snackbarReducer from './slices/snackbar';
import securityReducer from './slices/security';
import menuReducer from './slices/menu';
import authReducer from './slices/auth';
import profilesReducer from './slices/profiles';
import catalogueReducer from './slices/catalog';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    cart: persistReducer(
        {
            key: 'cart',
            storage,
            keyPrefix: 'berry-'
        },
        cartReducer
    ),
    kanban: kanbanReducer,
    customer: customerReducer,
    contact: contactReducer,
    product: productReducer,
    chat: chatReducer,
    calendar: calendarReducer,
    mail: mailReducer,
    // loolu
    menu: menuReducer,
    user: securityReducer,
    auth: authReducer,
    snackbar: snackbarReducer,
    profile: profilesReducer,
    catalogue: catalogueReducer
});

export default reducer;
