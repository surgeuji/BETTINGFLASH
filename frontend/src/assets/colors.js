/**
 * Global Color System
 * Single source of truth for all colors in the application
 * Theme: Dark betting/casino platform with neon accents
 */

export const colors = {
  // Primary colors
  background: '#0B0F14',
  cardBackground: '#151A21',
  
  // Actions & Status
  neonGreen: '#00FF7F',
  gold: '#FFD700',
  winGreen: '#1AFF00',
  lossRed: '#FF3B3B',
  pendingBlue: '#1E90FF',
  
  // Text
  primary: '#FFFFFF',
  secondary: '#B0B0B0',
  
  // Additional
  border: '#2A2F38',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};

export const gradients = {
  neonGlow: `0 0 20px ${colors.neonGreen}`,
  goldGlow: `0 0 15px ${colors.gold}`,
};
