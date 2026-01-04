/**
 * Admin API Service
 */

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('admin');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export const adminService = {
  // Dashboard
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  // Users
  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  freezeUser: async (userId, reason) => {
    const response = await api.post(`/admin/users/${userId}/freeze`, { reason });
    return response.data;
  },

  unfreezeUser: async (userId) => {
    const response = await api.post(`/admin/users/${userId}/unfreeze`);
    return response.data;
  },

  // Wallets
  editWallet: async (userId, mainBalance, bonusBalance) => {
    const response = await api.put(`/admin/wallet/${userId}`, { mainBalance, bonusBalance });
    return response.data;
  },

  addBonus: async (userId, amount) => {
    const response = await api.post(`/admin/wallet/${userId}/bonus`, { amount });
    return response.data;
  },

  // Deposits
  getPendingDeposits: async () => {
    const response = await api.get('/admin/deposits');
    return response.data;
  },

  approveDeposit: async (depositId, bonusApplied, bonusAmount) => {
    const response = await api.post(`/admin/deposits/${depositId}/approve`, {
      bonusApplied,
      bonusAmount,
    });
    return response.data;
  },

  rejectDeposit: async (depositId, reason) => {
    const response = await api.post(`/admin/deposits/${depositId}/reject`, { reason });
    return response.data;
  },

  // Withdrawals
  getPendingWithdrawals: async () => {
    const response = await api.get('/admin/withdrawals');
    return response.data;
  },

  approveWithdrawal: async (withdrawalId) => {
    const response = await api.post(`/admin/withdrawals/${withdrawalId}/approve`);
    return response.data;
  },

  completeWithdrawal: async (withdrawalId) => {
    const response = await api.post(`/admin/withdrawals/${withdrawalId}/complete`);
    return response.data;
  },

  rejectWithdrawal: async (withdrawalId, reason) => {
    const response = await api.post(`/admin/withdrawals/${withdrawalId}/reject`, { reason });
    return response.data;
  },

  // Bets
  settleBetAsWon: async (betId, amount) => {
    const response = await api.post(`/admin/bets/${betId}/won`, { amount });
    return response.data;
  },

  settleBetAsLost: async (betId) => {
    const response = await api.post(`/admin/bets/${betId}/lost`);
    return response.data;
  },

  voidBet: async (betId, reason) => {
    const response = await api.post(`/admin/bets/${betId}/void`, { reason });
    return response.data;
  },

  // Casino
  getRunningCasinoGames: async () => {
    const response = await api.get('/admin/casino');
    return response.data;
  },

  setCasinoOutcome: async (gameId, outcome, amount) => {
    const response = await api.post(`/admin/casino/${gameId}/outcome`, { outcome, amount });
    return response.data;
  },

  // Virtual Games
  uploadVirtualGame: async (gameData) => {
    const response = await api.post('/admin/virtual/upload', gameData);
    return response.data;
  },

  setVirtualGameOutcome: async (gameId, homeGoals, awayGoals) => {
    const response = await api.post(`/admin/virtual/${gameId}/outcome`, {
      homeGoals,
      awayGoals,
    });
    return response.data;
  },

  // Promo Codes
  createPromoCode: async (promoData) => {
    const response = await api.post('/admin/promo', promoData);
    return response.data;
  },

  getActivePromoCodes: async () => {
    const response = await api.get('/admin/promo');
    return response.data;
  },

  deactivatePromoCode: async (codeId) => {
    const response = await api.post(`/admin/promo/${codeId}/deactivate`);
    return response.data;
  },

  // Logs
  getAdminLogs: async () => {
    const response = await api.get('/admin/logs');
    return response.data;
  },
};

export default api;
