/**
 * Withdrawal Model (Data Structure Only)
 */

class Withdrawal {
  constructor(data) {
    this.id = data.id || null;
    this.userId = data.userId || null;
    this.amount = parseFloat(data.amount || 0).toFixed(2);
    this.currency = data.currency || 'NGN';
    this.status = data.status || 'PENDING'; // PENDING, APPROVED, COMPLETED, REJECTED
    this.bankAccount = data.bankAccount || null;
    this.bankName = data.bankName || null;
    this.accountHolder = data.accountHolder || null;
    this.reference = data.reference || null;
    this.settledBetCount = data.settledBetCount || 0;
    this.requiredBetCount = data.requiredBetCount || 2; // 2 if no promo, 1 if promo
    this.requirementsMet = data.requirementsMet || false;
    this.approvedAt = data.approvedAt || null;
    this.approvedBy = data.approvedBy || null;
    this.completedAt = data.completedAt || null;
    this.notes = data.notes || '';
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }
}

module.exports = Withdrawal;
