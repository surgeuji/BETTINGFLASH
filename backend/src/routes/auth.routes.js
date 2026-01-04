const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

/**
 * POST /auth/register
 * Register a new user
 */
router.post('/register', authController.register);

/**
 * POST /auth/login
 * Login user
 */
router.post('/login', authController.login);

module.exports = router;
