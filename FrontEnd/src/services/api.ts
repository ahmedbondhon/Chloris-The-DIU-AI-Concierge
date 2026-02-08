import axios from 'axios';

// 1. Create the connection instance
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1', // Points to your FastAPI Backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. The "Interceptor" (The Security Guard)
// Before any request leaves the browser, this checks if you have a token.
// If you do, it stamps it onto the request header.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;