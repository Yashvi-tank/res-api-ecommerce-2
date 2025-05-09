import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    // attach however your backend expects it:
    config.headers.Authorization = `Bearer ${token}`;
    // or, if your middleware reads `req.headers.token` instead:
    // config.headers.token = token;
  }
  return config;
});

export default api;
