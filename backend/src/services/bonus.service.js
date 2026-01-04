/**
 * Bonus Service
 * 
 * Manages promo codes and bonus rules
 */

const PromoCode = require('../models/PromoCode.model');
const { generatePromoCode, isValidPromoCodeFormat } = require('../utils/generateCode');

class BonusService {
  constructor() {
    // In-memory promo code store
    this.promoCodes = [];
    this.codeIndex = {}; // For fast lookup
  }

  /**
   * Create a new promo code (Admin Only)
   */
  createPromoCode(adminId, data) {
    const code = generatePromoCode();

    // Check if code already exists
    if (this.codeIndex[code]) {
      return this.createPromoCode(adminId, data); // Retry if duplicate
    }

    const promoCode = new PromoCode({
      id: this.generatePromoId(),
      code: code,
      bonusPercentage: data.bonusPercentage || 500,
      minimumDeposit: data.minimumDeposit || 0,
      maxBonusAmount: data.maxBonusAmount || 50000,
      usageLimit: data.usageLimit || -1,
      usageCount: 0,
      isActive: true,
      withdrawalRequirement: data.withdrawalRequirement || 1,
      expiryDate: data.expiryDate || null,
      createdBy: adminId,
    });

    this.promoCodes.push(promoCode);
    this.codeIndex[code] = promoCode.id;

    return promoCode;
  }

  /**
   * Validate and retrieve promo code
   */
  validatePromoCode(code) {
    if (!isValidPromoCodeFormat(code)) {
      throw new Error('Invalid promo code format');
    }

    const promoCode = this.promoCodes.find(p => p.code === code);
    if (!promoCode) throw new Error('Promo code not found');
    if (!promoCode.isActive) throw new Error('Promo code is inactive');

    // Check expiry
    if (promoCode.expiryDate && new Date() > new Date(promoCode.expiryDate)) {
      throw new Error('Promo code has expired');
    }

    // Check usage limit
    if (promoCode.usageLimit !== -1 && promoCode.usageCount >= promoCode.usageLimit) {
      throw new Error('Promo code usage limit reached');
    }

    return promoCode;
  }

  /**
   * Apply promo code to deposit
   */
  applyPromoCodeBonus(depositAmount, promoCode) {
    // Check minimum deposit requirement
    if (parseFloat(depositAmount) < parseFloat(promoCode.minimumDeposit)) {
      throw new Error(`Minimum deposit required: ${promoCode.minimumDeposit}`);
    }

    const bonusAmount = (parseFloat(depositAmount) * (promoCode.bonusPercentage / 100)).toFixed(2);
    const maxBonus = parseFloat(promoCode.maxBonusAmount);
    
    const finalBonus = Math.min(parseFloat(bonusAmount), maxBonus).toFixed(2);

    return {
      bonusAmount: finalBonus,
      withdrawalRequirement: promoCode.withdrawalRequirement,
    };
  }

  /**
   * Increment promo code usage
   */
  incrementPromoCodeUsage(code) {
    const promoCode = this.promoCodes.find(p => p.code === code);
    if (promoCode) {
      promoCode.usageCount += 1;
    }
  }

  /**
   * Get all active promo codes
   */
  getAllActiveCodes() {
    return this.promoCodes.filter(p => p.isActive);
  }

  /**
   * Deactivate promo code (Admin Only)
   */
  deactivatePromoCode(codeId) {
    const promoCode = this.promoCodes.find(p => p.id === codeId);
    if (!promoCode) throw new Error('Promo code not found');

    promoCode.isActive = false;
    return promoCode;
  }

  /**
   * Generate unique promo ID
   */
  generatePromoId() {
    return `PROMO_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

module.exports = new BonusService();
