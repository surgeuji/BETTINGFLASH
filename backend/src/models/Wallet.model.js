/**
 * Wallet Model (Data Structure Only)
 * 
 * Each user has a wallet with three balance types:
 * - mainBalance: Withdrawable balance
 * - bonusBalance: Non-withdrawable bonus balance
 * - withdrawableBalance: Calculated field (mainBalance only)
 */

class Wallet {
  constructor(data) {
    this.id = data.id || null;
    this.userId = data.userId || null;
    this.mainBalance = parseFloat(data.mainBalance || 0).toFixed(2);
    this.bonusBalance = parseFloat(data.bonusBalance || 0).toFixed(2);
    this.totalBalance = parseFloat((parseFloat(this.mainBalance) + parseFloat(this.bonusBalance)).toFixed(2));
    this.currency = data.currency || 'NGN';
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  getWithdrawableBalance() {
    return this.mainBalance;
  }

  getTotalBalance() {
    return this.totalBalance;
  }
}

module.exports = Wallet;
