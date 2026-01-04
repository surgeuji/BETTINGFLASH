/**
 * Virtual Games Controller
 * 
 * Handles virtual/simulated game operations
 */

const virtualService = require('../services/virtual.service');
const { isValidAmount } = require('../utils/validators');

/**
 * Get all virtual games
 * GET /virtual
 */
exports.getAllGames = (req, res) => {
  try {
    const games = virtualService.getAllGames();
    const schedules = games.filter(g => !g.userId); // Admin-uploaded games
    const userBets = games.filter(g => g.userId); // User bets

    res.json({
      availableGames: schedules,
      userBets,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get user virtual game bets
 * GET /virtual/user
 */
exports.getUserGames = (req, res) => {
  try {
    const games = virtualService.getGamesByUserId(req.user.userId);

    res.json({
      games,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Place bet on virtual game
 * POST /virtual/:gameId/bet
 */
exports.placeBet = (req, res) => {
  try {
    const { selectedOutcome, stake } = req.body;

    if (!selectedOutcome || !['HOME', 'DRAW', 'AWAY'].includes(selectedOutcome)) {
      return res.status(400).json({ error: 'Invalid outcome selection' });
    }

    if (!stake || !isValidAmount(stake)) {
      return res.status(400).json({ error: 'Invalid stake amount' });
    }

    const bet = virtualService.createBet(
      req.user.userId,
      req.params.gameId,
      selectedOutcome,
      stake
    );

    res.status(201).json({
      message: 'Virtual game bet placed',
      bet,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get single game
 * GET /virtual/:id
 */
exports.getGameById = (req, res) => {
  try {
    const game = virtualService.getGameById(req.params.id);

    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    if (game.userId && game.userId !== req.user.userId && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json({
      game,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
