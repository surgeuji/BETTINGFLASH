/**
 * Promo Code Model (Data Structure Only)
 */

class PromoCode {
  constructor(data) {
    this.id = data.id || null;
    this.code = data.code || null; // Format: XXX-NNN
    this.bonusPercentage = data.bonusPercentage || 500; // 500% bonus on first deposit
    this.minimumDeposit = parseFloat(data.minimumDeposit || 0).toFixed(2);
    this.maxBonusAmount = parseFloat(data.maxBonusAmount || 50000).toFixed(2);
    this.usageLimit = data.usageLimit || -1; // -1 = unlimited
    this.usageCount = data.usageCount || 0;
    this.isActive = data.isActive || true;
    this.withdrawalRequirement = data.withdrawalRequirement || 1; // 1 settled bet required
    this.expiryDate = data.expiryDate || null;
    this.createdAt = data.createdAt || new Date();
    this.createdBy = data.createdBy || null; // Admin ID
    this.notes = data.notes || '';
  }
}

module.exports = PromoCode;
