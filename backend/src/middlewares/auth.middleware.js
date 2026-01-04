/**
 * Authentication Middleware
 * 
 * Validates JWT tokens and protects authenticated routes
 */

const { verifyToken } = require('../config/jwt');

exports.auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

/**
 * Admin-only middleware
 * 
 * Ensures only admin users can access the route
 */
exports.adminOnly = (req, res, next) => {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

/**
 * Role-based access control middleware
 * 
 * Ensures only specific admin roles can access the route
 */
exports.requireAdminRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user?.adminRole || !allowedRoles.includes(req.user.adminRole)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};
