const express = require('express');
const withdrawalController = require('../controllers/withdrawal.controller');
const { auth } = require('../middlewares/auth.middleware');

const router = express.Router();

// All withdrawal routes require authentication
router.use(auth);

/**
 * POST /withdrawal
 * Create withdrawal request
 */
router.post('/', withdrawalController.createWithdrawal);

/**
 * GET /withdrawal
 * Get user withdrawals
 */
router.get('/', withdrawalController.getWithdrawals);

/**
 * GET /withdrawal/:id
 * Get withdrawal by ID
 */
router.get('/:id', withdrawalController.getWithdrawalById);

module.exports = router;
