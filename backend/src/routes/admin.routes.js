const express = require('express');
const adminController = require('../controllers/admin.controller');
const { auth, adminOnly, requireAdminRole } = require('../middlewares/auth.middleware');
const { logAdminAction } = require('../middlewares/admin.middleware');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(auth, adminOnly);

// ==================== DASHBOARD ====================

/**
 * GET /admin/dashboard
 * Dashboard statistics (all admin roles)
 */
router.get('/dashboard', adminController.getDashboardStats);

// ==================== USER MANAGEMENT ====================

/**
 * GET /admin/users
 * Get all users (SUPER_ADMIN only)
 */
router.get('/users', requireAdminRole(['SUPER_ADMIN']), adminController.getAllUsers);

/**
 * POST /admin/users/:userId/freeze
 * Freeze user (SUPER_ADMIN only)
 */
router.post(
  '/users/:userId/freeze',
  requireAdminRole(['SUPER_ADMIN']),
  logAdminAction('FREEZE_USER', 'USER'),
  adminController.freezeUser
);

/**
 * POST /admin/users/:userId/unfreeze
 * Unfreeze user (SUPER_ADMIN only)
 */
router.post(
  '/users/:userId/unfreeze',
  requireAdminRole(['SUPER_ADMIN']),
  logAdminAction('UNFREEZE_USER', 'USER'),
  adminController.unfreezeUser
);

// ==================== WALLET MANAGEMENT ====================

/**
 * PUT /admin/wallet/:userId
 * Edit user wallet (FINANCE_ADMIN, SUPER_ADMIN)
 */
router.put(
  '/wallet/:userId',
  requireAdminRole(['SUPER_ADMIN', 'FINANCE_ADMIN']),
  logAdminAction('EDIT_WALLET', 'WALLET'),
  adminController.editWallet
);

/**
 * POST /admin/wallet/:userId/bonus
 * Add bonus to wallet (FINANCE_ADMIN, SUPER_ADMIN)
 */
router.post(
  '/wallet/:userId/bonus',
  requireAdminRole(['SUPER_ADMIN', 'FINANCE_ADMIN']),
  logAdminAction('ADD_BONUS', 'WALLET'),
  adminController.addBonus
);

// ==================== DEPOSIT MANAGEMENT ====================

/**
 * GET /admin/deposits
 * Get pending deposits (FINANCE_ADMIN, SUPER_ADMIN)
 */
router.get(
  '/deposits',
  requireAdminRole(['SUPER_ADMIN', 'FINANCE_ADMIN']),
  adminController.getPendingDeposits
);

/**
 * POST /admin/deposits/:depositId/approve
 * Approve deposit (FINANCE_ADMIN, SUPER_ADMIN)
 */
router.post(
  '/deposits/:depositId/approve',
  requireAdminRole(['SUPER_ADMIN', 'FINANCE_ADMIN']),
  logAdminAction('APPROVE_DEPOSIT', 'DEPOSIT'),
  adminController.approveDeposit
);

/**
 * POST /admin/deposits/:depositId/reject
 * Reject deposit (FINANCE_ADMIN, SUPER_ADMIN)
 */
router.post(
  '/deposits/:depositId/reject',
  requireAdminRole(['SUPER_ADMIN', 'FINANCE_ADMIN']),
  logAdminAction('REJECT_DEPOSIT', 'DEPOSIT'),
  adminController.rejectDeposit
);

// ==================== WITHDRAWAL MANAGEMENT ====================

/**
 * GET /admin/withdrawals
 * Get pending withdrawals (FINANCE_ADMIN, SUPER_ADMIN)
 */
router.get(
  '/withdrawals',
  requireAdminRole(['SUPER_ADMIN', 'FINANCE_ADMIN']),
  adminController.getPendingWithdrawals
);

/**
 * POST /admin/withdrawals/:withdrawalId/approve
 * Approve withdrawal (FINANCE_ADMIN, SUPER_ADMIN)
 */
router.post(
  '/withdrawals/:withdrawalId/approve',
  requireAdminRole(['SUPER_ADMIN', 'FINANCE_ADMIN']),
  logAdminAction('APPROVE_WITHDRAWAL', 'WITHDRAWAL'),
  adminController.approveWithdrawal
);

/**
 * POST /admin/withdrawals/:withdrawalId/complete
 * Mark withdrawal as completed (FINANCE_ADMIN, SUPER_ADMIN)
 */
router.post(
  '/withdrawals/:withdrawalId/complete',
  requireAdminRole(['SUPER_ADMIN', 'FINANCE_ADMIN']),
  logAdminAction('COMPLETE_WITHDRAWAL', 'WITHDRAWAL'),
  adminController.completeWithdrawal
);

/**
 * POST /admin/withdrawals/:withdrawalId/reject
 * Reject withdrawal (FINANCE_ADMIN, SUPER_ADMIN)
 */
