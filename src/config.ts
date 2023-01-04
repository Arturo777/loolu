// types
import { ConfigProps } from 'types/config';

export const JWT_API = {
    secret: 'SECRET-KEY',
    timeout: '1 days'
};

export const FIREBASE_API = {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
};

export const AUTH0_API = {
    client_id: '',
    domain: ''
};

export const AWS_API = {
    poolId: process.env.REACT_APP_AWS_POOL_ID,
    appClientId: process.env.REACT_APP_AWS_CLIENT_ID
};

export const STYRK_API = process.env.REACT_APP_STYRK_API;
export const STYRK_API_ALTERNATIVE = process.env.REACT_APP_STYRK_API_ALTERNATIVE;

// basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
// like '/berry-material-react/react/default'
export const BASE_PATH = '';

export const DASHBOARD_PATH = '/products';

const config: ConfigProps = {
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 8,
    outlinedFilled: true,
    navType: 'dark', // light, dark
    presetColor: 'default', // default, theme1, theme2, theme3, theme4, theme5, theme6
    locale: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    rtlLayout: false,
    container: false
};

export default config;
