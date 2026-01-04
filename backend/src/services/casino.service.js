/**
 * Casino Service (In-Memory Storage)
 * 
 * Manages casino games with admin-controlled outcomes
 */

const CasinoGame = require('../models/CasinoGame.model');
const oddsService = require('./odds.service');

class CasinoService {
  constructor() {
    // In-memory casino game store
    this.games = [];
  }

  /**
   * Create a new casino game
   */
  createGame(userId, gameData) {
    // Validate odds range (1-15)
    if (!oddsService.isValidOddsRange(gameData.odds)) {
      throw new Error('Odds must be between 1 and 15');
    }

    const potentialWin = oddsService.calculatePotentialWin(gameData.stake, gameData.odds);

    const game = new CasinoGame({
      id: this.generateGameId(),
      userId: userId,
      gameType: gameData.gameType,
      stake: gameData.stake,
      odds: gameData.odds,
      potentialWin: oddsService.applyCap(potentialWin),
      status: 'RUNNING',
      adminControlled: true,
      currency: 'NGN',
    });

    this.games.push(game);
    return game;
  }

  /**
   * Get game by ID
   */
  getGameById(gameId) {
    return this.games.find(g => g.id === gameId);
  }

  /**
   * Get all games by user
   */
  getGamesByUserId(userId) {
    return this.games.filter(g => g.userId === userId);
  }

  /**
   * Set game outcome (Admin Only)
   */
  setOutcome(gameId, outcome, amount = null) {
    const game = this.getGameById(gameId);
    if (!game) throw new Error('Game not found');

    game.outcome = outcome; // WIN or LOSS
    game.status = outcome === 'WIN' ? 'WON' : 'LOST';
    game.result = outcome === 'WIN' ? oddsService.applyCap(amount) : 0;
    game.endTime = new Date();
    game.settledAt = new Date();

    return game;
  }

  /**
   * Get running games
   */
  getRunningGames() {
    return this.games.filter(g => g.status === 'RUNNING');
  }

  /**
   * Get all games
   */
  getAllGames() {
    return this.games;
  }

  /**
   * Generate unique game ID
   */
  generateGameId() {
    return `GAME_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

module.exports = new CasinoService();
