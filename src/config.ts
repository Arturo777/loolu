// types
import { ConfigProps } from 'types/config';

export const JWT_API = {
    secret: 'SECRET-KEY',
    timeout: '1 days'
};

export const FIREBASE_API = {
    apiKey: 'AIzaSyBernKzdSojh_vWXBHt0aRhf5SC9VLChbM',
    authDomain: 'berry-material-react.firebaseapp.com',
    projectId: 'berry-material-react',
    storageBucket: 'berry-material-react.appspot.com',
    messagingSenderId: '901111229354',
    appId: '1:901111229354:web:a5ae5aa95486297d69d9d3',
    measurementId: 'G-MGJHSL8XW3'
};

export const AUTH0_API = {
    client_id: '7T4IlWis4DKHSbG8JAye4Ipk0rvXkH9V',
    domain: 'dev-w0-vxep3.us.auth0.com'
};

export const AWS_API = {
    poolId: 'us-east-1_AOfOTXLvD',
    appClientId: '3eau2osduslvb7vks3vsh9t7b0'
};

export const STYRK_API = 'http://styrk-vinneren.us-east-1.elasticbeanstalk.com:8093';
export const STYRK_TOKEN =
    'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJzdHlya0pXVCIsInN1YiI6Im9odWl0cm9uIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY2OTY3NjkxNywiZXhwIjoxNjY5NjgyOTE3fQ.46lxjwr9jAK6I5ihaARFy3IkT72Gi6iIB21aqjoh41UnEBQAM2RD1BD4RI7vyxefKsuPNwu7j0ckhJx6pz3-cw';

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