router.post(
  '/withdrawals/:withdrawalId/reject',
  requireAdminRole(['SUPER_ADMIN', 'FINANCE_ADMIN']),
  logAdminAction('REJECT_WITHDRAWAL', 'WITHDRAWAL'),
  adminController.rejectWithdrawal
);

// ==================== BET MANAGEMENT ====================

/**
 * POST /admin/bets/:betId/won
 * Settle bet as won (OPERATIONS_ADMIN, SUPER_ADMIN)
 */
router.post(
  '/bets/:betId/won',
  requireAdminRole(['SUPER_ADMIN', 'OPERATIONS_ADMIN']),
  logAdminAction('SETTLE_BET_WON', 'BET'),
  adminController.settleBetAsWon
);

/**
 * POST /admin/bets/:betId/lost
 * Settle bet as lost (OPERATIONS_ADMIN, SUPER_ADMIN)
 */
router.post(
  '/bets/:betId/lost',
  requireAdminRole(['SUPER_ADMIN', 'OPERATIONS_ADMIN']),
  logAdminAction('SETTLE_BET_LOST', 'BET'),
  adminController.settleBetAsLost
);

/**
 * POST /admin/bets/:betId/void
 * Void bet (OPERATIONS_ADMIN, SUPER_ADMIN)
 */
router.post(
  '/bets/:betId/void',
  requireAdminRole(['SUPER_ADMIN', 'OPERATIONS_ADMIN']),
  logAdminAction('VOID_BET', 'BET'),
  adminController.voidBet
);

/**
 * POST /admin/bets/:betId/postpone
 * Postpone bet (OPERATIONS_ADMIN, SUPER_ADMIN)
 */
router.post(
  '/bets/:betId/postpone',
  requireAdminRole(['SUPER_ADMIN', 'OPERATIONS_ADMIN']),
  logAdminAction('POSTPONE_BET', 'BET'),
  adminController.postponeBet
);

// ==================== CASINO MANAGEMENT ====================

/**
 * GET /admin/casino
 * Get running casino games (OPERATIONS_ADMIN, SUPER_ADMIN)
 */
router.get(
  '/casino',
  requireAdminRole(['SUPER_ADMIN', 'OPERATIONS_ADMIN']),
  adminController.getRunningCasinoGames
);

/**
 * POST /admin/casino/:gameId/outcome
 * Set casino game outcome (OPERATIONS_ADMIN, SUPER_ADMIN)
 */
router.post(
  '/casino/:gameId/outcome',
  requireAdminRole(['SUPER_ADMIN', 'OPERATIONS_ADMIN']),
  logAdminAction('SET_CASINO_OUTCOME', 'CASINO_GAME'),
  adminController.setCasinoOutcome
);

// ==================== VIRTUAL GAMES MANAGEMENT ====================

/**
 * POST /admin/virtual/upload
 * Upload virtual game (OPERATIONS_ADMIN, SUPER_ADMIN)
 */
router.post(
  '/virtual/upload',
  requireAdminRole(['SUPER_ADMIN', 'OPERATIONS_ADMIN']),
  logAdminAction('UPLOAD_VIRTUAL_GAME', 'VIRTUAL_GAME'),
  adminController.uploadVirtualGame
);

/**
 * POST /admin/virtual/:gameId/outcome
 * Set virtual game outcome (OPERATIONS_ADMIN, SUPER_ADMIN)
 */
router.post(
  '/virtual/:gameId/outcome',
  requireAdminRole(['SUPER_ADMIN', 'OPERATIONS_ADMIN']),
  logAdminAction('SET_VIRTUAL_OUTCOME', 'VIRTUAL_GAME'),
  adminController.setVirtualGameOutcome
);

// ==================== PROMO CODE MANAGEMENT ====================

/**
 * POST /admin/promo
 * Create promo code (SUPER_ADMIN only)
 */
router.post(
  '/promo',
  requireAdminRole(['SUPER_ADMIN']),
  logAdminAction('CREATE_PROMO_CODE', 'PROMO_CODE'),
  adminController.createPromoCode
);

/**
 * GET /admin/promo
 * Get active promo codes (SUPER_ADMIN only)
 */
router.get(
  '/promo',
  requireAdminRole(['SUPER_ADMIN']),
  adminController.getActivePromoCodes
);

/**
 * POST /admin/promo/:codeId/deactivate
 * Deactivate promo code (SUPER_ADMIN only)
 */
router.post(
  '/promo/:codeId/deactivate',
  requireAdminRole(['SUPER_ADMIN']),
  logAdminAction('DEACTIVATE_PROMO_CODE', 'PROMO_CODE'),
  adminController.deactivatePromoCode
);

// ==================== LOGS ====================

/**
 * GET /admin/logs
 * Get admin logs (SUPER_ADMIN only)
 */
router.get('/logs', requireAdminRole(['SUPER_ADMIN']), adminController.getAdminLogs);

module.exports = router;
