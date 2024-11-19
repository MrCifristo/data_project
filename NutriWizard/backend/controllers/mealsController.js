const logger = require('../config/logger');
const redisClient = require('../config/redis');
const MealsRepository = require('../repositories/mealsRepository');
const { v4: uuidv4 } = require('uuid'); // Importa para generar identificadores únicos

class MealsController {
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
            const meal = await MealsRepository.getMealById(id);
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
}

module.exports = MealsController;
