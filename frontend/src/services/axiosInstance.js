import axios from 'axios';
import Cookies from 'js-cookie';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Adjust to your Django backend URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Needed to include cookies in requests
});

// Add a request interceptor to attach the CSRF token from cookies
axiosInstance.interceptors.request.use((config) => {
  const csrfToken = Cookies.get('csrftoken'); // The Django CSRF token cookie
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
});

export default axiosInstance;
