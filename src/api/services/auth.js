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
  requestOtp: async email => {
    return apiClient.post('/api/v1/auth/request-otp', { email });
  },

  /**
   * Verify OTP and login.
   * POST /api/v1/auth/verify-otp
   */
  verifyOtp: async (email, otp) => {
    const response = await apiClient.post('/api/v1/auth/verify-otp', {
      email,
      otp,
    });

    // If response contains accessToken, store it automatically
    if (response.accessToken) {
      await AsyncStorage.setItem('accessToken', response.accessToken);
    }
    // ← store refresh token too
    if (response.refreshToken) {
      await AsyncStorage.setItem('refreshToken', response.refreshToken);
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
    // Clear locally FIRST — so the request interceptor sends no token,
    // and a 401 response won't trigger a pointless refresh attempt
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('userRole');

    try {
      await apiClient.post('/api/v1/auth/logout');
    } catch (e) {
      console.warn(
        'Backend logout call failed (token already cleared locally):',
        e,
      );
    }
  },

  /**
   * Get current stored token status.
   */
  isAuthenticated: async () => {
    const token = await AsyncStorage.getItem('accessToken');
    return !!token;
  },
};
