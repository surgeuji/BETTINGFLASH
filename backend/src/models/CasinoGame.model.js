/**
 * Casino Game Model (Data Structure Only)
 */

class CasinoGame {
  constructor(data) {
    this.id = data.id || null;
    this.userId = data.userId || null;
    this.gameType = data.gameType || 'SPIN_WHEEL'; // SPIN_WHEEL, CRASH, DICE, SLOTS
    this.stake = parseFloat(data.stake || 0).toFixed(2);
    this.odds = parseFloat(data.odds || 0).toFixed(2);
    this.potentialWin = parseFloat(data.potentialWin || 0).toFixed(2);
    this.result = data.result || null; // Amount won (null if loss)
    this.status = data.status || 'RUNNING'; // RUNNING, WON, LOST, CANCELLED
    this.outcome = data.outcome || null; // Admin-set outcome
    this.currency = data.currency || 'NGN';
    this.startTime = data.startTime || new Date();
    this.endTime = data.endTime || null;
    this.adminControlled = data.adminControlled || true;
    this.createdAt = data.createdAt || new Date();
    this.settledAt = data.settledAt || null;
  }
}

module.exports = CasinoGame;
