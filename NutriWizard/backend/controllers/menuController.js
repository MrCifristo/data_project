const logger = require('../config/logger');
const redisClient = require('../config/redis');
const { v4: uuidv4 } = require('uuid');
const MenuRepository = require('../repositories/menuRepository');
const MealsRepository = require('../repositories/mealsRepository');

class MenuController {
    /**
     * Agregar una comida al menú de un usuario
     */
    static async addMealToMenu(req, res) {
        const { userId, mealId } = req.body;
        const requestId = uuidv4(); // Genera un ID único para la solicitud
        const label = `[PROFILING] Add Meal to Menu [Request ID: ${requestId}]`;

        logger.info(`${label} - Start`);
        const startTime = Date.now();

        try {
            // Validar que los datos necesarios estén presentes
            if (!userId || !mealId) {
                logger.warn(`${label} - userId o mealId faltante`);
                return res.status(400).json({ error: 'userId y mealId son requeridos.' });
            }

            // Buscar la información de la comida en MongoDB
            const mealData = await MealsRepository.getMealById(mealId);
            if (!mealData) {
                logger.warn(`${label} - Meal no encontrado para mealId: ${mealId}`);
                return res.status(404).json({ error: 'Meal no encontrado.' });
            }

            // Crear una nueva entrada en la colección de menú
            const newMenuEntry = await MenuRepository.create({
                userId,
                mealId,
                name: mealData.name,
                calories: mealData.calories,
                protein: mealData.protein,
                fats: mealData.fats,
                carbs: mealData.carbs,
                mealType: mealData.mealType,
            });

            logger.info(`${label} - Nuevo menú creado: ${JSON.stringify(newMenuEntry)}`);
            const endTime = Date.now();
            logger.info(`${label} - Response Time: ${endTime - startTime}ms`);
            logger.info(`${label} - End`);

            res.status(201).json(newMenuEntry);
        } catch (error) {
            const endTime = Date.now();
            logger.error(`${label} - Error: ${error.message}`);
            logger.info(`${label} - Response Time: ${endTime - startTime}ms`);
            res.status(500).json({ error: 'Error al agregar comida al menú.' });
        }
    }

    /**
     * Obtener el menú de un usuario
     */
    static async getUserMenu(req, res) {
        const { userId } = req.params;
        const requestId = uuidv4();
        const label = `[PROFILING] Get User Menu [Request ID: ${requestId}]`;

        logger.info(`${label} - Start`);
        const startTime = Date.now();

        try {
            // Buscar todas las entradas del menú para el usuario
            const userMenu = await MenuRepository.getMenuByUserId(userId);

            if (!userMenu || userMenu.length === 0) {
                logger.warn(`${label} - Menú vacío o no encontrado para userId: ${userId}`);
                const endTime = Date.now();
                logger.info(`${label} - Response Time: ${endTime - startTime}ms`);
                logger.info(`${label} - End`);
                return res.status(404).json({ error: 'Menú vacío o no encontrado.' });
            }

            logger.info(`${label} - Menú encontrado para userId ${userId}: ${JSON.stringify(userMenu)}`);
            const endTime = Date.now();
            logger.info(`${label} - Response Time: ${endTime - startTime}ms`);
            logger.info(`${label} - End`);

            res.status(200).json(userMenu);
        } catch (error) {
            const endTime = Date.now();
            logger.error(`${label} - Error: ${error.message}`);
            logger.info(`${label} - Response Time: ${endTime - startTime}ms`);
            res.status(500).json({ error: 'Error al obtener el menú del usuario.' });
        }
    }

    /**
     * Eliminar una comida del menú
     */
    static async removeMealFromMenu(req, res) {
        const { menuId } = req.params;
        const requestId = uuidv4();
        const label = `[PROFILING] Remove Meal from Menu [Request ID: ${requestId}]`;

        logger.info(`${label} - Start`);
        const startTime = Date.now();

        try {
            // Buscar la entrada del menú por ID en MongoDB
            const menuEntry = await MenuRepository.getMenuEntryById(menuId);
            if (!menuEntry) {
                logger.warn(`${label} - Entrada no encontrada para menuId: ${menuId}`);
                return res.status(404).json({ error: 'Entrada no encontrada en el menú.' });
            }

            // Eliminar la entrada
            await MenuRepository.delete(menuId);
            logger.info(`${label} - Entrada eliminada con éxito: ${menuId}`);
            const endTime = Date.now();
            logger.info(`${label} - Response Time: ${endTime - startTime}ms`);
            logger.info(`${label} - End`);

            res.status(204).send();
        } catch (error) {
            const endTime = Date.now();
            logger.error(`${label} - Error: ${error.message}`);
            logger.info(`${label} - Response Time: ${endTime - startTime}ms`);
            res.status(500).json({ error: 'Error al eliminar la comida del menú.' });
        }
    }
}

module.exports = MenuController;