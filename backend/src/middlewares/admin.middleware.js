/**
 * Admin Middleware
 * 
 * Provides admin-specific utilities and logging
 */

const adminLogService = require('../services/admin.log.service');

exports.logAdminAction = (action, targetType) => {
  return (req, res, next) => {
    // Capture response to log after request is processed
    const originalJson = res.json;

    res.json = function (data) {
      const targetId = req.body?.id || req.params?.id || null;

      if (res.statusCode >= 200 && res.statusCode < 300) {
        adminLogService.logAction(
          req.user?.userId,
          req.user?.adminRole,
          action,
          targetType,
          targetId,
          req.body
        );
      } else {
        adminLogService.logActionFailure(
          req.user?.userId,
          req.user?.adminRole,
          action,
          targetType,
          targetId,
          data?.error
        );
      }

      return originalJson.call(this, data);
    };

    next();
  };
};
