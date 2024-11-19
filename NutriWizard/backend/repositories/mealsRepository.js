const Meal = require('../models/meals');
const logger = require('../config/logger');

class MealsRepository {
    /**
     * Obtener todas las comidas, ordenadas por fecha de creación descendente.
     * @returns {Promise<Array>} Lista de comidas.
     */
    static async getAllMeals() {
        try {
            const label = 'Database Query: Get All Meals';
            logger.profileStart(label);

            const mealsList = await Meal.find().sort({ createdAt: -1 }); // Ordenar por fecha de creación descendente.

            logger.profileEnd(label);
            return mealsList;
        } catch (error) {
            logger.error('❌ Error en getAllMeals:', error.message);
            throw new Error('Error al obtener todas las comidas');
        }
    }

    /**
     * Obtener una comida por su ID.
     * @param {String} id - ID de la comida.
     * @returns {Promise<Object>} Comida encontrada.
     */
    static async getMealById(id) {
        try {
            const label = `Database Query: Get Meal by ID: ${id}`;
            logger.profileStart(label);

            const meal = await Meal.findById(id);

            logger.profileEnd(label);
            if (!meal) {
                throw new Error('Comida no encontrada');
            }

            return meal;
        } catch (error) {
            logger.error('❌ Error en getMealById:', error.message);
            throw new Error('Error al obtener la comida por ID');
        }
    }
}

module.exports = MealsRepository;