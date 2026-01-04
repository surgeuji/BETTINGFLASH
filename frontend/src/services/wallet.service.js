/**
 * Wallet Service
 * Handles wallet and balance API calls
 */

import api from './api';

export const walletService = {
  getWallet: async () => {
    const response = await api.get('/wallet');
    return response.data;
  },

  getDeposits: async () => {
    const response = await api.get('/deposit');
    return response.data;
  },

  createDeposit: async (depositData) => {
    const response = await api.post('/deposit', depositData);
    return response.data;
  },

  getWithdrawals: async () => {
    const response = await api.get('/withdrawal');
    return response.data;
  },

  createWithdrawal: async (withdrawalData) => {
    const response = await api.post('/withdrawal', withdrawalData);
    return response.data;
  },
};
