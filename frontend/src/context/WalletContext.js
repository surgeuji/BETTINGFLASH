/**
 * Wallet Context
 * Manages global wallet state
 */

import React, { createContext, useState } from 'react';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateWallet = (newWallet) => {
    setWallet(newWallet);
  };

  return (
    <WalletContext.Provider value={{ wallet, loading, updateWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
