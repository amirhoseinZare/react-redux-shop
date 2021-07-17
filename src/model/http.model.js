import axios from 'axios' 
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

const instance = axios.create();

instance.defaults.timeout = 5000;
instance.defaults.baseURL = 'http://localhost:3001';

export default instance;