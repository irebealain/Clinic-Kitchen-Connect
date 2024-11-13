// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000',  // Base URL of your Django backend
    headers: {
    'Content-Type': 'application/json',  // Set the content type for POST requests
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
      console.log('Request config:', config); // Log full config
    return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
