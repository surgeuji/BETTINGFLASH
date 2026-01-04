/**
 * Admin Log Model (Data Structure Only)
 * 
 * Tracks all admin actions for audit trail
 */

class AdminLog {
  constructor(data) {
    this.id = data.id || null;
    this.adminId = data.adminId || null;
    this.adminRole = data.adminRole || null;
    this.action = data.action || null; // e.g., APPROVE_DEPOSIT, FREEZE_USER, SETTLE_BET
    this.targetType = data.targetType || null; // USER, DEPOSIT, BET, CASINO_GAME, etc
    this.targetId = data.targetId || null;
    this.details = data.details || {}; // Detailed action data
    this.result = data.result || 'SUCCESS'; // SUCCESS, FAILURE
    this.ipAddress = data.ipAddress || null;
    this.userAgent = data.userAgent || null;
    this.createdAt = data.createdAt || new Date();
  }
}

module.exports = AdminLog;
