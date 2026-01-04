/**
 * Admin Log Service (In-Memory Storage)
 * 
 * Tracks all admin actions for audit trail
 */

const AdminLog = require('../models/AdminLog.model');

class AdminLogService {
  constructor() {
    // In-memory admin log store
    this.logs = [];
  }

  /**
   * Log an admin action
   */
  logAction(adminId, adminRole, action, targetType, targetId, details = {}) {
    const log = new AdminLog({
      id: this.generateLogId(),
      adminId: adminId,
      adminRole: adminRole,
      action: action,
      targetType: targetType,
      targetId: targetId,
      details: details,
      result: 'SUCCESS',
    });

    this.logs.push(log);
    return log;
  }

  /**
   * Log an admin action failure
   */
  logActionFailure(adminId, adminRole, action, targetType, targetId, error = '') {
    const log = new AdminLog({
      id: this.generateLogId(),
      adminId: adminId,
      adminRole: adminRole,
      action: action,
      targetType: targetType,
      targetId: targetId,
      details: { error },
      result: 'FAILURE',
    });

    this.logs.push(log);
    return log;
  }

  /**
   * Get all logs
   */
  getAllLogs() {
    return this.logs;
  }

  /**
   * Get logs by admin
   */
  getLogsByAdmin(adminId) {
    return this.logs.filter(l => l.adminId === adminId);
  }

  /**
   * Get logs by action
   */
  getLogsByAction(action) {
    return this.logs.filter(l => l.action === action);
  }

  /**
   * Get logs by date range
   */
  getLogsByDateRange(startDate, endDate) {
    return this.logs.filter(l => {
      const logDate = new Date(l.createdAt);
      return logDate >= new Date(startDate) && logDate <= new Date(endDate);
    });
  }

  /**
   * Generate unique log ID
   */
  generateLogId() {
    return `LOG_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

module.exports = new AdminLogService();
