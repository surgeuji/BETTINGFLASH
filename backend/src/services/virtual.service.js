/**
 * Virtual Games Service (In-Memory Storage)
 * 
 * Manages virtual/simulated matches with admin-controlled outcomes
 */

const VirtualGame = require('../models/VirtualGame.model');

class VirtualService {
  constructor() {
    // In-memory virtual game store
    this.games = [];
  }

  /**
   * Upload a new virtual game
   */
  uploadGame(adminId, gameData) {
    const game = new VirtualGame({
      id: this.generateGameId(),
      homeTeam: gameData.homeTeam,
      awayTeam: gameData.awayTeam,
      homeOdds: gameData.homeOdds || 1.5,
      drawOdds: gameData.drawOdds || 3.0,
      awayOdds: gameData.awayOdds || 2.5,
      status: 'SCHEDULED',
      startTime: gameData.startTime,
      adminControlled: true,
    });

    this.games.push(game);
    return game;
  }

  /**
   * Create user bet on virtual game
   */
  createBet(userId, gameId, selectedOutcome, stake) {
    const game = this.getGameById(gameId);
    if (!game) throw new Error('Game not found');

    const bet = new VirtualGame({
      id: this.generateGameId(),
      userId: userId,
      homeTeam: game.homeTeam,
      awayTeam: game.awayTeam,
      homeOdds: game.homeOdds,
      drawOdds: game.drawOdds,
      awayOdds: game.awayOdds,
      stake: stake,
      selectedOutcome: selectedOutcome,
      status: game.status,
      startTime: game.startTime,
      adminControlled: true,
    });

    this.games.push(bet);
    return bet;
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
  setGameOutcome(gameId, homeGoals, awayGoals) {
    const game = this.getGameById(gameId);
    if (!game) throw new Error('Game not found');

    game.homeGoals = homeGoals;
    game.awayGoals = awayGoals;
    game.status = 'COMPLETED';
    game.endTime = new Date();

    // Determine outcome
    let outcome = 'DRAW';
    if (homeGoals > awayGoals) outcome = 'HOME';
    if (awayGoals > homeGoals) outcome = 'AWAY';

    // Calculate result for users who bet on this game
    const userBets = this.games.filter(
      g => g.homeTeam === game.homeTeam && 
           g.awayTeam === game.awayTeam && 
           g.userId && 
           g.status === 'RUNNING'
    );

    userBets.forEach(bet => {
      if (bet.selectedOutcome === outcome) {
        bet.result = (parseFloat(bet.stake) * parseFloat(
          outcome === 'HOME' ? bet.homeOdds : 
          outcome === 'AWAY' ? bet.awayOdds : 
          bet.drawOdds
        )).toFixed(2);
        bet.status = 'WON';
      } else {
        bet.result = 0;
        bet.status = 'LOST';
      }
      bet.settledAt = new Date();
    });

    return game;
  }

  /**
   * Get all virtual games
   */
  getAllGames() {
    return this.games;
  }

  /**
   * Generate unique game ID
   */
  generateGameId() {
    return `VGAME_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

module.exports = new VirtualService();
