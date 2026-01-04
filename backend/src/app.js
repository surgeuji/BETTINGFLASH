/**
 * Express Application Configuration
 * Main app setup with middleware and routes
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config/env');

// Import routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const walletRoutes = require('./routes/wallet.routes');
const depositRoutes = require('./routes/deposit.routes');
const withdrawalRoutes = require('./routes/withdrawal.routes');
const betRoutes = require('./routes/bet.routes');
const casinoRoutes = require('./routes/casino.routes');
const virtualRoutes = require('./routes/virtual.routes');
const adminRoutes = require('./routes/admin.routes');

// Import middleware
const { errorHandler, notFoundHandler } = require('./middlewares/error.middleware');

const app = express();

// ==================== MIDDLEWARE ====================

// Security
app.use(helmet());

// CORS
app.use(
  cors({
    origin: [config.frontendUrl, config.adminDashboardUrl],
    credentials: true,
  })
);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ==================== HEALTH CHECK ====================

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Betting Flash API is running' });
});

// ==================== API ROUTES ====================

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/wallet', walletRoutes);
app.use('/deposit', depositRoutes);
app.use('/withdrawal', withdrawalRoutes);
app.use('/bet', betRoutes);
app.use('/casino', casinoRoutes);
app.use('/virtual', virtualRoutes);
app.use('/admin', adminRoutes);

// ==================== ERROR HANDLING ====================

// 404 handler (must be last)
app.use(notFoundHandler);

// Global error handler (must be after all other middleware)
app.use(errorHandler);

module.exports = app;
