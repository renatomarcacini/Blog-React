import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api'
});

api.interceptors.request.use(
    config=>{
        let token = sessionStorage.getItem('access_token');
        config.headers['x-access-token'] = token;
        console.log(token);
        return config;
    },
    error=>{
        Promise.reject(error);
    }
);

export default api;