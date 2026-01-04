const express = require('express');
const betController = require('../controllers/bet.controller');
const { auth } = require('../middlewares/auth.middleware');

const router = express.Router();

// All bet routes require authentication
router.use(auth);

/**
 * POST /bet
 * Place a new bet
 */
router.post('/', betController.createBet);

/**
 * GET /bet
 * Get all user bets
 */
router.get('/', betController.getUserBets);

/**
 * GET /bet/running
 * Get running bets
 */
router.get('/running', betController.getRunningBets);

/**
 * GET /bet/settled
 * Get settled bets
 */
router.get('/settled', betController.getSettledBets);

/**
 * GET /bet/:id
 * Get single bet
 */
router.get('/:id', betController.getBetById);

/**
 * POST /bet/:id/cancel
 * Cancel running bet
 */
router.post('/:id/cancel', betController.cancelBet);

module.exports = router;
