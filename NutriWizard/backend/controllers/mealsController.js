const logger = require('../config/logger');
const redisClient = require('../config/redis');
const MealsRepository = require('../repositories/mealsRepository'); // Ahora adaptado a MongoDB
const { v4: uuidv4 } = require('uuid'); // Para generar identificadores únicos

class MealsController {
    // Método para refrescar el caché
    static async refreshCache(req, res) {
        const requestId = uuidv4(); // Genera un identificador único por solicitud
        const label = `[PROFILING] Refresh Cache [Request ID: ${requestId}]`;

        logger.info(`${label} - Start`);
        const startTime = Date.now(); // Inicio del tiempo de respuesta

        try {
            // Obtiene todas las comidas desde MongoDB
            const meals = await MealsRepository.getAllMeals();

            // Valida si existen datos
            if (!meals || meals.length === 0) {
                logger.warn(`${label} - ⚠️ No meals found to cache.`);
                const endTime = Date.now();
                logger.info(`${label} - Response Time: ${endTime - startTime}ms`);
                logger.info(`${label} - End`);
                return res.status(200).json({ message: 'No meals found to cache.' });
            }

            // Actualiza el caché con los datos más recientes
            await redisClient.set('all_meals', JSON.stringify(meals), { EX: 3600 }); // 1 hora de expiración
            const endTime = Date.now();
            logger.info(`${label} - ✅ Cache refreshed successfully.`);
            logger.info(`${label} - Response Time: ${endTime - startTime}ms`);
            logger.info(`${label} - End`);

            res.status(200).json({ message: 'Cache refreshed successfully.', meals });
        } catch (error) {
            const endTime = Date.now();
            logger.error(`${label} - Error: ${error.message}`);
            logger.info(`${label} - Response Time: ${endTime - startTime}ms`);
            res.status(500).json({ error: 'Error refreshing cache.' });
        }
    }

    // Método para obtener todos los platos
    static async getAllMeals(req, res) {
        const requestId = uuidv4(); // Genera un identificador único por solicitud
        const label = `[PROFILING] Get All Meals [Request ID: ${requestId}]`;

        logger.info(`${label} - Start`);
        const startTime = Date.now(); // Inicio del tiempo de respuesta

        try {
            const cachedMeals = await redisClient.get('all_meals');
            if (cachedMeals) {
                const endTime = Date.now(); // Fin del tiempo de respuesta
                logger.info(`${label} - ⚡ Cache hit for all_meals`);
                logger.info(`${label} - Response Time: ${endTime - startTime}ms`);
                logger.info(`${label} - End`);
                return res.json(JSON.parse(cachedMeals));
            }

            logger.warn(`${label} - ❌ Cache miss for all_meals`);
            const meals = await MealsRepository.getAllMeals();

            await redisClient.set('all_meals', JSON.stringify(meals), { EX: 3600 });
            const endTime = Date.now();
            logger.info(`${label} - ✅ Data cached for all_meals`);
            logger.info(`${label} - Response Time: ${endTime - startTime}ms`);
            logger.info(`${label} - End`);
            res.json(meals);
        } catch (error) {
            const endTime = Date.now();
            logger.error(`${label} - Error: ${error.message}`);
            logger.info(`${label} - Response Time: ${endTime - startTime}ms`);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Método para obtener una comida por ID
    static async getMealById(req, res) {
        const { id } = req.params;
        const requestId = uuidv4(); // Genera un identificador único por solicitud
        const label = `[PROFILING] Get Meal by ID: ${id} [Request ID: ${requestId}]`;

        logger.info(`${label} - Start`);
        const startTime = Date.now(); // Inicio del tiempo de respuesta

        try {
            const cachedMeal = await redisClient.get(`meal:${id}`);
            if (cachedMeal) {
                const endTime = Date.now(); // Fin del tiempo de respuesta
                logger.info(`${label} - ⚡ Cache hit for meal:${id}`);
                logger.info(`${label} - Response Time: ${endTime - startTime}ms`);
                logger.info(`${label} - End`);
                return res.json(JSON.parse(cachedMeal));
            }

            logger.warn(`${label} - ❌ Cache miss for meal:${id}`);
            const meal = await MealsRepository.getMealById(id); // MongoDB consulta
            if (!meal) {
                const endTime = Date.now();
                logger.info(`${label} - Response Time: ${endTime - startTime}ms`);
                logger.info(`${label} - End`);
                return res.status(404).json({ error: 'Meal not found' });
            }

            await redisClient.set(`meal:${id}`, JSON.stringify(meal), { EX: 3600 });
            const endTime = Date.now();
            logger.info(`${label} - ✅ Data cached for meal:${id}`);
            logger.info(`${label} - Response Time: ${endTime - startTime}ms`);
            logger.info(`${label} - End`);
            res.json(meal);
        } catch (error) {
            const endTime = Date.now();
            logger.error(`${label} - Error: ${error.message}`);
            logger.info(`${label} - Response Time: ${endTime - startTime}ms`);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = MealsController;