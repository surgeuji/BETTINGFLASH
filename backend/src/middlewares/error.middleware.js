/**
 * Error Handling Middleware
 * 
 * Centralized error handling for all routes
 */

exports.errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Validation errors
  if (err.message.includes('Validation')) {
    return res.status(400).json({
      error: err.message,
      status: 'VALIDATION_ERROR',
    });
  }

  // Not found errors
  if (err.message.includes('not found')) {
    return res.status(404).json({
      error: err.message,
      status: 'NOT_FOUND',
    });
  }

  // Authorization errors
  if (err.message.includes('Insufficient permissions') || err.message.includes('Admin')) {
    return res.status(403).json({
      error: err.message,
      status: 'FORBIDDEN',
    });
  }

  // Default server error
  res.status(500).json({
    error: 'Internal server error',
    status: 'SERVER_ERROR',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
};

/**
 * 404 Not Found Handler
 */
exports.notFoundHandler = (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
    status: 'NOT_FOUND',
  });
};
