import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';
import { jwtDecode } from 'jwt-decode';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const plainApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) return config;

    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      try {
        token = await refreshToken();
      } catch (error) {
        console.error('Failed to refresh token:', error);
      }
    }

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

async function refreshToken() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  const res = await plainApi.post('/api/token/refresh/', { refresh: refreshToken });

  if (res.status === 200) {
    localStorage.setItem(ACCESS_TOKEN, res.data.access);
    return res.data.access;
  }

  throw new Error('Refresh token expired');
}

export default api;
