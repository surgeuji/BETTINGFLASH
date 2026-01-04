const express = require('express');
const userController = require('../controllers/user.controller');
const { auth } = require('../middlewares/auth.middleware');

const router = express.Router();

// All user routes require authentication
router.use(auth);

/**
 * GET /user/profile
 * Get user profile
 */
router.get('/profile', userController.getProfile);

/**
 * PUT /user/profile
 * Update user profile
 */
router.put('/profile', userController.updateProfile);

/**
 * GET /user/status
 * Get user account status
 */
router.get('/status', userController.getStatus);

module.exports = router;
