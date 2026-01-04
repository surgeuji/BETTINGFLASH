/**
 * Casino Service
 * Handles casino game API calls
 */

import api from './api';

export const casinoService = {
  createGame: async (gameData) => {
    const response = await api.post('/casino', gameData);
    return response.data;
  },

  getUserGames: async () => {
    const response = await api.get('/casino');
    return response.data;
  },

  getGameById: async (gameId) => {
    const response = await api.get(`/casino/${gameId}`);
    return response.data;
  },
};
