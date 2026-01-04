/**
 * Deposit Service (In-Memory Storage)
 * 
 * Manages deposit requests and manual approval workflow
 */

const Deposit = require('../models/Deposit.model');

class DepositService {
  constructor() {
    // In-memory deposit store
    this.deposits = [];
  }

  /**
   * Create a new deposit request (User initiated)
   */
  createDeposit(userId, data) {
    const deposit = new Deposit({
      id: this.generateDepositId(),
      userId: userId,
      amount: data.amount,
      currency: data.currency || 'NGN',
      method: data.method || 'BANK_TRANSFER',
      status: 'PENDING',
      bankUsed: data.bankUsed,
      proofOfPayment: data.proofOfPayment || null,
    });

    this.deposits.push(deposit);
    return deposit;
  }

  /**
   * Get deposit by ID
   */
  getDepositById(depositId) {
    return this.deposits.find(d => d.id === depositId);
  }

  /**
   * Get all deposits by user
   */
  getDepositsByUserId(userId) {
    return this.deposits.filter(d => d.userId === userId);
  }

  /**
   * Get pending deposits
   */
  getPendingDeposits() {
    return this.deposits.filter(d => d.status === 'PENDING');
  }

  /**
   * Approve deposit (Admin Only)
   */
  approveDeposit(depositId, adminId, bonusApplied = false, bonusAmount = 0) {
    const deposit = this.getDepositById(depositId);
    if (!deposit) throw new Error('Deposit not found');

    deposit.status = 'APPROVED';
    deposit.approvedAt = new Date();
    deposit.approvedBy = adminId;
    deposit.bonusApplied = bonusApplied;
    deposit.bonusAmount = bonusAmount;

    return deposit;
  }

  /**
   * Reject deposit (Admin Only)
   */
  rejectDeposit(depositId, adminId, reason = '') {
    const deposit = this.getDepositById(depositId);
    if (!deposit) throw new Error('Deposit not found');

    deposit.status = 'REJECTED';
    deposit.approvedAt = new Date();
    deposit.approvedBy = adminId;
    deposit.notes = reason;

    return deposit;
  }

  /**
   * Mark deposit as completed
   */
  completeDeposit(depositId) {
    const deposit = this.getDepositById(depositId);
    if (!deposit) throw new Error('Deposit not found');

    deposit.status = 'COMPLETED';
    return deposit;
  }

  /**
   * Get all deposits
   */
  getAllDeposits() {
    return this.deposits;
  }

  /**
   * Generate unique deposit ID
   */
  generateDepositId() {
    return `DEP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

module.exports = new DepositService();
