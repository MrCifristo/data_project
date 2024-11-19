const UserMealsRepository = require('../repositories/userMealsRepository');
const logger = require('../config/logger');
const { v4: uuidv4 } = require('uuid');

class UserMealsController {
    /**
     * Crear una relación de comida para un usuario
     */
    static async createUserMeal(req, res) {
        const requestId = uuidv4();
        const label = `[PROFILING] Create User Meal [Request ID: ${requestId}]`;
        logger.info(`${label} - Start`);

        try {
            const { userId, mealId } = req.body;

            if (!userId || !mealId) {
                logger.warn(`${label} - userId o mealId faltante`);
                return res.status(400).json({ error: 'userId y mealId son requeridos.' });
            }

            const userMeal = await UserMealsRepository.createUserMeal(req.body);
            logger.info(`${label} - Relación user_meals creada exitosamente: ${JSON.stringify(userMeal)}`);
            res.status(201).json(userMeal);
        } catch (error) {
            logger.error(`${label} - Error: ${error.message}`);
            res.status(500).json({ error: 'Error interno del servidor al crear la relación en user_meals.' });
        }
    }

    /**
     * Obtener las relaciones de comidas de un usuario por su ID
     */
    static async getUserMealByUserId(req, res) {
        const requestId = uuidv4();
        const label = `[PROFILING] Get User Meals by User ID [Request ID: ${requestId}]`;
        logger.info(`${label} - Start`);

        try {
            const { userId } = req.params;

            if (!userId) {
                logger.warn(`${label} - userId faltante`);
                return res.status(400).json({ error: 'userId es requerido.' });
            }

            const userMeals = await UserMealsRepository.getUserMealByUserId(userId);

            if (!userMeals || userMeals.length === 0) {
                logger.warn(`${label} - No se encontraron relaciones en user_meals para userId: ${userId}`);
                return res.status(404).json({ error: 'User meals not found.' });
            }

            logger.info(`${label} - Relaciones encontradas para userId ${userId}: ${JSON.stringify(userMeals)}`);
            res.json(userMeals);
        } catch (error) {
            logger.error(`${label} - Error: ${error.message}`);
            res.status(500).json({ error: 'Error interno del servidor al obtener la relación en user_meals.' });
        }
    }
}

module.exports = UserMealsController;