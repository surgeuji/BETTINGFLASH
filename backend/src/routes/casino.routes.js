const express = require('express');
const casinoController = require('../controllers/casino.controller');
const { auth } = require('../middlewares/auth.middleware');

const router = express.Router();

// All casino routes require authentication
router.use(auth);

/**
 * POST /casino
 * Create casino game
 */
router.post('/', casinoController.createGame);

/**
 * GET /casino
 * Get user casino games
 */
router.get('/', casinoController.getUserGames);

/**
 * GET /casino/:id
 * Get single casino game
 */
router.get('/:id', casinoController.getGameById);

module.exports = router;
