/**
 * User Controller
 * 
 * Handles user profile and account operations
 */

const userService = require('../services/user.service');

/**
 * Get user profile
 * GET /user/profile
 */
exports.getProfile = (req, res) => {
  try {
    const user = userService.getUserById(req.user.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: userService.maskPassword(user),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update user profile
 * PUT /user/profile
 */
exports.updateProfile = (req, res) => {
  try {
    const { fullName, phone, country, bankAccountNumber, bankName, accountName } = req.body;

    const updates = {};
    if (fullName) updates.fullName = fullName;
    if (phone) updates.phone = phone;
    if (country) updates.country = country;
    if (bankAccountNumber) updates.bankAccountNumber = bankAccountNumber;
    if (bankName) updates.bankName = bankName;
    if (accountName) updates.accountName = accountName;

    const user = userService.updateUser(req.user.userId, updates);

    res.json({
      message: 'Profile updated successfully',
      user: userService.maskPassword(user),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get user account status
 * GET /user/status
 */
exports.getStatus = (req, res) => {
  try {
    const user = userService.getUserById(req.user.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      status: user.status,
      kycVerified: user.kycVerified,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
