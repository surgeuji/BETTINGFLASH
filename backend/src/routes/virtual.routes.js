const express = require('express');
const virtualController = require('../controllers/virtual.controller');
const { auth } = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * GET /virtual
 * Get all available virtual games and user bets
 */
router.get('/', virtualController.getAllGames);

// Protected routes require authentication
router.use(auth);

/**
 * GET /virtual/user
 * Get user virtual game bets
 */
router.get('/user', virtualController.getUserGames);

/**
 * POST /virtual/:gameId/bet
 * Place bet on virtual game
 */
router.post('/:gameId/bet', virtualController.placeBet);

/**
 * GET /virtual/:id
 * Get single virtual game
 */
router.get('/:id', virtualController.getGameById);

module.exports = router;
