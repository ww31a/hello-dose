import axios from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeviceEventEmitter } from 'react-native';


const BASE_URL = __DEV__
  ? Platform.select({
      android: 'http://10.0.2.2:5001',
      ios: 'http://localhost:5001',
      default: 'http://localhost:5001',
    })
  : 'https://hellodose-backend.onrender.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Token refresh queue ──
// Prevents multiple simultaneous refresh calls when several requests 401 at once
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// ── Request Interceptor ──
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error fetching token from storage:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor ──
apiClient.interceptors.response.use(
  (response) => response.data?.data,
  async (error) => {
    const originalRequest = error.config;

    // Only attempt refresh on 401, and not for auth endpoints themselves
    // (prevents infinite loops on login/refresh failures)
    const isAuthEndpoint = originalRequest.url?.includes('/auth/');
    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      
      // If a refresh is already in flight, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token stored');
        }

        // Call refresh endpoint — use plain axios to avoid interceptor loop
        const { data } = await axios.post(`${BASE_URL}/api/v1/auth/refresh-token`, {
          refreshToken,
        });

        const newAccessToken = data?.data?.accessToken;
        const newRefreshToken = data?.data?.refreshToken;

        await AsyncStorage.setItem('accessToken', newAccessToken);
        if (newRefreshToken) {
          await AsyncStorage.setItem('refreshToken', newRefreshToken);
        }

        // Retry all queued requests with new token
        processQueue(null, newAccessToken);

        // Retry the original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed — clear storage and let the app handle sign-out
        processQueue(refreshError, null);
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'userRole'])
        DeviceEventEmitter.emit('onSessionExpired');
        // Optionally emit an event here so your app can redirect to login
        // e.g. DeviceEventEmitter.emit('onSessionExpired');
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    const customError = {
      message: error.response?.data?.message || error.message || 'An unexpected error occurred',
      status: error.response?.status,
      data: error.response?.data?.data || null,
    };

    return Promise.reject(customError);
  }
);

export default apiClient;