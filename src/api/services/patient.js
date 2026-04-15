import apiClient from '../apiClient';

/**
 * Patient Service
 * Handles dashboard data, logging, and scheduling for patients.
 */
export const patientService = {
  /**
   * Fetch patient dashboard data.
   * GET /api/v1/patient/dashboard
   */
  getDashboard: async () => {
    return apiClient.get('/api/v1/patient/dashboard');
  },

  /**
   * Fetch my assigned NP and upcoming appointment.
   * GET /api/v1/patient/my-np
   */
  getMyNp: async () => {
    return apiClient.get('/api/v1/patient/my-np');
  },

  /**
   * Submit a weight log.
   * POST /api/v1/patient/weight-log
   */
  logWeight: async (weight, unit = 'lbs') => {
    return apiClient.post('/api/v1/patient/weight-log', { weight, unit });
  },

  /**
   * Submit an injection log.
   * POST /api/v1/patient/injection-log
   */
  logInjection: async (dosage, site, injectedAt, notes) => {
    return apiClient.post('/api/v1/patient/injection-log', { dosage, site, injectedAt, notes });
  },

  /**
   * Fetch available appointment slots.
   * GET /api/v1/appointments/slots?date=YYYY-MM-DD
   */
  getAppointmentSlots: async (date, providerId, days = 1) => {
    return apiClient.get('/api/v1/appointments/slots', { params: { date, providerId, days } });
  },

  bookAppointment: async (startTime, providerId) => {
    return apiClient.post('/api/v1/appointments/book', { startTime, providerId });
  },

  /**
   * Fetch weight log history.
   * GET /api/v1/patient/weight-history
   */
  getWeightHistory: async () => {
    return apiClient.get('/api/v1/patient/weight-history');
  },

  /**
   * Fetch injection log history.
   * GET /api/v1/patient/injection-history
   */
  getInjectionHistory: async () => {
    return apiClient.get('/api/v1/patient/injection-history');
  },
};
