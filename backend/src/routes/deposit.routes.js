const express = require('express');
const depositController = require('../controllers/deposit.controller');
const { auth } = require('../middlewares/auth.middleware');

const router = express.Router();

// All deposit routes require authentication
router.use(auth);

/**
 * POST /deposit
 * Create deposit request
 */
router.post('/', depositController.createDeposit);

/**
 * GET /deposit
 * Get user deposits
 */
router.get('/', depositController.getDeposits);

/**
 * GET /deposit/:id
 * Get deposit by ID
 */
router.get('/:id', depositController.getDepositById);

module.exports = router;
