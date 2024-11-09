// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000',  // Base URL of your Django backend
    headers: {
    'Content-Type': 'application/json',  // Set the content type for POST requests
    },
});

export default axiosInstance;
