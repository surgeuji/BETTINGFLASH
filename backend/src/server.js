/**
 * Server Bootstrap
 * Initializes the Express server and connects services
 */

const app = require('./app');
const config = require('./config/env');
const db = require('./config/db');

// Start server
const PORT = config.port;

const startServer = async () => {
  try {
    // Initialize database (placeholder - in-memory mode)
    await db.connect();

    // Start listening
    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════════════════════════════╗
║              BETTING FLASH BACKEND SERVER STARTED              ║
║                                                                ║
║  Environment: ${config.nodeEnv.toUpperCase().padEnd(44)}║
║  Port: ${PORT.toString().padEnd(52)}║
║  API Docs: http://localhost:${PORT}                        ║
║                                                                ║
║  Status: ✓ In-memory storage active                          ║
║  Status: ✓ All services initialized                          ║
║  Status: ✓ JWT authentication ready                          ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Start the server
startServer();
