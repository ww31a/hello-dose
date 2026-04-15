import axios from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Production-grade base URL configuration
// For Android Emulators, 'localhost' refers to the device itself.
// The host machine is accessible at '10.0.2.2'.
const BASE_URL = Platform.select({
  android: 'http://10.0.2.2:5001',
  ios: 'http://localhost:5001',
  default: 'http://localhost:5001',
});

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Auth Token
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
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global Data Unwrap & Error Handling
apiClient.interceptors.response.use(
  (response) => {
    // Return only the data payload from the ApiResponse structure
    return response.data?.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized (e.g., token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.warn('Unauthorized request. Token might be expired.');
    }

    // Standardize error format for frontend consumption
    // We try to extract the message from backend's ApiResponse structure if available
    const customError = {
      message: error.response?.data?.message || error.message || 'An unexpected error occurred',
      status: error.response?.status,
      data: error.response?.data?.data || null,
    };

    return Promise.reject(customError);
  }
);

export default apiClient;
