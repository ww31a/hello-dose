import apiClient from '../apiClient';

/**
 * Provider Service
 * Handles dashboard, patient lists, and availability for medical providers (NPs).
 */
export const providerService = {
  /**
   * Fetch provider dashboard data.
   * GET /api/v1/provider/dashboard
   */
  getDashboard: async () => {
    return apiClient.get('/api/v1/provider/dashboard');
  },

  /**
   * Fetch list of active patients.
   * GET /api/v1/provider/patients
   */
  getPatients: async () => {
    return apiClient.get('/api/v1/provider/patients');
  },

  /**
   * Fetch specific patient details.
   * GET /api/v1/provider/patients/:id
   */
  getPatientDetails: async (id) => {
    return apiClient.get(`/api/v1/provider/patients/${id}`);
  },

  /**
   * Fetch provider profile.
   * GET /api/v1/provider/profile
   */
  getProfile: async () => {
    return apiClient.get('/api/v1/provider/profile');
  },

  /**
   * Fetch provider availability.
   * GET /api/v1/provider/availability
   */
  getAvailability: async () => {
    return apiClient.get('/api/v1/provider/availability');
  },

  /**
   * Update provider availability.
   * PATCH /api/v1/provider/availability
   */
  updateAvailability: async (availabilityData) => {
    return apiClient.patch('/api/v1/provider/availability', availabilityData);
  },
};
