/**
 * Admin Controller
 * 
 * All admin operations - full system control
 * Role-based access is enforced by middleware
 */

const userService = require('../services/user.service');
const walletService = require('../services/wallet.service');
const depositService = require('../services/deposit.service');
const withdrawalService = require('../services/withdrawal.service');
const betService = require('../services/bet.service');
const casinoService = require('../services/casino.service');
const virtualService = require('../services/virtual.service');
const bonusService = require('../services/bonus.service');
const adminLogService = require('../services/admin.log.service');
const notificationService = require('../services/notification.service');
const { isValidAmount } = require('../utils/validators');

// ==================== USER MANAGEMENT ====================

/**
 * Get all users (SUPER_ADMIN only)
 * GET /admin/users
 */
exports.getAllUsers = (req, res) => {
  try {
    const users = userService.getAllUsers();
    res.json({ users, total: users.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Freeze user account
 * POST /admin/users/:userId/freeze
 */
exports.freezeUser = (req, res) => {
  try {
    const user = userService.freezeUser(req.params.userId);
    adminLogService.logAction(
      req.user.userId,
      req.user.adminRole,
      'FREEZE_USER',
      'USER',
      req.params.userId,
      { reason: req.body.reason }
    );
    res.json({ message: 'User frozen', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Unfreeze user account
 * POST /admin/users/:userId/unfreeze
 */
exports.unfreezeUser = (req, res) => {
  try {
    const user = userService.unfreezeUser(req.params.userId);
    adminLogService.logAction(
      req.user.userId,
      req.user.adminRole,
      'UNFREEZE_USER',
      'USER',
      req.params.userId
    );
    res.json({ message: 'User unfrozen', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ==================== WALLET MANAGEMENT ====================

/**
 * Edit user wallet balance (FINANCE_ADMIN)
 * PUT /admin/wallet/:userId
 */
exports.editWallet = (req, res) => {
  try {
    const { mainBalance, bonusBalance } = req.body;
    const wallet = walletService.getWalletByUserId(req.params.userId);

    if (!wallet) return res.status(404).json({ error: 'Wallet not found' });

    if (mainBalance !== undefined) {
      walletService.updateMainBalance(wallet.id, mainBalance);
    }
    if (bonusBalance !== undefined) {
      walletService.updateBonusBalance(wallet.id, bonusBalance);
    }

    const updated = walletService.getWalletById(wallet.id);
    adminLogService.logAction(
      req.user.userId,
      req.user.adminRole,
      'EDIT_WALLET',
      'WALLET',
      wallet.id,
      { mainBalance, bonusBalance }
    );

    res.json({ message: 'Wallet updated', wallet: updated });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Add bonus to user wallet
 * POST /admin/wallet/:userId/bonus
 */
exports.addBonus = (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || !isValidAmount(amount)) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const wallet = walletService.getWalletByUserId(req.params.userId);
    if (!wallet) return res.status(404).json({ error: 'Wallet not found' });

    const updated = walletService.addBonus(wallet.id, amount);
    adminLogService.logAction(
      req.user.userId,
      req.user.adminRole,
      'ADD_BONUS',
      'WALLET',
      wallet.id,
      { amount }
    );

    res.json({ message: 'Bonus added', wallet: updated });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ==================== DEPOSIT MANAGEMENT ====================

/**
 * Get all pending deposits (FINANCE_ADMIN)
 * GET /admin/deposits
 */
exports.getPendingDeposits = (req, res) => {
  try {
    const deposits = depositService.getPendingDeposits();
    res.json({ deposits, total: deposits.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Approve deposit
 * POST /admin/deposits/:depositId/approve
 */
exports.approveDeposit = (req, res) => {
  try {
    const { bonusApplied, bonusAmount } = req.body;
    const deposit = depositService.approveDeposit(
      req.params.depositId,
      req.user.userId,
      bonusApplied,
      bonusAmount || 0
    );

    // Credit wallet
    const wallet = walletService.getWalletByUserId(deposit.userId);
    walletService.creditMainBalance(wallet.id, deposit.amount);

    // Add bonus if applicable
    if (bonusApplied && bonusAmount) {
      walletService.addBonus(wallet.id, bonusAmount);
    }

    adminLogService.logAction(
      req.user.userId,
      req.user.adminRole,
      'APPROVE_DEPOSIT',
      'DEPOSIT',
      req.params.depositId,
      { amount: deposit.amount, bonus: bonusAmount }
    );

    // Send notification
    const user = userService.getUserById(deposit.userId);
    notificationService.sendDepositApprovalEmail(user.email, deposit.amount, bonusAmount || 0);

    res.json({ message: 'Deposit approved', deposit });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Reject deposit
 * POST /admin/deposits/:depositId/reject
 */
exports.rejectDeposit = (req, res) => {
  try {
    const { reason } = req.body;
    const deposit = depositService.rejectDeposit(
      req.params.depositId,
      req.user.userId,
      reason
    );

    adminLogService.logAction(
      req.user.userId,
      req.user.adminRole,
      'REJECT_DEPOSIT',
      'DEPOSIT',
      req.params.depositId,
      { reason }
    );

    res.json({ message: 'Deposit rejected', deposit });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ==================== WITHDRAWAL MANAGEMENT ====================

/**
 * Get all pending withdrawals (FINANCE_ADMIN)
 * GET /admin/withdrawals
 */
exports.getPendingWithdrawals = (req, res) => {
  try {
    const withdrawals = withdrawalService.getPendingWithdrawals();
    res.json({ withdrawals, total: withdrawals.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Approve withdrawal
 * POST /admin/withdrawals/:withdrawalId/approve
 */
exports.approveWithdrawal = (req, res) => {
  try {
    const withdrawal = withdrawalService.approveWithdrawal(
      req.params.withdrawalId,
      req.user.userId
    );

    adminLogService.logAction(
      req.user.userId,
      req.user.adminRole,
      'APPROVE_WITHDRAWAL',
      'WITHDRAWAL',
      req.params.withdrawalId,
      { amount: withdrawal.amount }
    );

    res.json({ message: 'Withdrawal approved', withdrawal });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Mark withdrawal as completed (paid)
 * POST /admin/withdrawals/:withdrawalId/complete
 */
exports.completeWithdrawal = (req, res) => {
  try {
    const withdrawal = withdrawalService.completeWithdrawal(req.params.withdrawalId);

    // Debit from wallet
    const wallet = walletService.getWalletByUserId(withdrawal.userId);
    walletService.debitMainBalance(wallet.id, withdrawal.amount);

    adminLogService.logAction(
      req.user.userId,
      req.user.adminRole,
      'COMPLETE_WITHDRAWAL',
      'WITHDRAWAL',
      req.params.withdrawalId,
      { amount: withdrawal.amount }
    );

    // Send notification
    const user = userService.getUserById(withdrawal.userId);
    notificationService.sendWithdrawalApprovalEmail(user.email, withdrawal.amount);

    res.json({ message: 'Withdrawal completed', withdrawal });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Reject withdrawal
 * POST /admin/withdrawals/:withdrawalId/reject
 */
exports.rejectWithdrawal = (req, res) => {
  try {
    const { reason } = req.body;
    const withdrawal = withdrawalService.rejectWithdrawal(
      req.params.withdrawalId,
      req.user.userId,
      reason
    );

    adminLogService.logAction(
      req.user.userId,
      req.user.adminRole,
      'REJECT_WITHDRAWAL',
      'WITHDRAWAL',
      req.params.withdrawalId,
      { reason }
    );

    res.json({ message: 'Withdrawal rejected', withdrawal });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ==================== BET MANAGEMENT ====================

/**
 * Settle bet as won (OPERATIONS_ADMIN)
 * POST /admin/bets/:betId/won
 */
exports.settleBetAsWon = (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || !isValidAmount(amount)) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const bet = betService.settleBetAsWon(req.params.betId, amount);

    // Credit wallet
    const wallet = walletService.getWalletByUserId(bet.userId);
    walletService.creditMainBalance(wallet.id, amount);

    adminLogService.logAction(
      req.user.userId,
      req.user.adminRole,
      'SETTLE_BET_WON',
      'BET',
      req.params.betId,
      { amount }
    );

    res.json({ message: 'Bet settled as won', bet });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Settle bet as lost (OPERATIONS_ADMIN)
 * POST /admin/bets/:betId/lost
 */
exports.settleBetAsLost = (req, res) => {
  try {
    const bet = betService.settleBetAsLost(req.params.betId);

    adminLogService.logAction(
      req.user.userId,
      req.user.adminRole,
      'SETTLE_BET_LOST',
      'BET',
      req.params.betId
    );

    res.json({ message: 'Bet settled as lost', bet });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Void bet (OPERATIONS_ADMIN)
 * POST /admin/bets/:betId/void
 */
exports.voidBet = (req, res) => {
  try {
    const { reason } = req.body;
    const bet = betService.voidBet(req.params.betId, reason);

    // Refund stake to wallet
    const wallet = walletService.getWalletByUserId(bet.userId);
    walletService.creditMainBalance(wallet.id, bet.stake);

    adminLogService.logAction(
      req.user.userId,
      req.user.adminRole,
      'VOID_BET',
      'BET',
      req.params.betId,
      { reason }
    );

    res.json({ message: 'Bet voided', bet });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Postpone bet (OPERATIONS_ADMIN)
 * POST /admin/bets/:betId/postpone
 */
exports.postponeBet = (req, res) => {
  try {
    const { reason } = req.body;
    const bet = betService.postponeBet(req.params.betId, reason);

    adminLogService.logAction(
      req.user.userId,
      req.user.adminRole,
      'POSTPONE_BET',
      'BET',
      req.params.betId,
      { reason }
    );

    res.json({ message: 'Bet postponed', bet });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ==================== CASINO MANAGEMENT ====================

/**
 * Get all running casino games (OPERATIONS_ADMIN)
 * GET /admin/casino
 */
exports.getRunningCasinoGames = (req, res) => {
  try {
    const games = casinoService.getRunningGames();
    res.json({ games, total: games.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Set casino game outcome (OPERATIONS_ADMIN)
 * POST /admin/casino/:gameId/outcome
 */
exports.setCasinoOutcome = (req, res) => {
  try {
    const { outcome, amount } = req.body;

    if (!outcome || !['WIN', 'LOSS'].includes(outcome)) {
      return res.status(400).json({ error: 'Invalid outcome' });
    }

    const game = casinoService.setOutcome(
      req.params.gameId,
      outcome,
      outcome === 'WIN' ? amount : null
    );

    // Credit/debit wallet
    const wallet = walletService.getWalletByUserId(game.userId);
    if (outcome === 'WIN' && amount) {
      walletService.creditMainBalance(wallet.id, amount);
    }

    adminLogService.logAction(
      req.user.userId,
      req.user.adminRole,
      'SET_CASINO_OUTCOME',
      'CASINO_GAME',
      req.params.gameId,
      { outcome, amount }
    );

    res.json({ message: 'Casino outcome set', game });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ==================== VIRTUAL GAMES MANAGEMENT ====================

/**
 * Upload virtual game (OPERATIONS_ADMIN)
 * POST /admin/virtual/upload
 */
exports.uploadVirtualGame = (req, res) => {
  try {
    const { homeTeam, awayTeam, homeOdds, drawOdds, awayOdds, startTime } = req.body;

    if (!homeTeam || !awayTeam || !startTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const game = virtualService.uploadGame(req.user.userId, {
      homeTeam,
      awayTeam,
      homeOdds: homeOdds || 1.5,
      drawOdds: drawOdds || 3.0,
      awayOdds: awayOdds || 2.5,
      startTime,
    });

    adminLogService.logAction(
      req.user.userId,
      req.user.adminRole,
      'UPLOAD_VIRTUAL_GAME',
      'VIRTUAL_GAME',
      game.id,
      { homeTeam, awayTeam }
    );

    res.status(201).json({ message: 'Virtual game uploaded', game });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Set virtual game outcome (OPERATIONS_ADMIN)
 * POST /admin/virtual/:gameId/outcome
 */
exports.setVirtualGameOutcome = (req, res) => {
  try {
    const { homeGoals, awayGoals } = req.body;

    if (homeGoals === undefined || awayGoals === undefined) {
      return res.status(400).json({ error: 'Goals required' });
    }

    const game = virtualService.setGameOutcome(req.params.gameId, homeGoals, awayGoals);

    adminLogService.logAction(
      req.user.userId,
      req.user.adminRole,
      'SET_VIRTUAL_OUTCOME',
      'VIRTUAL_GAME',
      req.params.gameId,
      { homeGoals, awayGoals }
    );

    res.json({ message: 'Virtual game outcome set', game });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ==================== PROMO CODE MANAGEMENT ====================

/**
 * Create promo code (SUPER_ADMIN only)
 * POST /admin/promo
 */
exports.createPromoCode = (req, res) => {
  try {
    const promoCode = bonusService.createPromoCode(req.user.userId, req.body);

    adminLogService.logAction(
      req.user.userId,
      req.user.adminRole,
      'CREATE_PROMO_CODE',
      'PROMO_CODE',
      promoCode.id,
      { code: promoCode.code }
    );

    res.status(201).json({ message: 'Promo code created', promoCode });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get all active promo codes
 * GET /admin/promo
 */
exports.getActivePromoCodes = (req, res) => {
  try {
    const codes = bonusService.getAllActiveCodes();
    res.json({ codes, total: codes.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Deactivate promo code (SUPER_ADMIN only)
 * POST /admin/promo/:codeId/deactivate
 */
exports.deactivatePromoCode = (req, res) => {
  try {
    const promoCode = bonusService.deactivatePromoCode(req.params.codeId);

    adminLogService.logAction(
      req.user.userId,
      req.user.adminRole,
      'DEACTIVATE_PROMO_CODE',
      'PROMO_CODE',
      req.params.codeId
    );

    res.json({ message: 'Promo code deactivated', promoCode });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ==================== SYSTEM & LOGS ====================

/**
 * Get admin logs (SUPER_ADMIN only)
 * GET /admin/logs
 */
exports.getAdminLogs = (req, res) => {
  try {
    const logs = adminLogService.getAllLogs();
    res.json({ logs, total: logs.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get dashboard statistics (All admins)
 * GET /admin/dashboard
 */
exports.getDashboardStats = (req, res) => {
  try {
    const users = userService.getAllUsers();
    const deposits = depositService.getAllDeposits();
    const withdrawals = withdrawalService.getAllWithdrawals();
    const bets = betService.bets || [];
    const casinoGames = casinoService.getAllGames();

    const stats = {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'ACTIVE').length,
      frozenUsers: users.filter(u => u.status === 'FROZEN').length,
      pendingDeposits: deposits.filter(d => d.status === 'PENDING').length,
      approvedDeposits: deposits.filter(d => d.status === 'APPROVED').length,
      pendingWithdrawals: withdrawals.filter(w => w.status === 'PENDING').length,
      completedWithdrawals: withdrawals.filter(w => w.status === 'COMPLETED').length,
      totalBets: bets.length,
      runningBets: bets.filter(b => b.status === 'RUNNING').length,
      casinoGames: casinoGames.length,
      casinoRunning: casinoGames.filter(g => g.status === 'RUNNING').length,
    };

    res.json({ stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
