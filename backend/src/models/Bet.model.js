/**
 * Bet Model (Data Structure Only)
 * 
 * Represents a sports betting slip with multiple selections
 */

class Bet {
  constructor(data) {
    this.id = data.id || null;
    this.userId = data.userId || null;
    this.betSlipId = data.betSlipId || null;
    this.selections = data.selections || []; // Array of selection objects
    this.betType = data.betType || 'SINGLE'; // SINGLE, MULTI, SYSTEM
    this.stake = parseFloat(data.stake || 0).toFixed(2);
    this.odds = parseFloat(data.odds || 0).toFixed(2);
    this.potentialWin = parseFloat(data.potentialWin || 0).toFixed(2);
    this.status = data.status || 'RUNNING'; // RUNNING, WON, LOST, VOID, POSTPONED, CANCELLED
    this.result = data.result || null; // Amount won
    this.currency = data.currency || 'NGN';
    this.bonusApplied = data.bonusApplied || false;
    this.bonusAmount = parseFloat(data.bonusAmount || 0).toFixed(2);
    this.createdAt = data.createdAt || new Date();
    this.settledAt = data.settledAt || null;
    this.notes = data.notes || '';
  }
}

module.exports = Bet;
