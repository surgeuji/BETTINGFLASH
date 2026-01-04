/**
 * Bet Service
 * Handles sports betting API calls
 */

import api from './api';

export const betService = {
  createBet: async (betData) => {
    const response = await api.post('/bet', betData);
    return response.data;
  },

  getUserBets: async () => {
    const response = await api.get('/bet');
    return response.data;
  },

  getRunningBets: async () => {
    const response = await api.get('/bet/running');
    return response.data;
  },

  getSettledBets: async () => {
    const response = await api.get('/bet/settled');
    return response.data;
  },

  getBetById: async (betId) => {
    const response = await api.get(`/bet/${betId}`);
    return response.data;
  },

  cancelBet: async (betId) => {
    const response = await api.post(`/bet/${betId}/cancel`);
    return response.data;
  },
};
