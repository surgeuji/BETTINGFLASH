/**
 * Withdrawal Service (In-Memory Storage)
 * 
 * Manages withdrawal requests and manual approval workflow
 */

const Withdrawal = require('../models/Withdrawal.model');

class WithdrawalService {
  constructor() {
    // In-memory withdrawal store
    this.withdrawals = [];
  }

  /**
   * Create a new withdrawal request (User initiated)
   */
  createWithdrawal(userId, data) {
    const withdrawal = new Withdrawal({
      id: this.generateWithdrawalId(),
      userId: userId,
      amount: data.amount,
      currency: data.currency || 'NGN',
      status: 'PENDING',
      bankAccount: data.bankAccount,
      bankName: data.bankName,
      accountHolder: data.accountHolder,
      requiredBetCount: data.requiredBetCount || 2,
      requirementsMet: data.requirementsMet || false,
    });

    this.withdrawals.push(withdrawal);
    return withdrawal;
  }

  /**
   * Get withdrawal by ID
   */
  getWithdrawalById(withdrawalId) {
    return this.withdrawals.find(w => w.id === withdrawalId);
  }

  /**
   * Get all withdrawals by user
   */
  getWithdrawalsByUserId(userId) {
    return this.withdrawals.filter(w => w.userId === userId);
  }

  /**
   * Get pending withdrawals
   */
  getPendingWithdrawals() {
    return this.withdrawals.filter(w => w.status === 'PENDING');
  }

  /**
   * Approve withdrawal (Admin Only)
   */
  approveWithdrawal(withdrawalId, adminId) {
    const withdrawal = this.getWithdrawalById(withdrawalId);
    if (!withdrawal) throw new Error('Withdrawal not found');

    withdrawal.status = 'APPROVED';
    withdrawal.approvedAt = new Date();
    withdrawal.approvedBy = adminId;

    return withdrawal;
  }

  /**
   * Mark withdrawal as completed (paid out)
   */
  completeWithdrawal(withdrawalId) {
    const withdrawal = this.getWithdrawalById(withdrawalId);
    if (!withdrawal) throw new Error('Withdrawal not found');

    withdrawal.status = 'COMPLETED';
    withdrawal.completedAt = new Date();

    return withdrawal;
  }

  /**
   * Reject withdrawal (Admin Only)
   */
  rejectWithdrawal(withdrawalId, adminId, reason = '') {
    const withdrawal = this.getWithdrawalById(withdrawalId);
    if (!withdrawal) throw new Error('Withdrawal not found');

    withdrawal.status = 'REJECTED';
    withdrawal.approvedAt = new Date();
    withdrawal.approvedBy = adminId;
    withdrawal.notes = reason;

    return withdrawal;
  }

  /**
   * Get all withdrawals
   */
  getAllWithdrawals() {
    return this.withdrawals;
  }

  /**
   * Generate unique withdrawal ID
   */
  generateWithdrawalId() {
    return `WID_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

module.exports = new WithdrawalService();
