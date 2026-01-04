/**
 * Wallet Controller
 * 
 * Handles wallet operations (view balances)
 * Balance updates are admin-only in admin controller
 */

const walletService = require('../services/wallet.service');

/**
 * Get user wallet
 * GET /wallet
 */
exports.getWallet = (req, res) => {
  try {
    const wallet = walletService.getWalletByUserId(req.user.userId);

    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    res.json({
      wallet: {
        id: wallet.id,
        mainBalance: wallet.mainBalance,
        bonusBalance: wallet.bonusBalance,
        totalBalance: wallet.totalBalance,
        withdrawableBalance: wallet.getWithdrawableBalance(),
        currency: wallet.currency,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
