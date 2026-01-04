/**
 * Wallet Service (In-Memory Storage)
 * 
 * Manages user wallets and balances
 * All balance updates are manual (admin-only)
 */

const Wallet = require('../models/Wallet.model');

class WalletService {
  constructor() {
    // In-memory wallet store
    this.wallets = [];
  }

  /**
   * Create a new wallet for a user
   */
  createWallet(userId, initialBalance = 0) {
    const wallet = new Wallet({
      id: this.generateWalletId(),
      userId: userId,
      mainBalance: parseFloat(initialBalance).toFixed(2),
      bonusBalance: 0,
      currency: 'NGN',
    });

    this.wallets.push(wallet);
    return wallet;
  }

  /**
   * Get wallet by user ID
   */
  getWalletByUserId(userId) {
    return this.wallets.find(w => w.userId === userId);
  }

  /**
   * Get wallet by ID
   */
  getWalletById(walletId) {
    return this.wallets.find(w => w.id === walletId);
  }

  /**
   * Update main balance (Admin Only)
   */
  updateMainBalance(walletId, amount) {
    const wallet = this.getWalletById(walletId);
    if (!wallet) throw new Error('Wallet not found');

    wallet.mainBalance = parseFloat(amount).toFixed(2);
    wallet.totalBalance = parseFloat(
      (parseFloat(wallet.mainBalance) + parseFloat(wallet.bonusBalance)).toFixed(2)
    );
    wallet.updatedAt = new Date();
    return wallet;
  }

  /**
   * Update bonus balance (Admin Only)
   */
  updateBonusBalance(walletId, amount) {
    const wallet = this.getWalletById(walletId);
    if (!wallet) throw new Error('Wallet not found');

    wallet.bonusBalance = parseFloat(amount).toFixed(2);
    wallet.totalBalance = parseFloat(
      (parseFloat(wallet.mainBalance) + parseFloat(wallet.bonusBalance)).toFixed(2)
    );
    wallet.updatedAt = new Date();
    return wallet;
  }

  /**
   * Add funds to main balance (Admin Only)
   */
  creditMainBalance(walletId, amount) {
    const wallet = this.getWalletById(walletId);
    if (!wallet) throw new Error('Wallet not found');

    const newBalance = parseFloat(wallet.mainBalance) + parseFloat(amount);
    return this.updateMainBalance(walletId, newBalance);
  }

  /**
   * Deduct funds from main balance (Admin Only)
   */
  debitMainBalance(walletId, amount) {
    const wallet = this.getWalletById(walletId);
    if (!wallet) throw new Error('Wallet not found');

    const newBalance = parseFloat(wallet.mainBalance) - parseFloat(amount);
    if (newBalance < 0) throw new Error('Insufficient balance');

    return this.updateMainBalance(walletId, newBalance);
  }

  /**
   * Add bonus to bonus balance (Admin Only)
   */
  addBonus(walletId, amount) {
    const wallet = this.getWalletById(walletId);
    if (!wallet) throw new Error('Wallet not found');

    const newBonusBalance = parseFloat(wallet.bonusBalance) + parseFloat(amount);
    return this.updateBonusBalance(walletId, newBonusBalance);
  }

  /**
   * Generate unique wallet ID
   */
  generateWalletId() {
    return `WAL_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

module.exports = new WalletService();
