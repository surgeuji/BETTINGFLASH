/**
 * Bet Service (In-Memory Storage)
 * 
 * Manages sports betting slips and bet logic
 */

const Bet = require('../models/Bet.model');
const oddsService = require('./odds.service');

class BetService {
  constructor() {
    // In-memory bet store
    this.bets = [];
  }

  /**
   * Create a new bet
   */
  createBet(userId, betData) {
    // Validate selection count
    if (!oddsService.isValidSelectionCount(betData.selections)) {
      throw new Error('Maximum 60 selections allowed per bet');
    }

    const combinedOdds = oddsService.calculateCombinedOdds(
      betData.selections.map(s => s.odds)
    );

    const potentialWin = oddsService.calculatePotentialWin(betData.stake, combinedOdds);

    const bet = new Bet({
      id: this.generateBetId(),
      userId: userId,
      betSlipId: `SLIP_${Date.now()}`,
      selections: betData.selections,
      betType: betData.betType || 'SINGLE',
      stake: betData.stake,
      odds: combinedOdds,
      potentialWin: oddsService.applyCap(potentialWin),
      status: 'RUNNING',
      bonusApplied: betData.bonusApplied || false,
      bonusAmount: betData.bonusAmount || 0,
      currency: 'NGN',
    });

    this.bets.push(bet);
    return bet;
  }

  /**
   * Get bet by ID
   */
  getBetById(betId) {
    return this.bets.find(b => b.id === betId);
  }

  /**
   * Get all bets by user
   */
  getBetsByUserId(userId) {
    return this.bets.filter(b => b.userId === userId);
  }

  /**
   * Get running bets by user
   */
  getRunningBets(userId) {
    return this.bets.filter(b => b.userId === userId && b.status === 'RUNNING');
  }

  /**
   * Get settled bets by user
   */
  getSettledBets(userId) {
    return this.bets.filter(
      b => b.userId === userId && ['WON', 'LOST', 'VOID'].includes(b.status)
    );
  }

  /**
   * Settle bet as WON (Admin Only)
   */
  settleBetAsWon(betId, amount) {
    const bet = this.getBetById(betId);
    if (!bet) throw new Error('Bet not found');

    bet.status = 'WON';
    bet.result = oddsService.applyCap(amount);
    bet.settledAt = new Date();
    return bet;
  }

  /**
   * Settle bet as LOST (Admin Only)
   */
  settleBetAsLost(betId) {
    const bet = this.getBetById(betId);
    if (!bet) throw new Error('Bet not found');

    bet.status = 'LOST';
    bet.result = 0;
    bet.settledAt = new Date();
    return bet;
  }

  /**
   * Void bet (Admin Only)
   */
  voidBet(betId, reason) {
    const bet = this.getBetById(betId);
    if (!bet) throw new Error('Bet not found');

    bet.status = 'VOID';
    bet.notes = reason;
    bet.settledAt = new Date();
    return bet;
  }

  /**
   * Postpone bet (Admin Only)
   */
  postponeBet(betId, reason) {
    const bet = this.getBetById(betId);
    if (!bet) throw new Error('Bet not found');

    bet.status = 'POSTPONED';
    bet.notes = reason;
    return bet;
  }

  /**
   * Cancel bet
   */
  cancelBet(betId) {
    const bet = this.getBetById(betId);
    if (!bet) throw new Error('Bet not found');
    if (bet.status !== 'RUNNING') throw new Error('Only running bets can be cancelled');

    bet.status = 'CANCELLED';
    bet.settledAt = new Date();
    return bet;
  }

  /**
   * Count settled bets for withdrawal requirement
   */
  countSettledBets(userId) {
    return this.bets.filter(
      b => b.userId === userId && ['WON', 'LOST', 'VOID'].includes(b.status)
    ).length;
  }

  /**
   * Generate unique bet ID
   */
  generateBetId() {
    return `BET_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

module.exports = new BetService();
