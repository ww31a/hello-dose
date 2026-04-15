import apiClient from '../apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Authentication Service
 * Handles OTP request, verification, and token management.
 */
export const authService = {
  /**
   * Request an OTP for a given email.
   * POST /api/v1/auth/request-otp
   */
  requestOtp: async (email) => {
    return apiClient.post('/api/v1/auth/request-otp', { email });
  },

  /**
   * Verify OTP and login.
   * POST /api/v1/auth/verify-otp
   */
  verifyOtp: async (email, otp) => {
    const response = await apiClient.post('/api/v1/auth/verify-otp', { email, otp });
    
    // If response contains accessToken, store it automatically
    if (response.accessToken) {
      await AsyncStorage.setItem('accessToken', response.accessToken);
    }
    if (response.user?.role) {
      await AsyncStorage.setItem('userRole', response.user.role);
    }
    
    return response;
  },

  /**
   * Logout and clear local storage.
   * POST /api/v1/auth/logout
   */
  logout: async () => {
    try {
      await apiClient.post('/api/v1/auth/logout');
    } catch (e) {
      console.warn("Backend logout failed, proceeding with local clearing.", e);
    }
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('userRole');
  },

  /**
   * Get current stored token status.
   */
  isAuthenticated: async () => {
    const token = await AsyncStorage.getItem('accessToken');
    return !!token;
  },
};
