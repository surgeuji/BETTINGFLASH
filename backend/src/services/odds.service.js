/**
 * Odds Service
 * 
 * Handles odds calculations, multipliers, and payout caps
 */

class OddsService {
  /**
   * Calculate combined odds for multiple selections
   * @param {Array} odds - Array of individual odds
   * @returns {number} Combined odds (multiplication)
   */
  calculateCombinedOdds(odds) {
    if (!Array.isArray(odds) || odds.length === 0) return 0;
    
    return odds.reduce((product, odd) => product * parseFloat(odd), 1).toFixed(2);
  }

  /**
   * Calculate potential win
   * @param {number} stake - Bet stake
   * @param {number} odds - Bet odds
   * @returns {number} Potential winning amount
   */
  calculatePotentialWin(stake, odds) {
    return (parseFloat(stake) * parseFloat(odds)).toFixed(2);
  }

  /**
   * Apply bonus to winnings (3%)
   * @param {number} winAmount - Win amount
   * @returns {number} Bonus amount
   */
  calculateBonus(winAmount) {
    const bonus = parseFloat(winAmount) * 0.03; // 3% bonus
    return bonus.toFixed(2);
  }

  /**
   * Apply payout cap (silent cap - no error)
   * Max payout: 200,000,000
   * @param {number} amount - Payout amount
   * @returns {number} Capped amount
   */
  applyCap(amount) {
    const MAX_PAYOUT = 200000000;
    const payout = parseFloat(amount);
    
    if (payout > MAX_PAYOUT) {
      return parseFloat(MAX_PAYOUT).toFixed(2);
    }
    
    return payout.toFixed(2);
  }

  /**
   * Validate bet selections (max 60)
   * @param {Array} selections - Array of bet selections
   * @returns {boolean} Is valid
   */
  isValidSelectionCount(selections) {
    const MAX_SELECTIONS = 60;
    return Array.isArray(selections) && selections.length <= MAX_SELECTIONS;
  }

  /**
   * Validate odds range (1-15 for casino/virtual)
   * @param {number} odds - Odds value
   * @returns {boolean} Is valid
   */
  isValidOddsRange(odds) {
    const odd = parseFloat(odds);
    return odd >= 1 && odd <= 15;
  }
}

module.exports = new OddsService();
