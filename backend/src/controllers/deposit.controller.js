/**
 * Deposit Controller
 * 
 * Handles deposit requests (user-initiated)
 */

const depositService = require('../services/deposit.service');
const { isValidAmount } = require('../utils/validators');

/**
 * Create a deposit request
 * POST /deposit
 */
exports.createDeposit = (req, res) => {
  try {
    const { amount, bankUsed, proofOfPayment } = req.body;

    if (!amount || !isValidAmount(amount)) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const deposit = depositService.createDeposit(req.user.userId, {
      amount,
      currency: 'NGN',
      method: 'BANK_TRANSFER',
      bankUsed,
      proofOfPayment,
    });

    res.status(201).json({
      message: 'Deposit request created',
      deposit,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get user deposits
 * GET /deposit
 */
exports.getDeposits = (req, res) => {
  try {
    const deposits = depositService.getDepositsByUserId(req.user.userId);

    res.json({
      deposits,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get deposit by ID
 * GET /deposit/:id
 */
exports.getDepositById = (req, res) => {
  try {
    const deposit = depositService.getDepositById(req.params.id);

    if (!deposit) {
      return res.status(404).json({ error: 'Deposit not found' });
    }

    // Check ownership (unless admin)
    if (deposit.userId !== req.user.userId && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json({
      deposit,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
