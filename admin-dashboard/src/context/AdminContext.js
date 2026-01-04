/**
 * Admin Context
 * Manages admin role and permissions
 */

import React, { createContext, useState, useEffect } from 'react';
import { adminAuthService } from '../services/admin.auth.service';

export const AdminContext = createContext();

const ROLE_PERMISSIONS = {
  SUPER_ADMIN: ['users', 'wallets', 'deposits', 'withdrawals', 'bets', 'casino', 'virtual', 'promo', 'logs', 'dashboard'],
  FINANCE_ADMIN: ['wallets', 'deposits', 'withdrawals', 'dashboard'],
  OPERATIONS_ADMIN: ['bets', 'casino', 'virtual', 'dashboard'],
  SUPPORT_ADMIN: ['dashboard'],
};

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAdmin = adminAuthService.getCurrentAdmin();
    if (savedAdmin) {
      setAdmin(savedAdmin);
    }
    setLoading(false);
  }, []);

  const canAccess = (page) => {
    if (!admin) return false;
    const permissions = ROLE_PERMISSIONS[admin.adminRole] || [];
    return permissions.includes(page);
  };

  const logout = () => {
    adminAuthService.logout();
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, loading, canAccess, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
