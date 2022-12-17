/**
 * axios setup to use mock service
 */

import axios from 'axios';

const axiosServices = axios.create();

axiosServices.interceptors.request.use((config) => {
    const token = localStorage.getItem('serviceToken');
    /* console.log(token); */
    if (token && config && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// // interceptor for http
// axiosServices.interceptors.response.use(
//     (response) => response,
//     (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
// );

export default axiosServices;
