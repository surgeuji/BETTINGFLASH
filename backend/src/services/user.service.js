/**
 * User Service (In-Memory Storage)
 * 
 * Manages user data, registration, and account operations
 * All data is stored in-memory
 */

const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const { generateToken } = require('../config/jwt');
const crypto = require('crypto');

class UserService {
  constructor() {
    // In-memory user store
    this.users = [];
    this.emailIndex = {}; // For fast email lookup
  }

  /**
   * Register a new user
   */
  async register(userData) {
    // Check if email already exists
    if (this.emailIndex[userData.email]) {
      throw new Error('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create user
    const user = new User({
      id: this.generateUserId(),
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      password: hashedPassword,
      country: userData.country,
      bankAccountNumber: userData.bankAccountNumber,
      bankName: userData.bankName,
      accountNameHolder: userData.accountNameHolder,
      accountName: userData.accountName,
      promoCode: userData.promoCode || null,
      status: 'ACTIVE',
      role: 'USER',
      kycVerified: false,
      createdAt: new Date(),
    });

    // Store in memory
    this.users.push(user);
    this.emailIndex[user.email] = user.id;

    return user;
  }

  /**
   * Login user
   */
  async login(email, password) {
    const user = this.findByEmail(email);
    if (!user) throw new Error('User not found');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error('Invalid password');

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      adminRole: user.adminRole,
    });

    return {
      user: this.maskPassword(user),
      token,
    };
  }

  /**
   * Get user by ID
   */
  getUserById(userId) {
    return this.users.find(u => u.id === userId);
  }

  /**
   * Get user by email
   */
  findByEmail(email) {
    return this.users.find(u => u.email === email);
  }

  /**
   * Update user profile
   */
  updateUser(userId, updates) {
    const user = this.getUserById(userId);
    if (!user) throw new Error('User not found');

    Object.assign(user, updates, { updatedAt: new Date() });
    return user;
  }

  /**
   * Freeze user account
   */
  freezeUser(userId) {
    const user = this.getUserById(userId);
    if (!user) throw new Error('User not found');

    user.status = 'FROZEN';
    user.updatedAt = new Date();
    return user;
  }

  /**
   * Unfreeze user account
   */
  unfreezeUser(userId) {
    const user = this.getUserById(userId);
    if (!user) throw new Error('User not found');

    user.status = 'ACTIVE';
    user.updatedAt = new Date();
    return user;
  }

  /**
   * Get all users
   */
  getAllUsers() {
    return this.users.map(u => this.maskPassword(u));
  }

  /**
   * Mask password for security
   */
  maskPassword(user) {
    const userObj = { ...user };
    delete userObj.password;
    return userObj;
  }

  /**
   * Generate unique user ID
   */
  generateUserId() {
    return `USR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

module.exports = new UserService();
