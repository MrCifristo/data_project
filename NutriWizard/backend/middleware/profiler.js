const logger = require('../config/logger'); // Asegúrate de usar el logger configurado

const profiler = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;

        // Usa el logger para registrar los datos del profiling
        logger.info(`PROFILING: ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
    });

    next();
};

module.exports = profiler;
