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
    poolId: 'us-east-1_YRimhKJeh',
    appClientId: '1dqlt9vqcovkrqnebcud7f1s9f'
};

export const STYRK_API = 'http://styrk-vinneren.us-east-1.elasticbeanstalk.com:8093';
export const STYRK_API_ALTERNATIVE = 'https://services.styrk.io/process-stage/styrk/';

export const STYRK_TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJzdHlya0pXVCIsInN1YiI6Im9odWl0cm9uIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY3MTIxMDI3NSwiZXhwIjoxNjcxMjE2Mjc1fQ.RWEvLhropNsNmjExBsgiuf3c2GvijG03XzOYdJXgQGeyoswxH5mkCKBCoGMsJhG9N6nyMJo0DqwmIRn1FKcw2g';

// basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
// like '/berry-material-react/react/default'
export const BASE_PATH = '';

export const DASHBOARD_PATH = '/products';

const config: ConfigProps = {
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 8,
    outlinedFilled: true,
    navType: 'light', // light, dark
    presetColor: 'default', // default, theme1, theme2, theme3, theme4, theme5, theme6
    locale: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    rtlLayout: false,
    container: false
};

export default config;
