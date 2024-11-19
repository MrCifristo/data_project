const redis = require('redis');

// Crear cliente de Redis conectado al contenedor
const client = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST || 'localhost', // Usa REDIS_HOST del docker-compose o localhost
        port: process.env.REDIS_PORT || 6379
    }
});

// Manejar errores
client.on('error', (err) => console.error('❌ Redis Client Error:', err));

// Conectar a Redis
(async () => {
    try {
        await client.connect();
        console.log('🚀 Redis conectado');
    } catch (err) {
        console.error('❌ Error conectando a Redis:', err);
    }
})();

module.exports = client;
