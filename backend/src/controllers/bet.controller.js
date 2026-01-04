/**
 * Bet Controller
 * 
 * Handles sports betting operations
 */

const betService = require('../services/bet.service');
const { isValidAmount } = require('../utils/validators');

/**
 * Create a new bet
 * POST /bet
 */
exports.createBet = (req, res) => {
  try {
    const { selections, betType, stake } = req.body;

    if (!selections || !Array.isArray(selections) || selections.length === 0) {
      return res.status(400).json({ error: 'At least one selection required' });
    }

    if (!stake || !isValidAmount(stake)) {
      return res.status(400).json({ error: 'Invalid stake amount' });
    }

    const bet = betService.createBet(req.user.userId, {
      selections,
      betType: betType || 'MULTI',
      stake,
      bonusApplied: false,
    });

    res.status(201).json({
      message: 'Bet placed successfully',
      bet,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get all bets by user
 * GET /bet
 */
exports.getUserBets = (req, res) => {
  try {
    const bets = betService.getBetsByUserId(req.user.userId);

    res.json({
      bets,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get running bets
 * GET /bet/running
 */
exports.getRunningBets = (req, res) => {
  try {
    const bets = betService.getRunningBets(req.user.userId);

    res.json({
      bets,
      count: bets.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get settled bets
 * GET /bet/settled
 */
exports.getSettledBets = (req, res) => {
  try {
    const bets = betService.getSettledBets(req.user.userId);

    res.json({
      bets,
      count: bets.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get single bet
 * GET /bet/:id
 */
exports.getBetById = (req, res) => {
  try {
    const bet = betService.getBetById(req.params.id);

    if (!bet) {
      return res.status(404).json({ error: 'Bet not found' });
    }

    if (bet.userId !== req.user.userId && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json({
      bet,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Cancel running bet
 * POST /bet/:id/cancel
 */
exports.cancelBet = (req, res) => {
  try {
    const bet = betService.cancelBet(req.params.id);

    if (bet.userId !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json({
      message: 'Bet cancelled successfully',
      bet,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
