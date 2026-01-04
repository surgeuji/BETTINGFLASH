/**
 * Withdrawal Controller
 * 
 * Handles withdrawal requests (user-initiated)
 */

const withdrawalService = require('../services/withdrawal.service');
const betService = require('../services/bet.service');
const userService = require('../services/user.service');
const { isValidAmount } = require('../utils/validators');

/**
 * Create a withdrawal request
 * POST /withdrawal
 */
exports.createWithdrawal = (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || !isValidAmount(amount)) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Check withdrawal requirements
    const user = userService.getUserById(req.user.userId);
    const settledBetCount = betService.countSettledBets(req.user.userId);
    const requiredBets = user.promoCode ? 1 : 2;

    if (settledBetCount < requiredBets) {
      return res.status(400).json({
        error: `Minimum ${requiredBets} settled bets required before withdrawal`,
        settledBets: settledBetCount,
        required: requiredBets,
      });
    }

    const withdrawal = withdrawalService.createWithdrawal(req.user.userId, {
      amount,
      currency: 'NGN',
      bankAccount: user.bankAccountNumber,
      bankName: user.bankName,
      accountHolder: user.accountNameHolder,
      requiredBetCount: requiredBets,
      requirementsMet: settledBetCount >= requiredBets,
    });

    res.status(201).json({
      message: 'Withdrawal request created',
      withdrawal,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get user withdrawals
 * GET /withdrawal
 */
exports.getWithdrawals = (req, res) => {
  try {
    const withdrawals = withdrawalService.getWithdrawalsByUserId(req.user.userId);

    res.json({
      withdrawals,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get withdrawal by ID
 * GET /withdrawal/:id
 */
exports.getWithdrawalById = (req, res) => {
  try {
    const withdrawal = withdrawalService.getWithdrawalById(req.params.id);

    if (!withdrawal) {
      return res.status(404).json({ error: 'Withdrawal not found' });
    }

    // Check ownership (unless admin)
    if (withdrawal.userId !== req.user.userId && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json({
      withdrawal,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
