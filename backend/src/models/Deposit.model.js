/**
 * Deposit Model (Data Structure Only)
 */

class Deposit {
  constructor(data) {
    this.id = data.id || null;
    this.userId = data.userId || null;
    this.amount = parseFloat(data.amount || 0).toFixed(2);
    this.currency = data.currency || 'NGN';
    this.method = data.method || 'BANK_TRANSFER'; // BANK_TRANSFER, CARD, WALLET
    this.status = data.status || 'PENDING'; // PENDING, APPROVED, REJECTED, COMPLETED
    this.reference = data.reference || null;
    this.bankUsed = data.bankUsed || null; // opay, palmpay, etc
    this.proofOfPayment = data.proofOfPayment || null;
    this.approvedAt = data.approvedAt || null;
    this.approvedBy = data.approvedBy || null; // Admin ID
    this.bonusApplied = data.bonusApplied || false;
    this.bonusAmount = parseFloat(data.bonusAmount || 0).toFixed(2);
    this.notes = data.notes || '';
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }
}

module.exports = Deposit;
