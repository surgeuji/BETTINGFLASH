/**
 * Casino Controller
 * 
 * Handles casino game operations
 */

const casinoService = require('../services/casino.service');
const { isValidAmount } = require('../utils/validators');

/**
 * Create a new casino game
 * POST /casino
 */
exports.createGame = (req, res) => {
  try {
    const { gameType, stake, odds } = req.body;

    if (!gameType) {
      return res.status(400).json({ error: 'Game type required' });
    }

    if (!stake || !isValidAmount(stake)) {
      return res.status(400).json({ error: 'Invalid stake amount' });
    }

    if (!odds || odds < 1 || odds > 15) {
      return res.status(400).json({ error: 'Odds must be between 1 and 15' });
    }

    const game = casinoService.createGame(req.user.userId, {
      gameType,
      stake,
      odds,
    });

    res.status(201).json({
      message: 'Game created successfully',
      game,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get all games by user
 * GET /casino
 */
exports.getUserGames = (req, res) => {
  try {
    const games = casinoService.getGamesByUserId(req.user.userId);

    res.json({
      games,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get single game
 * GET /casino/:id
 */
exports.getGameById = (req, res) => {
  try {
    const game = casinoService.getGameById(req.params.id);

    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    if (game.userId !== req.user.userId && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json({
      game,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
