// Import the 'winston' library for logging
import winston from 'winston';

// Create a new logger instance with a console transport
const logger = new (winston.createLogger)({
  transports: [new (winston.transports.Console)({ json: false })],
});

// Set the default logging level to 'debug'
logger.level = 'debug';

// If the environment variable 'LEVEL' is provided, override the default logging level
if (process.env.LEVEL) {
  logger.level = process.env.LEVEL;
}

// Export the configured logger for use in other parts of the application
export default logger;
