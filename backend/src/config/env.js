require('dotenv').config();

module.exports = {
  // Server
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // JWT
  jwtSecret: process.env.JWT_SECRET || 'default_secret_change_in_production',
  jwtExpire: '7d',

  // Sports API
  sportsApiUrl: process.env.SPORTS_API_URL,
  sportsApiKey: process.env.SPORTS_API_KEY,

  // Email (SMTP)
  smtpHost: process.env.SMTP_HOST,
  smtpPort: process.env.SMTP_PORT,
  smtpUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS,
  smtpFrom: process.env.SMTP_FROM,

  // Admin
  adminEmail: process.env.ADMIN_EMAIL,
  adminPhone: process.env.ADMIN_PHONE,

  // Bank Accounts
  nigerianBankName: process.env.NIGERIAN_BANK_NAME,
  nigerianAccountNumber: process.env.NIGERIAN_ACCOUNT_NUMBER,
  nigerianAccountHolder: process.env.NIGERIAN_ACCOUNT_HOLDER,

  foreignBankName: process.env.FOREIGN_BANK_NAME,
  foreignAccountNumber: process.env.FOREIGN_ACCOUNT_NUMBER,
  foreignAccountHolder: process.env.FOREIGN_ACCOUNT_HOLDER,

  // URLs
  frontendUrl: process.env.FRONTEND_URL,
  adminDashboardUrl: process.env.ADMIN_DASHBOARD_URL,
};
