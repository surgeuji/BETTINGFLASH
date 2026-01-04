const express = require('express');
const walletController = require('../controllers/wallet.controller');
const { auth } = require('../middlewares/auth.middleware');

const router = express.Router();

// All wallet routes require authentication
router.use(auth);

/**
 * GET /wallet
 * Get user wallet
 */
router.get('/', walletController.getWallet);

module.exports = router;
