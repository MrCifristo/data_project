const { createLogger, format, transports } = require('winston');
const path = require('path');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: path.join(__dirname, '../logs/server.log'),
            level: 'info',
        }),
    ],
});

// Método para manejar profiling
logger.profileStart = (label) => {
    logger.info(`[PROFILING START] ${label}`);
    console.time(label);
};

logger.profileEnd = (label) => {
    console.timeEnd(label);
    logger.info(`[PROFILING END] ${label}`);
};

module.exports = logger;
