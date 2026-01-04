/**
 * Auth Controller
 * 
 * Handles user registration and login
 */

const userService = require('../services/user.service');
const walletService = require('../services/wallet.service');
const bonusService = require('../services/bonus.service');
const notificationService = require('../services/notification.service');
const { isValidEmail, isStrongPassword, isValidPhone } = require('../utils/validators');

/**
 * Register a new user
 * POST /auth/register
 */
exports.register = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
      country,
      bankAccountNumber,
      bankName,
      accountNameHolder,
      accountName,
      promoCode,
    } = req.body;

    // Validation
    if (!fullName || !email || !password || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters with uppercase, lowercase, and number',
      });
    }

    if (!isValidPhone(phone)) {
      return res.status(400).json({ error: 'Invalid phone number' });
    }

    // Register user
    const user = await userService.register({
      fullName,
      email,
      password,
      phone,
      country,
      bankAccountNumber,
      bankName,
      accountNameHolder,
      accountName,
      promoCode,
    });

    // Create wallet
    const wallet = walletService.createWallet(user.id, 0);

    // Validate promo code if provided
    let promoValidation = null;
    if (promoCode) {
      try {
        promoValidation = bonusService.validatePromoCode(promoCode);
        bonusService.incrementPromoCodeUsage(promoCode);
      } catch (error) {
        console.log('Promo code validation failed:', error.message);
      }
    }

    // Send confirmation email
    await notificationService.sendRegistrationEmail(user.email, user.fullName);

    // Notify admin
    await notificationService.notifyAdmin(
      'New User Registration',
      `${user.fullName} (${user.email}) has registered.`
    );

    res.status(201).json({
      message: 'Registration successful',
      user: userService.maskPassword(user),
      wallet,
      promoValidation,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 * POST /auth/login
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const result = await userService.login(email, password);

    res.json({
      message: 'Login successful',
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    if (error.message === 'User not found' || error.message === 'Invalid password') {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    next(error);
  }
};
